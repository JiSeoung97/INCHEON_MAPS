"use strict";

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

  const loadTranslateData = async (lang) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      BottomSheet.languageChan(languageData[lang]);
      return languageData[lang];
    } catch (error) {
      console.log("언어 로드 실패 : ", error);
    }
  };

  const zoomEvent = () => {
    naver.maps.Event.addListener(map, "zoom_changed", () => {
      console.log("zoomEvent 작동");
      selectedInfowindow = InfoWindowService.getInfoWindows();
      console.log("selectedInfowindow : ", selectedInfowindow);
      MarkerService.replaceAllMarkerIcon();
      MarkerService.getZoomEvent();
      if (map.getZoom() < 18) {
        selectedInfowindow.forEach((infoWindow) => {
          infoWindow.setMap(null);
        });
        PolylineService.deletePolyLine();
      } else {
        zoomOutMarkers.forEach((marker) => {
          marker.setMap(null);
        });
        PolylineService.viewPolyLine();
      }
    });
  };

  const getBoardingGateIdx = (index) => {
    index = Number(index);
    return (
      (index > 50 && index < 101) ||
      index > 132 ||
      index == 4 ||
      index == 5 ||
      index == 44
    );
  };

  const initMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.44703, 126.449211),
      zoom: 17,
      // mapTypes: new naver.maps.MapTypeRegistry({
      //   normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
      // }),
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
    console.log("map객체 생성완료");
    return map;
  };

  return {
    init: async () => {
      console.log("MapService 초기화 시작");

      const mapElement = document.getElementById("map");
      if (!mapElement) {
        console.error("지도를 표시할 엘리먼트를 찾을 수 없음.");
        return null;
      }

      if (!window.naver || !naver.maps) {
        console.error("네이버 지도 API가 로드되지 않았습니다.");
        return null;
      }
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
      console.log("language load완료");
      try {
        console.log("지도 초기화 시도...");

        map = initMap();
        return map;
      } catch (error) {
        console.error("지도 초기화 중 오류 발생: ", error);
        console.log("지도 초기화 중 오류가 발생했습니다.", "error");
        return null;
      }
    },
    setting: async () => {
      try {
        console.log("setting 시작");
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
        DataService.initData();
        PolylineService.init();
        await RecoService.recoGate();
        await MarkerService.init();
        boardingGateNum = sessionStorage.getItem("boardingGate");
        console.log("boardingGateNum :", boardingGateNum);
        const data = DataService.initData();
        if (!data) {
          console.log("데이터 초기화 실패", "error");
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
          console.log("BoardingMarker 생성");
          await MarkerService.createBoardingMarker(boardingGateNum);
          boardingMarkers = MarkerService.getBoardingMarker();
          console.log("boardingMarkers : ", boardingMarkers[0][0]);
          await PolylineService.createBoardingPolyline(boardingMarkers[0]);
          PolylineService.setPolyline();
        } else {
          console.error("boardingMarker 생성 실패");
        }
        for (let index = 0; index < allAreas.length; index++) {
          const area = allAreas[index];
          areas.push(area);
        }

        ampm = language["am"];
        await BottomSheet.changeMenu();
        await DragService.init();
        await Translate.translateMenu();
        if (polylines[0] == null) {
          markers = MarkerService.getMarkers();
          PolylineService.createPolyline(markers);
        }
        zoomEvent();
        naver.maps.Event.addListener(map, "click", function (e) {
          console.log("mapclick");
          let latLng = { x: e.coord.x, y: e.coord.y };
          console.log(latLng);
          infoWindows = InfoWindowService.getInfoWindows();
          MarkerService.replaceAllMarkerIcon();
          if (MarkerService.getSelectedMarker() != null) {
            MarkerService.setSelectedMarker(null);
          }
          BottomSheet.resetAllBorderColor();
          infoWindows.forEach((infoWindow) => {
            infoWindow.close();
          });
        });

        await BottomSheet.showGateCongestion();
        console.log("setting 완료");
      } catch (error) {
        console.error("data를 가져오는 도중 error발생 : ", error);
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
      Array.from(areaData).forEach((area) => {
        if (area.name == "탑승게이트" + boardingGateNum) {
          console.log(area.position.lat);
          let movePosition = naver.maps.LatLng(
            area.position.lat - 0.0003,
            area.position.lng
          );
          map.panTo(movePosition, transition);
        }
      });
    },
    getCurrentPosition: async () => {
      return await getCurrentPosition();
    },
  };
})();
