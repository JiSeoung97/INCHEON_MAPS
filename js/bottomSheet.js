const BottomSheet = (() => {
  let language;
  let bottomSheet;
  let handle;
  let peekElement;
  let isDragging = false;
  let startY = 0;
  let startBottom = 0;
  let currentBottom = 0;
  let departurehall = [];
  let boardingGateNum = null;
  const POSITIONS = {
    CLOSED: 0,
    OPEN: 0,
  };

  let currentPosition;
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
    boardingGateNum = sessionStorage.getItem("boardingGate");
    const menuBtn = document.getElementsByClassName("menuBtn");
    const controls = document.getElementById("controls");
    if (idx === 0) {
      menuBtn[0].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[1].style.setProperty("border-bottom", "1px solid #2121221A");
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
      timereset();
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

      recoArray.forEach((reco, idx) => {
        if (idx < 3) {
          departurehall.push(transName(reco.name));
          console.log("name : ", reco.name);
        }
      });
      const ranks = [language["first"], language["second"], language["third"]];
      let innerHTML =
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
        '<span class="flag">' +
        language["transfer"] +
        "</span>" +
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
        '<span class="flag">' +
        language["Immigration"] +
        "</span>" +
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
        '<span class="flag">' +
        language["Immigration"] +
        "</span>" +
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
        '<div class = "segment" id ="trainAlert">' +
        '<img class="icon" src ="./images/train.svg"/>' +
        "<div>" +
        language["needTrain"] +
        "</div>" +
        "<span>10" +
        language["minute"] +
        "</span>" +
        "</div>" +
        '<div class="segment">' +
        '<img class="icon" src="./images/walk.png" />' +
        '<span class="flag">' +
        language["walk"] +
        "</span>" +
        '<div id ="segment-check" class="segment-inner">' +
        '<span id= "boardingGateCheck"style="display:flex;align-items: center;justify-content: center">' +
        language["boardingGate"] +
        " : " +
        '<span style="color:#2E90FA">' +
        boardingGateNum +
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

      controls.innerHTML = innerHTML;
      trainShow();
      const priority = document.getElementById("reco-priority");
      const recoRank = document.getElementsByClassName("reco-rank");
      $("#boardingGateCheck").click(() => {
        const modal = document.getElementById("modal-background");
        console.log("fdfd");
        modal.style.display = "flex";
      });

      Array.from(recoRank).forEach((rank, idx) => {
        rank.innerHTML =
          "<div>" +
          departurehall[idx] +
          " <small>(" +
          ranks[idx] +
          ")</small>" +
          "</div>";
      });
      priority.addEventListener("click", () => {
        const reco = document.getElementById("reco-select");
        reco.style.left = priority.getBoundingClientRect().left + "px";
        reco.style.top = priority.getBoundingClientRect().top + 35 + "px";
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
  const trainShow = () => {
    const train = document.getElementById("trainAlert");
    if (boardingGateNum > 100 && boardingGateNum < 133) {
      train.style.display = "flex";
    }
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
            Number(
              MapService.getDistance(area).replace("M", "").replace(",", "")
            ) / 70
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

  const selectEvent = () => {
    const ranks = [language["first"], language["second"], language["third"]];
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
        [0, 1, 2].forEach((index) => {
          if (index == idx) {
            recoRanks[index].innerHTML =
              '<div style="display:flex; align-items: center;justify-content: center">' +
              departurehall[idx] +
              " <small>(" +
              ranks[idx] +
              ")</small>" +
              '<img src = "./images/check.svg" style="height:1.25rem;width:1.25rem">' +
              "</div>";
          } else {
            recoRanks[index].innerHTML =
              '<div style="display:flex; align-items: center;justify-content: center">' +
              departurehall[index] +
              " <small>(" +
              ranks[index] +
              ")</small>" +
              "</div>";
          }
        });
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
      MapService.getDistance(foundData).replace("M", "").replace(",", "")
    );
    console.log(foundData);
    let boardingDistance = MapService.getBoardingDistance(foundData);
    if (distance > 60) {
      hallWaiting =
        Math.floor(distance / 70 / 60) +
        language["hour"] +
        " " +
        Math.floor((distance / 70) % 60) +
        language["minute"];
      totalTime += Math.floor(distance / 70);
    } else {
      hallWaiting = Math.floor(distance / 70) + language["minute"];
      totalTime += Math.floor(distance / 70);
    }
    console.log("hallwaiting 추가 : ", totalTime);
    if (Math.floor(boardingDistance / 70) > 10) {
      boardingtime =
        Math.floor(boardingDistance / 70) - 10 + language["minute"];
    } else {
      boardingtime = Math.floor(boardingDistance / 70) + language["minute"];
    }
    totalTime += Math.floor(boardingDistance / 70);
    console.log("boardingtime 추가 : ", totalTime);
    let waitTime;
    if (foundApi.espwaittime == "D") {
      waitTime = 0;
    } else {
      waitTime = foundApi.espwaittime;
    }

    totalTime += Math.floor(waitTime / 60);
    waitingTime = Math.floor(waitTime / 60) + language["minute"];

    console.log("waittime 추가 : ", totalTime);
    let totalWait;
    if (foundApi.immigrationtime == "NA") {
      totalWait = 60;
    } else {
      totalWait = foundApi.immigrationtime * foundApi.quelength;
    }
    if (foundApi.immigrationtime * foundApi.quelength > 3600) {
      totalTime += Math.floor(
        (foundApi.immigrationtime * foundApi.quelength) / 60
      );
      immigration =
        Math.floor(totalWait / 3600) +
        language["hour"] +
        " " +
        Math.floor((totalWait % 3600) / 60) +
        language["minute"];
      totalTime += Math.floor(totalWait / 60);
    } else {
      immigration = Math.floor(totalWait / 60) + language["minute"];
      totalTime += Math.floor(totalWait / 60);
    }
    console.log("immigration 추가 : ", totalTime);
    let strTotal;
    if (totalTime > 60) {
      strTotal =
        Math.floor(totalTime / 60) +
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
  function getEventY(e) {
    return e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
  }
  function calculatePeekHeight() {
    if (!peekElement) {
      console.error("peek 클래스 요소를 찾을 수 없습니다!");
      return 100; // 기본값
    }

    const style = window.getComputedStyle(peekElement);
    const marginTop = parseInt(style.marginTop) || 0;
    const marginBottom = parseInt(style.marginBottom) || 0;
    const paddingTop = parseInt(style.paddingTop) || 0;
    const paddingBottom = parseInt(style.paddingBottom) || 0;

    const totalHeight =
      peekElement.offsetHeight +
      marginTop +
      marginBottom +
      paddingTop +
      paddingBottom;

    console.log("Peek element height:", peekElement.offsetHeight);
    console.log("Margins:", marginTop, marginBottom);
    console.log("Total peek height:", totalHeight);

    return totalHeight;
  }
  function calculatePositions() {
    const sheetHeight = bottomSheet.offsetHeight;
    const peekHeight = calculatePeekHeight();

    const hiddenHeight = sheetHeight - peekHeight;
    const closedRem = -pxToRem(hiddenHeight);

    POSITIONS.CLOSED = Math.max(closedRem, -19);
    POSITIONS.OPEN = 0;

    console.log("Sheet Height:", sheetHeight);
    console.log("Peek Height:", peekHeight);
    console.log("Hidden Height:", hiddenHeight);
    console.log("Closed Position (rem):", POSITIONS.CLOSED);

    return POSITIONS;
  }
  function pxToRem(px) {
    const rootFontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  }

  function updatePosition(bottomRem) {
    bottomSheet.style.bottom = bottomRem + "rem";
    currentBottom = bottomRem;
  }

  function startDrag(e) {
    isDragging = true;
    startY = getEventY(e);
    startBottom = currentBottom;
    handle.style.cursor = "grabbing";

    bottomSheet.style.transition = "none";

    e.preventDefault();
  }

  // 드래그 중
  function drag(e) {
    if (!isDragging) return;
    const currentY = getEventY(e);
    const deltaY = currentY - startY;
    const deltaRem = pxToRem(deltaY);
    let newBottom = startBottom - deltaRem;
    // 경계 제한
    newBottom = Math.max(-28, Math.min(0, newBottom));
    updatePosition(newBottom);

    e.preventDefault();
  }

  // 드래그 종료
  function endDrag() {
    if (!isDragging) return;

    isDragging = false;
    handle.style.cursor = "grab";

    // 트랜지션 다시 활성화
    bottomSheet.style.transition = "bottom 0.3s ease";

    let targetPosition = POSITIONS.CLOSED;
    let minDistance = Math.abs(currentBottom - POSITIONS.CLOSED);

    for (const [key, position] of Object.entries(POSITIONS)) {
      const distance = Math.abs(currentBottom - position);
      if (distance < minDistance) {
        minDistance = distance;
        targetPosition = position;
      }
    }
    currentPosition = targetPosition;
    updatePosition(targetPosition);
  }
  function initialize() {
    currentPosition = POSITIONS.CLOSED;
    if (!peekElement) {
      console.error("peek 클래스 요소가 없습니다. HTML을 확인해주세요.");
      return;
    }

    calculatePositions();
    currentBottom = POSITIONS.CLOSED;
    updatePosition(POSITIONS.CLOSED);
    currentPosition = POSITIONS.CLOSED;
  }
  function getElement() {
    bottomSheet = document.getElementById("bottomSheet");
    handle = document.getElementById("handle");
    peekElement = document.querySelector(".peek");
  }
  function bottomSheetEvent() {
    handle.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);

    // 터치 이벤트 (passive: false로 설정)
    handle.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", endDrag, { passive: false });
  }

  return {
    init: () => {
      getElement();
      initialize();
      bottomSheetEvent();
    },
    recoGate: () => {
      recoGate();
    },
    languageChan: (lang) => {
      language = lang;
    },
    changeMenu: (idx) => {
      changeMenu(idx);
    },
    translateMenu: () => {
      translateMenu();
    },
    trainShow: () => {
      trainShow();
    },
  };
})();
