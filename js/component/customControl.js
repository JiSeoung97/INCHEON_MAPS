import Logger from "../utility/logger.js";
import MapService from "../service/mapService.js";
import MarkerService from "../service/markerService.js";
import InfoWindowService from "./infoWindow.js";
import ModalService from "../service/modalService.js";
import Utility from "../utility/utility.js";
import RecoService from "../service/recoService.js";

const CustomControl = (() => {
  let language = [];
  let markers = [];
  let boardingMarkers = [];
  let zoomMarkers = [];
  let boardingInfoWindows = [];
  let infoWindows = [];
  let boardingGateNum;
  let languageText = null;
  let selectedLangArray = [];
  let firstlang;
  let boardingInfo;
  let langArray = ["en", "zh", "ja", "ko"];
  let langchange;
  let map;
  let movePosition = null;
  let selectLang;
  let customEventOn = false;
  let boardingModalOpen = null;

  const changeLanguage = async (newLang) => {
    try {
      sessionStorage.setItem("language", newLang);
      markers = MarkerService.getMarkers();
      infoWindows = InfoWindowService.getInfoWindows();
      // 기존 마커들 제거
      markers.forEach((e) => {
        e.setMap(null);
      });
      zoomMarkers = MarkerService.getZoomMarker();
      zoomMarkers.forEach((e) => {
        e.setMap(null);
      });
      // 배열 초기화
      boardingMarkers = [];
      markers = [];
      boardingInfoWindows = [];
      infoWindows = [];
      zoomMarkers = [];
      InfoWindowService.resetInfo();
      // 재설정
      await MapService.setting();
      await customControlInput();
      await mapLangEvent();
      await MarkerService.showMarkers();
      MarkerService.getZoomEvent();
      MarkerService.elementSetting();
      await ModalService.langChange();
      RecoService.recoLikeIconView();
      if (map.getZoom() >= 18) {
        MarkerService.allElementShow();
      }
    } catch (error) {
      Logger.error("언어변경실패", error);
    }
  };

  const customControlInput = () => {
    const selectedLang = sessionStorage.getItem("language");
    boardingGateNum = sessionStorage.getItem("boardingGate");
    boardingModalOpen = document.getElementById("boardingModalOpen");
    language = MapService.languageReturn();
    languageText = language[selectedLang];
    if (languageText == null) {
      languageText = "language";
    } else {
      languageText = language[selectedLang];
    }
    if (boardingGateNum != null) {
      boardingInfo = document.getElementById("boardingInfo");
      boardingInfo.innerHTML = `<img id="send" src="./images/send_black.svg" style="height:20px;width:20px"> 
          ${language["boardingGate"]}
           : ${boardingGateNum}`;
      boardingModalOpen.style.setProperty("display", "flex");
    } else {
      boardingInfo = document.getElementById("boardingInfo");
      boardingInfo.innerHTML = `<img id="send" src="./images/send_black.svg" style="height:20px;width:20px"> 
          ${language["boardingGate"]}`;
    }

    selectLang = document.getElementById("selectLang");
    selectLang.innerHTML = `<div style="flex: 8; height:100%; display: flex; align-items: center; justify-content: left;
      overflow: hidden; text-overflow: ellipsis;padding-left:5px; white-space: nowrap;">
      <img src="./images/languageIcon.svg" style="height : 1.75vh;margin-right:5px;margin-left:5px">
      ${languageText} 
      </div>
      <img id="icon" src="./images/dropDown.svg" style="flex: 2; height:70%; display: flex; align-items: center; justify-content: center;margin-right:5px">`;

    let languageList = {
      ko: `<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">한국어(
        ${language["korean"]}
        )</div>`,
      en: `<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">English(
        ${language["english"]}
        )</div>`,
      ja: `<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">日本語(
        ${language["japanese"]}
        )</div>`,
      zh: `<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">中文(
        ${language["chinese"]}
        )</div>`,
    };

    // 성능 최적화: 배열 처리 단순화
    firstlang = selectedLang;
    Logger.log("firstLang", firstlang);
    Logger.log("selectedLangArray", selectedLangArray);
    let langage;
    if (selectedLang == null) {
      langage = "ko";
    } else {
      langage = selectedLang;
    }
    selectedLangArray = [
      langage,
      ...langArray.filter((lang) => lang !== langage),
    ];

    const langImgArray = createLanguageArrayWithSelectiveImg(
      languageList,
      firstlang
    );

    // 성능 최적화: 이중 반복문 단순화
    const langChan = selectedLangArray
      .map(
        (lang) => langImgArray.find((langImg) => langImg[0] === lang)?.[1] || ""
      )
      .join("");
    langchange = document.getElementById("languageChange");
    langchange.innerHTML = langChan;
    mapLangEvent();
  };

  const customControlEvent = () => {
    if (customEventOn) {
      return;
    }

    customEventOn = true;
    Logger.log(boardingModalOpen);
    boardingInfo.addEventListener("click", () => {
      if (boardingGateNum == null) {
        ModalService.boardingModalOpen();
      } else {
        movePosition = Utility.moveGate(0, 1);
        Utility.openBoardingWindowInfo();
      }
    });

    boardingModalOpen.addEventListener("click", () => {
      ModalService.boardingModalOpen();
    });

    selectLang.addEventListener("click", () => {
      if (langchange.style.display == "none") {
        langchange.style.setProperty("display", "flex");
      } else if (langchange.style.display == "flex") {
        langchange.style.setProperty("display", "none");
      }
    });
    mapLangEvent();

    naver.maps.Event.addListener(map, "center_changed", () => {
      const currentCenter = map.getCenter();
      const send = document.getElementById("send");
      const gps = document.getElementById("gps");
      const user_location = JSON.parse(sessionStorage.getItem("myLocation"));
      if (user_location != null) {
        const userLat = Math.round(user_location.lat * 10000000) / 10000000;
        const userLng = Math.round(user_location.lng * 10000000) / 10000000;
        if (movePosition != null) {
          if (
            movePosition._lat == currentCenter._lat &&
            movePosition._lng == currentCenter._lng
          ) {
            send.src = "/images/send_blue.svg";
          } else {
            send.src = "/images/send_black.svg";
          }
        }
        if (currentCenter._lat == userLat && currentCenter._lng == userLng) {
          gps.src = "/images/gps_blue.svg";
        } else {
          gps.src = "/images/gps_black.svg";
        }
      }
    });
  };

  const mapLangEvent = () => {
    const mapLangs = document.getElementsByClassName("mapLang");
    for (let i = 0; i < 4; i++) {
      mapLangs[i].addEventListener("click", async () => {
        InfoWindowService.allInfoClose();
        await changeLanguage(selectedLangArray[i]);
        langchange.style.setProperty("display", "none");
      });

      mapLangs[i].addEventListener("mouseenter", () => {
        mapLangs[i].style.backgroundColor = "#F3F4F6";
      });
      mapLangs[i].addEventListener("mouseleave", () => {
        mapLangs[i].style.backgroundColor = "white";
      });
    }
  };

  const createLanguageArrayWithSelectiveImg = (
    languageList,
    currentLang,
    imgSrc = "./images/check.svg"
  ) => {
    return Object.entries(languageList).map(([key, html]) => {
      const baseHtml = html.replace(
        'style="width : 100% ; height:3vh; display: flex; align-items: center"',
        'style="width : 100% ; height:3vh; display: flex; align-items: center; justify-content: space-between; padding: 0 10px;"'
      );
      if (key === currentLang) {
        // 현재 선택된 언어에만 img 추가\
        return [
          key,
          baseHtml.replace(
            "</div>",
            `<img src="${imgSrc}" style="width:15px; height:15px;margin-left:auto;margin-right:10px"></div>`
          ),
        ];
      } else {
        // 다른 언어들은 원본 그대로 반환
        return [
          key,
          baseHtml.replace(
            "</div>",
            `<span style="width:15px; height:15px;"></span></div>`
          ),
        ];
      }
    });
  };

  return {
    init: async () => {
      Logger.log("customControl init");
      map = MapService.getMap();
      boardingGateNum = sessionStorage.getItem("boardingGate");
      language = MapService.languageReturn();
      Logger.log("language : ", language);
      InfoWindowService.getInfoWindows();
      MarkerService.getMarkers();
      await createCustomControl();
      await customControlSetMap();
      await customControlEvent();
    },
    customControlAllDelete: () => {
      customControlAllDelete();
    },
    mapLangClose: () => {
      langchange.style.setProperty("display", "none");
    },
    customControlInput: async () => {
      map = MapService.getMap();
      await customControlInput();
      await customControlEvent();
    },
  };
})();

export default CustomControl;
