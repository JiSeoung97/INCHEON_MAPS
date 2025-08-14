import Logger from "./logger.js";
import DataService from "../service/dataService.js";
import MarkerService from "../service/markerService.js";
import InfoWindowService from "../component/infoWindow.js";
import MapService from "../service/mapService.js";

const Utility = (() => {
  let map;
  let markers = [];
  let selectedMarker = null;

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const getDistance = async (area, boardingGateNum, bottomSheet) => {
    try {
      let startLocation = null;
      let targetLocation = null;

      targetLocation = JSON.parse(sessionStorage.getItem("myLocation"));
      startLocation = area;

      if (bottomSheet) {
        startLocation = area;
        const datas = await DataService.getAllAreas();
        datas.forEach((data) => {
          if (data.name == "탑승게이트" + boardingGateNum) {
            targetLocation = data.position;
          }
        });
      }

      if (targetLocation !== null) {
        const lng1 = startLocation.position.lng;
        const lat1 = startLocation.position.lat;
        const lng2 = targetLocation.lng;
        const lat2 = targetLocation.lat;

        const earthR = 6371000; // 지구 반지름
        const degToRad = (deg) => deg * (Math.PI / 180);

        const dLat = degToRad(lat2 - lat1);
        const dlng = degToRad(lng2 - lng1);

        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(degToRad(lat1)) *
            Math.cos(degToRad(lat2)) *
            Math.sin(dlng / 2) ** 2;
        const distance =
          Math.round(
            earthR * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          ).toLocaleString() + "M";
        return distance;
      }
    } catch (error) {
      Logger.error("위치권한이 필요합니다 : ", error);
    }
  };

  const calculateMidPoint = (positon1, position2) => {
    let lat1 = positon1.lat;
    let lat2 = position2.lat;
    let lng1 = positon1.lng;
    let lng2 = position2.lng;

    let resultLat = Math.round(((lat1 + lat2) / 2) * 1000000) / 1000000;
    let resultLng = Math.round(((lng1 + lng2) / 2) * 1000000) / 1000000;
    return naver.maps.LatLng(resultLat, resultLng);
  };

  const moveGate = async (index) => {
    map = MapService.getMap();
    let idx = index;
    selectedMarker = MarkerService.getSelectedMarker();
    markers = MarkerService.getMarkers();
    var transition = {
      duration: 1000,
      easing: "easeOutCubic",
    };
    MarkerService.replaceAllMarkerIcon();
    selectedMarker = markers[idx];
    let newPosition = naver.maps.LatLng(
      markers[idx].position._lat - 0.0003,
      markers[idx].position._lng
    );
    map.panTo(newPosition, transition);
    await delay(1000);
    setTimeout(() => {
      if (map.getZoom() <= 17) {
        map.setZoom(18, true);
      }
    }, 100);
    MarkerService.replaceMarkerIcon(markers[idx]);
  };

  const openWindowInfo = (index = null) => {
    markers = MarkerService.getMarkers();
    let infoWindows = InfoWindowService.getInfoWindows();
    let selectedInfowindow = MarkerService.getSelectedInfowindow();
    let idx = index;
    if (index == null) {
      idx = infoWindows.length - 1;
      infoWindows[idx].setMap(null);
    } else {
      selectedInfowindow = infoWindows[idx];
      infoWindows[idx].open(map, markers[idx]);
    }
  };
  const translateAreaName = (areaName, language) => {
    if (areaName.includes("출국장")) {
      const gateNumber = areaName.match(/(\d+)출국장/)?.[1];
      const direction = areaName.includes("서편")
        ? "west"
        : areaName.includes("동편")
        ? "east"
        : "";
      if (gateNumber != null && direction != null) {
        return language[`gate${gateNumber}`] + " " + language[direction];
      } else if (gateNumber) {
        return language[`gate${gateNumber}`];
      }
    }

    if (areaName.includes("탑승게이트")) {
      return areaName;
    }

    return areaName;
  };
  const congestionColor = (areaData) => {
    let gaugeColor;

    switch (areaData.congestion) {
      case "none":
        gaugeColor = "#999";
        break;
      case "low":
        gaugeColor = "#32A1FF";
        break;
      case "medium":
        gaugeColor = "#00C73C";
        break;
      case "high":
        gaugeColor = "#FF823F";
        break;
      case "veryhigh":
        gaugeColor = "#FF5959";
        break;
      default:
        gaugeColor = "#999";
    }
    return gaugeColor;
  };
  return {
    getDistance: async (area, boardingGateNum = null, bottomSheet = false) => {
      return await getDistance(area, boardingGateNum, bottomSheet);
    },
    calculateMidPoint: (position1, position2) => {
      return calculateMidPoint(position1, position2);
    },
    moveGate: (index) => {
      moveGate(index);
    },
    openWindowInfo: (index) => {
      openWindowInfo(index);
    },
    openBoardingWindowInfo: () => {
      openWindowInfo();
    },
    translateAreaName: (areaName, language) => {
      return translateAreaName(areaName, language);
    },
    congestionColor: (areaData) => {
      return congestionColor(areaData);
    },
  };
})();
export default Utility;
