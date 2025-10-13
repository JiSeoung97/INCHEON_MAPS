import Logger from "../utility/logger.js";
import MapService from "../service/mapService.js";
import MarkerService from "../service/markerService.js";
import InfoWindowService from "./infoWindow.js";
import ModalService from "../service/modalService.js";
import Utility from "../utility/utility.js";

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
  let moveGateCon;
  let boardingInfo;
  let selectLangCon;
  let langArray = ["en", "zh", "ja", "ko"];
  let langchangeCon;
  let map;
  let movePosition = null;
  let conSwitch = null;
  let customEventOn = false;
  let firstLoad = true;
  const positions = [
    naver.maps.Position.TOP_LEFT,
    naver.maps.Position.LEFT_TOP,
    naver.maps.Position.RIGHT_TOP,
    naver.maps.Position.TOP_RIGHT,
    naver.maps.Position.RIGHT_CENTER,
  ];
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
      await MarkerService.showMarkers();
      MarkerService.getZoomEvent();
      MarkerService.elementSetting();
      await ModalService.langChange();
      customControlAllDelete();
      createCustomControl();
      customControlEvent();
      customControlSetMap();
      if (map.getZoom() >= 18) {
        MarkerService.allElementShow();
      }
    } catch (error) {
      Logger.error("언어변경실패", error);
    }
  };

  const createCustomControl = () => {
    const selectedLang = sessionStorage.getItem("language");
    language = MapService.languageReturn();
    languageText = language[selectedLang];
    if (languageText == null) {
      languageText = "language";
    } else {
      languageText = language[selectedLang];
    }
    let marginBottom;
    if (selectedLang == "ko") {
      marginBottom = 12.5;
    } else {
      marginBottom = 17;
    }

    let boarding;
    let moveGateBtn;

    if (boardingGateNum != null) {
      moveGateBtn = `<div id ="boardingInfo" style="display:flex ; height : 2rem;width:auto ; box-shadow: 0 2px 8px rgba(0,0,0,0.15); margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center;padding-left:10px;padding-right:10px" >
        <img id="send-black" src="./images/send_black.svg" style="height:20px;width:20px"> 
        <img id="send-blue" src="./images/send_blue.svg" style="display:none ;height:20px;width:20px"> 
        ${language["boardingGate"]}
         : ${boardingGateNum}
        </div>`;
      boarding =
        '<div id="moveBoardingGate" style="display: flex ; box-shadow: 0 2px 8px rgba(0,0,0,0.15);z-index:900;height:2rem; width:2rem;margin-right:10px;margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center"><img src="./images/boardingIcon.png" style="height:20px;width:20px"></div>';
    } else {
      moveGateBtn = `<div id ="boardingInfo-none" style="display:flex;height : 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15);width:auto; margin-top:15px;background-color:#fff;transform: translateX(3rem); color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center;padding-left:10px;padding-right:10px" ><img src="./images/send_black.svg" style="height:1.1rem;width:1.1rem">
        ${language["boardingGate"]} 
        </div>`;
      boarding =
        '<div id="moveBoardingGate" style="display: none ;box-shadow: 0 2px 8px rgba(0,0,0,0.15);z-index:900;height:2rem; width:2rem;margin-right:10px;margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center"><img src="./images/boardingIcon.png" style="height:20px;width:20px"></div>';
    }
    const selectLang = `<div id="selectLang" style="height:2rem; width:8rem; display: flex; justify-content: center; align-items: center;
      background-color:white; margin-top: 15px; margin-left:10px; font-size:0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius: 1rem;">
      <div style="flex: 8; height:100%; display: flex; align-items: center; justify-content: left;
      overflow: hidden; text-overflow: ellipsis;padding-left:5px; white-space: nowrap;">
      <img src="./images/languageIcon.svg" style="height : 1.75vh;margin-right:5px;margin-left:5px">
      ${languageText} 
      </div>
      <img id="icon" src="./images/dropDown.svg" style="flex: 2; height:70%; display: flex; align-items: center; justify-content: center;margin-right:5px">
      </div>`;
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
    selectedLangArray = [
      selectedLang,
      ...langArray.filter((lang) => lang !== selectedLang),
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

    const languageChange = `<div style = "height: 8rem ;width :10rem; background-color:white; margin-top :1vh;margin-left:10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius : 4px;font-size:0.6rem"> 
      ${langChan}
      </div>`;

    moveGateCon = new naver.maps.CustomControl(moveGateBtn, {
      position: naver.maps.Position.TOP_RIGHT,
    });
    boardingInfo = new naver.maps.CustomControl(boarding, {
      position: naver.maps.Position.RIGHT_TOP,
    });
    selectLangCon = new naver.maps.CustomControl(selectLang, {
      position: naver.maps.Position.LEFT_TOP,
    });
    langchangeCon = new naver.maps.CustomControl(languageChange, {
      position: naver.maps.Position.LEFT_TOP,
    });
  };
  const customControlEvent = async () => {
    if (customEventOn) {
      return;
    }

    customEventOn = true;
    let mapLangs;

    naver.maps.Event.addDOMListener(boardingInfo.getElement(), "click", () => {
      ModalService.boardingModalOpen();
    });
    naver.maps.Event.addListener(map, "center_changed", () => {
      const currentCenter = map.getCenter();
      const sendBlack = document.getElementById("send-black");
      const sendBlue = document.getElementById("send-blue");
      const gpsBlack = document.getElementById("gps-black");
      const gpsBlue = document.getElementById("gps-blue");
      const user_location = JSON.parse(sessionStorage.getItem("myLocation"));
      if (user_location != null) {
        const userLat = Math.round(user_location.lat * 10000000) / 10000000;
        const userLng = Math.round(user_location.lng * 10000000) / 10000000;
        if (movePosition != null) {
          if (
            movePosition._lat == currentCenter._lat &&
            movePosition._lng == currentCenter._lng
          ) {
            sendBlack.style.display = "none";
            sendBlue.style.display = "block";
          } else {
            sendBlack.style.display = "block";
            sendBlue.style.display = "none";
          }
        }
        if (currentCenter._lat == userLat && currentCenter._lng == userLng) {
          gpsBlack.style.display = "none";
          gpsBlue.style.display = "block";
        } else {
          gpsBlack.style.display = "block";
          gpsBlue.style.display = "none";
        }
      }
    });
    naver.maps.Event.addDOMListener(selectLangCon.getElement(), "click", () => {
      if (conSwitch) {
        conSwitch = null;
        langchangeCon.setMap(conSwitch);
        const icon = selectLangCon.getElement().querySelector("#icon");
        icon.src = "./images/dropDown.svg";
      } else {
        conSwitch = map;
        langchangeCon.setMap(conSwitch);
        const icon = selectLangCon.getElement().querySelector("#icon");
        icon.src = "./images/up.svg";
      }
    });

    mapLangs = Array.from(
      langchangeCon.getElement().getElementsByClassName("mapLang")
    );
    mapLangs.forEach((mapLang, index) => {
      mapLang.addEventListener("click", async () => {
        InfoWindowService.allInfoClose();
        await changeLanguage(selectedLangArray[index]);
      });
    });
    mapLangs.forEach((mapLang) => {
      mapLang.addEventListener("mouseenter", () => {
        mapLang.style.backgroundColor = "#F3F4F6";
      });
      mapLang.addEventListener("mouseleave", () => {
        mapLang.style.backgroundColor = "white";
      });
    });

    naver.maps.Event.addDOMListener(moveGateCon.getElement(), "click", () => {
      if (boardingGateNum != null) {
        movePosition = Utility.moveGate(0, 1);
        Utility.openBoardingWindowInfo();
      } else {
        ModalService.boardingModalOpen("boardingInfo");
      }
    });
  };
  const customControlSetMap = () => {
    setTimeout(() => {
      boardingInfo.setMap(map);
      selectLangCon.setMap(map);
      moveGateCon.setMap(map);
      if (firstLoad) {
        langchangeCon.setMap(map);
        firstLoad = false;
      }
    }, 50);
  };
  const customControlAllDelete = () => {
    try {
      const logoControl = map.controls[naver.maps.Position.TOP_RIGHT].getAt(0);

      if (moveGateCon) {
        naver.maps.Event.clearInstanceListeners(moveGateCon);
      }
      if (boardingInfo) {
        naver.maps.Event.clearInstanceListeners(boardingInfo);
      }
      if (selectLangCon) {
        naver.maps.Event.clearInstanceListeners(selectLangCon);
      }
      if (langchangeCon) {
        naver.maps.Event.clearInstanceListeners(langchangeCon);
      }
      positions.forEach((position) => {
        map.controls[position].clear();
      });
      customEventOn = false;
      map.controls[naver.maps.Position.TOP_RIGHT].push(logoControl);
    } catch (error) {
      Logger.error(`커스텀 컨트롤 삭제 실패:`, error);
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
      createCustomControl();
      customControlSetMap();
      customControlEvent();
    },
    customControlAllDelete: () => {
      customControlAllDelete();
    },
    mapLangClose: () => {
      conSwitch = null;
      langchangeCon.setMap(conSwitch);
    },
  };
})();

export default CustomControl;
