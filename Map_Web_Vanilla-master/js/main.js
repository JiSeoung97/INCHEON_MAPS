"use strict";

$(document).ready(() => {
  const map = MapService.init();
  MapService.showMarkers();
  MapService.showBScongestion();
  MapService.timereset();
  setTimeout(()=>{
    // MapService.modalOpen();

  },5*1000)
  $(".menuBtn").click((e) => {
    const idx = Number(e.currentTarget.dataset.idx);
    console.log('idx',idx);
    MapService.changeMenu(idx);
    if(idx===0){
      MapService.showBScongestion();
      const moveGate = document.getElementsByClassName('eastWest');
      
    
      Array.from(moveGate).forEach((gate,index)=>{
        gate.addEventListener('click',()=>{
          MapService.moveMap(index);
          MapService.openWindowInfo(index);
          
        })
      })

    }else{
      CongestionService.render();
    }
  });
  $("#resetAll").click(() => {
    location.reload();
  });
  $("#modalClose").click(() => {
    MapService.modalClose();
    setTimeout(()=>{
    MapService.modalOpen();

    },10*1000)
  });
  $("#reco").click(() => {
    console.log('버튼은 눌림')
    window.location.href = 'http://www.naver.com';
  });
  $("#toggleCongestion").click(() => {
    MapService.toggleCongestion();
    MapService.showBScongestion();
  });
  $("#showMenu").click(() => {
    MapService.showBScongestion();
  });
  const moveGate = document.getElementsByClassName('eastWest');
  

  Array.from(moveGate).forEach((gate,index)=>{
    gate.addEventListener('click',()=>{
      MapService.moveMap(index);
      MapService.openWindowInfo(index);
      
    })
  })


  $("#requestLocation").click(() => {
    MapService.moveToUserLocation();
  });

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          Logger.log("위치 권한 확인됨", "success");
        },
        (error) => {
          Logger.log("위치 권한 필요: " + error.message, "warning");

          switch (error.code) {
            case error.PERMISSION_DENIED:
              Logger.log("사용자가 위치 접근 권한을 거부했습니다.", "warning");
              break;
            case error.POSITION_UNAVAILABLE:
              Logger.log("위치 정보를 사용할 수 없습니다.", "error");
              break;
            case error.TIMEOUT:
              Logger.log("위치 정보 요청 시간이 초과되었습니다.", "error");
              break;
            case error.UNKNOWN_ERROR:
              Logger.log("알 수 없는 오류가 발생했습니다.", "error");
              break;
          }
        }
      );
    } else {
      Logger.log("이 브라우저에서는 위치 기능을 지원하지 않음.", "error");
    }
  };

  setTimeout(requestLocationPermission, 2000);

  Logger.log("네이버 지도 API 프로토타입이 시작되었습니다.");
  Logger.log(
    "지도가 초기화되었습니다. '마커 추가하기' 버튼을 클릭하여 시작하세요."
  );
 


});
