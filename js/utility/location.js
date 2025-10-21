import Logger from "./logger.js";
import ErrorHandler from "./httpError.js";
import { LocationError } from "./customError.js";
import MarkerService from "../service/markerService.js";
import RecoService from "../service/recoService.js";

const utLocation = (() => {
  let watchId = null;
  let lastKnownLocation = null;
  let option;
  let isIOS = null;
  let isAndroid = null;

  const getBrowserOptimizedOptions = () => {
    const userAgent = navigator.userAgent;
    isIOS = /iPad|iPhone|iPod/.test(userAgent);
    isAndroid = /Android/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isChrome = /Chrome/.test(userAgent);

    Logger.log("브라우저 감지:", {
      userAgent: userAgent.substring(0, 50),
      isIOS,
      isAndroid,
      isSafari,
      isChrome,
    });

    if (isIOS || isSafari) {
      Logger.log("iOS/Safari 최적화 적용");
      option = {
        enableHighAccuracy: true,
        timeout: 200000, // 200초
        maximumAge: 0,
      };
    } else if (isAndroid && isChrome) {
      Logger.log("Android Chrome 최적화 적용");
      option = {
        enableHighAccuracy: true,
        timeout: 120000, // 120초
        maximumAge: 0,
      };
    } else if (isAndroid) {
      Logger.log("Android 기타 브라우저 최적화 적용");
      option = {
        enableHighAccuracy: true,
        timeout: 150000, // 150초
        maximumAge: 0,
      };
    } else {
      Logger.log("데스크톱/기타 브라우저 기본 설정 적용");
      option = {
        enableHighAccuracy: true,
        timeout: 100000, // 100초
        maximumAge: 0,
      };
    }
  };

  // GPS 예열 함수
  const warmUpGPS = async () => {
    for (let i = 0; i < 3; i++) {
      try {
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 1000,
            maximumAge: 0,
            enableHighAccuracy: true,
          });
        });
      } catch (error) {
        Logger.log(`GPS 예열 ${i + 1}번째 실패`);
      }
    }
  };

  // 지속적 위치 추적 시작
  const startWatching = () => {
    if (!isAndroid && !isIOS) return;
    if (watchId) return; // 이미 추적 중

    watchId = navigator.geolocation.watchPosition(
      (position) => {
        lastKnownLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
      },
      (error) => {
        Logger.error("위치 추적 중 오류:", error);
        stopWatching();
      },
      option
    );
  };

  // 위치 추적 중단
  const stopWatching = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  };

  // 🆕 가중평균 계산 함수
  const calculateWeightedAverage = (measurements) => {
    if (measurements.length === 0) return null;

    if (measurements.length === 1) {
      Logger.log("단일 측정값 반환");
      return {
        ...measurements[0],
        method: "single_measurement",
        measurementCount: 1,
      };
    }

    let totalWeight = 0;
    let weightedLat = 0;
    let weightedLng = 0;
    let weights = [];

    Logger.log("⚖️ 가중평균 계산 시작");

    measurements.forEach((measurement, index) => {
      // 정확도의 제곱의 역수를 가중치로 사용
      const weight = 1 / (measurement.accuracy * measurement.accuracy);

      weightedLat += measurement.lat * weight;
      weightedLng += measurement.lng * weight;
      totalWeight += weight;

      weights.push(weight);

      Logger.log(
        `측정 ${index + 1}: 정확도 ${
          measurement.accuracy
        }m, 가중치 ${weight.toFixed(6)}`
      );
    });

    const result = {
      lat: weightedLat / totalWeight,
      lng: weightedLng / totalWeight,
      accuracy: estimateAccuracy(measurements, totalWeight),
      method: "weighted_average",
      measurementCount: measurements.length,
      originalMeasurements: measurements,
      weights: weights,
    };

    Logger.log(
      `🎯 가중평균 결과: (${result.lat.toFixed(6)}, ${result.lng.toFixed(6)})`
    );
    Logger.log(`📏 추정 정확도: ${result.accuracy.toFixed(1)}m`);

    return result;
  };

  // 🆕 가중평균 정확도 추정
  const estimateAccuracy = (measurements, totalWeight) => {
    // 가중 조화 평균
    const weightedHarmonicMean = Math.sqrt(1 / totalWeight);

    // 측정값들의 분산 고려
    const avgLat =
      measurements.reduce((sum, m) => sum + m.lat, 0) / measurements.length;
    const avgLng =
      measurements.reduce((sum, m) => sum + m.lng, 0) / measurements.length;

    // 위경도를 미터로 변환
    const lat2meter = 111320;
    const lng2meter = 111320 * Math.cos((avgLat * Math.PI) / 180);

    let variance = 0;
    measurements.forEach((m) => {
      const dx = (m.lng - avgLng) * lng2meter;
      const dy = (m.lat - avgLat) * lat2meter;
      variance += dx * dx + dy * dy;
    });

    const standardDeviation = Math.sqrt(variance / measurements.length);

    // 보수적인 값 선택 (최소 3m)
    return Math.max(weightedHarmonicMean, standardDeviation, 3);
  };

  // 🔄 업데이트된 getCurrentPosition 함수
  const getCurrentPosition = async () => {
    // 1. watch가 실행중이고 최근 위치가 있으면 최근위치를 첫 번째 측정값으로 사용
    let measurements = [];

    if (lastKnownLocation && watchId) {
      Logger.log("🎯 기존 추적 위치를 첫 번째 측정값으로 사용");
      measurements.push({
        ...lastKnownLocation,
        source: "watch",
        timestamp: Date.now(),
      });
    }

    // 2. 3번 측정 (기존 추적 위치가 있으면 2번 추가 측정)
    const targetMeasurements = measurements.length > 0 ? 2 : 3;

    Logger.log(`📡 GPS ${targetMeasurements}회 측정 시작...`);

    for (let i = 0; i < targetMeasurements; i++) {
      try {
        Logger.log(`${i + 1}번째 측정 중...`);

        const currentLocation = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy,
                source: "gps",
                timestamp: Date.now(),
                attempt: i + 1,
              };
              resolve(userLocation);
            },
            reject,
            option
          );
        });

        measurements.push(currentLocation);
        Logger.log(
          `✅ ${i + 1}번째 측정 완료: 정확도 ${currentLocation.accuracy}m`
        );

        // 🆕 조기 종료 조건: 매우 정확한 측정값이 나오면 즉시 종료
        if (currentLocation.accuracy < 5) {
          Logger.log("🎯 매우 정확한 측정값 획득, 측정 조기 종료");
          break;
        }

        // 마지막 측정이 아니면 1초 대기
        if (i < targetMeasurements - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (error) {
        Logger.error(`${i + 1}번째 측정 실패:`, error);

        // 에러 처리
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            Logger.error("위치 정보 제공을 거부하셨습니다.");
            break;
          case 2: // POSITION_UNAVAILABLE
            Logger.error("현재 위치를 확인할 수 없습니다.");
            break;
          case 3: // TIMEOUT
            Logger.error("위치 정보를 가져오는 데 시간이 초과되었습니다.");
            break;
          default:
            Logger.error("알 수 없는 오류로 위치 정보를 가져올 수 없습니다.");
        }
      }
    }

    // 3. 측정값이 없으면 에러
    if (measurements.length === 0) {
      throw new LocationError("위치를 측정할 수 없습니다.");
    }

    Logger.log(`📊 총 ${measurements.length}회 측정 완료`);

    // 4. 🆕 가중평균 계산
    const weightedLocation = calculateWeightedAverage(measurements);

    // 5. 개선 효과 계산
    if (measurements.length > 1) {
      const bestOriginal = measurements.reduce((best, current) =>
        current.accuracy < best.accuracy ? current : best
      );

      const improvement = bestOriginal.accuracy - weightedLocation.accuracy;
      const improvementPercent = (improvement / bestOriginal.accuracy) * 100;

      Logger.log(
        `✨ 정확도 개선: ${bestOriginal.accuracy.toFixed(
          1
        )}m → ${weightedLocation.accuracy.toFixed(1)}m`
      );
      Logger.log(`📈 개선률: ${improvementPercent.toFixed(1)}%`);

      weightedLocation.improvement = improvement;
      weightedLocation.improvementPercent = improvementPercent;
    }

    Logger.log("🎯 최종 위치:", weightedLocation);
    return weightedLocation;
  };

  const savedLocation = async (location) => {
    try {
      const locationData = {
        lat: location.lat,
        lng: location.lng,
      };

      sessionStorage.setItem("myLocation", JSON.stringify(locationData));
      Logger.log("위치 정보 저장 완료:", locationData);

      return locationData;
    } catch (error) {
      Logger.error("위치 정보 저장 실패:", error);
      throw error;
    }
  };

  return {
    init: () => {
      Logger.log("🚀 utLocation 초기화 시작");
      getBrowserOptimizedOptions(); // 사용자 브라우저 확인
      setTimeout(() => {
        warmUpGPS(); // GPS 예열
        startWatching(); // 지속적 추적 시작
      }, 100);

      // 페이지 종료 시 정리
      window.addEventListener("beforeunload", stopWatching);
      Logger.log("✅ utLocation 초기화 완료");
    },

    getCurrentPosition: async () => {
      try {
        Logger.log("📍 현재 위치 요청 시작");

        // 🆕 가중평균 방식으로 위치 획득
        let location = await getCurrentPosition();
        // 위치 저장
        await savedLocation(location);
        RecoService.recoGate();
        MarkerService.createMarker();
        return location;
      } catch (error) {
        Logger.error("위치 획득 실패:", error);
        alert("위치 서비스를 활성화한 후 다시 시도해주세요");
        throw error;
      }
    },
    clearSavedLocation: () => {
      sessionStorage.removeItem("myLocation");
      Logger.log("저장된 위치 정보 삭제");
    },

    getSavedLocation: () => {
      try {
        const saved = sessionStorage.getItem("myLocation");
        return saved ? JSON.parse(saved) : null;
      } catch (error) {
        Logger.error("저장된 위치 정보 읽기 실패:", error);
        return null;
      }
    },
  };
})();

export default utLocation;
