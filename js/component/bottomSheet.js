import Logger from "../utility/logger.js";
import RecoService from "../service/recoService.js";
import DataService from "../service/dataService.js";
import TimeCalculator from "../utility/timeCalculator.js";
import Translate from "../utility/translate.js";
import Utility from "../utility/utility.js";
import ModalService from "../service/modalService.js";
const BottomSheet = (() => {
  let language;
  let departurehall = [];
  let boardingGateNum = null;
  let recoArray = [];
  const showGateCongestion = async () => {
    try {
      const allAreadata = DataService.getAllAreas();
      const areadata = [];

      allAreadata.forEach((area, idx) => {
        if (idx < 10) {
          areadata.push(area);
        }
      });

      const contentsEl = document.getElementsByClassName("eastWest");
      if (!contentsEl || contentsEl.length === 0) {
        Logger.error("eastWest 요소들을 찾을 수 없습니다.");
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
      RecoService.recoLikeIconView();
    } catch (error) {
      Logger.error("게이트 혼잡도 표시 실패:", error);
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
    <div class="like-icon" style="display:none ;justify-content:center;align-items:center;height:1rem;width:1rem;background-color:#32A1FF;position:fixed;transform:translate(10px,-10px);border-radius:50%"><img src="./images/like_icon.svg" style="height:0.7rem;width:0.7rem;border-radius:50%"></div>
      <p class="gatePoint">${direction}</p>
      <h4 style="color:${congestionInfo.textColor}">${congestionInfo.text}</h4>
    </div>`;
  };
  const changeBorderColor = async (index) => {
    try {
      const allareas = DataService.getAllAreas();
      let idx = index;
      const div = document.querySelectorAll(".eastWest div");

      let eastWest = [];
      div.forEach((a, divIndex) => {
        if (divIndex % 2 == 0) {
          eastWest.push(a);
        }
      });

      eastWest.forEach((divBox, boxIndex) => {
        if (index == boxIndex) {
          divBox.style.setProperty(
            "border-color",
            Utility.congestionColor(allareas[idx])
          );
        } else {
          divBox.style.setProperty("border-color", "#E8E8E8");
        }
      });
    } catch (error) {
      Logger.error("error :", error);
    }
  };
  const resetAllBorderColor = () => {
    const div = document.querySelectorAll(".eastWest div");

    div.forEach((divBox) => {
      divBox.style.setProperty("border-color", "#E8E8E8");
    });
  };
  const setupGateEventListeners = async () => {
    try {
      const moveGate = document.getElementsByClassName("eastWest");
      if (!moveGate || moveGate.length === 0) {
        Logger.error("eastWest 요소들을 찾을 수 없습니다.");
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
            Utility.moveGate(index);
            Utility.openWindowInfo(index);
            await changeBorderColor(index);
          } catch (error) {
            Logger.error(`게이트 ${index} 클릭 처리 오류:`, error);
          }
        });
      });
    } catch (error) {
      Logger.error("게이트 이벤트 리스너 설정 실패:", error);
    }
  };

  const changeMenu = async (idx = 0) => {
    try {
      boardingGateNum = sessionStorage.getItem("boardingGate");
      const menuBtn = document.getElementsByClassName("menuBtn");
      const controls = document.getElementById("controls");

      if (!menuBtn || !controls) {
        Logger.error("필요한 DOM 요소를 찾을 수 없습니다.");
        return;
      }

      if (idx === 0) {
        await handleFirstMenu(menuBtn, controls);
      } else if (boardingGateNum != null) {
        await handleSecondMenu(menuBtn, controls);
      } else {
        ModalService.boardingModalOpen();
      }
    } catch (error) {
      Logger.error("메뉴 변경 실패:", error);
    }
  };
  const handleFirstMenu = async (menuBtn, controls) => {
    try {
      menuBtn[0].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[1].style.setProperty("border-bottom", "1px solid #2121221A");

      controls.innerHTML = createFirstMenuHTML();
      await showGateCongestion();
      await TimeCalculator.timereset();
      await setupGateEventListeners();
    } catch (error) {
      Logger.error("첫 번째 메뉴 처리 실패:", error);
    }
  };
  const handleSecondMenu = async (menuBtn, controls) => {
    try {
      menuBtn[1].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[0].style.setProperty("border-bottom", "1px solid #2121221A");

      departurehall = [];
      const translationPromises = RecoService.getRecoArray()
        .slice(0, 3)
        .map((reco) => Translate.transName(reco.name));
      departurehall = await Promise.all(translationPromises);
      const innerHTML = createSecondMenuHTML();
      controls.innerHTML = innerHTML;

      await trainShow();
      await setupRecommendationEvents();
    } catch (error) {
      Logger.error("두 번째 메뉴 처리 실패:", error);
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
        <th>${language["gate1"]}</th>
        <th class="eastWest"></th>
        <th class="eastWest"></th>
      </tr>
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
    let getLang = sessionStorage.getItem("language");
    let isLongText = getLang == "zh" || getLang == "en" ? `longText` : "";
    return `<div class="recoContainer">
      <div class="title">
        <div id="title-text">${language["estimatedTime"]}</div>
        <div class="total-time">${language["total"]} - ${language["minute"]}</div>
      </div>
      <div class="segment ${isLongText}">
        <img class="icon" src="./images/walk.svg" />
        <span class="flag">${language["transfer"]}</span>
        <div id="reco-priority" class="segment-inner ${isLongText}">
          <span id="selectHall">${language["selectHall"]}<small></small><img id="down" src="./images/dropDown.svg"></span>
        </div>
        <div class="time-info ${isLongText}">
          <span class="latingTime">- ${language["minute"]}</span>
        </div>
      </div>
      <div class="segment">
        <img class="icon" src="./images/ticket.svg" />
        <span class="flag">${language["Immigration"]}</span>
        <div class="segment-inner">
          <span>${language["waitingTime"]}<small></small></span>
        </div>
        <div class="time-info">
          <span class="latingTime">- ${language["minute"]}</span>
        </div>
      </div>
      <div class="segment" id="trainAlert">
        <img class="icon" src="./images/train.svg"/>
        <div>${language["needTrain"]}</div>
        <span>10${language["minute"]}</span>
      </div>
      <div class="segment">
        <img class="icon" src="./images/walk.svg" />
        <span class="flag">${language["walk"]}</span>
        <div id="segment-check" class="segment-inner">
          <span id="boardingGateCheck" style="display:flex;align-items:center;justify-content:center">
            ${language["boardingGate"]} : <span style="color:#2E90FA">${boardingGateNum}</span>
            <img src="./images/pen.svg" style="height:1rem;width:1rem">
          </span>
        </div>
        <div class="time-info">
          <span class="latingTime">- ${language["minute"]}</span>
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
          ModalService.boardingModalOpen();
        });
      }

      if (priority) {
        priority.addEventListener("click", async () => {
          await handlePriorityClick(priority);
        });
      }

      await updateRecommendationRanks();
    } catch (error) {
      Logger.error("추천 이벤트 설정 실패:", error);
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
      Logger.error("우선순위 클릭 처리 실패:", error);
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
      Logger.error("추천 순위 업데이트 실패:", error);
    }
  };
  const trainShow = async () => {
    return new Promise((resolve) => {
      try {
        const train = document.getElementById("trainAlert");
        const seg = document.getElementsByClassName("segment");
        const lastChild = seg.length - 1;
        if (boardingGateNum > 100 && boardingGateNum < 133) {
          train.style.display = "flex";
          seg[lastChild].classList.add("train");
        }
        resolve();
      } catch (error) {
        Logger.error("train 표시 실패 : ", error);
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
            Logger.log("선택 이벤트 처리 실패 : ", index, error);
          }
        });
      });
    } catch (error) {
      Logger.error("선택 이벤트 설정 실패 : ", error);
    }
  };
  const updateSelectedHall = async (idx) => {
    try {
      const reco = document.getElementById("reco-select");
      const selectHall = document.getElementById("selectHall");
      const latingTime = document.getElementsByClassName("latingTime");
      const lang = sessionStorage.getItem("language");
      if (lang == "en" || lang == "zh") {
        latingTime[0].classList.add("longText");
      }
      if (reco) reco.style.display = "none";

      if (selectHall && recoArray[idx]) {
        const departure = recoArray[idx].name.replace("출국장", "").split(" ");
        const eastWest =
          departure[1] === "동편" ? language["east"] : language["west"];

        selectHall.innerHTML = `${language["departurehall"]} : <span style="color:#2E90FA">${departure[0]} ${eastWest}</span><small></small><img id="down" src="./images/dropDown.svg">`;
      }
    } catch (error) {
      Logger.error("선택된 홀 업데이트 실패:", error);
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
      Logger.error("순위 표시 업데이트 실패:", error);
    }
  };
  const estimated = async (idx) => {
    try {
      const datas = DataService.getAllAreas();
      const apiData = DataService.getApiData();
      const foundData = datas.find((data) => data.name === recoArray[idx].name);
      const foundApi = apiData.find((data) => data.gateId === foundData.id);

      if (!foundData || !foundApi) {
        Logger.error("data를 찾을 수 없습니다");
        return;
      }
      const times = await TimeCalculator.calculateAllTimes(foundData, foundApi);
      await TimeCalculator.updateTimeDisplay(times);
    } catch (error) {
      Logger.error("예상 시간 계산 실패 : ", error);
    }
  };

  return {
    init: async () => {
      recoArray = await RecoService.recoGate();
    },
    languageChan: (lang) => {
      language = lang;
    },
    changeMenu: async (idx) => {
      try {
        await changeMenu(idx);
      } catch (error) {
        Logger.error("메뉴 변경 실패 : ", error);
      }
    },

    trainShow: async () => {
      try {
        await trainShow();
      } catch (error) {
        Logger.error("기차 표시 실패:", error);
      }
    },

    showGateCongestion: async () => {
      try {
        await showGateCongestion();
      } catch (error) {
        Logger.error("게이트 혼잡도 표시 실패:", error);
      }
    },

    setupRecommendationEvents: async () => {
      try {
        await setupRecommendationEvents();
      } catch (error) {
        Logger.error("추천 이벤트 설정 실패:", error);
      }
    },
    changeBorderColor: async (index) => {
      await changeBorderColor(index);
    },
    resetAllBorderColor: () => {
      resetAllBorderColor();
    },
  };
})();

export default BottomSheet;
