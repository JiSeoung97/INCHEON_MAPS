"use strict";

$(document).ready(async () => {
  let map;
  let boardingGate = sessionStorage.getItem("boardingGate");
  try {
    await MapService.savedLocation();
    map = MapService.init();
  } catch {
    alert("위치 권한을 허용하지 않아 지도 기능이 일부 제한될 수 있습니다.");
    map = MapService.init();
  }
  MapService.showBScongestion();
  if (boardingGate != null) {
    MapService.showMarkers();
    MapService.timereset();
  }
  if (sessionStorage.getItem("render")) {
    MapService.modalOpen();
  }
  // sessionStorage.setItem("render", true);
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
  $(".btn-cancel").click(() => {
    const modal = document.getElementById("modal-background");
    modal.style.display = "none";
  });
  $(".confirm-btn").click(() => {
    const modal = document.getElementById("modal-background");
    modal.style.display = "none";
    const gateNum = document.getElementsByClassName("gate-input")[0];
    boardingGate = gateNum.value;
    console.log(boardingGate);
    sessionStorage.setItem("boardingGate", boardingGate);
    MapService.init();
    MapService.changeMenu(1);
    MapService.showMarkers();
  });
  $("#modalClose").click(() => {
    MapService.modalClose();
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

  $("#requestLocation").click(() => {
    MapService.moveToUserLocation();
    MapService.toggleCongestion();
    MapService.timereset();

    MapService.changeMenu(btnIdx);
    if (btnIdx === 0) {
      MapService.showBScongestion();
      const moveGate = document.getElementsByClassName("eastWest");

      Array.from(moveGate).forEach((gate, index) => {
        gate.addEventListener("click", () => {
          MapService.moveMap(index);
          MapService.openWindowInfo(index);
        });
      });
    } else {
      CongestionService.render();
      const tag = document.getElementsByClassName("tag");
      const notag = document.getElementsByClassName("notag");
    }
    if (sessionStorage.getItem("render")) {
      MapService.modalOpen();
    }
  });

  console.log("네이버 지도 API 프로토타입이 시작되었습니다.");
  console.log(
    "지도가 초기화되었습니다. '마커 추가하기' 버튼을 클릭하여 시작하세요."
  );
});
