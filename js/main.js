"use strict";

$(document).ready(async () => {
  try {
    await MapService.savedLocation();
    const map = MapService.init();
  } catch {
    alert("위치 권한을 허용하지 않아 지도 기능이 일부 제한될 수 있습니다.");
    const map = MapService.init();
  }
  MapService.showMarkers();
  MapService.showBScongestion();
  MapService.timereset();
  if (sessionStorage.getItem("render")) {
    MapService.modalOpen();
  }
  sessionStorage.setItem("render", true);
  let btnIdx = 0;
  $(".menuBtn").click((e) => {
    btnIdx = Number(e.currentTarget.dataset.idx);
    MapService.changeMenu(btnIdx);
    console.log(btnIdx);
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
      console.log("here");
      CongestionService.render();
    }
  });
  $("#modalClose").click(() => {
    MapService.modalClose();
  });

  $("#reco").click(() => {
    console.log("버튼은 눌림");
    window.open("http://www.naver.com");
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
    });
  });

  $("#requestLocation").click(() => {
    MapService.moveToUserLocation();
    MapService.toggleCongestion();
    MapService.timereset();

    MapService.changeMenu(btnIdx);
    console.log(btnIdx);
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

  Logger.log("네이버 지도 API 프로토타입이 시작되었습니다.");
  Logger.log(
    "지도가 초기화되었습니다. '마커 추가하기' 버튼을 클릭하여 시작하세요."
  );
});
