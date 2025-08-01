"use strict";

const MapService = (() => {
  let map = null;
  let markers = [];
  let boardingMarkers = [];
  let infoWindows = [];
  let boardingInfoWindows = [];
  let areas = [];
  let language;
  let selectedMarker = null;
  let selectedBoardingMarker = null;
  let firstlang;
  let languageText;
  let ampm;
  let recoArray = [];
  let boardingGateNum;
  let selectedInfowindow = null;
  let zoomOutMarkers = [];
  let polylines = [];
  let polylineOn = null;
  const loadTranslateData = async (lang) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      BottomSheet.languageChan(languageData[lang]);
      return languageData[lang];
    } catch (error) {
      console.log("언어 로드 실패 : ", error);
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
  };
  const calculateMidPoint = (positon1, position2) => {
    let lat1 = positon1.lat;
    let lat2 = position2.lat;
    let lng1 = positon1.lng;
    let lng2 = position2.lng;

    let resultLat = Math.round(((lat1 + lat2) / 2) * 1000000) / 1000000;
    let resultLng = Math.round(((lng1 + lng2) / 2) * 1000000) / 1000000;
    console.log("resultLat : ", resultLat);
    console.log("resultLng : ", resultLng);
    return new naver.maps.LatLng(resultLat, resultLng);
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
  const getDistance = (area) => {
    try {
      const savedLocation = JSON.parse(sessionStorage.getItem("myLocation"));
      if (savedLocation !== null) {
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

        const distance =
          Math.round(
            earthR * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          ).toLocaleString() + "M";
        return distance;
      }
    } catch (error) {
      console.error("위치권한이 필요합니다 : ", error);
    }
  };
  const getBoardingDistance = async (area) => {
    const areas = DataService.getAllAreas();
    let gatePosition;
    areas.forEach((bArea) => {
      if (bArea.name == "탑승게이트" + boardingGateNum) {
        gatePosition = bArea.position;
        console.log("bArea :", bArea.name);
        console.log("area", area.name);
      }
    });
    if (!gatePosition) {
      return;
    }
    const lng1 = area.position.lng;
    const lat1 = area.position.lat;
    const lng2 = gatePosition.lng;
    const lat2 = gatePosition.lat;

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
    return distance;
  };
  const createDepartureMarker = async (areaData, index) => {
    try {
      const area = areaData.area || areaData;
      area.floorInfo = getDistance(area);
      if (index == 0 || index == 9) return;
      let marker;
      if (index % 2 == 1) {
        console.log("true , area.name : ", area.name);
        marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(area.position.lat, area.position.lng),
          map: null,
          title: areaData.name,
          icon: {
            content: getMarkerIcon(areaData, index),
            size: new naver.maps.Size(27, 35),
            anchor: new naver.maps.Point(55, 30),
          },
        });
      } else {
        console.log("false , area.name : ", area.name);
        marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(area.position.lat, area.position.lng),
          map: null,
          title: areaData.name,
          icon: {
            content: getMarkerIcon(areaData, index),
            size: new naver.maps.Size(27, 35),
            anchor: new naver.maps.Point(21, 30),
          },
        });
      }
      const infoWindow = new naver.maps.InfoWindow({
        content: getInfoWindowContent(areaData),
        maxWidth: 300,
        backgroundColor: "#fff",
        borderColor: congestionColor(area),
        disableAutopan: true,
        borderWidth: 2,
        borderRadius: 5,
        disableAnchor: false,
      });

      naver.maps.Event.addListener(marker, "click", async () => {
        replaceMarkerIcon(marker);

        if (selectedInfowindow == null) {
          selectedInfowindow = infoWindow;
        } else {
          selectedInfowindow = null;
        }

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindows.forEach((iw) => {
            iw.close();
          });
          infoWindow.open(map, marker);
        }
      });
      markers.push(marker);
      infoWindows.push(infoWindow);

      return { marker, infoWindow };
    } catch (error) {
      console.error("출국장 마커 생성 실패 : ", error);
    }
  };
  const createPolyline = () => {
    console.log("createPolyline");
    for (let i = 0; i < markers.length; i += 2) {
      let polyline = new naver.maps.Polyline({
        map: null,
        path: [markers[i].position, markers[i + 1].position],
        clickable: false,
        strokeColor: "#056CFE1A",
        strokeOpacity: 1,
        strokeWeight: 40,
        strokeLineCap: "butt",
      });

      polylines.push(polyline);
    }
  };
  const deletePolyLine = async () => {
    try {
      polylines.forEach((polyline) => {
        polyline.setMap(null);
      });
    } catch (error) {
      console.error("polyline setMap(null)실패 : ", error);
    }
  };
  const viewPolyLine = async () => {
    try {
      polylines.forEach((polyline, index) => {
        polyline.setMap(map);
      });
    } catch (error) {
      console.error("polyline setMap(map)실패 : ", error);
    }
  };
  const createBoardingMarker = async () => {
    try {
      const data = DataService.getAllAreas();

      const area = data.find(
        (data) => data.name === "탑승게이트" + boardingGateNum
      );
      console.log("data : ", area);
      area.floorInfo = getBoardingDistance(area);
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(area.position.lat, area.position.lng),
        map: null,
        title: area.name,
        icon: {
          content:
            '<div style="font-size:0.7rem;display:flex ;justify-content:center;align-items:center;width:auto;flex-direction:column"><div class = "boarding-icon" style="display: flex;font-size:1.25rem;font-weight: Semibold;padding-top:0.3125rem;flex-direction:column;height:2rem;width:2.5rem; border-radius: 0.5rem 0.5rem 0 0;border: 1px solid #BDBDBD; background-color:#fff;color:#056CFE;justify-content:center;align-items:center;"><img src="./images/flight_blue.svg" style="width:10px; height = 10px;">' +
            boardingGateNum +
            '</div><span style ="display:flex;width:100%;text-align:center;justify-content:center;align-items:center;">' +
            language["boardingGate"] +
            boardingGateNum +
            "</span></div>",
          size: new naver.maps.Size(27, 35),
          anchor: new naver.maps.Point(10, 10),
        },
      });

      const infoWindow = new naver.maps.InfoWindow({
        content: getBoardingInfoWindowContent(area),
        maxWidth: 300,
        backgroundColor: "#fff",
        borderColor: congestionColor(area),
        disableAutopan: true,
        borderWidth: 3,
        borderRadius: 12,
        disableAnchor: false,
      });

      naver.maps.Event.addListener(marker, "click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindows.forEach((iw) => {
            iw.close();
          });
          selectedInfowindow = infoWindow;
          infoWindow.open(map, marker);
        }
        replaceBoardingMarkerIcon(marker);
      });
      boardingMarkers.push(marker);
      boardingInfoWindows.push(infoWindow);

      return { marker, infoWindow };
    } catch (error) {
      console.error("탑승구 마커 생성 실패", error);
    }
  };
  const replaceAllMarkerIcon = () => {
    let newIcon;
    let boardingIcon;
    let newContent;
    console.log(selectedBoardingMarker);
    markers.forEach((marker, index) => {
      if (index % 2 == 1) {
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
      if (selectedBoardingMarker != null) {
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
  };
  const replaceBoardingMarkerIcon = (selectMarker) => {
    let newIcon;
    console.log("selectedMarker : ", selectedBoardingMarker);
    console.log(selectMarker);
    if (selectedBoardingMarker != null) {
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
  };
  const replaceMarkerIcon = (selectMarker) => {
    let newIcon;
    let idx;
    markers.forEach((marker, index) => {
      if (marker == selectMarker) {
        idx = index;
      }
    });
    replaceAllMarkerIcon();

    console.log("selectedMarker : ", selectedMarker);
    if (selectedMarker != null) {
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
  };
  const getMarkerIcon = (area, index) => {
    let departure = area.name.replace("출국장", "").split(" ");
    let eastWest;
    if (departure[1] == "서편") {
      eastWest = language["west"];
    } else if (departure[1] == "동편") {
      eastWest = language["east"];
    } else {
      console.log("eastwest error");
    }

    if (index % 2 == 1) {
      return (
        '<div class = "markerIcon"style="display:flex ;flex-direction:row;align-items: center; justify-content:center;height: 2.5rem;width:auto;margin-top:10px"><span style="display:flex;flex-direction:row;height:2rem;width:2rem;font-size:0.875rem;align-items: center; justify-content:center">' +
        eastWest +
        "</span>" +
        '<div style="display:flex ;background-color:#fff;padding-top:2px;flex-direction: column;width: 2.6rem; height: 2.6rem;color:#056CFE;align-items: center; justify-content:center;border:0.848px solid #BDBDBD ; border-radius: 50%;font-size:1rem;border-color:#BDBDBD"><img class ="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px;">' +
        departure[0] +
        "</div></div>"
      );
    } else {
      return (
        '<div style="display:flex ;flex-direction:row;align-items: center; justify-content:cente;margin-top:10px;width:5rem"><div style="display:flex ;background-color:#fff;width: 2.6rem !important; height: 2.6rem;padding-top:2px;flex-direction: column; border-radius: 50%;font-size:1rem;color:;align-items: center;color:#056CFE; justify-content:center;border:0.848px solid #BDBDBD"><img class ="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px">' +
        departure[0] +
        '</div><span style="display:flex;flex-direction:row;height:2rem;weight:auto;font-size:0.875rem;align-items: center; justify-content:center">' +
        eastWest +
        "</span></div>"
      );
    }
  };
  const getZoomMarkerIcon = (area) => {
    const congestionInfo = DataService.getCongestionInfo(area.congestion);
    const color = congestionInfo ? congestionInfo.color : "#32A1FF";
    let departure = area.name.replace("출국장", "").split(" ");

    return (
      '<div style="display:flex ;background-color:#fff;width: 2.5rem; height: 2.5rem;padding-top:2px;flex-direction: column; border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;font-size:1rem;color:;align-items: center;color:#056CFE; justify-content:center;border:0.848px solid #BDBDBD"><img class ="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px">' +
      departure[0] +
      '</div><span style="display:flex;flex-direction:row;height:auto;weight:auto;font-size:0.875rem;align-items: center; justify-content:center">' +
      language["departurehall"] +
      "</span></div>"
    );
  };
  const getBoardingInfoWindowContent = (areaData) => {
    let distance = getDistance(areaData);
    return (
      '<div class="info-window boardingGate' +
      '">' +
      "<h3>" +
      language["nthGate"].replace("{{number}}", boardingGateNum) +
      "</h3>" +
      "<p>" +
      language["distance"] +
      ": " +
      distance +
      "</p>" +
      "</div>"
    );
  };
  const createZoomOutMarker = async (index) => {
    try {
      if (index % 2 == 1 || index == 0) return;

      const data = DataService.getAllAreas();
      console.log(data[index].name);
      console.log(data[index - 1].name);

      const zoommarker = new naver.maps.Marker({
        position: calculateMidPoint(
          data[index].position,
          data[index - 1].position
        ),
        map: null,
        title: null,
        icon: {
          content: getZoomMarkerIcon(data[index]),
          size: new naver.maps.Size(27, 35),
          anchor: new naver.maps.Point(18, 10),
        },
      });

      naver.maps.Event.addListener(zoommarker, "click", () => {
        setTimeout(() => {
          map.setZoom(map.getZoom() + 1, true);
        }, 100);
        console.log("zoomclick");
      });
      zoomOutMarkers.push(zoommarker);

      return { zoommarker };
    } catch (error) {
      console.error("탑승구 줌아웃 마커 생성 실패", error);
    }
  };
  const zoomEvent = () => {
    naver.maps.Event.addListener(map, "zoom_changed", () => {
      console.log("zoomEvent 작동");
      zoomMarkerEvent();
      if (map.getZoom() < 18) {
        if (selectedMarker != null) {
          console.log("selectedMarker not null");
          replaceMarkerIcon(selectedMarker);
        }
        if (selectedInfowindow != null) {
          selectedInfowindow.setMap(null);
        }
        deletePolyLine();
      } else {
        zoomOutMarkers.forEach((marker) => {
          marker.setMap(null);
        });
        viewPolyLine();
      }
    });
  };
  function zoomMarkerEvent() {
    let currentZoom = Number(map.getZoom());
    console.log(currentZoom);
    if (currentZoom <= 17) {
      console.log("markers 삭제 및 zoomoutMarker생성");
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      zoomOutMarkers.forEach((marker) => {
        marker.setMap(map);
      });
    } else {
      console.log("markers 생성 및 zoomoutMarker제거");
      markers.forEach((marker) => {
        marker.setMap(map);
      });
      zoomOutMarkers.forEach((marker) => {
        marker.setMap(null);
      });
    }
  }
  const getInfoWindowContent = (areaData) => {
    let gaugeColor;
    let distance = getDistance(areaData);
    let conLevel;
    switch (areaData.congestion) {
      case "none":
        gaugeColor = "#999";
        conLevel = language["none"];
        break;
      case "low":
        gaugeColor = "#EBF6FF";
        conLevel = language["low"];
        break;
      case "medium":
        gaugeColor = "#E6FAEC";
        conLevel = language["medium"];
        break;
      case "high":
        gaugeColor = "#FFF3EC";
        conLevel = language["high"];
        break;
      case "veryhigh":
        gaugeColor = "#FFEFEF";
        conLevel = language["veryhigh"];
        break;
      default:
        gaugeColor = "#4CAF50";
    }
    const translatedName = translateAreaName(areaData.name, language);
    return (
      '<div class="info-window ' +
      areaData.congestion +
      '">' +
      "<h3>" +
      translatedName +
      "</h3>" +
      '<p><span class="status ' +
      areaData.congestion +
      '"></span>' +
      conLevel +
      "</p>" +
      '<p style = "color:#21212280">' +
      language["distance"] +
      ": " +
      distance +
      "</p>" +
      "</div>"
    );
  };
  const allMarkerDelete = async () => {
    try {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      boardingMarkers.forEach((marker) => {
        marker.setMap(null);
      });
    } catch (error) {
      console.error("marker가 존재하지 않음");
    }
  };

  const getBoardingGateIdx = (index) => {
    return !(
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
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
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
  const openWindowInfo = (index) => {
    const areas = DataService.getAllAreas();
    let idx = index;
    console.log(areas[idx]);
    selectedInfowindow = infoWindows[idx];
    infoWindows[idx].open(map, markers[idx]);
  };
  const openBoardingWindowInfo = () => {
    let idx = 0;
    boardingInfoWindows[idx].open(map, boardingMarkers[idx]);
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
        let lang = sessionStorage.getItem("language");
        console.log("setting 시작");
        DataService.initData();
        boardingGateNum = sessionStorage.getItem("boardingGate");
        console.log("boardingGateNum :", boardingGateNum);
        firstlang = lang;
        if (lang == null) {
          languageText = "Language";
          lang = "ko";
          language = await loadTranslateData(lang);
        } else {
          language = await loadTranslateData(lang);
          languageText = language[lang];
        }
        const data = DataService.initData();
        if (!data) {
          console.log("데이터 초기화 실패", "error");
          return map;
        }
        const allAreas = DataService.getAllAreas();
        allMarkerDelete();
        markers = [];
        boardingMarkers = [];
        infoWindows = [];
        boardingInfoWindows = [];
        zoomOutMarkers = [];
        if (boardingGateNum != null) {
          console.log("BoardingMarker 생성");
          await createBoardingMarker();
        } else {
          console.error("boardingMarker 생성 실패");
        }
        for (let index = 0; index < allAreas.length; index++) {
          const area = allAreas[index];
          areas.push(area);
          areas.push(area);
          if (index < 10) {
            console.log("DepartureMarker 생성");
            await createZoomOutMarker(index);
            await createDepartureMarker(area, index);
          }
        }
        ampm = language["am"];
        await BottomSheet.changeMenu();
        await BottomSheet.translateMenu();
        await BottomSheet.recoGate();
        if (polylines[0] == null) {
          createPolyline();
        }
        zoomEvent();
        naver.maps.Event.addListener(map, "click", function () {
          console.log("mapclick");
          selectedMarker = null;
          replaceAllMarkerIcon();
          if (polylineOn != null) {
            deletePolyLine();
          }
          BottomSheet.resetAllBorderColor();
          boardingInfoWindows[0].close();
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
    showMarkers: () => {
      if (map.getZoom() < 18) {
        zoomOutMarkers.forEach((marker) => {
          marker.setMap(map);
        });
      } else {
        markers.forEach((marker, index) => {
          if (index == 9) return;
          marker.setMap(map);
        });
        console.log("showMarker에서 boardingGateNum : ", boardingGateNum);
        console.log("Markers : ", markers);
        console.log("boardingMarkers : ", boardingMarkers);
      }
      if (boardingGateNum != null) {
        console.log("boardingMarkers[0] : ", boardingMarkers[0]);
        boardingMarkers[0].setMap(map);
      }
    },
    createCustomControl: () => {
      createCustomControl();
    },
    customControlEvent: () => {
      customControlEvent();
    },
    customControlSetMap: () => {
      console.log("custom : 작동함");
      customControlSetMap();
    },
    moveToUserLocation: async () => {
      await moveToUserLocation();
    },
    savedLocation: async () => {
      return await savedLocation();
    },

    moveMap: async (index) => {
      let idx = index;
      var transition = {
        duration: 800,
        easing: "easeOutCubic",
      };

      selectedMarker = markers[idx];
      replaceMarkerIcon(markers[idx]);
      let newPosition = naver.maps.LatLng(
        markers[idx].position._lat - 0.0003,
        markers[idx].position._lng
      );
      map.panTo(newPosition, transition);
      await delay(800);
      setTimeout(() => {
        if (map.getZoom() <= 17) {
          map.setZoom(18, true);
        }
      }, 100);
      replaceMarkerIcon(markers[idx]);
    },
    openBoardingWindowInfo: () => {
      openBoardingWindowInfo();
    },
    openWindowInfo: (index) => {
      openWindowInfo(index);
    },
    congestionColor: (area) => {
      return congestionColor(area);
    },
    languageReturn: () => {
      return language;
    },
    boardingGateIdx: (idx) => {
      return getBoardingGateIdx(idx);
    },
    alertGateNumCheck: () => {
      alert(language["checkNum"]);
    },
    getDistance: (area) => {
      return getDistance(area);
    },
    getMap: () => {
      return map;
    },
    getBoardingDistance: async (area) => {
      return await getBoardingDistance(area);
    },
    customControlAllDelete: () => {
      customControlAllDelete();
    },
    getAllMarkers: () => {
      return [markers, boardingMarkers, zoomOutMarkers];
    },
    getAllInfoWindows: () => {
      return [infoWindows, boardingInfoWindows];
    },
    getZoomEvent: () => {
      zoomMarkerEvent();
    },
    moveBoardingGate: () => {
      const areaData = DataService.getAllAreas();

      var transition = {
        duration: 800,
        easing: "easeOutCubic",
      };
      replaceBoardingMarkerIcon(boardingMarkers[0]);
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
