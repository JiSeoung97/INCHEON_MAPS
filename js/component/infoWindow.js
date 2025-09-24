import MapService from "../service/mapService.js";
import Logger from "../utility/logger.js";
import Utility from "../utility/utility.js";
import MarkerService from "../service/markerService.js";
const InfoWindowService = (() => {
  let infoWindows = [];
  let elementInfos = [];
  let boardingInfo = null;
  let language;
  let bInfoOn = false;
  const createInfoWindow = async (area, boardingGateNum) => {
    let infoWindow;
    if (boardingGateNum == null) {
      infoWindow = new naver.maps.InfoWindow({
        content: await getInfoWindowContent(area, boardingGateNum),
        maxWidth: 300,
        backgroundColor: "#fff",
        borderColor: Utility.congestionColor(area),
        disableAutopan: true,
        borderWidth: 3,
        borderRadius: 12,
        disableAnchor: false,
      });
      infoWindows.push(infoWindow);
    } else {
      infoWindow = new naver.maps.InfoWindow({
        content: await getInfoWindowContent(area, boardingGateNum),
        maxWidth: 300,
        backgroundColor: "#fff",
        borderColor: Utility.congestionColor(area),
        disableAutopan: true,
        borderWidth: 0,
        borderRadius: 12,
        disableAnchor: false,
      });
      boardingInfo = infoWindow;
    }

    return infoWindow;
  };
  const getInfoWindowContent = async (areaData, boardingGateNum) => {
    let gaugeColor;
    let distance = await Utility.getDistance(areaData);
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
    const translatedName = Utility.translateAreaName(areaData.name, language);
    if (boardingGateNum == null) {
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
        areaData.capacity +
        language["minute"] +
        "</p>" +
        '<p style = "color:#21212280">' +
        language["distance"] +
        ": " +
        distance +
        "</p>" +
        "</div>"
      );
    } else {
      let distance = await Utility.getDistance(areaData, boardingGateNum);
      return (
        '<div class="info-window shadow">' +
        "<h3>" +
        language["nthGate"].replace("{{number}}", boardingGateNum) +
        "</h3>" +
        '<p style = "color:#21212280">' +
        language["distance"] +
        ": " +
        distance +
        "</p>" +
        "</div>"
      );
    }
  };
  const getElementContent = (area) => {
    try {
      let name = area.id.split("_")[0];
      let number = area.id.split("_")[1];
      let category = area.name.split(" ")[1];
      let transname = language[name];
      let location = language[name + "location_" + number];
      const contents = `
      <div class="info-window shadow">
        <h3>${transname}</h3>
        <p>${location}</p>
        <p style="display:flex;align-items:end;justify-content:end;font-size:12px;color: #2E90FA">
          <span class="moreInfo" data-category="${category}">
            ${language["more"]} >
          </span>
        </p>
      </div>`;

      return contents;
    } catch (error) {
      Logger.error("info 만드는중 에러발생", error);
    }
  };
  const elementInfo = (area) => {
    let infoWindow;
    infoWindow = new naver.maps.InfoWindow({
      content: getElementContent(area),
      maxWidth: 300,
      backgroundColor: "#fff",
      disableAutopan: true,
      borderWidth: 0,
      borderRadius: 12,
      disableAnchor: false,
    });
    elementInfos.push(infoWindow);
    return infoWindow;
  };
  return {
    createInfoWindow: async (area, boardingGate = null) => {
      language = MapService.languageReturn();
      if (boardingGate != null) {
      }
      return await createInfoWindow(area, boardingGate);
    },
    getInfoWindows: () => {
      return infoWindows;
    },
    getElementInfo: (area) => {
      language = MapService.languageReturn();
      return elementInfo(area);
    },
    getElementInfos: () => {
      return elementInfos;
    },
    allInfoClose: () => {
      infoWindows.forEach((info) => {
        info.close();
      });
      elementInfos.forEach((info) => {
        info.close();
      });
      if (boardingInfo != null) {
        boardingInfo.close();
      }
    },
    resetInfo: () => {
      infoWindows = [];
    },
    getBoardingInfo: () => {
      return boardingInfo;
    },
    boardingInfoOpen: () => {
      let markers = MarkerService.getBoardingMarker();
      let map = MapService.getMap();
      if (!bInfoOn) {
        boardingInfo.open(map, markers[0]);
        bInfoOn = true;
      } else {
        boardingInfo.close();
        bInfoOn = false;
      }
    },
    resetBoardingInfo: () => {
      boardingInfo = null;
    },
    getBInfoOn: () => {
      return bInfoOn;
    },
  };
})();
export default InfoWindowService;
