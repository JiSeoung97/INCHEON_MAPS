import MapService from "../service/mapService.js";
import Utility from "../utility/utility.js";
const InfoWindowService = (() => {
  let infoWindows = [];
  let language;
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
    }
    infoWindows.push(infoWindow);
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
        conLevel +
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
    let name = language[area.name];
    let location = language[area.description];
    const contents =
      '<div class="info-window shadow">' +
      "<h3>" +
      name +
      "</h3>" +
      "<p>" +
      location +
      "</p>";
    '<span style="left:auto;font-size:12px;color:#2E90FA">' +
      language["more"] +
      "></span>";
    ("</div>");
  };
  const elementInfo = async () => {
    let infoWindow;
    infoWindow = new naver.maps.InfoWindow({
      content: await getElementContent(area),
      maxWidth: 300,
      backgroundColor: "#fff",
      borderColor: Utility.congestionColor(area),
      disableAutopan: true,
      borderWidth: 0,
      borderRadius: 12,
      disableAnchor: false,
    });
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
  };
})();
export default InfoWindowService;
