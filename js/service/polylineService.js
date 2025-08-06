"use strict";

const PolylineService = (() => {
  let polylines = [];
  let map;
  let boardingMarker;
  let boardingPolyline = null;
  const createPolyline = (markers) => {
    console.log("createPolyline");
    console.log("markers : ", markers);
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
    const userLocation = await MapService.getCurrentPosition();
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
    console.log("boardingPolyline : ", boardingPolyline);
  };

  const updatePolyline = async () => {
    const userLocation = await MapService.getCurrentPosition();
    boardingPolyline.setPath(boardingMarker, userLocation);
  };

  const setPolyline = () => {
    console.log(boardingPolyline);
    boardingPolyline.setMap(map);
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
      polylines.forEach((polyline) => {
        polyline.setMap(map);
      });
    } catch (error) {
      console.error("polyline setMap(map)실패 : ", error);
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
    updatePolyline: () => {
      updatePolyline();
    },
    setPolyline: () => {
      setPolyline();
    },
    getBoardingPolyline: () => {
      return boardingPolyline;
    },
  };
})();
