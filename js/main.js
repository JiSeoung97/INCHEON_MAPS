"use strict";

$(document).ready(() => {
  const map = MapService.init();
  MapService.showMarkers();
  MapService.showBScongestion();
  MapService.timereset();
  if(sessionStorage.getItem('render')){
    MapService.modalOpen();
  }
  sessionStorage.setItem('render',true);
  let btnIdx=0;
  $(".menuBtn").click((e) => {
    btnIdx = Number(e.currentTarget.dataset.idx);
    MapService.changeMenu(btnIdx);
    console.log(btnIdx)
    if(btnIdx===0){
      MapService.showBScongestion();
      const moveGate = document.getElementsByClassName('eastWest');
      
    
      Array.from(moveGate).forEach((gate,index)=>{
        gate.addEventListener('click',()=>{
          MapService.moveMap(index);
          MapService.openWindowInfo(index);
        
        })
      })

    }else{
      console.log('here');
      CongestionService.render();
    }
  });
  $("#modalClose").click(() => {
    MapService.modalClose();
  });
  $("#reco").click(() => {
    console.log('버튼은 눌림')
    window.location.href = 'http://www.naver.com';
  });
  $("#toggleCongestion").click(() => {
    
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
    requestLocationPermission
    MapService.moveToUserLocation();
    MapService.toggleCongestion();
    MapService.timereset();
    if(sessionStorage.getItem('render')){
    MapService.modalOpen();
    }
    
    
    MapService.changeMenu(btnIdx);
    console.log(btnIdx);
    if(btnIdx===0){
      console.log('1번 실행됨')
      MapService.showBScongestion();
      const moveGate = document.getElementsByClassName('eastWest');
    
      Array.from(moveGate).forEach((gate,index)=>{
        gate.addEventListener('click',()=>{
          MapService.moveMap(index);
          MapService.openWindowInfo(index);
        
        })
      })
    }else{
      console.log('2번 실행됨')
      CongestionService.render();
      const tag = document.getElementsByClassName('tag');
      const notag = document.getElementsByClassName('notag');
      console.log(notag);
      
      
    }
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

  Logger.log("네이버 지도 API 프로토타입이 시작되었습니다.");
  Logger.log(
    "지도가 초기화되었습니다. '마커 추가하기' 버튼을 클릭하여 시작하세요."
  );
 


});
