"use strict";

const MarkerService = (() => {
  let markers = [];
  let infoWindows = [];
  let boardingInfoWindows = [];
  let boardingMarker = [];
  let language;
  let areas = [];
  let map;
  let zoomOutMarkers = [];
  let selectedMarker;
  let selectedInfowindow;
  let selectedBoardingMarker;
  let boardingGateNum = null;
  const createMarker = async (areaData, index, boardingGateNum) => {
    try {
      const data = DataService.getAllAreas();
      let area = null;
      let content;
      let marker;
      if (boardingGateNum == null) {
        area = areaData.area || areaData;
        if (index == 0 || index == 9) return;
        content = getMarkerIcon(areaData, index);
        if (index % 2 == 1) {
          marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(
              area.position.lat,
              area.position.lng
            ),
            map: null,
            title: area.name,
            icon: {
              content: content,
              size: new naver.maps.Size(27, 35),
              anchor: new naver.maps.Point(55, 30),
            },
          });
        } else {
          marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(
              area.position.lat,
              area.position.lng
            ),
            map: null,
            title: area.name,
            icon: {
              content: content,
              size: new naver.maps.Size(27, 35),
              anchor: new naver.maps.Point(21, 30),
            },
          });
        }
      } else {
        area = data.find(
          (data) => data.name === "탑승게이트" + boardingGateNum
        );
        marker = new naver.maps.Marker({
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
            anchor: new naver.maps.Point(21, 30),
          },
        });
        boardingMarker = marker;
      }
      area.floorInfo = Utility.getDistance(area);

      const infoWindow = InfoWindowService.createInfoWindow(area);
      naver.maps.Event.addListener(marker, "click", () => {
        markerEvent(marker, infoWindow);
      });
      if (boardingGateNum == null) {
        markers.push(marker);
        infoWindows.push(infoWindow);
      } else {
        boardingMarker = marker;
        boardingInfoWindows.push(infoWindow);
      }

      return { marker, infoWindow };
    } catch (error) {
      console.error("출국장 마커 생성 실패 : ", error);
    }
  };
  const createZoomOutMarker = async (index) => {
    try {
      if (index % 2 == 1 || index == 0) return;

      const data = DataService.getAllAreas();
      let position = Utility.calculateMidPoint(
        data[index].position,
        data[index - 1].position
      );
      const zoommarker = new naver.maps.Marker({
        position: position,
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
    if (selectedMarker == selectMarker) {
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
  const replaceAllMarkerIcon = () => {
    let newIcon;
    let boardingIcon;
    let newContent;
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
  const markerEvent = (marker, infoWindow) => {
    replaceMarkerIcon(marker);

    if (selectedInfowindow == null) {
      selectedInfowindow = infoWindow;
    } else {
      selectedInfowindow = null;
    }

    if (infoWindow.getMap() != null) {
      infoWindow.close();
    } else {
      infoWindows.forEach((iw) => {
        iw.close();
      });
      infoWindow.open(map, marker);
    }
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
  const allMarkerDelete = async () => {
    try {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      // boardingMarker.setMap(null);
    } catch (error) {
      console.error("marker가 존재하지 않음");
    }
  };

  return {
    init: async () => {
      language = MapService.languageReturn();
      map = MapService.getMap();
      const allAreas = DataService.getAllAreas();
      markers = [];
      boardingMarker = null;
      for (let index = 0; index < allAreas.length; index++) {
        const area = allAreas[index];
        areas.push(area);
        if (index < 10) {
          await createZoomOutMarker(index);
          await createMarker(area, index);
        }
      }
    },
    getMarkers: () => {
      return markers;
    },
    createBoardingMarker: (boardingGateNum) => {
      boardingMarker = null;
      createMarker(null, null, boardingGateNum);
    },
    allMarkerDelete: () => {
      allMarkerDelete();
    },
    showMarkers: () => {
      try {
        if (map.getZoom() < 18) {
          zoomOutMarkers.forEach((marker) => {
            marker.setMap(map);
          });
        } else {
          markers.forEach((marker, index) => {
            if (index >= 9) return;
            marker.setMap(map);
          });
        }
        boardingGateNum = sessionStorage.getItem("boardingGate");
        console.log("boardingGateNum : ", boardingGateNum);
        if (boardingGateNum != null) {
          console.log("boardingMarkers : ", boardingMarker);
          console.log(markers);
          boardingMarker.setMap(map);
        }
      } catch (error) {
        console.error("showMarker 실패 : ", error);
      }
    },
    getZoomEvent: () => {
      zoomMarkerEvent();
    },
    getInfoWindows: () => {
      return infoWindows;
    },
    getSelectedInfowindow: () => {
      return selectedInfowindow;
    },
    replaceAllMarkerIcon: () => {
      replaceAllMarkerIcon();
    },
    getSelectedMarker: () => {
      return selectedMarker;
    },
    setSelectedMarker: (marker) => {
      selectedMarker = marker;
    },
    replaceMarkerIcon: (marker) => {
      replaceMarkerIcon(marker);
    },
    replaceBoardingMarkerIcon: () => {
      replaceBoardingMarkerIcon(boardingMarker);
    },
    getZoomMarker: () => {
      return zoomOutMarkers;
    },
  };
})();
