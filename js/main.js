"use strict";

$(document).ready(async () => {
  let map;
  let boardingGate = sessionStorage.getItem("boardingGate");
  try {
    await MapService.savedLocation();
    map = MapService.init();
    ModalService.init();
  } catch {
    alert("위치 권한을 허용하지 않아 지도 기능이 일부 제한될 수 있습니다.");
    map = MapService.init();
  }
  MapService.showBScongestion();
  MapService.customControlSetMap();
  MapService.createCustomControl();
  MapService.customControlEvent();
  if (
    !(
      (boardingGate < 101 && boardingGate > 50) ||
      boardingGate > 132 ||
      boardingGate == null ||
      boardingGate == 4 ||
      boardingGate == 5 ||
      boardingGate == 44
    )
  ) {
    MapService.showMarkers();
    MapService.timereset();
  }
  if (sessionStorage.getItem("render")) {
    ModalService.adModalOpen();
  }
  sessionStorage.setItem("render", true);
  let btnIdx = 0;
  $(".menuBtn").click((e) => {
    btnIdx = Number(e.currentTarget.dataset.idx);
    if (btnIdx === 0) {
      MapService.changeMenu(btnIdx);
      MapService.showBScongestion();
      const moveGate = document.getElementsByClassName("eastWest");

      Array.from(moveGate).forEach((gate, index) => {
        gate.addEventListener("click", () => {
          MapService.moveMap(index);
          MapService.openWindowInfo(index);
        });
      });
    } else {
      if (boardingGate == null) {
        const modal = document.getElementById("modal-background");
        modal.style.display = "flex";
      } else {
        MapService.changeMenu(btnIdx);
        console.log("here");
      }
    }
  });
  $(".modal-close").click(() => {
    ModalService.boardingModalClose();
  });
  $(".confirm-btn").click(() => {
    const modal = document.getElementById("modal-background");
    modal.style.display = "none";
    const gateNum = document.getElementsByClassName("gate-input")[0];
    boardingGate = gateNum.value;
    console.log(boardingGate);

    if (
      (boardingGate < 101 && boardingGate > 50) ||
      boardingGate > 132 ||
      boardingGate == null ||
      boardingGate == 4 ||
      boardingGate == 5 ||
      boardingGate == 44
    ) {
      console.log("if");
      MapService.alertGateNumCheck();
    } else {
      console.log("else");
      sessionStorage.setItem("boardingGate", boardingGate);
      const boardingInfo = document.getElementById("boardingInfo");
      const langSelect = document.getElementById("selectlang");
      if (boardingInfo != null) {
        boardingInfo.remove();
      }
      MapService.init();
      MapService.changeMenu(1);
      MapService.showMarkers();
      MapService.trainShow();
      const boardingInfo_none = document.getElementById("boardingInfo-none");
      const moveBoardingGate = document.getElementById("moveBoardingGate");
      if (boardingInfo_none != null) {
        boardingInfo_none.style.display = "none";
      }
      moveBoardingGate.style.display = "flex";
    }
  });
  $("#modalClose").click(() => {
    ModalService.adModalClose();
  });
  $("#moveBoardingGate").click(() => {
    let gateNum = sessionStorage.getItem("boardingGate");
    MapService.moveGate(gateNum);
    MapService.openBoardingWindowInfo(gateNum);
  });

  $("#reco").click(() => {
    window.open("https://test.drarr0cp4471y.amplifyapp.com/incheon_airport");
  });
  $("#toggleCongestion").click(() => {
    MapService.showBScongestion();
  });
  $("#showMenu").click(() => {
    MapService.showBScongestion();
  });
  const moveGate = document.getElementsByClassName("eastWest");

  Array.from(moveGate).forEach((gate, index) => {
    gate.addEventListener("click", () => {
      MapService.moveMap(index);
      MapService.openWindowInfo(index);
      MapService.changeBorderColor(index);
    });
  });

  console.log("네이버 지도 API 프로토타입이 시작되었습니다.");
  console.log(
    "지도가 초기화되었습니다. '마커 추가하기' 버튼을 클릭하여 시작하세요."
  );
});
