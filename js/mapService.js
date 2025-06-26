"use strict";

const Logger = (() => {
  const log = (message, type) => {
    type = type || "info";

    const logTime = getCurrentTime();
    let logClass = "";

    switch (type) {
      case "error":
        logClass = "log-error";
        console.error(logTime + " - " + message);
        break;
      case "warning":
        logClass = "log-warning";
        console.warn(logTime + " - " + message);
        break;
      case "success":
        logClass = "log-success";
        console.log(logTime + " - " + message);
        break;
      default:
        logClass = "log-info";
        console.log(logTime + " - " + message);
    }

    $("#log-content").append(
      '<p class="' + logClass + '">' + logTime + " - " + message + "</p>"
    );

    const logContent = document.getElementById("log-content");
    if (logContent) {
      logContent.scrollTop = logContent.scrollHeight;
    }
  };

  /**
   * 현재 시간 포맷팅
   */
  const getCurrentTime = () => {
    const now = new Date();
    return (
      padZero(now.getHours()) +
      ":" +
      padZero(now.getMinutes()) +
      ":" +
      padZero(now.getSeconds())
    );
  };

  /**
   * 숫자 앞에 0 붙이기
   */
  const padZero = (num) => {
    return (num < 10 ? "0" : "") + num;
  };

  return {
    log: log,
  };
})();
let areaData;

