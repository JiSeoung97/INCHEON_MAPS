"use strict";

const Translate = (() => {
  let language;
  const transName = async (name) => {
    return new Promise((resolve) => {
      try {
        language = MapService.languageReturn();
        let names = name.split(" ");
        names[0] = names[0].replace("출국장", "");
        let newName = "gate" + names[0];

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
        Logger.error("이름 번역 실패:", error);
        resolve(name); // 원본 이름 반환
      }
    });
  };
  const translateMenu = async () => {
    let menuBtn;
    let conEx;
    language = MapService.languageReturn();
    try {
      menuBtn = Array.from(document.getElementsByClassName("menuBtn"));
      conEx = document.getElementById("congestionEx");
    } catch (error) {
      Logger.error("시간 표시 업데이트 실패 :", error);
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

  return {
    transName: (name) => {
      return transName(name);
    },
    translateMenu: async () => {
      try {
        await translateMenu();
      } catch (error) {
        Logger.error("메뉴 번역 실패:", error);
      }
    },
  };
})();
