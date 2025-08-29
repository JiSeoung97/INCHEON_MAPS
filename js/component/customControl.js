import Logger from "../utility/logger.js";
import MapService from "../service/mapService.js";
import MarkerService from "../service/markerService.js";
import InfoWindowService from "./infoWindow.js";
import ModalService from "../service/modalService.js";
import Utility from "../utility/utility.js";
import utLocation from "../utility/location.js";
import PolylineService from "../service/polylineService.js";

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
  let locaCon;
  let moveGateCon;
  let boardingInfo;
  let selectLangCon;
  let langArray = ["en", "zh", "ja", "ko"];
  let langchangeCon;
  let map;
  let movePosition = null;
  let userMarker = [];
  let conSwitch = null;
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
    } catch (error) {
      Logger.error("언어변경실패", error);
    }
  };
  const deletecustomControl = () => {
    const logoControl = map.controls[naver.maps.Position.TOP_RIGHT].getAt(0);
    positions.forEach((position) => {
      map.controls[position].clear();
    });
    map.controls[naver.maps.Position.TOP_RIGHT].push(logoControl);
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
    if(selectedLang =='ko'){
      marginBottom= 12.5
    }else{
      marginBottom=14.5
    }
    const locationBtnHtml =
      '<div id="requestLocation" style="height:2rem;display:flex ;align-items: center;justify-content: center;background-color:#fff;border-radius:1rem 1rem 1rem 1rem ;width:2rem;margin-right:10px;margin-bottom:'+marginBottom+'rem"><img id = "gps-black"src="./images/gps_black.svg" style="height:25px; width:25px;" ><img id ="gps-blue" src="./images/gps_blue.svg" style="height:1.5rem; width:1.5rem;display:none;" ></div>';

    let boarding;
    let moveGateBtn;

    if (boardingGateNum != null) {
      moveGateBtn =
        '<div id ="boardingInfo" style="display:flex ; height : 2rem;width:auto ; margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center;padding-left:10px;padding-right:10px" >' +
        '<img id="send-black" src="./images/send_black.svg" style="height:20px;width:20px">' +
        '<img id="send-blue" src="./images/send_blue.svg" style="display:none ;height:20px;width:20px">' +
        language["boardingGate"] +
        " : " +
        boardingGateNum +
        "</div>";
      boarding =
        '<div id="moveBoardingGate" style="display: flex ;z-index:900;height:2rem; width:2rem;margin-right:10px;margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center"><img src="./images/pen.svg" style="height:20px;width:20px"></div>';
    } else {
      moveGateBtn =
        '<div id ="boardingInfo-none" style="display:flex;height : 2rem ;width:auto; margin-top:15px;background-color:#fff;transform: translateX(3rem); color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center;padding-left:10px;padding-right:10px" ><img src="./images/send_black.svg" style="height:1.1rem;width:1.1rem">' +
        language["boardingGate"] +
        " : </div>";
      boarding =
        '<div id="moveBoardingGate" style="display: none ;z-index:900;height:2rem; width:2rem;margin-right:10px;margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center"><img src="./images/pen.svg" style="height:20px;width:20px"></div>';
    }
    const selectLang =
      '<div id="selectLang" style="height:2rem; width:8rem; display: flex; justify-content: center; align-items: center;' +
      'background-color:white; margin-top: 15px; margin-left:10px; font-size:0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius: 1rem;">' +
      '<div style="flex: 8; height:100%; display: flex; align-items: center; justify-content: left; ' +
      'overflow: hidden; text-overflow: ellipsis;padding-left:5px; white-space: nowrap;">' +
      '<img src="./images/languageIcon.svg" style="height : 1.75vh;margin-right:5px;margin-left:5px">' +
      languageText +
      "</div>" +
      '<img id="icon" src="./images/dropDown.svg" style="flex: 2; height:70%; display: flex; align-items: center; justify-content: center;margin-right:5px">' +
      "</div>";
    let languageList = {
      ko:
        '<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">한국어(' +
        language["korean"] +
        ")</div>",
      en:
        '<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">English(' +
        language["english"] +
        ")</div>",
      ja:
        '<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">日本語(' +
        language["japanese"] +
        ")</div>",
      zh:
        '<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">简体中文(' +
        language["chinese"] +
        ")</div>",
    };

    selectedLangArray = [];
    langArray.forEach((lang) => {
      if (lang == selectedLang) {
        selectedLangArray.push(selectedLang);
        firstlang = lang;
      }
    });
    langArray.forEach((lang) => {
      if (lang != selectedLang) {
        selectedLangArray.push(lang);
      }
    });
    const langImgArray = createLanguageArrayWithSelectiveImg(
      languageList,
      firstlang
    );

    let langChan = "";
    selectedLangArray.forEach((lang) => {
      langImgArray.forEach((langImg) => {
        if (langImg[0] == lang) {
          langChan += langImg[1];
        }
      });
    });
    const languageChange =
      '<div style = "height: 8rem ;width :10rem; background-color:white; margin-top :1vh;margin-left:10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius : 4px;font-size:0.6rem">' +
      langChan +
      "</div>";
    locaCon = new naver.maps.CustomControl(locationBtnHtml, {
      position: naver.maps.Position.RIGHT_CENTER,
    });
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
      if (user_location != null) {
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
        movePosition = MapService.moveBoardingGate(boardingGateNum);
        Logger.log(boardingGateNum);
        Utility.openBoardingWindowInfo();
      } else {
        ModalService.boardingModalOpen();
      }
    });

    naver.maps.Event.addDOMListener(locaCon.getElement(), "click", async () => {
      try {
        const userPos = await utLocation.getCurrentPosition();

        const latLng = new naver.maps.LatLng(userPos["lat"], userPos["lng"]);
        if (userPos) {
          map.getCenter();
          map.setCenter(latLng);
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(latLng),
            map: null,
            title: "내 위치",
            icon: {
              content:
                '<img src="./images/user_Location.png" style="width:30px;height:30px">',
              size: new naver.maps.Size(27, 35),
              anchor: new naver.maps.Point(7, 14),
            },
          });
          if (userMarker[0] != null) {
            userMarker.forEach((uMarker) => {
              uMarker.setMap(null);
            });
          }
          marker.setMap(map);
          userMarker.push(marker);
          const boardingPolyline = PolylineService.getBoardingPolyline();
          Logger.log("boardingPolyline : ", boardingPolyline);
          if (boardingPolyline != null) {
            PolylineService.updatePolyline();
          }
        } else {
          alert("위치 정보가 없습니다.");
        }
      } catch (error) {
        alert("위치 정보를 가져오는데 실패했습니다. 위치 권한을 허용해주세요.");
        Logger.log("위치 권한 오류: " + error.message, "error");
      }
    });
  };
  const customControlSetMap = () => {
    setTimeout(() => {
      locaCon.setMap(map);
      boardingInfo.setMap(map);
      selectLangCon.setMap(map);
      moveGateCon.setMap(map);
    }, 50);
  };
  const customControlAllDelete = () => {
    try {
      const logoControl = map.controls[naver.maps.Position.TOP_RIGHT].getAt(0);
      positions.forEach((position) => {
        map.controls[position].clear();
      });

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
            `<img src="${imgSrc}" style="width:15px; height:15px;margin-left:auto"></div>`
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
      await customControlEvent();
      customControlSetMap();
    },
    customControlAllDelete: () => {
      customControlAllDelete();
    },
    mapLangClose:()=>{
      conSwitch = null;
      langchangeCon.setMap(conSwitch);
    }
  };
})();

export default CustomControl;
