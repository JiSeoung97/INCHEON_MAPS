"use strict";

const MapService = (() => {
  let map = null;
  let markers = [];
  let boardingMarkers = [];
  let infoWindows = [];
  let boardingInfoWindows = [];
  let areas = [];
  let countW = null;
  let countE = null;
  let language;
  let hour = null;
  let minute = null;
  let ampm;
  let recoArray = [];
  let boardinGateNum;
  const loadTranslateData = (lang) => {
    return languageData[lang];
  };
  const transName = (name) => {
    let names = name.split(" ");
    console.log(name);
    names[0] = names[0].replace("출국장", "");
    let newName = "gate" + names[0];
    console.log("newName : ", newName);
    let eastWest;
    if (names[1] == "동편") {
      eastWest = "east";
    } else {
      eastWest = "west";
    }
    return language[newName].replace("<br>", "") + " " + language[eastWest];
  };
  const createLanguageArrayWithSelectiveImg = (
    languageList,
    currentLang,
    imgSrc = "./images/up.svg"
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
            `<img src="${imgSrc}" style="width:15px; height:15px;"></div>`
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

  const translateAreaName = (areaName, language) => {
    if (areaName.includes("출국장")) {
      const gateNumber = areaName.match(/(\d+)출국장/)?.[1];
      const direction = areaName.includes("서편")
        ? "west"
        : areaName.includes("동편")
        ? "east"
        : "";

      if (gateNumber && direction) {
        return language[`gate${gateNumber}`] + " " + language[direction];
      } else if (gateNumber) {
        return language[`gate${gateNumber}`];
      }
    }

    if (areaName.includes("탑승게이트")) {
      return areaName;
    }

    return areaName;
  };
  const getBoardingGateIdx = (index) => {
    let idx = 0;
    if (index < 4) {
      idx = index - 1;
    } else if (index > 5 && index < 13) {
      idx = index - 3;
    } else if (index < 44) {
      idx = index - 4;
    } else if (index < 51) {
      idx = index - 5;
    } else if (index < 116 && index > 100) {
      idx = index - 55;
    } else if (index < 120) {
      idx = index - 56;
    } else if (index <= 132) {
      idx = index - 57;
    } else {
      alert("존재하지 않는 탑승구입니다.");
      return;
    }
    return idx;
  };

  const getDistance = (area) => {
    const savedLocation = JSON.parse(sessionStorage.getItem("myLocation"));

    if (savedLocation !== null) {
      const lng1 = area.position.lng;
      const lat1 = area.position.lat;
      const lng2 = savedLocation.lng;
      const lat2 = savedLocation.lat;

      const earthR = 6371000; // 지구 반지름
      const degToRad = (deg) => deg * (Math.PI / 180);

      const dLat = degToRad(lat2 - lat1);
      const dlng = degToRad(lng2 - lng1);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(degToRad(lat1)) *
          Math.cos(degToRad(lat2)) *
          Math.sin(dlng / 2) ** 2;

      return (
        Math.round(
          earthR * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        ).toLocaleString() + "M"
      );
    }
    return "위치권한이 필요합니다!";
  };
  const getBoardingDistance = (area) => {
    const areas = DataService.getAllAreas();
    let gatePosition;
    areas.forEach((bArea) => {
      if (bArea.name == "탑승게이트" + boardinGateNum) {
        gatePosition = bArea.position;
        console.log("bArea :", bArea.name);
        console.log("area", area.name);
      }
    });
    const lng1 = area.position.lng;
    const lat1 = area.position.lat;
    const lng2 = gatePosition.lng;
    const lat2 = gatePosition.lat;

    const earthR = 6371000; // 지구 반지름
    const degToRad = (deg) => deg * (Math.PI / 180);

    const dLat = degToRad(lat2 - lat1);
    const dlng = degToRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dlng / 2) ** 2;

    return Math.round(earthR * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };
  const limitLocation = (userLocation) => {
    const maxLat = 37.496831;
    const minLat = 37.420388;
    const maxLng = 126.499959;
    const minLng = 126.388376;
    const userLat = userLocation.lat;
    const userLng = userLocation.lng;
    return (
      userLat < maxLat &&
      userLat > minLat &&
      userLng < maxLng &&
      userLng > minLng
    );
  };

  const congestionColor = (areaData) => {
    let gaugeColor;

    switch (areaData.congestion) {
      case "none":
        gaugeColor = "#999";
        break;
      case "low":
        gaugeColor = "#32A1FF";
        break;
      case "medium":
        gaugeColor = "#00C73C";
        break;
      case "high":
        gaugeColor = "#FF823F";
        break;
      case "veryhigh":
        gaugeColor = "#FF5959";
        break;
      default:
        gaugeColor = "#999";
    }
    return gaugeColor;
  };

  const initMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.44703, 126.449211),
      zoom: 17,
      mapTypeId: naver.maps.MapTypeId.NORMAL,
      mapDataControl: false,
      disableKineticPan: false,
      tileSpare: 5,
      scaleControl: false,
      logoControl: true,
      logoControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      zoomControl: false,
      scrollWheel: true,
      maxZoom: 20,
      minZoom: 17,
    };

    map = new naver.maps.Map("map", mapOptions);
    console.log("map객체 생성완료");
    return map;
  };

  const modalOpen = () => {
    const modal = document.getElementById("adModal");
    modal.style.setProperty("display", "flex");
  };
  const modalClose = () => {
    const modal = document.getElementById("adModal");
    modal.style.setProperty("display", "none");
  };
  const recoGate = () => {
    const areas = DataService.getAllAreas();
    const apiData = DataService.getApiData();
    recoArray = [];
    areas.forEach((area, index) => {
      if (index < 10 && area.id !== "DG1" && area.id !== "DG6") {
        let json;
        apiData.forEach((api) => {
          const distance = Math.round(
            Number(getDistance(area).replace("M", "").replace(",", "")) / 70
          );
          const waitingTime = Math.round(
            DataService.getTotalWaitTime(api) / 60
          );
          if (api.deskname == area.id) {
            json = {
              name: area.name,
              time: distance + waitingTime,
              position: area.position,
            };
          }
        });
        recoArray.push(json);
      }
    });
    recoArray.sort((a, b) => a.time - b.time);
    console.log(recoArray);
  };
  const timereset = () => {
    const time = document.getElementById("nTime");
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    hour = now.getHours();
    minute = String(now.getMinutes()).padStart(2, "0");
    const hourStr = String(hour).padStart(2, "0");

    time.innerHTML =
      "UPDATE : " +
      year +
      "." +
      month +
      "." +
      day +
      " " +
      hourStr +
      ":" +
      minute;
  };

  const changeMenu = (idx = 0) => {
    const menuBtn = document.getElementsByClassName("menuBtn");
    const controls = document.getElementById("controls");
    if (idx === 0) {
      menuBtn[0].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[1].style.setProperty("border-bottom", "1px solid #2121221A");
      controls.innerHTML = "";
      controls.innerHTML =
        '<div class="tabs">' +
        "<table>" +
        "<tr>" +
        '<th id="congestionEx">' +
        "•" +
        language["departureHallCongestion"] +
        '<span id="questionMark">?</span>' +
        "</th>" +
        '<th><p id="nTime"></p></th>' +
        "</tr>" +
        "</table>" +
        "</div>" +
        ' <table id="contents">' +
        '<tr class="gate">' +
        "  <th>" +
        language["gate2"] +
        "</th>" +
        '  <th class="eastWest"></th>' +
        '  <th class="eastWest"></th>' +
        "</tr>" +
        '<tr class="gate">' +
        "  <th>" +
        language["gate3"] +
        "</th>" +
        '  <th class="eastWest"></th>' +
        '  <th class="eastWest"></th>' +
        "</tr>" +
        '<tr class="gate">' +
        "  <th>" +
        language["gate4"] +
        "</th>" +
        '  <th class="eastWest"></th>' +
        '  <th class="eastWest"></th>' +
        "</tr>" +
        '<tr class="gate">' +
        "  <th>" +
        language["gate5"] +
        "</th>" +
        '  <th class="eastWest"></th>' +
        '  <th class="eastWest"></th>' +
        "</tr>" +
        "</table>";
      const moveGate = document.getElementsByClassName("eastWest");

      Array.from(moveGate).forEach((gate, index) => {
        gate.addEventListener("click", () => {
          MapService.moveMap(index);
          MapService.openWindowInfo(index);
          MapService.changeBorderColor(index);
        });
      });
    } else {
      menuBtn[1].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[0].style.setProperty("border-bottom", "1px solid #2121221A");
      if (hour > 12) {
        hour = hour - 12;
        ampm = language["pm"];
      }
      let departurehall = [];
      recoArray.forEach((reco, idx) => {
        if (idx < 3) {
          departurehall.push(transName(reco.name));
          console.log("name : ", reco.name);
        }
      });
      const ranks = [language["first"], language["second"], language["third"]];
      controls.innerHTML = "";
      controls.innerHTML =
        '<div class="recoContainer">' +
        '<div class="title">' +
        '<div id ="title-text">' +
        language["estimatedTime"] +
        "</div>" +
        '<div class="total-time">' +
        language["total"] +
        " - " +
        language["minute"] +
        "</div>" +
        "</div>" +
        '<div class="segment">' +
        '<img class="icon" src="./images/walk.png" />' +
        '<div id ="reco-priority" class="segment-inner">' +
        '<span id="selectHall">' +
        language["selectHall"] +
        "<small>" +
        '</small><img id="down" src="./images/dropDown.svg"></span>' +
        "</div>" +
        '<div class="time-info">' +
        '<span class ="latingTime">-' +
        language["minute"] +
        "</span>" +
        "</div>" +
        "</div>" +
        '<div class="segment">' +
        '<img class="icon" src="./images/ticket.png" />' +
        '<div class="segment-inner">' +
        "<span>" +
        language["waitingTime"] +
        "<small></small></span>" +
        "</div>" +
        '<div class="time-info">' +
        '<span class ="latingTime">-' +
        language["minute"] +
        "</span>" +
        "</div>" +
        "</div>" +
        '<div class="segment">' +
        '<img class="icon" src="./images/ticket.png" />' +
        '<div class="segment-inner">' +
        "<span>" +
        language["immigration"] +
        "</span>" +
        "</div>" +
        '<div class="time-info">' +
        '<span class ="latingTime">-' +
        language["minute"] +
        "</span>" +
        "</div>" +
        "</div>" +
        '<div class="segment">' +
        '<img class="icon" src="./images/walk.png" />' +
        '<div class="segment-inner">' +
        '<span style="display:flex;align-items: center;justify-content: center">' +
        language["boardingGate"] +
        " : " +
        '<span style="color:#2E90FA">' +
        boardinGateNum +
        "</span>" +
        '<img src="./images/pen.svg" style="height:1rem;width:1rem">' +
        "</span>" +
        "</div>" +
        '<div class="time-info">' +
        '<span class ="latingTime">-' +
        language["minute"] +
        "</span>" +
        "</div>" +
        "</div>" +
        "</div>";
      const priority = document.getElementById("reco-priority");
      priority.addEventListener("click", () => {
        const reco = document.getElementById("reco-select");
        const recoRank = document.getElementsByClassName("reco-rank");

        Array.from(recoRank).forEach((rank, idx) => {
          rank.innerHTML =
            "<div>" +
            departurehall[idx] +
            " <small>(" +
            ranks[idx] +
            ")</small>" +
            "</div>";
        });

        if (reco.style.display == "none") {
          reco.style.display = "flex";
          selectEvent();
          const handleOutsideClick = (event) => {
            if (
              !reco.contains(event.target) &&
              !priority.contains(event.target)
            ) {
              reco.style.display = "none";
              document.removeEventListener("click", handleOutsideClick);
            }
          };

          setTimeout(() => {
            document.addEventListener("click", handleOutsideClick);
          }, 100);
        } else {
          reco.style.display = "none";
        }
      });
    }
  };
  const selectEvent = () => {
    const recoRanks = document.getElementsByClassName("reco-rank");
    Array.from(recoRanks).forEach((reco, idx) => {
      reco.addEventListener("click", () => {
        estimated(idx);
        const reco = document.getElementById("reco-select");
        reco.style.display = "none";
        const selectHall = document.getElementById("selectHall");
        const departure = recoArray[idx].name.replace("출국장", "").split(" ");
        let eastWest;
        if (departure[1] == "동편") {
          eastWest = language["east"];
        } else {
          eastWest = language["west"];
        }
        selectHall.innerHTML =
          language["departurehall"] +
          " : " +
          '<span style="color:#2E90FA">' +
          departure[0] +
          " " +
          eastWest +
          "</span>" +
          "<small>" +
          '</small><img id="down" src="./images/dropDown.svg">';
      });
    });
  };
  const estimated = (idx) => {
    const datas = DataService.getAllAreas();
    const apiData = DataService.getApiData();
    let hallWaiting;
    let waitingTime;
    let immigration;
    let boardingtime;
    let totalTime = 0;
    const foundData = datas.find((data) => data.name === recoArray[idx].name);
    const foundApi = apiData.find((data) => data.deskname === foundData.id);
    let distance = Number(
      getDistance(foundData).replace("M", "").replace(",", "")
    );
    let boardingDistance = getBoardingDistance(foundData);
    if (distance > 60) {
      hallWaiting =
        Math.round(distance / 70 / 60) +
        language["hour"] +
        " " +
        Math.round((distance / 70) % 60) +
        language["minute"];
      totalTime += Math.round(distance / 70);
    } else {
      hallWaiting = Math.round(distance / 70) + language["minute"];
      totalTime += Math.round(distance / 70);
    }
    console.log("hallwaiting 추가 : ", totalTime);
    boardingtime = Math.round(boardingDistance / 70) + language["minute"];
    totalTime += Math.round(boardingDistance / 70);
    console.log("boardingtime 추가 : ", totalTime);
    let waitTime;
    if (foundApi.espwaittime == "D") {
      waitTime = 0;
    } else {
      waitTime = foundApi.espwaittime;
    }

    totalTime += Math.round(waitTime / 60);
    waitingTime = Math.round(waitTime / 60) + language["minute"];

    console.log("waittime 추가 : ", totalTime);
    let totalWait;
    if (foundApi.immigrationtime == "NA") {
      totalWait = 60;
    } else {
      totalWait = foundApi.immigrationtime * foundApi.quelength;
    }
    if (foundApi.immigrationtime * foundApi.quelength > 3600) {
      totalTime += Math.round(
        (foundApi.immigrationtime * foundApi.quelength) / 60
      );
      immigration =
        Math.round(totalWait / 3600) +
        language["hour"] +
        " " +
        Math.round((totalWait % 3600) / 60) +
        language["minute"];
      totalTime += Math.round(totalWait / 60);
    } else {
      immigration = Math.round(totalWait / 60) + language["minute"];
      totalTime += Math.round(totalWait / 60);
    }
    console.log("immigration 추가 : ", totalTime);
    let strTotal;
    if (totalTime > 60) {
      strTotal =
        Math.round(totalTime / 60) +
        language["hour"] +
        " " +
        (totalTime % 60) +
        language["minute"];
    } else {
      strTotal = totalTime + language["minute"];
    }
    let total = document.getElementsByClassName("total-time");
    const latingTime = document.getElementsByClassName("latingTime");
    let waiting = [hallWaiting, waitingTime, immigration, boardingtime];
    total[0].innerText = strTotal;
    Array.from(latingTime).forEach((time, idx) => {
      time.innerHTML = "";
      time.innerText = waiting[idx];
    });
  };
  const translateMenu = () => {
    const menuBtn = Array.from(document.getElementsByClassName("menuBtn"));
    const conEx = document.getElementById("congestionEx");
    menuBtn.forEach((menu, index) => {
      if (index == 0) {
        menu.innerHTML = language["departureHallCongestion"];
      } else {
        menu.innerHTML = language["estimated"];
      }
    });
    conEx.innerHTML =
      "• " +
      language["departureHallCongestion"] +
      '  <span id="questionMark">?</span>';
  };
  const openBoardingWindowInfo = (index) => {
    let idx = 0;
    console.log(index);
    if (
      index == 4 ||
      index == 5 ||
      index == 13 ||
      index == 44 ||
      index == 116 ||
      index == 120 ||
      (index > 50 && index < 101)
    ) {
      alert("존재하지 않는 탑승구입니다.");
      return;
    }
    if (index < 4) {
      idx = index - 1;
    } else if (index > 5 && index < 13) {
      idx = index - 3;
    } else if (index < 44) {
      idx = index - 4;
    } else if (index < 51) {
      idx = index - 5;
    } else if (index < 116 && index > 100) {
      idx = index - 55;
    } else if (index < 120) {
      idx = index - 56;
    } else if (index <= 132) {
      idx = index - 57;
    } else {
      alert("존재하지 않는 탑승구입니다.");
      return;
    }
    boardingInfoWindows[idx].open(map, boardingMarkers[idx]);
  };
  const showGateCongestion = () => {
    const allAreadata = DataService.getAllAreas();
    const areadata = [];
    allAreadata.forEach((area, idx) => {
      if (idx != 0 && idx < 9) {
        areadata.push(area);
      }
    });

    const contentsEl = document.getElementsByClassName("eastWest");

    setTimeout(() => {
      areadata.forEach((conData, index) => {
        let gaugeColor;
        let border;
        let textColor;
        let congestion;
        switch (conData.congestion) {
          case "none":
            gaugeColor = "#999";
            border = "1px solid #999";
            textColor = "#99999";
            congestion = language["none"];
          case "low":
            gaugeColor = "#EBF6FF";
            border = "1px solid #E8E8E8";
            textColor = "#32A1FF";
            congestion = language["low"];
            break;
          case "medium":
            gaugeColor = "#E6FAEC";
            border = "1px solid #E8E8E8";
            textColor = "#00C73C";
            congestion = language["medium"];
            break;
          case "high":
            gaugeColor = "#FFF3EC";
            border = "1px solid #E8E8E8";
            textColor = "#FF823F";
            congestion = language["high"];
            break;
          case "veryhigh":
            gaugeColor = "#FFEFEF";
            border = "1px solid #E8E8E8";
            textColor = "#FF5959";
            congestion = language["veryhigh"];
            break;
          default:
            gaugeColor = "#4CAF50";
        }
        if (countE == 4) {
          countE = 0;
        }
        if (countW == 4) {
          countW = 0;
        }
        if (index % 2 == 1) {
          var htmlcontents =
            '<div style = "text-align: center;border:' +
            border +
            '"><p class ="gatePoint">' +
            language["east"] +
            '</p><h4 style = "color:' +
            textColor +
            '">' +
            congestion +
            "</h4></div>";
          contentsEl[index].innerHTML = htmlcontents;
        } else {
          var htmlcontents =
            '<div style = "text-align: center;border:' +
            border +
            '"><p class ="gatePoint">' +
            language["west"] +
            '</p><h4 style = "color:' +
            textColor +
            '">' +
            congestion +
            "</h4></div>";
          contentsEl[index].innerHTML = htmlcontents;
        }
      });
    }, 200);
  };

  const createDepartureMarker = (areaData) => {
    const area = areaData.area || areaData;
    area.floorInfo = getDistance(area);
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(area.position.lat, area.position.lng),
      map: null,
      title: areaData.name,
      icon: {
        content: getMarkerIcon(areaData.congestion),
        size: new naver.maps.Size(27, 35),
        anchor: new naver.maps.Point(7, 10),
      },
    });
    const infoWindow = new naver.maps.InfoWindow({
      content: getInfoWindowContent(areaData),
      maxWidth: 300,
      backgroundColor: "#fff",
      borderColor: congestionColor(area),
      disableAutopan: true,
      borderWidth: 2,
      borderRadius: 5,
      disableAnchor: false,
    });

    naver.maps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindows.forEach((iw) => {
          iw.close();
        });
        infoWindow.open(map, marker);
      }
    });
    markers.push(marker);
    infoWindows.push(infoWindow);

    return markers;
  };

  const createBoardingMarker = (areaData) => {
    const area = areaData.area || areaData;
    area.floorInfo = getDistance(area);
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(area.position.lat, area.position.lng),
      map: null,
      title: areaData.name,
      icon: {
        content:
          '<img src="./images/user_Location.png" style="width:15px; height = 15px;">',
        size: new naver.maps.Size(27, 35),
        anchor: new naver.maps.Point(7, 10),
      },
    });

    const infoWindow = new naver.maps.InfoWindow({
      content: getBoardingInfoWindowContent(areaData),
      maxWidth: 300,
      backgroundColor: "#fff",
      borderColor: congestionColor(area),
      disableAutopan: true,
      borderWidth: 2,
      borderRadius: 5,
      disableAnchor: false,
    });

    naver.maps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindows.forEach((iw) => {
          iw.close();
        });
        infoWindow.open(map, marker);
      }
    });
    boardingMarkers.push(marker);
    boardingInfoWindows.push(infoWindow);

    return boardingMarkers;
  };

  const getMarkerIcon = (congestion) => {
    const congestionInfo = DataService.getCongestionInfo(congestion);
    const color = congestionInfo ? congestionInfo.color : "#32A1FF";

    return (
      '<div style="background-color: ' +
      color +
      '; width: 16px; height: 16px; border-radius: 8px 8px 8px 8px;"></div>'
    );
  };
  const getBoardingInfoWindowContent = (areaData) => {
    let gaugeColor;
    let distance = getDistance(areaData);
    let conLevel;
    switch (areaData.congestion) {
      case "none":
        gaugeColor = "#999";
        conLevel = language["none"];
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
    return (
      '<div class="info-window ' +
      areaData.congestion +
      '">' +
      "<h3>" +
      language["nthGate"].replace("{{number}}", boardinGateNum) +
      "</h3>" +
      "<p>" +
      language["distance"] +
      ": " +
      distance +
      "</p>"
    );
  };
  const getInfoWindowContent = (areaData) => {
    let gaugeColor;
    let distance = getDistance(areaData);
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
    const translatedName = translateAreaName(areaData.name, language);
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
      language["congestion"] +
      ": " +
      conLevel +
      "</p>" +
      "<p>" +
      language["distance"] +
      ": " +
      distance +
      "</p>"
    );
  };

  const updateMarkers = () => {
    if (!areas.length) return;

    areas.forEach((areaData, index) => {
      areaData.floorInfo = getDistance(areaData);
      const updatedArea = DataService.getAreaData(areaData.id);
      if (!updatedArea) return;
      if (index < 10) {
        markers[index].setIcon({
          content: getMarkerIcon(updatedArea.congestion),
          size: new naver.maps.Size(27, 35),
          anchor: new naver.maps.Point(7, 10),
        });
        infoWindows[index].setContent(getInfoWindowContent(updatedArea));
      } else {
        return;
      }

      let color = congestionColor(areaData);
      infoWindows[index].setOptions({ borderColor: color });
      areas[index] = updatedArea;
    });
  };

  const getCurrentPosition = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          if (successCallback) successCallback(userLocation);
        },
        (error) => {
          console.error("위치 정보 가져오기 실패", error);
          if (errorCallback) errorCallback(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      if (errorCallback) errorCallback(new Error("Geolocation not supported"));
    }
  };

  return {
    init: () => {
      console.log("MapService 초기화 시작");
      let lang = sessionStorage.getItem("language");
      let languageText;
      DataService.initData();

      if (lang == null) {
        languageText = "Language";
        lang = "ko";
        language = loadTranslateData(lang);
      } else {
        language = loadTranslateData(lang);
        languageText = language[lang];
      }
      ampm = language["am"];
      const mapElement = document.getElementById("map");
      if (!mapElement) {
        console.error("지도를 표시할 엘리먼트를 찾을 수 없음.");
        return null;
      }

      if (!window.naver || !naver.maps) {
        console.error("네이버 지도 API가 로드되지 않았습니다.");
        return null;
      }

      try {
        console.log("지도 초기화 시도...");

        map = initMap();
        changeMenu();
        translateMenu();
        recoGate();
        boardinGateNum = sessionStorage.getItem("boardingGate");
        let langArray = ["ko", "en", "ja", "zh"];
        let langCheck;
        langArray.forEach((l) => {
          if (l == lang) {
            langCheck = language["current"];
          }
        });
        const locationBtnHtml =
          '<img id="requestLocation" src="./images/userLocation.png" style="height:40px; width:40px;margin-right:10px;margin-top:15vh">';
        const moveGateBtn =
          '<div id="moveBoardingGate" style="display: flex ;height:30px; width:30px;margin-right:10px;margin-top:15px;background-color:#000; color:#fff; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center"><img src="./images/Send.svg" style="height:30px;width:20px"></div>';
        let boarding;
        if (boardinGateNum != null) {
          boarding =
            '<div id ="boardingInfo" style="display:flex ; height : 30px;width:auto ; margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center;padding-left:10px;padding-right:5px" >' +
            language["boardingGate"] +
            " : " +
            boardinGateNum +
            ' <img src="./images/pen.svg" style="height:2rem;width:20px"></div>';
        } else {
          boarding =
            '<div id ="boardingInfo" style="display:flex ; height : 30px ;width:auto; margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center;padding-left:10px;padding-right:5p" >탑승구 : <img src="./images/pen.svg" style="height:1.1rem;width:1.1rem"></div>';
        }
        const selectLang =
          '<div id="selectLang" style="height:3vh; width:14vh; display: flex; justify-content: center; align-items: center;' +
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
            '<div class = "mapLang" style="width : 100% ; height:3vh; display: flex; align-items: center">한국어(' +
            language["korean"] +
            ")</div>",
          en:
            '<div class = "mapLang" style="width : 100% ; height:3vh; display: flex; align-items: center">English(' +
            language["english"] +
            ")</div>",
          ja:
            '<div class = "mapLang" style="width : 100% ; height:3vh; display: flex; align-items: center">日本語(' +
            language["japenese"] +
            ")</div>",
          zh:
            '<div class = "mapLang" style="width : 100% ; height:3vh; display: flex; align-items: center">简体中文(' +
            language["chinese"] +
            ")</div>",
        };
        const langImgArray = createLanguageArrayWithSelectiveImg(
          languageList,
          lang
        );
        let langChan = "";
        langImgArray.forEach((laImg) => {
          langChan += laImg[1];
        });
        const languageChange =
          '<div style = "height: 12vh ;width :14vh; background-color:white; margin-top :1vh;margin-left:10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius : 4px;font-size:0.6rem">' +
          langChan +
          "</div>";

        naver.maps.Event.once(map, "init", function () {
          const boardingGate = sessionStorage.getItem("boardingGate");

          const locaCon = new naver.maps.CustomControl(locationBtnHtml, {
            position: naver.maps.Position.RIGHT_CENTER,
          });
          console.log(boarding);
          const boardingInfo = new naver.maps.CustomControl(boarding, {
            position: naver.maps.Position.TOP_RIGHT,
          });
          console.log("here2");
          const moveGateCon = new naver.maps.CustomControl(moveGateBtn, {
            position: naver.maps.Position.RIGHT_TOP,
          });
          const selectLangCon = new naver.maps.CustomControl(selectLang, {
            position: naver.maps.Position.LEFT_TOP,
          });
          const langchangeCon = new naver.maps.CustomControl(languageChange, {
            position: naver.maps.Position.LEFT_TOP,
          });
          setTimeout(() => {
            locaCon.setMap(map);
            moveGateCon.setMap(map);
            selectLangCon.setMap(map);
            boardingInfo.setMap(map);
          }, 50);
          let mapLangs;

          naver.maps.Event.addDOMListener(
            boardingInfo.getElement(),
            "click",
            () => {
              const modal = document.getElementById("modal-background");
              modal.style.display = "flex";
            }
          );

          naver.maps.Event.addDOMListener(
            selectLangCon.getElement(),
            "click",
            () => {
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
            }
          );
          let conSwitch = null;
          mapLangs = Array.from(
            langchangeCon.getElement().getElementsByClassName("mapLang")
          );
          mapLangs.forEach((mapLang, index) => {
            mapLang.addEventListener("click", async () => {
              document.getElementById("map").innerHTML = "";
              if (window.naver) delete window.naver;
              try {
                await MapService.languageControl(langArray[index]);
                sessionStorage.setItem("language", langArray[index]);
                boardingMarkers = [];
                markers = [];
                boardingInfoWindows = [];
                infoWindows = [];
                const newMap = MapService.init();
                MapService.showMarkers();
                MapService.showBScongestion();
                MapService.timereset();
                changeMenu();
                translateMenu();
              } catch (error) {
                console.error("언어변경실패", error);
              }
            });
          });
          mapLangs.forEach((mapLang, index) => {
            mapLang.addEventListener("mouseenter", () => {
              mapLang.style.backgroundColor = "#F3F4F6";
            });
            mapLang.addEventListener("mouseleave", () => {
              mapLang.style.backgroundColor = "white";
            });
          });

          naver.maps.Event.addDOMListener(
            moveGateCon.getElement(),
            "click",
            () => {
              const areaData = DataService.getAllAreas();

              var transition = {
                duration: 500,
                easing: "linear",
              };
              Array.from(areaData).forEach((area) => {
                if (area.name == "탑승게이트" + boardingGate) {
                  console.log(area.position);
                  map.panTo(area.position, transition);
                }
              });
              console.log(boardingGate);
              openBoardingWindowInfo(boardingGate);
            }
          );

          naver.maps.Event.addDOMListener(locaCon.getElement(), "click", () => {
            const userPos = JSON.parse(sessionStorage.getItem("myLocation"));
            const latLng = new naver.maps.LatLng(
              userPos["lat"],
              userPos["lng"]
            );
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
        });
        const data = DataService.initData();
        if (!data) {
          console.log("데이터 초기화 실패", "error");
          return map;
        }
        const allAreas = DataService.getAllAreas();
        markers = [];
        boardingMarkers = [];
        infoWindows = [];
        boardingInfoWindows = [];
        allAreas.forEach((area, index) => {
          areas.push(area);
          if (index < 10) {
            createDepartureMarker(area);
          } else {
            createBoardingMarker(area);
          }
        });

        return map;
      } catch (error) {
        console.error("지도 초기화 중 오류 발생: ", error);
        console.log("지도 초기화 중 오류가 발생했습니다.", "error");
        return null;
      }
    },

    showMarkers: () => {
      markers.forEach((marker) => {
        marker.setMap(map);
      });
      const idx = sessionStorage.getItem("boardingGate");
      let boardingIdx = getBoardingGateIdx(idx);
      boardingMarkers[boardingIdx].setMap(map);
    },

    toggleCongestion: () => {
      const updateData = DataService.updateCongestionData();
      if (updateData) {
        updateMarkers();
        console.log("혼잡도 데이터가 업데이트되었습니다.");
      }
    },
    modalOpen: () => {
      modalOpen();
    },

    modalClose: () => {
      modalClose();
    },

    resetMap: () => {
      infoWindows.forEach((infoWindow) => {
        infoWindow.close();
      });

      if (companyInfoWindow) companyInfoWindow.close();

      const companyLocation = DataService.getCompanyLocation();
      if (companyLocation) {
        map.setCenter(
          new naver.maps.LatLng(
            companyLocation.position.lat,
            companyLocation.position.lng
          )
        );
        map.setZoom(17);
      }

      DataService.initData();
      updateMarkers();

      console.log("지도 초기화 완료");
    },

    moveToUserLocation: () => {
      getCurrentPosition(
        (userLocation) => {
          if (limitLocation(userLocation)) {
            map.setCenter(
              new naver.maps.LatLng(userLocation.lat, userLocation.lng)
            );
            console.log("사용자 위치로 이동했습니다.", "success");
            console.log(
              `현재 사용자 좌표 : Lat(${userLocation.lat}), Lng(${userLocation.lng})`
            );

            const userMarker = new naver.maps.Marker({
              position: new naver.maps.LatLng(
                userLocation.lat,
                userLocation.lng
              ),
              map,
              title: "현재 위치",
              icon: {
                content:
                  '<div style="background-color: #4285F4; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #fff;"></div>',
                size: new naver.maps.Size(18, 18),
                anchor: new naver.maps.Point(9, 9),
              },
            });
            setTimeout(() => {
              userMarker.setMap(null);
            }, 10000);
          } else {
            alert("이 기능은 인천공항 내에서만 사용가능한 기능입니다.");
          }
        },
        (error) => {
          alert(
            "위치 정보를 가져오는데 실패했습니다. 위치 권한을 허용해주세요."
          );
          console.log("위치 권한 오류: " + error.message, "error");
        }
      );
    },

    createMoveBtn: () => {
      createButtonTag();
    },
    savedLocation: () => {
      return new Promise((resolve, reject) => {
        ``;
        if (!navigator.geolocation) {
          console.log("이 브라우저는 위치 기능을 지원하지 않습니다.");
          return reject(new Error("Geolocation not supported"));
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationData = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            sessionStorage.setItem("myLocation", JSON.stringify(locationData));
            resolve();
          },
          (error) => {
            console.error("위치 정보를 가져올 수 없습니다:", error);
            reject(error);
          }
        );
      });
    },

    moveGate: (index) => {
      const allareas = DataService.getAllAreas();
      var transition = {
        duration: 500,
        easing: "linear",
      };
      allareas.forEach((area) => {
        if (area.name == "탑승게이트" + index) {
          map.panTo(area.position, transition);
        }
      });
    },
    moveMap: (index) => {
      const allareas = DataService.getAllAreas();
      let idx = 0;
      var transition = {
        duration: 500,
        easing: "linear",
      };
      if (index !== 9 && index !== 10) {
        idx = index + 1;
      } else if (index == 9) {
        idx = 0;
      } else {
        idx = 9;
      }

      map.panTo(allareas[idx].position, transition);
    },
    changeBorderColor: (index) => {
      const allareas = DataService.getAllAreas();
      let idx = 0;
      if (index !== 9 && index !== 10) {
        idx = index + 1;
      } else if (index == 9) {
        idx = 0;
      } else {
        idx = 9;
      }
      const div = document.querySelectorAll(".eastWest div");
      div.forEach((divBox) => {
        divBox.style.setProperty("border-color", "#E8E8E8");
      });
      div[idx - 1].style.setProperty(
        "border-color",
        congestionColor(allareas[idx])
      );
    },

    changeMenu: (idx) => {
      changeMenu(idx);
    },
    updateMarkers: () => {
      updateMarkers();
    },
    openWindowInfo: (index) => {
      let idx = 0;
      if (index !== 9 && index !== 10) {
        idx = index + 1;
      } else if (index == 9) {
        idx = 0;
      } else {
        idx = 9;
      }
      infoWindows[idx].open(map, markers[idx]);
    },

    showBScongestion: () => {
      showGateCongestion(0);
    },

    timereset: () => {
      timereset();
    },

    languageControl: (language) => {
      return new Promise((resolve, reject) => {
        const oldScript = document.getElementById("naverMap");
        if (oldScript) oldScript.remove();

        const newScript = document.createElement("script");
        newScript.id = "naverMap";
        newScript.src =
          "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=6nv3jwasxn&language=" +
          language;
        newScript.async = true;

        newScript.onload = () => {
          console.log("스크립트 로드 완료");
          resolve(); // init 호출을 여기서 진행해야 함
        };

        newScript.onerror = () => {
          reject(new Error("네이버 지도 스크립트 로드 실패"));
        };

        document.head.appendChild(newScript);
      });
    },
  };
})();
