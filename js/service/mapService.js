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

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(console.log("gps is not supported by this browser"));
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve(userLocation);
          },
          (error) => {
            console.error("위치 정보 가져오기 실패", error);
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
  const savedLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const locationData = {
        lat: position.lat,
        lng: position.lng,
      };
      console.log(
        "JSON.stringify(locationData) : ",
        JSON.stringify(locationData)
      );
      sessionStorage.setItem("myLocation", JSON.stringify(locationData));
      return locationData;
    } catch (error) {
      console.error("위치 정보를 가져올 수 없습니다 : ", error);
    }
  };
  const moveToUserLocation = async () => {
    try {
      const userLocation = await getCurrentPosition();

      if (limitLocation(userLocation)) {
        map.setCenter(
          new naver.maps.LatLng(userLocation.lat, userLocation.lng)
        );
        console.log("사용자 위치로 이동했습니다.", "success");
        console.log(
          `현재 사용자 좌표 : Lat(${userLocation.lat}), Lng(${userLocation.lng})`
        );

        const userMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(userLocation.lat, userLocation.lng),
          map,
          title: "현재 위치",
          icon: {
            content:
              '<div style="background-color: #4285F4; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #fff;"></div>',
            size: new naver.maps.Size(18, 18),
            anchor: new naver.maps.Point(9, 9),
          },
        });

        setTimeout(() => {
          userMarker.setMap(null);
        }, 10000);
      } else {
        alert("이 기능은 인천공항 내에서만 사용가능한 기능입니다.");
      }
    } catch (error) {
      alert("위치 정보를 가져오는데 실패했습니다. 위치 권한을 허용해주세요.");
      console.log("위치 권한 오류: " + error.message, "error");
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
        DataService.initData();
        PolylineService.init();
        await BottomSheet.recoGate();
        await MarkerService.init();
        boardingGateNum = sessionStorage.getItem("boardingGate");
        console.log("boardingGateNum :", boardingGateNum);
        const data = DataService.initData();
        if (!data) {
          console.log("데이터 초기화 실패", "error");
          return map;
        }
        const allAreas = DataService.getAllAreas();
        MarkerService.allMarkerDelete();
        markers = [];
        boardingMarkers = [];
        infoWindows = [];
        boardingInfoWindows = [];
        zoomOutMarkers = [];
        if (boardingGateNum != null) {
          console.log("BoardingMarker 생성");
          await MarkerService.createBoardingMarker(boardingGateNum);
        } else {
          console.error("boardingMarker 생성 실패");
        }
        for (let index = 0; index < allAreas.length; index++) {
          const area = allAreas[index];
          areas.push(area);
        }

        ampm = language["am"];
        await BottomSheet.changeMenu();
        await BottomSheet.translateMenu();
        if (polylines[0] == null) {
          markers = MarkerService.getMarkers();
          PolylineService.createPolyline(markers);
        }
        zoomEvent();
        naver.maps.Event.addListener(map, "click", function () {
          console.log("mapclick");
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
    moveToUserLocation: async () => {
      await moveToUserLocation();
    },
    savedLocation: async () => {
      return await savedLocation();
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
    moveBoardingGate: () => {
      const areaData = DataService.getAllAreas();

      var transition = {
        duration: 800,
        easing: "easeOutCubic",
      };

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
  };
})();
