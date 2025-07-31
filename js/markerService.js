"use strict";

const MarkerService = (() => {
  // ===== 내부 헬퍼 클래스들 =====

  // 🏭 마커 팩토리 - 모든 마커 생성의 중심
  class MarkerFactory {
    constructor(map, language, boardingGateNum) {
      this.map = map;
      this.language = language;
      this.boardingGateNum = boardingGateNum;
    }

    createMarker(type, data, options = {}) {
      const config = this.getMarkerConfig(type, data, options);

      // 공통 마커 생성 로직
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(config.lat, config.lng),
        map: null,
        title: config.title,
        icon: {
          content: config.iconContent,
          size: new naver.maps.Size(config.size.width, config.size.height),
          anchor: new naver.maps.Point(config.anchor.x, config.anchor.y),
        },
      });

      // 정보창 생성 (필요한 경우만)
      let infoWindow = null;
      if (config.needsInfoWindow) {
        infoWindow = new naver.maps.InfoWindow({
          content: config.infoWindowContent,
          maxWidth: config.infoWindow.maxWidth,
          backgroundColor: config.infoWindow.backgroundColor,
          borderColor: config.infoWindow.borderColor,
          disableAutopan: config.infoWindow.disableAutopan,
          borderWidth: config.infoWindow.borderWidth,
          borderRadius: config.infoWindow.borderRadius,
          disableAnchor: config.infoWindow.disableAnchor,
        });
      }

      // 이벤트 리스너 추가
      if (config.clickHandler) {
        naver.maps.Event.addListener(marker, "click", () => {
          config.clickHandler(marker, infoWindow, data);
        });
      }

      return { marker, infoWindow };
    }

    getMarkerConfig(type, data, options) {
      const configs = {
        departure: this.getDepartureConfig(data, options),
        boarding: this.getBoardingConfig(data, options),
        zoomOut: this.getZoomOutConfig(data, options),
      };
      return configs[type];
    }

    getDepartureConfig(data, options) {
      const { index } = options;
      const area = data.area || data;

      return {
        lat: area.position.lat,
        lng: area.position.lng,
        title: data.name,
        iconContent: IconGenerator.createDepartureIcon(
          data,
          index,
          this.language
        ),
        size: { width: 27, height: 35 },
        anchor: index % 2 === 1 ? { x: 55, y: 30 } : { x: 21, y: 30 },
        needsInfoWindow: true,
        infoWindowContent: InfoWindowGenerator.createDepartureContent(
          data,
          this.language
        ),
        infoWindow: {
          maxWidth: 300,
          backgroundColor: "#fff",
          borderColor: ColorUtils.getCongestionColor(area.congestion),
          disableAutopan: true,
          borderWidth: 2,
          borderRadius: 5,
          disableAnchor: false,
        },
        clickHandler: (marker, infoWindow, data) =>
          EventHandlers.handleDepartureClick(marker, infoWindow, data),
      };
    }

    getBoardingConfig(data, options) {
      return {
        lat: data.position.lat,
        lng: data.position.lng,
        title: data.name,
        iconContent: IconGenerator.createBoardingIcon(
          this.boardingGateNum,
          this.language
        ),
        size: { width: 27, height: 35 },
        anchor: { x: 18, y: 10 },
        needsInfoWindow: true,
        infoWindowContent: InfoWindowGenerator.createBoardingContent(
          data,
          this.boardingGateNum,
          this.language
        ),
        infoWindow: {
          maxWidth: 300,
          backgroundColor: "#fff",
          borderColor: ColorUtils.getCongestionColor(data.congestion),
          disableAutopan: true,
          borderWidth: 3,
          borderRadius: 12,
          disableAnchor: false,
        },
        clickHandler: (marker, infoWindow, data) =>
          EventHandlers.handleBoardingClick(marker, infoWindow, data),
      };
    }

    getZoomOutConfig(data, options) {
      return {
        lat: options.position.lat,
        lng: options.position.lng,
        title: null,
        iconContent: IconGenerator.createZoomOutIcon(data, this.language),
        size: { width: 27, height: 35 },
        anchor: { x: 18, y: 10 },
        needsInfoWindow: false,
        clickHandler: (marker) =>
          EventHandlers.handleZoomClick(marker, this.map),
      };
    }
  }

  // 🎨 아이콘 생성기 - HTML 아이콘 생성 전담
  class IconGenerator {
    static createDepartureIcon(area, index, language) {
      const departure = area.name.replace("출국장", "").split(" ");
      const eastWest =
        departure[1] === "서편"
          ? language["west"]
          : departure[1] === "동편"
          ? language["east"]
          : "";

      const baseStyles = {
        container:
          "display:flex;align-items:center;justify-content:center;margin-top:10px",
        gateIcon:
          "display:flex;background-color:#fff;padding-top:2px;flex-direction:column;width:2.6rem;height:2.6rem;color:#056CFE;align-items:center;justify-content:center;border:0.848px solid #BDBDBD;border-radius:50%;font-size:1rem",
        direction:
          "display:flex;flex-direction:row;height:2rem;width:2rem;font-size:0.875rem;align-items:center;justify-content:center",
        image: "height:0.875rem;margin-right:1px",
      };

      if (index % 2 === 1) {
        // 홀수 인덱스: 방향 → 게이트
        return `
          <div class="markerIcon" style="${baseStyles.container};flex-direction:row;height:2.5rem;width:auto">
            <span style="${baseStyles.direction}">${eastWest}</span>
            <div style="${baseStyles.gateIcon}">
              <img class="markerImg" src="./images/flight_blue.svg" style="${baseStyles.image}">${departure[0]}
            </div>
          </div>
        `;
      } else {
        // 짝수 인덱스: 게이트 → 방향
        return `
          <div style="${baseStyles.container};flex-direction:row">
            <div style="${baseStyles.gateIcon}">
              <img class="markerImg" src="./images/flight_blue.svg" style="${baseStyles.image}">${departure[0]}
            </div>
            <span style="${baseStyles.direction}">${eastWest}</span>
          </div>
        `;
      }
    }

    static createBoardingIcon(gateNumber, language) {
      return `
        <div style="font-size:0.7rem;display:flex;justify-content:center;align-items:center;width:auto;flex-direction:column">
          <div class="boarding-icon" style="display:flex;font-size:1.25rem;font-weight:Semibold;padding-top:0.3125rem;flex-direction:column;height:2rem;width:2.5rem;border-radius:0.5rem 0.5rem 0 0;border:1px solid #BDBDBD;background-color:#fff;color:#056CFE;justify-content:center;align-items:center;">
            <img src="./images/flight_blue.svg" style="width:10px;height:10px;">${gateNumber}
          </div>
          <span style="display:flex;width:100%;text-align:center;justify-content:center;align-items:center;">
            ${language["boardingGate"]}${gateNumber}
          </span>
        </div>
      `;
    }

    static createZoomOutIcon(area, language) {
      const departure = area.name.replace("출국장", "").split(" ");
      return `
        <div>
          <div style="display:flex;background-color:#fff;width:2.5rem;height:2.5rem;padding-top:2px;flex-direction:column;border-radius:1.25rem;font-size:1rem;align-items:center;color:#056CFE;justify-content:center;border:0.848px solid #BDBDBD">
            <img class="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px">${departure[0]}
          </div>
          <span style="display:flex;flex-direction:row;height:auto;font-size:0.875rem;align-items:center;justify-content:center">
            ${language["departurehall"]}
          </span>
        </div>
      `;
    }
  }

  // 📄 정보창 생성기
  class InfoWindowGenerator {
    static createDepartureContent(areaData, language) {
      const distance = DistanceCalculator.getDistance(areaData);
      const congestionText = this.getCongestionText(
        areaData.congestion,
        language
      );
      const translatedName = this.translateAreaName(areaData.name, language);

      return `
        <div class="info-window ${areaData.congestion}">
          <h3>${translatedName}</h3>
          <p><span class="status ${areaData.congestion}"></span>${congestionText}</p>
          <p style="color:#21212280">${language["distance"]}: ${distance}</p>
        </div>
      `;
    }

    static createBoardingContent(areaData, gateNumber, language) {
      const distance = DistanceCalculator.getDistance(areaData);
      return `
        <div class="info-window boardingGate">
          <h3>${language["nthGate"].replace("{{number}}", gateNumber)}</h3>
          <p>${language["distance"]}: ${distance}</p>
        </div>
      `;
    }

    static getCongestionText(congestion, language) {
      const congestionMap = {
        none: language["none"],
        low: language["low"],
        medium: language["medium"],
        high: language["high"],
        veryhigh: language["veryhigh"],
      };
      return congestionMap[congestion] || congestionMap.none;
    }

    static translateAreaName(areaName, language) {
      if (areaName.includes("출국장")) {
        const gateNumber = areaName.match(/(\d+)출국장/)?.[1];
        const direction = areaName.includes("서편")
          ? "west"
          : areaName.includes("동편")
          ? "east"
          : "";

        if (gateNumber && direction) {
          return language[`gate${gateNumber}`] + " " + language[direction];
        } else if (gateNumber) {
          return language[`gate${gateNumber}`];
        }
      }

      if (areaName.includes("탑승게이트")) {
        return areaName;
      }

      return areaName;
    }
  }

  // 📏 거리 계산기
  class DistanceCalculator {
    static getDistance(area) {
      try {
        const savedLocation = JSON.parse(sessionStorage.getItem("myLocation"));
        if (!savedLocation) return "위치 없음";

        const lng1 = area.position.lng;
        const lat1 = area.position.lat;
        const lng2 = savedLocation.lng;
        const lat2 = savedLocation.lat;

        const earthR = 6371000; // 지구 반지름
        const degToRad = (deg) => deg * (Math.PI / 180);

        const dLat = degToRad(lat2 - lat1);
        const dlng = degToRad(lng2 - lng1);

        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(degToRad(lat1)) *
            Math.cos(degToRad(lat2)) *
            Math.sin(dlng / 2) ** 2;

        const distance = Math.round(
          earthR * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        );
        return distance.toLocaleString() + "M";
      } catch (error) {
        console.error("위치권한이 필요합니다 : ", error);
        return "계산 불가";
      }
    }

    static getBoardingDistance(area, boardingGateNum) {
      const areas = DataService.getAllAreas();
      let gatePosition;

      areas.forEach((bArea) => {
        if (bArea.name === "탑승게이트" + boardingGateNum) {
          gatePosition = bArea.position;
        }
      });

      if (!gatePosition) return null;

      const lng1 = area.position.lng;
      const lat1 = area.position.lat;
      const lng2 = gatePosition.lng;
      const lat2 = gatePosition.lat;

      const earthR = 6371000;
      const degToRad = (deg) => deg * (Math.PI / 180);

      const dLat = degToRad(lat2 - lat1);
      const dlng = degToRad(lng2 - lng1);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(degToRad(lat1)) *
          Math.cos(degToRad(lat2)) *
          Math.sin(dlng / 2) ** 2;

      return Math.round(
        earthR * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      );
    }

    static calculateMidPoint(position1, position2) {
      const lat1 = position1.lat;
      const lat2 = position2.lat;
      const lng1 = position1.lng;
      const lng2 = position2.lng;

      const resultLat = Math.round(((lat1 + lat2) / 2) * 1000000) / 1000000;
      const resultLng = Math.round(((lng1 + lng2) / 2) * 1000000) / 1000000;

      return new naver.maps.LatLng(resultLat, resultLng);
    }
  }

  // 🎨 색상 유틸리티
  class ColorUtils {
    static getCongestionColor(congestion) {
      const colors = {
        none: "#999",
        low: "#32A1FF",
        medium: "#00C73C",
        high: "#FF823F",
        veryhigh: "#FF5959",
      };
      return colors[congestion] || colors.none;
    }
  }

  // 🎯 이벤트 핸들러
  class EventHandlers {
    static handleDepartureClick(marker, infoWindow, data) {
      // 마커 아이콘 교체
      MarkerStyleManager.replaceMarkerIcon(marker);

      // 정보창 상태 관리
      if (selectedInfowindow === null) {
        selectedInfowindow = infoWindow;
      } else {
        selectedInfowindow = null;
      }

      // 정보창 토글
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        // 모든 정보창 닫기
        infoWindows.forEach((iw) => iw.close());
        infoWindow.open(map, marker);
      }
    }

    static handleBoardingClick(marker, infoWindow, data) {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindows.forEach((iw) => iw.close());
        selectedInfowindow = infoWindow;
        infoWindow.open(map, marker);
      }
      MarkerStyleManager.replaceBoardingMarkerIcon(marker);
    }

    static handleZoomClick(marker, mapInstance) {
      setTimeout(() => {
        mapInstance.setZoom(mapInstance.getZoom() + 1, true);
      }, 100);
      console.log("zoomclick");
    }
  }

  // 🎨 마커 스타일 매니저
  class MarkerStyleManager {
    static replaceAllMarkerIcon() {
      let newIcon;
      let boardingIcon;
      let newContent;

      markers.forEach((marker, index) => {
        if (index % 2 === 1) {
          newContent = marker
            .getIcon()
            ["content"].replace("white", "blue")
            .replace("color:#fff", "color:#056CFE")
            .replace("background-color:#056CFE", "background-color:#fff")
            .replace(";transform:scale(1.2);transform-origin:center;", ";");
        } else {
          newContent = marker
            .getIcon()
            ["content"].replace("white", "blue")
            .replace("color:#fff", "color:#056CFE")
            .replace("background-color:#056CFE", "background-color:#fff")
            .replace(";transform:scale(1.2);transform-origin:center;", ";");
        }

        newIcon = {
          ...marker.getIcon(),
          content: newContent,
        };

        if (selectedBoardingMarker !== null) {
          boardingIcon = {
            content: selectedBoardingMarker
              .getIcon()
              ["content"].replace("white", "blue")
              .replace("color:#fff", "color:#056CFE")
              .replace("background-color:#056CFE", "background-color:#fff")
              .replace(";transform:scale(1.2);transform-origin:center;", ";"),
            size: new naver.maps.Size(27, 35),
            anchor: new naver.maps.Point(18, 10),
          };
          selectedBoardingMarker.setIcon(boardingIcon);
          selectedBoardingMarker = null;
        }
        marker.setIcon(newIcon);
      });
    }

    static replaceBoardingMarkerIcon(selectMarker) {
      let newIcon;

      if (selectedBoardingMarker !== null) {
        newIcon = {
          content: selectMarker
            .getIcon()
            ["content"].replace("white", "blue")
            .replace("color:#fff", "color:#056CFE")
            .replace("background-color:#056CFE", "background-color:#fff")
            .replace(";transform:scale(1.2);transform-origin:center;", ";"),
          size: new naver.maps.Size(27, 35),
          anchor: new naver.maps.Point(18, 10),
        };
        selectedBoardingMarker = null;
      } else {
        newIcon = {
          content: selectMarker
            .getIcon()
            ["content"].replace("blue", "white")
            .replace("color:#056CFE", "color:#fff")
            .replace("background-color:#fff", "background-color:#056CFE")
            .replace(";", ";transform:scale(1.2);transform-origin:center;"),
          size: new naver.maps.Size(27, 35),
          anchor: new naver.maps.Point(18, 10),
        };
        selectedBoardingMarker = selectMarker;
      }
      selectMarker.setIcon(newIcon);
    }

    static replaceMarkerIcon(selectMarker) {
      let newIcon;

      this.replaceAllMarkerIcon();

      if (selectedMarker !== null) {
        newIcon = {
          ...selectMarker.getIcon(),
          content: selectMarker
            .getIcon()
            ["content"].replace("white", "blue")
            .replace("color:#fff", "color:#056CFE")
            .replace("background-color:#056CFE", "background-color:#fff")
            .replace(";transform:scale(1.2);transform-origin:center;", ";"),
        };
        selectedMarker = null;
      } else {
        newIcon = {
          ...selectMarker.getIcon(),
          content: selectMarker
            .getIcon()
            ["content"].replace("blue", "white")
            .replace("color:#056CFE", "color:#fff")
            .replace("background-color:#fff", "background-color:#056CFE")
            .replace(";", ";transform:scale(1.2);transform-origin:center;"),
        };
        selectedMarker = selectMarker;
      }
      selectMarker.setIcon(newIcon);
    }
  }

  // ===== IIFE 패턴의 비공개 상태 변수들 =====
  let map = null;
  let language = null;
  let boardingGateNum = null;
  let markerFactory = null;

  // 마커 저장소
  let markers = [];
  let boardingMarkers = [];
  let zoomOutMarkers = [];
  let infoWindows = [];
  let boardingInfoWindows = [];
  let selectedMarker = null;
  let selectedBoardingMarker = null;
  let selectedInfowindow = null;

  // ===== 공개 API (기존 인터페이스 유지) =====
  return {
    // 🔧 초기화
    init: (mapInstance, languageData, gateNumber, polylinesArray) => {
      map = mapInstance;
      language = languageData;
      boardingGateNum = gateNumber;

      // 내부 팩토리 초기화
      markerFactory = new MarkerFactory(map, language, boardingGateNum);

      // 배열 초기화
      markers = [];
      boardingMarkers = [];
      zoomOutMarkers = [];
      infoWindows = [];
      boardingInfoWindows = [];
      selectedMarker = null;
      selectedBoardingMarker = null;
      selectedInfowindow = null;
    },

    // 🎉 Before: 50줄 → After: 12줄
    createDepartureMarker: async (areaData, index) => {
      try {
        const area = areaData.area || areaData;
        area.floorInfo = DistanceCalculator.getDistance(area);
        if (index === 0 || index === 9) return;

        // ✨ 마법! 모든 복잡한 로직이 한 줄로!
        const result = markerFactory.createMarker("departure", areaData, {
          index,
        });

        if (result.marker) {
          markers.push(result.marker);
          if (result.infoWindow) {
            infoWindows.push(result.infoWindow);
          }
        }

        return result;
      } catch (error) {
        console.error("출국장 마커 생성 실패 : ", error);
      }
    },

    // 🎉 Before: 45줄 → After: 10줄
    createBoardingMarker: async () => {
      try {
        const data = DataService.getAllAreas();
        const area = data.find(
          (data) => data.name === "탑승게이트" + boardingGateNum
        );

        if (!area) {
          console.error("boardingMarker 생성 실패");
          return;
        }

        area.floorInfo = DistanceCalculator.getBoardingDistance(
          area,
          boardingGateNum
        );

        // ✨ 45줄의 복잡한 로직이 한 줄로!
        const result = markerFactory.createMarker("boarding", area);

        if (result.marker) {
          boardingMarkers.push(result.marker);
          if (result.infoWindow) {
            boardingInfoWindows.push(result.infoWindow);
          }
        }

        return result;
      } catch (error) {
        console.error("탑승구 마커 생성 실패", error);
      }
    },

    // 🎉 Before: 30줄 → After: 8줄
    createZoomOutMarker: async (index) => {
      try {
        if (index % 2 === 1 || index === 0) return;

        const data = DataService.getAllAreas();
        const position = DistanceCalculator.calculateMidPoint(
          data[index].position,
          data[index - 1].position
        );

        // ✨ 30줄의 복잡한 로직이 한 줄로!
        const result = markerFactory.createMarker("zoomOut", data[index], {
          position,
        });

        if (result.marker) {
          zoomOutMarkers.push(result.marker);
        }

        return result;
      } catch (error) {
        console.error("탑승구 줌아웃 마커 생성 실패", error);
      }
    },

    // 기존 함수들 유지 (인터페이스 호환성)
    replaceMarkerIcon: (selectMarker) => {
      MarkerStyleManager.replaceMarkerIcon(selectMarker);
    },

    replaceBoardingMarkerIcon: (selectMarker) => {
      MarkerStyleManager.replaceBoardingMarkerIcon(selectMarker);
    },

    replaceAllMarkerIcon: () => {
      MarkerStyleManager.replaceAllMarkerIcon();
    },

    showMarkers: () => {
      if (map.getZoom() < 18) {
        zoomOutMarkers.forEach((marker) => {
          marker.setMap(map);
        });
      } else {
        markers.forEach((marker, index) => {
          if (index === 9) return;
          marker.setMap(map);
        });
      }
      if (boardingGateNum !== null && boardingMarkers[0]) {
        boardingMarkers[0].setMap(map);
      }
    },

    allMarkerDelete: async () => {
      try {
        markers.forEach((marker) => marker.setMap(null));
        boardingMarkers.forEach((marker) => marker.setMap(null));
        zoomOutMarkers.forEach((marker) => marker.setMap(null));
      } catch (error) {
        console.error("marker가 존재하지 않음");
      }
    },

    openWindowInfo: (index) => {
      const areas = DataService.getAllAreas();
      selectedInfowindow = infoWindows[index];
      infoWindows[index].open(map, markers[index]);
    },

    openBoardingWindowInfo: () => {
      boardingInfoWindows[0].open(map, boardingMarkers[0]);
    },

    moveToMarker: async (index) => {
      const transition = {
        duration: 800,
        easing: "easeOutCubic",
      };

      selectedMarker = markers[index];
      MarkerStyleManager.replaceMarkerIcon(markers[index]);

      const newPosition = new naver.maps.LatLng(
        markers[index].position._lat - 0.0003,
        markers[index].position._lng
      );

      map.panTo(newPosition, transition);
      await new Promise((resolve) => setTimeout(resolve, 800));

      setTimeout(() => {
        if (map.getZoom() <= 17) {
          map.setZoom(18, true);
        }
      }, 100);

      MarkerStyleManager.replaceMarkerIcon(markers[index]);
    },

    moveToBoardingGate: () => {
      const areaData = DataService.getAllAreas();
      const transition = {
        duration: 800,
        easing: "easeOutCubic",
      };

      MarkerStyleManager.replaceBoardingMarkerIcon(boardingMarkers[0]);

      Array.from(areaData).forEach((area) => {
        if (area.name === "탑승게이트" + boardingGateNum) {
          const movePosition = new naver.maps.LatLng(
            area.position.lat - 0.0003,
            area.position.lng
          );
          map.panTo(movePosition, transition);
        }
      });
    },

    // 유틸리티 함수들
    getDistance: (area) => DistanceCalculator.getDistance(area),
    getBoardingDistance: async (area) =>
      DistanceCalculator.getBoardingDistance(area, boardingGateNum),
    congestionColor: (area) => ColorUtils.getCongestionColor(area.congestion),

    // Getter 함수들
    getAllMarkers: () => [markers, boardingMarkers, zoomOutMarkers],
    getAllInfoWindows: () => [infoWindows, boardingInfoWindows],
    getSelectedMarker: () => selectedMarker,
    getSelectedBoardingMarker: () => selectedBoardingMarker,
    getSelectedInfoWindow: () => selectedInfowindow,

    // Setter 함수들
    setSelectedMarker: (marker) => {
      selectedMarker = marker;
    },
    setSelectedBoardingMarker: (marker) => {
      selectedBoardingMarker = marker;
    },
    setSelectedInfoWindow: (infoWindow) => {
      selectedInfowindow = infoWindow;
    },

    // 마커 배열 접근
    getMarkers: () => markers,
    getBoardingMarkers: () => boardingMarkers,
    getZoomOutMarkers: () => zoomOutMarkers,
    getInfoWindows: () => infoWindows,
    getBoardingInfoWindows: () => boardingInfoWindows,
  };
})();
