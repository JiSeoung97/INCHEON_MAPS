import Logger from "./logger.js";
import ErrorHandler from "./httpError.js";
import { LocationError } from "./customError.js";

const utLocation = (() => {
  let watchId = null;
  let lastKnownLocation = null;
  let locationCallbacks = [];

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
    if (watchId) return; // 이미 추적 중

    watchId = navigator.geolocation.watchPosition(
      (position) => {
        lastKnownLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
        };

        // 등록된 콜백들에게 위치 업데이트 알림
        locationCallbacks.forEach((callback) => {
          callback(lastKnownLocation);
        });
      },
      (error) => {
        Logger.error("위치 추적 중 오류:", error);
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
        const timeoutId = setTimeout(() => {
          reject(new Error("TIMEOUT"));
        }, 8000);

        const callback = (location) => {
          clearTimeout(timeoutId);
          locationCallbacks = locationCallbacks.filter((cb) => cb !== callback);
          resolve(location);
        };

        locationCallbacks.push(callback);
        return;
      }
      // 3. 일반적인 getCurrentPosition (fallback)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: Date.now(),
            };
            // if (limitLocation(userLocation)) {
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
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
          }
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
      warmUpGPS(); // GPS 예열
      startWatching(); // 지속적 추적 시작
    },
    getCurrentPosition: async () => {
      return await getCurrentPosition();
    },
    savedLocation: async (location) => {
      await savedLocation(location);
    },
  };
})();

export default utLocation;
