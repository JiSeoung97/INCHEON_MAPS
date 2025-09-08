import Logger from "../utility/logger.js";
import MapService from "./mapService.js";
import utLocation from "../utility/location.js";
import DataService from "./dataService.js";
import MarkerService from "./markerService.js";
const PolylineService = (() => {
  let polylines = [];
  let map;
  let boardingMarker;
  let boardingPolyline = null;
  let markerPolylines = [];
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
  const createBoardingPolyline = async (marker, position, index) => {
    if (index == null) {
      const userLocation = utLocation.getCurrentPosition();
      const latLng = new naver.maps.LatLng(
        userLocation["lat"],
        userLocation["lng"]
      );
      boardingPolyline = new naver.maps.Polyline({
        map: null,
        path: [latLng, marker.position],
        clickable: false,
        strokeColor: "#2E90FA",
        strokeOpacity: 1,
        strokeWeight: 1,
        strokeLineCap: "butt",
        strokeStyle: "longdash",
      });
    } else {
      let markerPolyline = new naver.maps.Polyline({
        map: null,
        path: [position, marker.position],
        clickable: false,
        strokeColor: "#2E90FA",
        strokeOpacity: 1,
        strokeWeight: 1,
        strokeLineCap: "butt",
        strokeStyle: "longdash",
      });
      markerPolylines.push(markerPolyline);
    }
  };

  const updatePolyline = async (position, boardingGateNum) => {
    const markers = MarkerService.getMarkers();
    let areas = DataService.getAllAreas();
    if (boardingGateNum != null) {
      const area = areas.find(
        (area) => area.name === "탑승게이트" + boardingGateNum
      );
      boardingPolyline.setPath([area.position, position]);
    } else {
      let xy = { x: boardingMarker.position.x, y: boardingMarker.position.y };
      boardingPolyline.setPath([xy, position]);
    }
    markerPolylines.forEach((polyline, index) => {
      polyline.setPath([position, markers[index].position]);
    });
  };
  const selectPolyline = (index) => {
    if (markerPolylines[index].getMap() == null) {
      markerPolylines.forEach((polyline) => {
        polyline.setMap(null);
      });
      console.log(index);
      markerPolylines[index].setMap(map);
    } else {
      markerPolylines[index].setMap(null);
    }
  };
  const setPolyline = () => {
    boardingPolyline.setMap(map);
  };

  const deletePolyLine = async () => {
    try {
      polylines.forEach((polyline) => {
        polyline.setMap(null);
      });
      markerPolylines.forEach((polyline) => {
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
    },
    createPolyline: (markers) => {
      if (polylines.length == 0) {
        createPolyline(markers);
      }
    },
    createUserPolyline: async () => {
      if (markerPolylines.length == 0) {
        const userLocation = await utLocation.getCurrentPosition();
        let markers = MarkerService.getMarkers();
        markers.forEach(async (marker, index) => {
          await createBoardingPolyline(marker, userLocation, index);
        });
      }
    },
    selectPolyline: (index) => {
      selectPolyline(index);
    },
    deletePolyLine: () => {
      deletePolyLine();
    },
    viewPolyLine: () => {
      viewPolyLine();
    },
    createBoardingPolyline: async (boardingMarker, index = null) => {
      const userLocation = await utLocation.getCurrentPosition();
      if (boardingPolyline != null) {
        boardingPolyline.setMap(null);
        boardingPolyline = null;
      }
      await createBoardingPolyline(boardingMarker, userLocation, index);
    },
    updatePolyline: async (position, boardingGateNum = null) => {
      await updatePolyline(position, boardingGateNum);
    },
    setPolyline: () => {
      setPolyline();
    },
    getBoardingPolyline: () => {
      return boardingPolyline;
    },
    hideUserPoly: () => {
      markerPolylines.forEach((polyline) => {
        polyline.setMap(null);
      });
    },
  };
})();

export default PolylineService;
