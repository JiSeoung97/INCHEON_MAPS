"use strict";

const InfoWindowService = (() => {
  let infoWindows = [];
  let language;
  const createInfoWindow = (area, boardingGateNum) => {
    const infoWindow = new naver.maps.InfoWindow({
      content: getInfoWindowContent(area, boardingGateNum),
      maxWidth: 300,
      backgroundColor: "#fff",
      borderColor: Utility.congestionColor(area),
      disableAutopan: true,
      borderWidth: 3,
      borderRadius: 12,
      disableAnchor: false,
    });
    infoWindows.push(infoWindow);
    return infoWindow;
  };
  const getInfoWindowContent = (areaData, boardingGateNum) => {
    let gaugeColor;
    let distance = Utility.getDistance(areaData);
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
      console.log(
        "areaData : ",
        areaData,
        "----------------------------------------------"
      );
      let distance = Utility.getDistance(areaData, boardingGateNum);
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
    }
  };

  return {
    createInfoWindow: (area, boardingGate) => {
      language = MapService.languageReturn();
      return createInfoWindow(area, boardingGate);
    },
    getInfoWindows: () => {
      return infoWindows;
    },
  };
})();
