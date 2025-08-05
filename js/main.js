"use strict";

$(document).ready(async () => {
  let map;
  let boardingGate = sessionStorage.getItem("boardingGate");
  let btnIdx = 0;
  const initializeServices = async () => {
    try {
      sessionStorage.setItem("render", true);
      await MapService.savedLocation();
      console.log("사용자 위치 저장 완료");
      map = await MapService.init();
      if (!map) {
        throw new Error("지도 초기화 실패");
      }
      await MapService.setting();
      console.log("MapService 설정 완료");

      initBottomSheet();
      await initCustomControl();
      initModalService();
      console.log("map, modal init 완료");

      return { success: true, hasLocation: true };
    } catch (error) {
      console.warn("위치 권한 없음 : ", error);
      try {
        map = await MapService.init();
        if (!map) {
          throw new Error("지도 초기화 실패");
        }
        await MapService.setting();
        await initCustomControl();

        console.log("MapService 설정 완료");

        await Promise.all([initBottomSheet, initModalService]);
        console.log("map, modal init 완료");

        return { success: true, hasLocation: false };
      } catch (criticalError) {
        console.error("critical initialize error : ", criticalError);
        return { success: false, hasLocation: false, error: criticalError };
      }
    }
  };
  const initBottomSheet = () => {
    try {
      console.log("bottomSheet init");
      BottomSheet.init();
    } catch (error) {
      console.error("bottomSheet init fail : ", error);
    }
  };
  const initCustomControl = async () => {
    return new Promise((resolve) => {
      try {
        setTimeout(async () => {
          await CustomControl.init();
          resolve();
        }, 100);
      } catch (error) {
        console.error("CustomControl init error", error);
      }
    });
  };
  const initModalService = async () => {
    await ModalService.init();
  };

  const handleMarkerDisplay = async () => {
    try {
      setTimeout(async () => {
        await MarkerService.showMarkers();
      }, 100);
      console.log("마커 표시 완료");
    } catch (error) {
      console.error("마커 표시 실패:", error);
    }
  };

  const setupEventListeners = () => {
    const handleFirstMenuClick = async () => {
      try {
        BottomSheet.changeMenu(btnIdx);
        await BottomSheet.showGateCongestion();

        // 게이트 클릭 이벤트 재설정
        setupGateClickEvents();
      } catch (error) {
        console.error("첫 번째 메뉴 처리 오류:", error);
      }
    };

    const handleOtherMenuClick = async () => {
      if (boardingGate == null) {
        const modal = document.getElementById("modal-background");
        modal.style.display = "flex";
      } else {
        try {
          BottomSheet.changeMenu(btnIdx);
          console.log("메뉴 변경 완료");
        } catch (error) {
          console.error("메뉴 변경 오류:", error);
        }
      }
    };

    const handleBoardingGateConfirm = async () => {
      try {
        const modal = document.getElementById("modal-background");
        modal.style.display = "none";

        const gateNum = document.getElementsByClassName("gate-input")[0];
        boardingGate = gateNum.value;
        console.log("입력된 탑승구:", boardingGate);
        console.log(
          "MapService.boardingGateIdx(boardingGate) : ",
          !MapService.boardingGateIdx(boardingGate)
        );
        if (!MapService.boardingGateIdx(boardingGate)) {
          console.log("유효하지 않은 탑승구");
          MapService.alertGateNumCheck();
          return;
        } else {
          console.log("유효한 탑승구로 설정");
          sessionStorage.setItem("boardingGate", boardingGate);
          CustomControl.customControlAllDelete();
          // 서비스 재초기화
          await initCustomControl();
          BottomSheet.changeMenu(1);
          await MarkerService.showMarkers();
          BottomSheet.trainShow();

          // UI 업데이트
          updateBoardingGateUI();
        }
      } catch (error) {
        console.error("탑승구 확인 처리 오류:", error);
        alert("탑승구 설정 중 오류가 발생했습니다.");
      }
    };

    const updateBoardingGateUI = () => {
      const boardingInfo_none = document.getElementById("boardingInfo-none");
      const moveBoardingGate = document.getElementById("moveBoardingGate");

      if (boardingInfo_none != null) {
        boardingInfo_none.style.display = "none";
      }

      if (moveBoardingGate != null) {
        moveBoardingGate.style.display = "flex";
      }
    };

    $(".menuBtn").click(async (e) => {
      try {
        btnIdx = Number(e.currentTarget.dataset.idx);
      } catch (error) {}
      if (btnIdx === 0) {
        await handleFirstMenuClick();
      } else {
        await handleOtherMenuClick();
      }
    });

    $(".modal-close").click(() => {
      ModalService.boardingModalClose();
    });

    $(".confirm-btn").click(async () => {
      await handleBoardingGateConfirm();
    });

    $("#adClose").click(() => {
      console.log("modalClose");
      ModalService.adModalClose();
    });

    $("#reco").click(() => {
      window.open("https://test.drarr0cp4471y.amplifyapp.com/incheon_airport");
    });
  };
  const setupGateClickEvents = () => {
    const moveGate = document.getElementsByClassName("eastWest");

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
          BottomSheet.changeBorderColor(index);
        } catch (error) {
          console.error(`게이트 ${index} 클릭 처리 오류:`, error);
        }
      });
    });
  };
  const handleAdModal = () => {
    if (sessionStorage.getItem("render")) {
      try {
        ModalService.adModalOpen();
        console.log("admodalopen");
      } catch (error) {
        console.error("광고 모달 열기 실패:", error);
      }
    }
    sessionStorage.setItem("render", true);
  };

  if (sessionStorage.getItem("render")) {
    ModalService.adModalOpen();
  }

  try {
    console.log("애플리케이션 초기화 시작...");
    // 1. 서비스 초기화
    const initResult = await initializeServices();

    if (!initResult.success) {
      throw new Error("서비스 초기화 실패: " + initResult.error?.message);
    }

    if (!initResult.hasLocation) {
      alert("위치 권한을 허용하지 않아 지도 기능이 일부 제한될 수 있습니다.");
    }
    // 2. 마커 표시
    await handleMarkerDisplay();

    // 3. 이벤트 리스너 설정
    setupEventListeners();

    // 4. 광고 모달 처리
    handleAdModal();

    // 5. 초기 게이트 클릭 이벤트 설정
    setupGateClickEvents();
    // BottomSheet.recoLikeIconView();
    console.log("네이버 지도 API 프로토타입이 시작되었습니다.");
    console.log(
      "지도가 초기화되었습니다. '마커 추가하기' 버튼을 클릭하여 시작하세요."
    );
  } catch (error) {
    console.error("애플리케이션 초기화 중 치명적 오류:", error);
    alert(
      "애플리케이션을 초기화하는 중 오류가 발생했습니다. 페이지를 새로고침해주세요."
    );
  }
});
