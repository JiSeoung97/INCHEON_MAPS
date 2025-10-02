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
import CustomControl from "../component/customControl.js";
import ModalService from "./modalService.js";

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
  let setting = false;
  let boardingInfo = null;
  let kiosk = null;
  let lang = null;
  let dataCnt = 0;
  let elementSettingOn = false;

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
      if (!elementSettingOn) {
        MarkerService.elementSetting();
        elementSettingOn = true;
      }
      selectedInfowindow = InfoWindowService.getInfoWindows();
      MarkerService.replaceAllMarkerIcon();
      MarkerService.getZoomEvent();
      CustomControl.mapLangClose();
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
      } else {
        zoomOutMarkers.forEach((marker) => {
          marker.setMap(null);
        });
        PolylineService.viewPolyLine();
        MarkerService.allElementShow();
      }
    });
  };
  const mapClickEvent = () => {
    if (isClickEvent == false) {
      naver.maps.Event.addListener(map, "click", function (e) {
        isClickEvent = true;
        CustomControl.mapLangClose();
        MarkerService.replaceAllMarkerIcon();
        if (MarkerService.getSelectedMarker() != null) {
          MarkerService.setSelectedMarker(null);
        }
        let eW = document.getElementsByClassName("eastWest");
        if (eW) {
          BottomSheet.resetAllBorderColor();
        }
        InfoWindowService.allInfoClose();
        PolylineService.hideUserPoly();
      });
    }
  };
  const getBoardingGateIdx = (index) => {
    if (index == null || index == "") {
      return true;
    }
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
      center: new naver.maps.LatLng(37.44553, 126.4515),
      zoom: 16,
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

      try {
        const urlParams = new URLSearchParams(window.location.search);
        lang = urlParams.get("lang");
        kiosk = urlParams.get("kiosk");
      } catch (error) {
        Logger.log("쿼리스트링x", error);
      }
      if (lang != null) {
        language = await loadTranslateData(lang);
        sessionStorage.setItem("language", lang);
      }
      if (kiosk != null) {
        kiosk = Number(kiosk);
        ModalService.trainCenterModalOpen(kiosk);
      }
      const mapElement = document.getElementById("map");
      if (!mapElement) {
        Logger.error("지도를 표시할 엘리먼트를 찾을 수 없음.");
        return null;
      }

      if (!window.naver || !naver.maps) {
        Logger.error("네이버 지도 API가 로드되지 않았습니다.");
        return null;
      }
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
        if (dataCnt !== 0) {
          const data = await DataService.initData();
          if (!data) {
            Logger.log("데이터 초기화 실패", "error");
            return map;
          }
        }
        dataCnt++;
        await RecoService.recoGate();
        await MarkerService.init();
        boardingGateNum = sessionStorage.getItem("boardingGate");
        Logger.log("boardingGateNum :", boardingGateNum);
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
        await Translate.translateMenu();
        if (polylines[0] == null) {
          markers = MarkerService.getMarkers();
          PolylineService.createPolyline(markers);
        }
        zoomEvent();
        mapClickEvent();

        await BottomSheet.showGateCongestion();
        await DragService.init();
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
    getCurrentPosition: async () => {
      return await getCurrentPosition();
    },
    setElementSet: (bool) => {
      elementSettingOn = bool;
    },
  };
})();

export default MapService;