const MapService = (() => {
  let map = null;
  let markers = [];
  let boardingMarkers = [];
  let infoWindows = [];
  let boardingInfoWindows = [];
  let areas = [];
  let companyMarker = null;
  let companyInfoWindow = null;
  let countW = null;
  let countE = null;

  const getDistance = (area) => {
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

      return (
        Math.round(
          earthR * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        ).toLocaleString() + "M"
      );
    }
    return "위치권한이 필요합니다!";
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
  const initMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.44703, 126.449211),
      zoom: 17,
      mapTypeId: naver.maps.MapTypeId.NORMAL,
      mapDataControl: false,
      scaleControl: false,
      logoControl: false,
      zoomControl: true,
      maxZoom: 20,
      minZoom: 17,
    };

    map = new naver.maps.Map("map", mapOptions);
    return map;
  };

  const modalOpen = () => {
    const modal = document.getElementById("adModal");
    modal.style.setProperty("display", "flex");
  };
  const modalClose = () => {
    const modal = document.getElementById("adModal");
    modal.style.setProperty("display", "none");
  };

  const timereset = () => {
    const time = document.getElementById("nTime");
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    let hour = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hour < 12 ? "오전" : "오후";
    hour = hour % 12 || 12;
    const hourStr = String(hour).padStart(2, "0");
    time.innerHTML =
      "UPDATE : " +
      year +
      "." +
      month +
      "." +
      day +
      " " +
      ampm +
      " " +
      hourStr +
      "시 " +
      minutes +
      "분 ";
  };

  const changeMenu = (idx) => {
    const menuBtn = document.getElementsByClassName("menuBtn");
    const controls = document.getElementById("controls");
    if (idx === 0) {
      menuBtn[0].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[1].style.setProperty("border-bottom", "1px solid #2121221A");
      controls.innerHTML = "";
      controls.innerHTML =
        ' <table id="contents">' +
        '<tr class="gate2">' +
        "  <th>2출국장</th>" +
        '  <th class="eastWest"></th>' +
        '  <th class="eastWest"></th>' +
        "</tr>" +
        '<tr class="gate3">' +
        "  <th>3출국장</th>" +
        '  <th class="eastWest"></th>' +
        '  <th class="eastWest"></th>' +
        "</tr>" +
        '<tr class="gate4">' +
        "  <th>4출국장</th>" +
        '  <th class="eastWest"></th>' +
        '  <th class="eastWest"></th>' +
        "</tr>" +
        '<tr class="gate5">' +
        "  <th>5출국장</th>" +
        '  <th class="eastWest"></th>' +
        '  <th class="eastWest"></th>' +
        "</tr>" +
        "</table>";
    } else {
      menuBtn[1].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[0].style.setProperty("border-bottom", "1px solid #2121221A");
      controls.innerHTML = "";
      controls.innerHTML =
        '<div id="cMapContainer">\n<template id="congestionMap"></template>\n</div>';
    }
  };

  const showGateCongestion = (index) => {
    const allAreadata = DataService.getAllAreas();
    const areadata = [];
    allAreadata.forEach((area, idx) => {
      if (idx != 0 && idx < 9) {
        areadata.push(area);
      }
    });

    const contentsEl = document.getElementsByClassName("eastWest");

    setTimeout(() => {
      areadata.forEach((conData, index) => {
        let gaugeColor;
        let conLevel;
        let border;
        let textColor;
        switch (conData.congestion) {
          case "none":
            gaugeColor = "#999";
            conLevel = "미사용";
            border = "1px solid #999";
            textColor = "#99999";
          case "low":
            gaugeColor = "#EBF6FF";
            conLevel = "원활";
            border = "1px solid #E8E8E8";
            textColor = "#32A1FF";
            break;
          case "medium":
            gaugeColor = "#E6FAEC";
            conLevel = "보통";
            border = "1px solid #E8E8E8";
            textColor = "#00C73C";
            break;
          case "high":
            gaugeColor = "#FFF3EC";
            conLevel = "혼잡";
            border = "1px solid #E8E8E8";
            textColor = "#FF823F";
            break;
          case "veryhigh":
            gaugeColor = "#FFEFEF";
            conLevel = "매우혼잡";
            border = "1px solid #E8E8E8";
            textColor = "#FF5959";
            break;
          default:
            gaugeColor = "#4CAF50";
        }
        if (countE == 4) {
          countE = 0;
        }
        if (countW == 4) {
          countW = 0;
        }
        if (index % 2 == 1) {
          var htmlcontents =
            '<div style = "text-align: center;border:' +
            border +
            '"><p class ="gatePoint">동편</p><h4 style = "color:' +
            textColor +
            '">' +
            conLevel +
            "</h4></div>";
          contentsEl[index].innerHTML = htmlcontents;
        } else {
          var htmlcontents =
            '<div style = "text-align: center;border:' +
            border +
            '"><p class ="gatePoint">서편</p><h4 style = "color:' +
            textColor +
            '">' +
            conLevel +
            "</h4></div>";
          contentsEl[index].innerHTML = htmlcontents;
        }
      });
    }, 200);
  };

  const createDepartureMarker = (areaData) => {
    const area = areaData.area || areaData;
    area.floorInfo = getDistance(area);
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(area.position.lat, area.position.lng),
      map: null,
      title: areaData.name,
      icon: {
        content: getMarkerIcon(areaData.congestion),
        size: new naver.maps.Size(27, 35),
        anchor: new naver.maps.Point(7, 10),
      },
    });

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

    naver.maps.Event.addListener(marker, "click", () => {
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

    return markers;
  };

  const createBoardingMarker = (areaData) => {
    const area = areaData.area || areaData;
    area.floorInfo = getDistance(area);
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(area.position.lat, area.position.lng),
      map: null,
      title: areaData.name,
      icon: {
        content:
          '<img src="./images/user_Location.png" style="width:15px; height = 15px;">',
        size: new naver.maps.Size(27, 35),
        anchor: new naver.maps.Point(7, 10),
      },
    });

    const infoWindow = new naver.maps.InfoWindow({
      content: getBoardingInfoWindowContent(areaData),
      maxWidth: 300,
      backgroundColor: "#fff",
      borderColor: congestionColor(area),
      disableAutopan: true,
      borderWidth: 2,
      borderRadius: 5,
      disableAnchor: false,
    });

    naver.maps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindows.forEach((iw) => {
          iw.close();
        });
        infoWindow.open(map, marker);
      }
    });
    boardingMarkers.push(marker);
    boardingInfoWindows.push(infoWindow);

    return boardingMarkers;
  };

  const getMarkerIcon = (congestion) => {
    const congestionInfo = DataService.getCongestionInfo(congestion);
    const color = congestionInfo ? congestionInfo.color : "#32A1FF";

    return (
      '<div style="background-color: ' +
      color +
      '; width: 16px; height: 16px; border-radius: 8px 8px 8px 8px;"></div>'
    );
  };
  const getBoardingInfoWindowContent = (areaData) => {
    const congestionInfo = DataService.getCongestionInfo(areaData.congestion);
    let gaugeColor;
    let distance = getDistance(areaData);
    let conLevel;
    switch (areaData.congestion) {
      case "none":
        gaugeColor = "#999";
        conLevel = "미사용";
      case "low":
        gaugeColor = "#EBF6FF";
        conLevel = "원활";
        break;
      case "medium":
        gaugeColor = "#E6FAEC";
        conLevel = "보통";
        break;
      case "high":
        gaugeColor = "#FFF3EC";
        conLevel = "혼잡";
        break;
      case "veryhigh":
        gaugeColor = "#FFEFEF";
        conLevel = "매우혼잡";
        break;
      default:
        gaugeColor = "#4CAF50";
    }

    return (
      '<div class="info-window ' +
      areaData.congestion +
      '">' +
      "<h3>" +
      areaData.name +
      "</h3>" +
      "<p>거리: " +
      distance +
      "</p>"
    );
  };
  const getInfoWindowContent = (areaData) => {
    const congestionInfo = DataService.getCongestionInfo(areaData.congestion);
    let gaugeColor;
    let distance = getDistance(areaData);
    let conLevel;
    switch (areaData.congestion) {
      case "none":
        gaugeColor = "#999";
        conLevel = "미사용";
      case "low":
        gaugeColor = "#EBF6FF";
        conLevel = "원활";
        break;
      case "medium":
        gaugeColor = "#E6FAEC";
        conLevel = "보통";
        break;
      case "high":
        gaugeColor = "#FFF3EC";
        conLevel = "혼잡";
        break;
      case "veryhigh":
        gaugeColor = "#FFEFEF";
        conLevel = "매우혼잡";
        break;
      default:
        gaugeColor = "#4CAF50";
    }

    return (
      '<div class="info-window ' +
      areaData.congestion +
      '">' +
      "<h3>" +
      areaData.name +
      "</h3>" +
      '<p><span class="status ' +
      areaData.congestion +
      '"></span>혼잡도: ' +
      conLevel +
      "</p>" +
      "<p>거리: " +
      distance +
      "</p>"
    );
  };

  const updateMarkers = () => {
    if (!areas.length) return;

    areas.forEach((areaData, index) => {
      areaData.floorInfo = getDistance(areaData);
      const updatedArea = DataService.getAreaData(areaData.id);
      if (!updatedArea) return;
      if (index < 10) {
        markers[index].setIcon({
          content: getMarkerIcon(updatedArea.congestion),
          size: new naver.maps.Size(27, 35),
          anchor: new naver.maps.Point(7, 10),
        });
        infoWindows[index].setContent(getInfoWindowContent(updatedArea));
      } else {
        return;
      }

      let color = congestionColor(areaData);
      infoWindows[index].setOptions({ borderColor: color });
      areas[index] = updatedArea;
    });

    Logger.log("마커 업데이트 완료");
  };

  const getCurrentPosition = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          if (successCallback) successCallback(userLocation);
        },
        (error) => {
          console.error("위치 정보 가져오기 실패", error);
          if (errorCallback) errorCallback(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      if (errorCallback) errorCallback(new Error("Geolocation not supported"));
    }
  };

  return {
    init: () => {
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

        console.log("지도 초기화 성공", map);

        const data = DataService.initData();
        if (!data) {
          Logger.log("데이터 초기화 실패", "error");
          return map;
        }

        const companyLocation = DataService.getCompanyLocation();
        if (companyLocation) {
          map.setCenter(
            new naver.maps.LatLng(
              companyLocation.position.lat,
              companyLocation.position.lng
            )
          );
          companyMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(
              companyLocation.position.lat,
              companyLocation.position.lng
            ),
            map,
            title: companyLocation.name,
            icon: {
              content:
                '<div style="background-color: #3B5998; width: 16px; height: 16px; border-radius: 8px 8px 8px 8px; border: 0px solid #fff;"></div>',
              size: new naver.maps.Size(24, 37),
              anchor: new naver.maps.Point(8, 5),
            },
          });

          companyInfoWindow = new naver.maps.InfoWindow({
            content:
              '<div class="info-window">' +
              "<h3>" +
              companyLocation.name +
              "</h3>" +
              "<p>" +
              companyLocation.description +
              "</p>" +
              "</div>",
            maxWidth: 300,
            backgroundColor: "#fff",
            borderColor: "#888",
            borderWidth: 1,
            disableAnchor: false,
          });

          naver.maps.Event.addListener(companyMarker, "click", () => {
            if (companyInfoWindow.getMap()) companyInfoWindow.close();
            else {
              infoWindows.forEach((iw) => {
                iw.close();
              });

              companyInfoWindow.open(map, companyMarker);
              Logger.log(companyLocation.name + "마커가 클릭됨");
            }
          });
        }

        const allAreas = DataService.getAllAreas();
        allAreas.forEach((area, index) => {
          areas.push(area);
          if (index < 10) {
            createDepartureMarker(area);
          } else {
            createBoardingMarker(area);
          }
        });

        Logger.log(
          "지도가 초기화되었습니다. '마커 추가하기' 버튼을 클릭하여 마커를 추가하세요."
        );

        return map;
      } catch (error) {
        console.error("지도 초기화 중 오류 발생: ", error);
        Logger.log("지도 초기화 중 오류가 발생했습니다.", "error");
        return null;
      }
    },

    showMarkers: () => {
      markers.forEach((marker) => {
        marker.setMap(map);
      });
      boardingMarkers.forEach((marker) => {
        console.log(marker);
        marker.setMap(map);
      });
      Logger.log("마커가 표시되었습니다.");
    },

    toggleCongestion: () => {
      const updateData = DataService.updateCongestionData();
      if (updateData) {
        updateMarkers();
        Logger.log("혼잡도 데이터가 업데이트되었습니다.");
      }
    },
    modalOpen: () => {
      modalOpen();
    },

    modalClose: () => {
      modalClose();
    },

    resetMap: () => {
      infoWindows.forEach((infoWindow) => {
        infoWindow.close();
      });

      if (companyInfoWindow) companyInfoWindow.close();

      const companyLocation = DataService.getCompanyLocation();
      if (companyLocation) {
        map.setCenter(
          new naver.maps.LatLng(
            companyLocation.position.lat,
            companyLocation.position.lng
          )
        );
        map.setZoom(17);
      }

      DataService.initData();
      updateMarkers();

      Logger.log("지도 초기화 완료");
    },

    moveToUserLocation: () => {
      getCurrentPosition(
        (userLocation) => {
          if (limitLocation(userLocation)) {
            map.setCenter(
              new naver.maps.LatLng(userLocation.lat, userLocation.lng)
            );
            Logger.log("사용자 위치로 이동했습니다.", "success");
            console.log(
              `현재 사용자 좌표 : Lat(${userLocation.lat}), Lng(${userLocation.lng})`
            );

            const userMarker = new naver.maps.Marker({
              position: new naver.maps.LatLng(
                userLocation.lat,
                userLocation.lng
              ),
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
        },
        (error) => {
          alert(
            "위치 정보를 가져오는데 실패했습니다. 위치 권한을 허용해주세요."
          );
          Logger.log("위치 권한 오류: " + error.message, "error");
        }
      );
    },

    createMoveBtn: () => {
      createButtonTag();
    },
    savedLocation: () => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          console.log("이 브라우저는 위치 기능을 지원하지 않습니다.");
          return reject(new Error("Geolocation not supported"));
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationData = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            sessionStorage.setItem("myLocation", JSON.stringify(locationData));
            console.log("위치 저장 완료:", locationData);
            resolve();
          },
          (error) => {
            console.error("위치 정보를 가져올 수 없습니다:", error);
            reject(error);
          }
        );
      });
    },
    moveBoardingMap: (index) => {
      const allareas = DataService.getAllAreas();
      let idx = 0;
      var transition = {
        duration: 500,
        easing: "linear",
      };
      idx = index + 10;
      map.panTo(allareas[idx].position, transition);
    },
    moveMap: (index) => {
      const allareas = DataService.getAllAreas();
      let idx = 0;
      var transition = {
        duration: 500,
        easing: "linear",
      };
      if (index !== 9 && index !== 10) {
        idx = index + 1;
      } else if (index == 9) {
        idx = 0;
      } else {
        idx = 9;
      }

      console.log("index" + idx);
      console.log(allareas[idx]);
      map.panTo(allareas[idx].position, transition);

      const div = document.querySelectorAll(".eastWest div");
      div.forEach((divBox) => {
        divBox.style.setProperty("border-color", "#E8E8E8");
      });
      div[idx - 1].style.setProperty(
        "border-color",
        congestionColor(allareas[idx])
      );
    },

    changeMenu: (idx) => {
      changeMenu(idx);
    },
    updateMarkers: () => {
      updateMarkers();
    },
    openWindowInfo: (index) => {
      let idx = 0;
      if (index !== 9 && index !== 10) {
        idx = index + 1;
      } else if (index == 9) {
        idx = 0;
      } else {
        idx = 9;
      }
      console.log(idx);
      infoWindows[idx].open(map, markers[idx]);
    },
    openBoardingWindowInfo: (index) => {
      boardingInfoWindows[index].open(map, boardingMarkers[index]);
    },

    showBScongestion: () => {
      showGateCongestion(0);
    },

    timereset: () => {
      timereset();
    },

    moveToCompany: () => {
      const companyLocation = DataService.getCompanyLocation();

      if (companyLocation) {
        map.setCenter(
          new naver.maps.LatLng(
            companyLocation.position.lat,
            companyLocation.position.lng
          )
        );
        map.setZoom(17);
        Logger.log(companyLocation.name + " 위치로 이동했습니다.");
      }
    },
  };
})();
