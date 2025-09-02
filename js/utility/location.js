import Logger from "./logger.js";
import ErrorHandler from "./httpError.js";
import { LocationError } from "./customError.js";

const utLocation = (() => {
  let watchId = null;
  let lastKnownLocation = null;
  let locationCallbacks = [];

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
        enableHighAccuracy: false, // iOS는 false가 더 빠름
        timeout: 20000, // 20초
        maximumAge: 0,
      };
    } else if (isAndroid && isChrome) {
      Logger.log("Android Chrome 최적화 적용");
      option = {
        enableHighAccuracy: true, // Android Chrome은 정확함
        timeout: 12000, // 12초
        maximumAge: 0,
      };
    } else if (isAndroid) {
      Logger.log("Android 기타 브라우저 최적화 적용");
      option = {
        enableHighAccuracy: false, // 호환성 우선
        timeout: 150000, // 150초
        maximumAge: 0,
      };
    } else {
      Logger.log("데스크톱/기타 브라우저 기본 설정 적용");
      option = {
        enableHighAccuracy: true, // 데스크톱은 빠름
        timeout: 10000, // 10초
        maximumAge: 0,
      };
    }
  };
  // GPS 예열 함수
  const warmUpGPS = () => {
    navigator.geolocation.getCurrentPosition(
      () => {}, // 결과 무시
      () => {}, // 에러 무시
      { timeout: 1000, maximumAge: 0 }
    );
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
          timestamp: Date.now(),
        };
        alert(position.coords.latitude);
        // 등록된 콜백들에게 위치 업데이트 알림
        locationCallbacks.forEach((callback) => {
          callback(lastKnownLocation);
        });
      },
      (error) => {
        Logger.error("위치 추적 중 오류:", error);
        alert("watch에서 오류가 생겼음", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  // 위치 추적 중단
  const stopWatching = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      // 1. 최근 위치가 있으면 즉시 반환 (5초 이내)
      if (
        lastKnownLocation &&
        Date.now() - lastKnownLocation.timestamp < 5000
      ) {
        resolve(lastKnownLocation);
        return;
      }
      // 2. watchPosition이 실행 중이면 잠시 기다림

      if (watchId) {
        // 병렬 처리: 빠른 것을 먼저 채택
        Promise.race([
          // 방법1: watchPosition 콜백 대기 (빠른 응답 기대)
          new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              reject();
            }, 50000); // 50초

            const callback = (location) => {
              clearTimeout(timeoutId);
              locationCallbacks = locationCallbacks.filter(
                (cb) => cb !== callback
              );
              resolve(location);
            };
            locationCallbacks.push(callback);
          }),

          // 방법2: 3초 후 일반 getCurrentPosition 실행 (안전망)
          new Promise((resolve, reject) => {
            setTimeout(() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    timestamp: Date.now(),
                  };
                  resolve(userLocation);
                },
                reject,
                option
              );
            }, 10000); // 10초
          }),
        ])
          .then(resolve)
          .catch(reject);
      } else {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: Date.now(),
            };
            // if (limitLocation(userLocation)) {
            await savedLocation(userLocation);
            resolve(userLocation);
            // } else {
            //   alert("인천공항 내부에서만 이용할 수 있습니다.");
            // try {
            //   throw new LocationError(
            //     "인천공항 내부에서만 이용할 수 있습니다."
            //   );
            // } catch (error) {
            //   ErrorHandler.handleSpecificError(error);
            // }
            // }
          },
          (error) => {
            Logger.error("위치 정보 가져오기 실패", error);
            switch (error.code) {
              case 1: // PERMISSION_DENIED
                alert("위치 정보 제공을 거부하셨습니다. 설정을 확인해주세요.");
                break;
              case 2: // POSITION_UNAVAILABLE
                alert("현재 위치를 확인할 수 없습니다. ");
                break;
              case 3: // TIMEOUT
                alert("위치 정보를 가져오는 데 시간이 초과되었습니다.");
                break;
              default:
                alert("알 수 없는 오류로 위치 정보를 가져올 수 없습니다.");
                break;
            }
            ErrorHandler.handleSpecificError(error);
            reject(error);
          },
          option
        );
      }
    });
  };
  const savedLocation = async (location) => {
    try {
      const position = location;
      const locationData = {
        lat: position.lat,
        lng: position.lng,
      };
      sessionStorage.setItem("myLocation", JSON.stringify(locationData));
      return locationData;
    } catch (error) {
      Logger.error("위치 정보를 가져올 수 없습니다 : ", error);
    }
  };

  const limitLocation = (userLocation) => {
    const maxLat = 37.496831;
    const minLat = 37.420388;
    const maxLng = 126.499959;
    const minLng = 126.388376;
    const userLat = userLocation.lat;
    const userLng = userLocation.lng;
    return (
      userLat < maxLat &&
      userLat > minLat &&
      userLng < maxLng &&
      userLng > minLng
    );
  };
  return {
    init: () => {
      getBrowserOptimizedOptions(); // 사용자 브라우저 확인
      setTimeout(() => {}, 1000);
      warmUpGPS(); // GPS 예열
      startWatching(); // 지속적 추적 시작
    },
    getCurrentPosition: async () => {
      return await getCurrentPosition();
    },
  };
})();

export default utLocation;
