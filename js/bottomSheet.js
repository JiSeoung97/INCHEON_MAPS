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

  const transName = async (name) => {
    return new Promise((resolve) => {
      try {
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

        const result =
          language[newName].replace("<br>", "") + " " + language[eastWest];
        resolve(result);
      } catch (error) {
        console.error("이름 번역 실패:", error);
        resolve(name); // 원본 이름 반환
      }
    });
  };
  const timereset = async () => {
    return new Promise((resolve) => {
      try {
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
        resolve();
      } catch (error) {
        console.error("시간 설정 실패");
        resolve();
      }
    });
  };
  const showGateCongestion = async () => {
    try {
      const allAreadata = DataService.getAllAreas();
      const areadata = [];

      allAreadata.forEach((area, idx) => {
        if (idx != 0 && idx < 9) {
          areadata.push(area);
        }
      });

      const contentsEl = document.getElementsByClassName("eastWest");
      if (!contentsEl || contentsEl.length === 0) {
        console.warn("eastWest 요소들을 찾을 수 없습니다.");
        return;
      }

      // 200ms 후에 실행 (기존 setTimeout을 Promise로 변경)
      await new Promise((resolve) => setTimeout(resolve, 200));

      for (const [index, conData] of areadata.entries()) {
        if (index >= contentsEl.length) continue;

        const congestionInfo = getCongestionInfo(conData.congestion);
        const htmlContents = createCongestionHTML(
          congestionInfo,
          index % 2 === 1
        );

        contentsEl[index].innerHTML = htmlContents;
      }
    } catch (error) {
      console.error("게이트 혼잡도 표시 실패:", error);
    }
  };
  const getCongestionInfo = (congestionLevel) => {
    const congestionMap = {
      none: {
        color: "#999",
        border: "1px solid #999",
        textColor: "#99999",
        text: language["none"],
      },
      low: {
        color: "#EBF6FF",
        border: "1px solid #E8E8E8",
        textColor: "#32A1FF",
        text: language["low"],
      },
      medium: {
        color: "#E6FAEC",
        border: "1px solid #E8E8E8",
        textColor: "#00C73C",
        text: language["medium"],
      },
      high: {
        color: "#FFF3EC",
        border: "1px solid #E8E8E8",
        textColor: "#FF823F",
        text: language["high"],
      },
      veryhigh: {
        color: "#FFEFEF",
        border: "1px solid #E8E8E8",
        textColor: "#FF5959",
        text: language["veryhigh"],
      },
    };

    return (
      congestionMap[congestionLevel] || {
        color: "#4CAF50",
        border: "1px solid #E8E8E8",
        textColor: "#000",
        text: language["none"] || "정보없음",
      }
    );
  };

  // 5. 혼잡도 HTML 생성
  const createCongestionHTML = (congestionInfo, isEast) => {
    const direction = isEast ? language["east"] : language["west"];

    return `<div style="text-align: center;border:${congestionInfo.border}">
      <p class="gatePoint">${direction}</p>
      <h4 style="color:${congestionInfo.textColor}">${congestionInfo.text}</h4>
    </div>`;
  };
  const changeBorderColor = async (index) => {
    try {
      const allareas = DataService.getAllAreas();
      let idx = 0;

      idx = index + 1;
      const div = document.querySelectorAll(".eastWest div");
      div.forEach((divBox, boxIndex) => {
        if (index == boxIndex) {
          divBox.style.setProperty(
            "border-color",
            MapService.congestionColor(allareas[idx])
          );
        } else {
          divBox.style.setProperty("border-color", "#E8E8E8");
        }
      });
    } catch (error) {
      console.error("error :", error);
    }
  };
  const resetAllBorderColor = () => {
    const div = document.querySelectorAll(".eastWest div");
    div.forEach((divBox, boxIndex) => {
      divBox.style.setProperty("border-color", "#E8E8E8");
    });
  };
  const setupGateEventListeners = async () => {
    try {
      const moveGate = document.getElementsByClassName("eastWest");
      if (!moveGate || moveGate.length === 0) {
        console.warn("eastWest 요소들을 찾을 수 없습니다.");
        return;
      }

      // 기존 이벤트 리스너 제거 (중복 방지)
      Array.from(moveGate).forEach((gate) => {
        const newGate = gate.cloneNode(true);
        gate.parentNode.replaceChild(newGate, gate);
      });
      // 새로운 이벤트 리스너 추가
      const updatedGates = document.getElementsByClassName("eastWest");
      Array.from(updatedGates).forEach((gate, index) => {
        gate.addEventListener("click", async () => {
          try {
            MapService.moveMap(index);
            MapService.openWindowInfo(index);
            await changeBorderColor(index);
          } catch (error) {
            console.error(`게이트 ${index} 클릭 처리 오류:`, error);
          }
        });
      });
    } catch (error) {
      console.error("게이트 이벤트 리스너 설정 실패:", error);
    }
  };
  const recoGate = async () => {
    try {
      const areas = DataService.getAllAreas();
      const apiData = DataService.getApiData();
      recoArray = [];

      const promises = areas.map(async (area, index) => {
        if (index < 10 && area.id !== "DG1" && area.id !== "DG6") {
          try {
            const distance = await getAreaDistance(area);
            const apiDataForArea = apiData.find(
              (api) => api.deskname === area.id
            );

            if (apiDataForArea) {
              const waitingTime = Math.round(
                DataService.getTotalWaitTime(apiDataForArea) / 60
              );

              return {
                name: area.name,
                time: distance + waitingTime,
                position: area.position,
              };
            }
          } catch (error) {
            console.error(`영역 ${area.name} 처리 실패:`, error);
          }
        }
        return null;
      });

      const results = await Promise.all(promises);
      recoArray = results.filter((result) => result !== null);
      recoArray.sort((a, b) => a.time - b.time);

      console.log("추천 게이트 계산 완료:", recoArray);
    } catch (error) {
      console.error("추천 게이트 계산 실패:", error);
    }
  };
  const getAreaDistance = async (area) => {
    try {
      const distanceStr = await MapService.getDistance(area);
      return Math.round(
        Number(distanceStr.replace("M", "").replace(",", "")) / 70
      );
    } catch (error) {
      console.error("거리 계산 실패:", error);
      return 0;
    }
  };
  const changeMenu = async (idx = 0) => {
    try {
      boardingGateNum = sessionStorage.getItem("boardingGate");
      const menuBtn = document.getElementsByClassName("menuBtn");
      const controls = document.getElementById("controls");

      if (!menuBtn || !controls) {
        console.error("필요한 DOM 요소를 찾을 수 없습니다.");
        return;
      }

      if (idx === 0) {
        await handleFirstMenu(menuBtn, controls);
      } else {
        await handleSecondMenu(menuBtn, controls);
      }
    } catch (error) {
      console.error("메뉴 변경 실패:", error);
    }
  };
  const handleFirstMenu = async (menuBtn, controls) => {
    try {
      menuBtn[0].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[1].style.setProperty("border-bottom", "1px solid #2121221A");

      controls.innerHTML = createFirstMenuHTML();

      await timereset();
      await setupGateEventListeners();
    } catch (error) {
      console.error("첫 번째 메뉴 처리 실패:", error);
    }
  };
  const handleSecondMenu = async (menuBtn, controls) => {
    try {
      menuBtn[1].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[0].style.setProperty("border-bottom", "1px solid #2121221A");

      // 시간 처리
      if (hour > 12) {
        hour = hour - 12;
        ampm = language["pm"];
      }

      // 출국장 이름들 번역
      departurehall = [];
      const translationPromises = recoArray
        .slice(0, 3)
        .map((reco) => transName(reco.name));
      departurehall = await Promise.all(translationPromises);

      const innerHTML = createSecondMenuHTML();
      controls.innerHTML = innerHTML;

      await trainShow();
      await setupRecommendationEvents();
    } catch (error) {
      console.error("두 번째 메뉴 처리 실패:", error);
    }
  };
  const createFirstMenuHTML = () => {
    return `<div class="tabs">
      <table>
        <tr>
          <th id="congestionEx">•${language["departureHallCongestion"]}<span id="questionMark">?</span></th>
          <th><p id="nTime"></p></th>
        </tr>
      </table>
    </div>
    <table id="contents">
      <tr class="gate">
        <th>${language["gate2"]}</th>
        <th class="eastWest"></th>
        <th class="eastWest"></th>
      </tr>
      <tr class="gate">
        <th>${language["gate3"]}</th>
        <th class="eastWest"></th>
        <th class="eastWest"></th>
      </tr>
      <tr class="gate">
        <th>${language["gate4"]}</th>
        <th class="eastWest"></th>
        <th class="eastWest"></th>
      </tr>
      <tr class="gate">
        <th>${language["gate5"]}</th>
        <th class="eastWest"></th>
        <th class="eastWest"></th>
      </tr>
    </table>`;
  };
  const createSecondMenuHTML = () => {
    return `<div class="recoContainer">
      <div class="title">
        <div id="title-text">${language["estimatedTime"]}</div>
        <div class="total-time">${language["total"]} - ${language["minute"]}</div>
      </div>
      <div class="segment">
        <img class="icon" src="./images/walk.png" />
        <span class="flag">${language["transfer"]}</span>
        <div id="reco-priority" class="segment-inner">
          <span id="selectHall">${language["selectHall"]}<small></small><img id="down" src="./images/dropDown.svg"></span>
        </div>
        <div class="time-info">
          <span class="latingTime">-${language["minute"]}</span>
        </div>
      </div>
      <div class="segment">
        <img class="icon" src="./images/ticket.png" />
        <span class="flag">${language["Immigration"]}</span>
        <div class="segment-inner">
          <span>${language["waitingTime"]}<small></small></span>
        </div>
        <div class="time-info">
          <span class="latingTime">-${language["minute"]}</span>
        </div>
      </div>
      <div class="segment">
        <img class="icon" src="./images/ticket.png" />
        <span class="flag">${language["Immigration"]}</span>
        <div class="segment-inner">
          <span>${language["immigration"]}</span>
        </div>
        <div class="time-info">
          <span class="latingTime">-${language["minute"]}</span>
        </div>
      </div>
      <div class="segment" id="trainAlert">
        <img class="icon" src="./images/train.svg"/>
        <div>${language["needTrain"]}</div>
        <span>10${language["minute"]}</span>
      </div>
      <div class="segment">
        <img class="icon" src="./images/walk.png" />
        <span class="flag">${language["walk"]}</span>
        <div id="segment-check" class="segment-inner">
          <span id="boardingGateCheck" style="display:flex;align-items:center;justify-content:center">
            ${language["boardingGate"]} : <span style="color:#2E90FA">${boardingGateNum}</span>
            <img src="./images/pen.svg" style="height:1rem;width:1rem">
          </span>
        </div>
        <div class="time-info">
          <span class="latingTime">-${language["minute"]}</span>
        </div>
      </div>
    </div>`;
  };
  const setupRecommendationEvents = async () => {
    try {
      const priority = document.getElementById("reco-priority");
      const boardingGateCheck = document.getElementById("boardingGateCheck");

      if (boardingGateCheck) {
        boardingGateCheck.addEventListener("click", () => {
          const modal = document.getElementById("modal-background");
          if (modal) {
            modal.style.display = "flex";
          }
        });
      }

      if (priority) {
        priority.addEventListener("click", async () => {
          await handlePriorityClick(priority);
        });
      }

      await updateRecommendationRanks();
    } catch (error) {
      console.error("추천 이벤트 설정 실패:", error);
    }
  };
  const handlePriorityClick = async (priority) => {
    try {
      const reco = document.getElementById("reco-select");
      if (!reco) return;

      reco.style.left = priority.getBoundingClientRect().left + "px";
      reco.style.top = priority.getBoundingClientRect().top + 35 + "px";

      if (reco.style.display === "none" || !reco.style.display) {
        reco.style.display = "flex";
        await selectEvent();

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
    } catch (error) {
      console.error("우선순위 클릭 처리 실패:", error);
    }
  };
  const updateRecommendationRanks = async () => {
    try {
      const ranks = [language["first"], language["second"], language["third"]];
      const recoRank = document.getElementsByClassName("reco-rank");

      Array.from(recoRank).forEach((rank, idx) => {
        if (idx < departurehall.length) {
          rank.innerHTML = `<div>${departurehall[idx]} <small>(${ranks[idx]})</small></div>`;
        }
      });
    } catch (error) {
      console.error("추천 순위 업데이트 실패:", error);
    }
  };
  const trainShow = async () => {
    return new Promise((resolve) => {
      try {
        const train = document.getElementById("trainAlert");
        if (boardingGateNum > 100 && boardingGateNum < 133) {
          train.style.display = "flex";
        }
        resolve();
      } catch (error) {
        console.error("train 표시 실패 : ", error);
        resolve();
      }
    });
  };

  const selectEvent = async () => {
    try {
      const ranks = [language["first"], language["second"], language["third"]];
      const recoRanks = document.getElementsByClassName("reco-rank");
      Array.from(recoRanks).forEach((reco, idx) => {
        reco.addEventListener("click", async () => {
          try {
            await estimated(idx);
            await updateSelectedHall(idx, ranks);
            await updateRankDisplay(idx, ranks);
          } catch (error) {
            console.log("선택 이벤트 처리 실패 : ", index, error);
          }
        });
      });
    } catch (error) {
      console.error("선택 이벤트 설정 실패 : ", error);
    }
  };
  const updateSelectedHall = async (idx, ranks) => {
    try {
      const reco = document.getElementById("reco-select");
      const selectHall = document.getElementById("selectHall");

      if (reco) reco.style.display = "none";

      if (selectHall && recoArray[idx]) {
        const departure = recoArray[idx].name.replace("출국장", "").split(" ");
        const eastWest =
          departure[1] === "동편" ? language["east"] : language["west"];

        selectHall.innerHTML = `${language["departurehall"]} : <span style="color:#2E90FA">${departure[0]} ${eastWest}</span><small></small><img id="down" src="./images/dropDown.svg">`;
      }
    } catch (error) {
      console.error("선택된 홀 업데이트 실패:", error);
    }
  };
  const updateRankDisplay = async (selectedIdx, ranks) => {
    try {
      const recoRanks = document.getElementsByClassName("reco-rank");

      [0, 1, 2].forEach((index) => {
        if (index < recoRanks.length && index < departurehall.length) {
          if (index === selectedIdx) {
            recoRanks[
              index
            ].innerHTML = `<div style="display:flex; align-items: center;justify-content: center">${departurehall[index]} <small>(${ranks[index]})</small><img src="./images/check.svg" style="height:1.25rem;width:1.25rem; margin-left:auto"></div>`;
          } else {
            recoRanks[
              index
            ].innerHTML = `<div style="display:flex; align-items: center;justify-content: center">${departurehall[index]} <small>(${ranks[index]})</small></div>`;
          }
        }
      });
    } catch (error) {
      console.error("순위 표시 업데이트 실패:", error);
    }
  };
  const estimated = async (idx) => {
    try {
      const datas = DataService.getAllAreas();
      const apiData = DataService.getApiData();
      const foundData = datas.find((data) => data.name === recoArray[idx].name);
      const foundApi = apiData.find((data) => data.deskname === foundData.id);

      if (!foundData || !foundApi) {
        console.error("data를 찾을 수 없습니다");
        return;
      }
      const times = await calculateAllTimes(foundData, foundApi);
      await updateTimeDisplay(times);
    } catch (error) {
      console.error("예상 시간 계산 실패 : ", error);
    }
  };
  const calculateAllTimes = async (foundData, foundApi) => {
    try {
      let totalTime = 0;

      // 홀까지 이동 시간
      const distanceStr = await MapService.getDistance(foundData);
      const distance = Number(distanceStr.replace("M", "").replace(",", ""));
      const hallTime = Math.floor(distance / 60);
      totalTime += hallTime;

      const hallWaiting =
        hallTime > 60
          ? `${Math.floor(hallTime / 60)}${language["hour"]} ${hallTime % 60}${
              language["minute"]
            }`
          : `${hallTime}${language["minute"]}`;

      // 탑승구까지 이동 시간
      const boardingDistance = await MapService.getBoardingDistance(foundData);
      const boardingTime = Math.floor(boardingDistance / 60);
      totalTime += boardingTime;

      const boardingTimeStr =
        boardingGateNum > 100
          ? `${boardingTime - 10}${language["minute"]}`
          : `${boardingTime}${language["minute"]}`;

      // 대기 시간
      const waitTime = foundApi.espwaittime === "D" ? 0 : foundApi.espwaittime;
      const waitingMinutes = Math.floor(waitTime / 60);
      totalTime += waitingMinutes;
      const waitingTime = `${waitingMinutes}${language["minute"]}`;

      // 출입국 시간
      const immigrationTotal =
        foundApi.immigrationtime === "NA"
          ? 60
          : foundApi.immigrationtime * foundApi.quelength;
      const immigrationMinutes = Math.floor(immigrationTotal / 60);
      totalTime += immigrationMinutes;

      const immigration =
        immigrationTotal > 3600
          ? `${Math.floor(immigrationTotal / 3600)}${
              language["hour"]
            } ${Math.floor((immigrationTotal % 3600) / 60)}${
              language["minute"]
            }`
          : `${immigrationMinutes}${language["minute"]}`;

      // 총 시간
      const strTotal =
        totalTime > 60
          ? `${Math.floor(totalTime / 60)}${language["hour"]} ${
              totalTime % 60
            }${language["minute"]}`
          : `${totalTime}${language["minute"]}`;

      return {
        total: strTotal,
        times: [hallWaiting, waitingTime, immigration, boardingTimeStr],
      };
    } catch (error) {
      console.error("시간 계산 실패:", error);
      return {
        total: `0${language["minute"]}`,
        times: [
          `0${language["minute"]}`,
          `0${language["minute"]}`,
          `0${language["minute"]}`,
          `0${language["minute"]}`,
        ],
      };
    }
  };
  const updateTimeDisplay = async (timeData) => {
    try {
      const total = document.getElementsByClassName("total-time");
      const latingTime = document.getElementsByClassName("latingTime");

      if (total[0]) {
        total[0].innerText = timeData.total;
      }

      Array.from(latingTime).forEach((time, idx) => {
        if (idx < timeData.times.length) {
          time.innerHTML = "";
          time.innerText = timeData.times[idx];
        }
      });
    } catch (error) {
      console.error("시간 표시 업데이트 실패:", error);
    }
  };
  const translateMenu = async () => {
    let menuBtn;
    let conEx;
    try {
      menuBtn = Array.from(document.getElementsByClassName("menuBtn"));
      conEx = document.getElementById("congestionEx");
    } catch (error) {
      console.error("시간 표시 업데이트 실패 :", error);
    }
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
    const viewportHight = window.innerHeight;
    const hiddenHeight = sheetHeight - peekHeight;
    const closedRem = -pxToRem(hiddenHeight);
    if (closedRem > 0) {
      POSITIONS.CLOSED = -2;
    } else {
      const maxHiddenRem = -pxToRem(viewportHight);
      POSITIONS.CLOSED = Math.max(closedRem, maxHiddenRem);
    }
    POSITIONS.OPEN = 5;

    if (POSITIONS.CLOSED > 0 || POSITIONS.CLOSED < -30) {
      POSITIONS.CLOSED = -10;
    }

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
    const minPosition = Math.max(POSITIONS.CLOSED - 3, -25); // 안전한 최소값
    const maxPosition = Math.min(POSITIONS.OPEN + 1, 2); // 안전한 최대값

    newBottom = Math.max(minPosition, Math.min(maxPosition, newBottom));
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
      console.log(position);
      const distance = Math.abs(currentBottom - position);
      if (distance < minDistance) {
        console.log("min,distance : ", distance);
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
    currentBottom = POSITIONS.OPEN;
    updatePosition(POSITIONS.OPEN);
    currentPosition = POSITIONS.OPEN;
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
    init: async () => {
      try {
        getElement();
        initialize();
        bottomSheetEvent();
        console.log("bottomSheet 초기화 완료");
      } catch (error) {
        console.error("bottomSheet 초기화 실패 : ", error);
      }
    },
    recoGate: async () => {
      try {
        await recoGate();
      } catch (error) {
        console.error("추천 게이트 설정 실패 : ", error);
      }
    },
    languageChan: (lang) => {
      language = lang;
    },
    changeMenu: async (idx) => {
      try {
        changeMenu(idx);
      } catch (error) {
        console.error("메뉴 변경 실패 : ", error);
      }
    },
    translateMenu: async () => {
      try {
        await translateMenu();
      } catch (error) {
        console.error("메뉴 번역 실패:", error);
      }
    },

    trainShow: async () => {
      try {
        await trainShow();
      } catch (error) {
        console.error("기차 표시 실패:", error);
      }
    },

    showGateCongestion: async () => {
      try {
        await showGateCongestion();
      } catch (error) {
        console.error("게이트 혼잡도 표시 실패:", error);
      }
    },

    updateTimeDisplay: async (timeData) => {
      try {
        await updateTimeDisplay(timeData);
      } catch (error) {
        console.error("시간 표시 업데이트 실패:", error);
      }
    },

    calculateEstimatedTime: async (idx) => {
      try {
        await estimated(idx);
      } catch (error) {
        console.error("예상 시간 계산 실패:", error);
      }
    },

    setupRecommendationEvents: async () => {
      try {
        await setupRecommendationEvents();
      } catch (error) {
        console.error("추천 이벤트 설정 실패:", error);
      }
    },

    // 강제 위치 변경 함수
    forceOpen: () => {
      currentPosition = POSITIONS.OPEN;
      updatePosition(POSITIONS.OPEN);
    },

    forceClose: () => {
      currentPosition = POSITIONS.CLOSED;
      updatePosition(POSITIONS.CLOSED);
    },

    changeBorderColor: (index) => {
      changeBorderColor();
    },
    resetAllBorderColor: () => {
      resetAllBorderColor();
    },
    animateToPosition: (position) => {
      return new Promise((resolve) => {
        bottomSheet.style.transition = "bottom 0.3s ease";
        updatePosition(position);
        currentPosition = position;

        setTimeout(() => {
          resolve();
        }, 300);
      });
    },
  };
})();
