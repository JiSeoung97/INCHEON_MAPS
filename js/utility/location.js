import Logger from "./logger.js";

const utLocation = (() => {
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(Logger.log("gps is not supported by this browser"));
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            // if (limitLocation(userLocation)) {
            Logger.log("userLocation : ", userLocation);
            resolve(userLocation);
            // } else {
            //   alert("인천공항 내부에서만 이용할 수 있습니다.");
            //   resolve();
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
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
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
    getCurrentPosition: async () => {
      return await getCurrentPosition();
    },
    savedLocation: async (location) => {
      await savedLocation(location);
    },
  };
})();

export default utLocation;
