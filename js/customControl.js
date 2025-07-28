"use strict";

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
      getMarker();
      getInfoWindows();
      // 기존 마커들 제거
      boardingMarkers.forEach((e) => {
        e.setMap(null);
      });
      markers.forEach((e) => {
        e.setMap(null);
      });
      zoomMarkers.forEach((e) => {
        e.setMap(null);
      });
      deletecustomControl();

      // 배열 초기화
      boardingMarkers = [];
      markers = [];
      boardingInfoWindows = [];
      infoWindows = [];
      zoomMarkers = [];
      // 재설정
      await MapService.setting();
      await MapService.showMarkers();
      MapService.getZoomEvent();

      customControlAllDelete();
      createCustomControl();
      customControlEvent();
      customControlSetMap();
    } catch (error) {
      console.error("언어변경실패", error);
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
    if (languageText == null) {
      languageText = "language";
    } else {
      languageText = language[selectedLang];
    }

    const locationBtnHtml =
      '<div id="requestLocation" style="height:2rem;display:flex ;align-items: center;justify-content: center;background-color:#fff;border-radius:1rem 1rem 1rem 1rem ;width:2rem;margin-right:10px;margin-bottom:8rem"><img id = "gps-black"src="./images/gps_black.svg" style="height:25px; width:25px;" ><img id ="gps-blue" src="./images/gps_blue.svg" style="height:1.5rem; width:1.5rem;display:none;" ></div>';
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
        '<div id ="boardingInfo-none" style="display:flex;height : 2rem ;width:auto; margin-top:15px;background-color:#fff;transform: translateX(3rem); color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center;padding-left:10px;padding-right:10px" ><img src="./images/send_black.svg" style="height:1.1rem;width:1.1rem">탑승구 : </div>';
      boarding =
        '<div id="moveBoardingGate" style="display: none ;z-index:900;height:2rem; width:2rem;margin-right:10px;margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center"><img src="./images/pen.svg" style="height:20px;width:20px"></div>';
    }
    const selectLang =
      '<div id="selectLang" style="height:2rem; width:10rem; display: flex; justify-content: center; align-items: center;' +
      'background-color:white; margin-top: 15px; margin-left:10px; font-size:0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius: 1.5vh;">' +
      '<div style="flex: 8; height:100%; display: flex; align-items: center; justify-content: left; ' +
      'overflow: hidden; text-overflow: ellipsis;padding-left:5px; white-space: nowrap;">' +
      '<img src="./images/languageIcon.svg" style="height : 1.75vh;margin-right:5px;margin-left:5px">' +
      languageText +
      "</div>" +
      '<img id="icon" src="./images/dropDown.svg" style="flex: 2; height:70%; display: flex; align-items: center; justify-content: center;">' +
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
        language["japenese"] +
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
    console.log("selectedLangArray : ", selectedLangArray);
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
  function getMarker() {
    const markerArray = MapService.getAllMarkers();
    markers = markerArray[0];
    boardingMarkers = markerArray[1];
    zoomMarkers = markerArray[2];
  }
  function getInfoWindows() {
    const infoWindowArray = MapService.getAllInfoWindows();
    infoWindows = infoWindowArray[0];
    boardingInfoWindows = infoWindowArray[1];
  }
  const customControlEvent = () => {
    let mapLangs;

    naver.maps.Event.addDOMListener(boardingInfo.getElement(), "click", () => {
      console.log("modal");
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
          movePosition.lat == currentCenter._lat &&
          movePosition.lng == currentCenter._lng
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
    let conSwitch = null;
    mapLangs = Array.from(
      langchangeCon.getElement().getElementsByClassName("mapLang")
    );
    mapLangs.forEach((mapLang, index) => {
      mapLang.addEventListener("click", async () => {
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
        const areaData = DataService.getAllAreas();

        var transition = {
          duration: 500,
          easing: "linear",
        };
        Array.from(areaData).forEach((area) => {
          if (area.name == "탑승게이트" + boardingGateNum) {
            console.log(area.position);
            movePosition = area.position;
            map.panTo(area.position, transition);
          }
        });
        console.log(boardingGateNum);
        MapService.openBoardingWindowInfo();
      } else {
        ModalService.boardingModalOpen();
      }
    });

    naver.maps.Event.addDOMListener(locaCon.getElement(), "click", () => {
      const userPos = JSON.parse(sessionStorage.getItem("myLocation"));
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
            anchor: new naver.maps.Point(7, 10),
          },
        });
        marker.setMap(map);
      } else {
        alert("위치 정보가 없습니다.");
      }
    });
  };
  const customControlSetMap = () => {
    console.log("moveGateCon", moveGateCon);
    console.log("boardingInfo", boardingInfo);
    setTimeout(() => {
      console.log("locacon : ", locaCon);
      locaCon.setMap(map);
      console.log("setMap2");
      boardingInfo.setMap(map);
      console.log("setMap3");
      selectLangCon.setMap(map);
      console.log("setMap4");
      moveGateCon.setMap(map);
      console.log("setMap5");
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
      console.error(`커스텀 컨트롤 삭제 실패:`, error);
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
      console.log("customControl init");
      map = MapService.getMap();
      boardingGateNum = sessionStorage.getItem("boardingGate");
      language = MapService.languageReturn();
      console.log(language);
      getInfoWindows();
      getMarker();
      createCustomControl();
      customControlEvent();
      customControlSetMap();
    },
    customControlAllDelete: () => {
      customControlAllDelete();
    },
  };
})();
