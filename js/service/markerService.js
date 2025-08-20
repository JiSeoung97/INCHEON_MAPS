import Logger from "../utility/logger.js";
import MapService from "./mapService.js";
import DataService from "./dataService.js";
import Utility from "../utility/utility.js";
import InfoWindowService from "../component/infoWindow.js";
import ModalService from "./modalService.js";
const MarkerService = (() => {
  let markers = [];
  let infoWindows = [];
  let boardingInfoWindows = [];
  let boardingMarkers = [];
  let language;
  let areas = [];
  let map;
  let zoomOutMarkers = [];
  let selectedMarker;
  let selectedInfowindow;
  let selectedBoardingMarker;
  let boardingGateNum = null;
  let elementsMarkers = [];
  let elementInfos = [];
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
              anchor: new naver.maps.Point(20, 30),
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
              '<div style="font-size:0.7rem;display:flex ;justify-content:center;align-items:center;width:auto;flex-direction:column;margin-top:10px"><div class = "boarding-icon" style="display: flex;font-size:1.25rem;font-weight:bold;padding-top:0.3125rem;flex-direction:column;height:2rem;width:2.5rem; border-radius: 0.5rem 0.5rem 0.2rem 0.2rem;border: 1px solid #BDBDBD; background-color:#fff;color:#056CFE;justify-content:center;align-items:center;"><p style="font-size:0.4rem;font-weight:semibold">GATE<p>' +
              boardingGateNum +
              '</div><span style ="display:flex;width:100%;text-align:center;justify-content:center;align-items:center;">' +
              language["boardingGate"] +
              boardingGateNum +
              "</span></div>",
            size: new naver.maps.Size(27, 35),
            anchor: boardingAncPoint(),
          },
        });
      }
      area.floorInfo = await Utility.getDistance(area, boardingGateNum);

      const infoWindow = await InfoWindowService.createInfoWindow(
        area,
        boardingGateNum
      );
      naver.maps.Event.addListener(marker, "click", () => {
        markerEvent(marker, infoWindow);
      });
      if (boardingGateNum == null) {
        markers.push(marker);
        infoWindows.push(infoWindow);
      } else {
        boardingMarkers.push(marker);
        boardingInfoWindows.push(infoWindow);
      }

      return { marker, infoWindow };
    } catch (error) {
      Logger.error("출국장 마커 생성 실패 : ", error);
    }
  };

  const boardingAncPoint = () => {
    const lang = sessionStorage.getItem("language");
    let point;
    switch (lang) {
      case "zh":
      case "ko":
        point = new naver.maps.Point(21, 15);
        break;
      case "en":
        point = new naver.maps.Point(21, 15);
        break;
      case "ja":
        point = new naver.maps.Point(21, 15);
        break;
    }
    return point;
  };

  const createElementMarker = () => {
    const elements = DataService.getAllElements();
    let mapOn = null;
    map = MapService.getMap();
    if (map.getZoom() == 20) {
      mapOn = map;
    }
    let infoWindow;
    elements.forEach((element) => {
      const marker = new naver.maps.Marker({
        position: element.position,
        map: mapOn,
        title: null,
        icon: {
          content: elementMarkerIcon(element),
          size: new naver.maps.Size(27, 35),
          anchor: new naver.maps.Point(13, 0),
        },
      });
      const name = element.name.split(" ")[1];
      if (name != "식당가") {
        const infoWindow = InfoWindowService.getElementInfo(element);
        naver.maps.Event.addListener(marker, "click", () => {
          markerEvent(marker, infoWindow);
        });
        elementInfos.push(infoWindow);
      } else {
        naver.maps.Event.addListener(marker, "click", () => {
          elementEvent(marker);
        });
      }
      elementsMarkers.push(marker);
      naver.maps.Event.addListener(marker, "click", () => {
        markerEvent(marker, infoWindow);
      });
    });
  };
  const elementEvent = (e) => {
    const clickElement = $(e.target);
    let category = clickElement.data("category");
    if (category == "환전소") {
      category = "exchange";
    } else if (category == "로밍센터" || category == "도시락") {
      category = "roam";
    } else {
      category = "food";
    }
    ModalService.langChange(category);
    ModalService.adModalOpen();
  };
  const allElementShow = () => {
    elementsMarkers.forEach((element) => {
      element.setMap(map);
    });
  };
  const elementMarkerIcon = (element) => {
    const name = element.name.split(" ")[1];
    Logger.log("name split : ", name);

    let icon;
    switch (name) {
      case "환전소":
        icon =
          '<div style="display:flex;width:24px; height:24px; border:1px solid #ffffff; background-color: #96B3F2;justify-content:center;text-align:center;align-items:center;border-radius:50%; font-size:12px;color: #FFFFFF">₩</div>';
        break;
      case "도시락":
      case "로밍센터":
        icon =
          '<div style="display:flex;width:24px; height:24px; border:1px solid #ffffff; background-color: #8B99AC;justify-content:center;align-items:center; border-radius:50%; font-size:12px;color: #FFFFFF"><img src="./images/roam.svg" style="width:90%;height:90%;border-radius:50%"></div>';
        break;
      case "식당가":
        icon =
          '<div style="display:flex;width:24px; height:24px; border:1px solid #ffffff; background-color: #EF864F;justify-content:center;align-items:center; border-radius:50%; font-size:12px;color: #FFFFFF"><img src="./images/food_court.svg" style="width:70%;height:70%;border-radius:50%"></div>';
        break;
    }
    return icon;
  };
  const allElementhide = () => {
    elementsMarkers.forEach((element) => {
      element.setMap(null);
    });
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
      });
      zoomOutMarkers.push(zoommarker);

      return { zoommarker };
    } catch (error) {
      Logger.error("탑승구 줌아웃 마커 생성 실패", error);
    }
  };
  const getZoomMarkerIcon = (area) => {
    const congestionInfo = DataService.getCongestionInfo(area.congestion);
    const color = congestionInfo ? congestionInfo.color : "#32A1FF";
    let departure = area.name.replace("출국장", "").split(" ");

    return (
      '<div style="display:flex;flex-direction: column;align-items: center;justify-content:center "><div style="display:flex ;background-color:#fff;width: 2.5rem; height: 2.5rem;padding-top:2px;flex-direction: column; border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;font-size:1rem;color:;align-items: center;color:#056CFE; justify-content:center;border:0.848px solid #BDBDBD"><img class ="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px">' +
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
    if (selectedBoardingMarker != null) {
      newIcon = {
        ...selectMarker.getIcon(),
        content: selectMarker
          .getIcon()
          ["content"].replace("white", "blue")
          .replace("color:#fff", "color:#056CFE")
          .replace("background-color:#056CFE", "background-color:#fff")
          .replace(";transform:scale(1.2);transform-origin:center;", ";"),
      };
      selectedBoardingMarker = null;
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
      if (boardingMarkers[0] != null) {
        boardingIcon = {
          ...boardingMarkers[0].getIcon(),
          content: boardingMarkers[0]
            .getIcon()
            ["content"].replace("white", "blue")
            .replace("color:#fff", "color:#056CFE")
            .replace("background-color:#056CFE", "background-color:#fff")
            .replace(";transform:scale(1.2);transform-origin:center;", ";"),
        };
        boardingMarkers[0].setIcon(boardingIcon);
        selectedBoardingMarker = null;
      }
      marker.setIcon(newIcon);
    });
  };
  function zoomMarkerEvent() {
    let currentZoom = Number(map.getZoom());
    if (currentZoom <= 17) {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      zoomOutMarkers.forEach((marker) => {
        marker.setMap(map);
      });
    } else {
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
      infoWindow.open(map, marker);
    }
    $(".moreInfo")
      .off("click")
      .on("click", (e) => {
        elementEvent(e);
      });
  };
  const getMarkerIcon = (area, index) => {
    let departure = area.name.replace("출국장", "").split(" ");
    let eastWest;
    if (departure[1] == "서편") {
      eastWest = language["west"];
    } else if (departure[1] == "동편") {
      eastWest = language["east"];
    } else {
      Logger.log("eastwest error");
    }

    if (index % 2 == 1) {
      return (
        '<div class = "markerIcon"style="display:flex ;z-index :11;flex-direction:row;align-items: center; justify-content:center;height: 2.5rem;width:auto;margin-top:10px"><span style="display:flex;flex-direction:row;height:2rem;width:2rem;font-size:0.875rem;align-items: center; justify-content:center">' +
        eastWest +
        "</span>" +
        '<div style="display:flex ;background-color:#fff;padding-top:2px;flex-direction: column;width: 2.6rem; height: 2.6rem;color:#056CFE;align-items: center; justify-content:center;border:0.848px solid #BDBDBD ; border-radius: 50%;font-size:1rem;border-color:#BDBDBD"><img class ="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px;">' +
        departure[0] +
        "</div></div>"
      );
    } else {
      return (
        '<div style="display:flex ;flex-direction:row;align-items: center;z-index :11; justify-content:cente;margin-top:10px;width:5rem"><div style="display:flex ;background-color:#fff;width: 2.6rem !important; height: 2.6rem;padding-top:2px;flex-direction: column; border-radius: 50%;font-size:1rem;color:;align-items: center;color:#056CFE; justify-content:center;border:0.848px solid #BDBDBD"><img class ="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px">' +
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
      boardingMarkers.forEach((marker) => {
        marker.setMap(null);
      });
      elementsMarkers.forEach((marker) => {
        marker.setMap(null);
      });
    } catch (error) {
      Logger.error("marker가 존재하지 않음");
    }
  };

  return {
    init: async () => {
      language = MapService.languageReturn();
      map = MapService.getMap();
      if (markers[0] != null) {
        markers.forEach((marker) => {
          marker.setMap(null);

          Logger.log("maker.setMap(null) 작동함");
        });
        zoomOutMarkers.forEach((marker) => {
          marker.setMap(null);
        });
      }
      zoomOutMarkers = [];
      markers = [];
      const allAreas = DataService.getAllAreas();
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
    createBoardingMarker: async (boardingGateNum) => {
      if (boardingMarkers[0] != null) {
        boardingMarkers[0].setMap(null);
        boardingMarkers = [];
      }
      await createMarker(null, null, boardingGateNum);
      return boardingMarkers[0];
    },
    allMarkerDelete: async () => {
      await allMarkerDelete();
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
        if (boardingGateNum != null) {
          boardingMarkers[0].setMap(map);
        }
      } catch (error) {
        Logger.error("showMarker 실패 : ", error);
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
      replaceBoardingMarkerIcon(boardingMarkers[0]);
    },
    getZoomMarker: () => {
      return zoomOutMarkers;
    },
    getBoardingMarker: () => {
      return boardingMarkers;
    },
    elementSetting: () => {
      elementsMarkers = [];
      createElementMarker();
    },
    allElementShow: () => {
      allElementShow();
    },
    allElementhide: () => {
      allElementhide();
    },
  };
})();

export default MarkerService;
