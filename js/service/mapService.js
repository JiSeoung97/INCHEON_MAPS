import Logger from "../utility/logger.js";
import BottomSheet from "../component/bottomSheet.js";
import DataService from "./dataService.js";
import PolylineService from "./polylineService.js";
import RecoService from "./recoService.js";
import MarkerService from "./markerService.js";
import DragService from "./dragService.js";
import Translate from "../utility/translate.js";
import InfoWindowService from "../component/infoWindow.js";
import languageData from "../../data/language.js";

const MapService = (() => {
  let map = null;
  let markers = [];
  let boardingMarkers = [];
  let infoWindows = [];
  let boardingInfoWindows = [];
  let areas = [];
  let language;
  let firstlang = null;
  let languageText = null;
  let ampm = null;
  let boardingGateNum;
  let selectedInfowindow = null;
  let zoomOutMarkers = [];
  let polylines = [];
  let elementInfos = [];
  let isClickEvent = false;
  const loadTranslateData = async (lang) => {
    try {
      BottomSheet.languageChan(languageData[lang]);
      return languageData[lang];
    } catch (error) {
      Logger.error("언어 로드 실패 : ", error);
    }
  };

  const zoomEvent = () => {
    naver.maps.Event.addListener(map, "zoom_changed", () => {
      selectedInfowindow = InfoWindowService.getInfoWindows();
      MarkerService.replaceAllMarkerIcon();
      MarkerService.getZoomEvent();
      let infowindows = InfoWindowService.getElementInfos();
      if (map.getZoom() < 18) {
        selectedInfowindow.forEach((infoWindow) => {
          infoWindow.setMap(null);
        });
        MarkerService.allElementhide();
        infowindows.forEach((info) => {
          info.setMap(null);
        });
        PolylineService.deletePolyLine();
      } else if (map.getZoom() <20) {
        zoomOutMarkers.forEach((marker) => {
          marker.setMap(null);
        });
        PolylineService.viewPolyLine();
        MarkerService.allElementhide();
      } else {
        PolylineService.viewPolyLine();
        MarkerService.allElementShow();
      } 
    }); 
  };
  const mapClickEvent = () => {
    if (isClickEvent == false) {
      naver.maps.Event.addListener(map, "click", function (e) {
        isClickEvent = true;
        let latLng = { x: e.coord.x, y: e.coord.y };
        Logger.log(latLng);
        infoWindows = InfoWindowService.getInfoWindows();
        elementInfos = InfoWindowService.getElementInfos();

        elementInfos.forEach((elementInfo) => {
          elementInfo.close();
        });
        MarkerService.replaceAllMarkerIcon();
        if (MarkerService.getSelectedMarker() != null) {
          MarkerService.setSelectedMarker(null);
        }
        BottomSheet.resetAllBorderColor();
        infoWindows.forEach((infoWindow) => {
          infoWindow.close();
        });
      });
    }
  };
  const getBoardingGateIdx = (index) => {
    index = Number(index);
    return (
      (index > 50 && index < 101) ||
      index > 132 ||
      index == 4 ||
      index == 5 ||
      index == 13 ||
      index == 44 ||
      index == null
    );
  };

  const initMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.44703, 126.449211),
      zoom: 17,
      mapTypes: new naver.maps.MapTypeRegistry({
        normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
      }),
      mapDataControl: false,
      disableKineticPan: false,
      tileSpare: 5,
      mapDataControl: false,
      scaleControl: false,
      logoControl: true,
      logoControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      zoomControl: false,
      scrollWheel: true,
      maxZoom: 20,
      minZoom: 16,
    };

    map = new naver.maps.Map("map", mapOptions);
    Logger.log("map객체 생성완료");
    return map;
  };

  return {
    init: async () => {
      Logger.log("MapService 초기화 시작");

      const mapElement = document.getElementById("map");
      if (!mapElement) {
        Logger.error("지도를 표시할 엘리먼트를 찾을 수 없음.");
        return null;
      }

      if (!window.naver || !naver.maps) {
        Logger.error("네이버 지도 API가 로드되지 않았습니다.");
        return null;
      }
      // let lang = sessionStorage.getItem("language");
      // firstlang = lang;
      // if (lang == null) {
      //   languageText = "Language";
      //   lang = "ko";
      //   language = await loadTranslateData(lang);
      // } else {
      //   language = await loadTranslateData(lang);
      //   languageText = language[lang];
      // }
      // Logger.log("language load완료");
      try {
        map = initMap();
        return map;
      } catch (error) {
        Logger.error("지도 초기화 중 오류 발생: ", error);
        Logger.log("지도 초기화 중 오류가 발생했습니다.", error);
        return null;
      }
    },
    setting: async () => {
      try {
        Logger.log("setting 시작");
        let lang = sessionStorage.getItem("language");
        firstlang = lang;
        if (lang == null) {
          languageText = "Language";
          lang = "ko";
          language = await loadTranslateData(lang);
        } else {
          language = await loadTranslateData(lang);
          languageText = language[lang];
        }
        console.log("language Loaded");
        const data = await DataService.initData();
        PolylineService.init();
        await RecoService.recoGate();
        await MarkerService.init();
        boardingGateNum = sessionStorage.getItem("boardingGate");
        Logger.log("boardingGateNum :", boardingGateNum);
        if (!data) {
          Logger.log("데이터 초기화 실패", "error");
          return map;
        }
        const allAreas = DataService.getAllAreas();
        await MarkerService.allMarkerDelete();
        markers = [];
        boardingMarkers = [];
        infoWindows = [];
        boardingInfoWindows = [];
        zoomOutMarkers = [];
        if (boardingGateNum != null) {
          boardingMarkers = await MarkerService.createBoardingMarker(
            boardingGateNum
          );

          console.log(boardingMarkers);
          await PolylineService.createBoardingPolyline(boardingMarkers);
          PolylineService.setPolyline();
        } else {
          Logger.error("boardingMarker 생성 실패");
        }
        for (let index = 0; index < allAreas.length; index++) {
          const area = allAreas[index];
          areas.push(area);
        }

        ampm = language["am"];
        await BottomSheet.changeMenu();
        await DragService.init();
        await Translate.translateMenu();
        MarkerService.elementSetting();
        if (polylines[0] == null) {
          markers = MarkerService.getMarkers();
          PolylineService.createPolyline(markers);
        }
        zoomEvent();
        mapClickEvent();

        await BottomSheet.showGateCongestion();
        Logger.log("setting 완료");
      } catch (error) {
        Logger.error("data를 가져오는 도중 error발생 : ", error);
      }
    },
    languageReturn: () => {
      return language;
    },
    boardingGateIdx: (idx) => {
      return getBoardingGateIdx(idx);
    },
    getMap: () => {
      return map;
    },
    alertGateNumCheck: () => {
      alert(language["checkNum"]);
    },
    moveBoardingGate: (boardingGateNum) => {
      const areaData = DataService.getAllAreas();

      var transition = {
        duration: 800,
        easing: "easeOutCubic",
      };
      boardingMarkers = MarkerService.getBoardingMarker();
      MarkerService.replaceBoardingMarkerIcon(boardingMarkers);
      let movePosition;
      Array.from(areaData).forEach((area) => {
        if (area.name == "탑승게이트" + boardingGateNum) {
          movePosition = naver.maps.LatLng(
            area.position.lat - 0.0003,
            area.position.lng
          );
          map.panTo(movePosition, transition);
        }
      });
      return movePosition;
    },
    getCurrentPosition: async () => {
      return await getCurrentPosition();
    },
  };
})();

export default MapService;
