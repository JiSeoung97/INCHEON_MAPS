import Logger from "../utility/logger.js";
import MapService from "./mapService.js";
import utLocation from "../utility/location.js";
import DataService from "./dataService.js";
const PolylineService = (() => {
  let polylines = [];
  let map;
  let boardingMarker;
  let boardingPolyline = null;
  const createPolyline = (markers) => {
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
  const createBoardingPolyline = async (marker) => {
    const userLocation = await utLocation.getCurrentPosition();
    boardingMarker = marker;
    boardingPolyline = new naver.maps.Polyline({
      map: null,
      path: [userLocation, marker.position],
      clickable: false,
      strokeColor: "#2E90FA",
      strokeOpacity: 1,
      strokeWeight: 1,
      strokeLineCap: "butt",
      strokeStyle: "longdash",
    });
  };

  const updatePolyline = async (boardingGateNum) => {
    const userLocation = await utLocation.getCurrentPosition();
    let areas = DataService.getAllAreas();
    if (boardingGateNum != null) {
      const area = areas.find(
        (area) => area.name === "탑승게이트" + boardingGateNum
      );
      boardingPolyline.setPath([area.position, userLocation]);
    } else {
      let xy = { x: boardingMarker.position.x, y: boardingMarker.position.y };
      boardingPolyline.setPath([xy, userLocation]);
    }
  };

  const setPolyline = () => {
    console.log("set Polyline", boardingPolyline);
    console.log("map????? : ", map);
    boardingPolyline.setMap(map);
  };

  const deletePolyLine = async () => {
    try {
      polylines.forEach((polyline) => {
        polyline.setMap(null);
      });
    } catch (error) {
      Logger.error("polyline setMap(null)실패 : ", error);
    }
  };
  const viewPolyLine = async () => {
    try {
      polylines.forEach((polyline) => {
        polyline.setMap(map);
      });
    } catch (error) {
      Logger.error("polyline setMap(map)실패 : ", error);
    }
  };
  return {
    init: () => {
      map = MapService.getMap();
      console.log("map 가져왔음 polyline : ", map);
    },
    createPolyline: (markers) => {
      if (polylines.length == 0) {
        createPolyline(markers);
      }
    },
    deletePolyLine: () => {
      deletePolyLine();
    },
    viewPolyLine: () => {
      viewPolyLine();
    },
    createBoardingPolyline: async (boardingMarker) => {
      if (boardingPolyline != null) {
        boardingPolyline.setMap(null);
        boardingPolyline = null;
      }
      await createBoardingPolyline(boardingMarker);
    },
    updatePolyline: async (boardingGateNum = null) => {
      await updatePolyline(boardingGateNum);
    },
    setPolyline: () => {
      setPolyline();
    },
    getBoardingPolyline: () => {
      return boardingPolyline;
    },
  };
})();

export default PolylineService;
