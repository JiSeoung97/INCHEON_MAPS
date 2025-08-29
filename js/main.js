import Logger from "./utility/logger.js";
import utLocation from "./utility/location.js";
import MapService from "./service/mapService.js";
import BottomSheet from "./component/bottomSheet.js";
import CustomControl from "./component/customControl.js";
import ModalService from "./service/modalService.js";
import MarkerService from "./service/markerService.js";
import PolylineService from "./service/polylineService.js";
import ErrorHandler from "./utility/httpError.js";
import Utility from "./utility/utility.js";
import PolylineService from "./service/polylineService.js";
$(document).ready(async () => {
  // ErrorHandler.init();

  let appConfig = {};

  // 서버의 /api/config 경로로 요청을 보내 환경 변수를 가져오는 함수
  const loadConfig = async () => {
    try {
      const response = await fetch("/api/config");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      appConfig = await response.json();
      window.appConfig = appConfig;
      Logger.log("서버 환경 설정 로드 완료:", appConfig);
    } catch (error) {
      Logger.error(
        "서버 환경 설정을 불러오는 데 실패했습니다. 기본 설정으로 실행합니다.",
        error
      );
    }
  };
  let map;
  let boardingGate = sessionStorage.getItem("boardingGate");
  let btnIdx = 0;
  const initializeServices = async () => {
    try {
      sessionStorage.setItem("render", true);
      let userLocation = await utLocation.getCurrentPosition();
      await utLocation.savedLocation(userLocation);
      Logger.log("사용자 위치 저장 완료");
      map = await MapService.init();
      if (!map) {
        throw new Error("지도 초기화 실패");
      }
      await MapService.setting();
      Logger.log("MapService 설정 완료");
      PolylineService.init();
      initBottomSheet();
      await initCustomControl();
      await initModalService();
      Logger.log("map, modal init 완료");

      return { success: true, hasLocation: true };
    } catch (error) {
      Logger.warn("위치 권한 없음 : ", error);
      console.log(error);
      try {
        map = await MapService.init();
        if (!map) {
          throw new Error("지도 초기화 실패");
        }
        await MapService.setting();
        await initCustomControl();

        Logger.log("MapService 설정 완료");

        await Promise.all([initBottomSheet, initModalService]);
        Logger.log("map, modal init 완료");

        return { success: true, hasLocation: false };
      } catch (criticalError) {
        Logger.error("critical initialize error : ", criticalError);
        return { success: false, hasLocation: false, error: criticalError };
      }
    }
  };
  const initBottomSheet = () => {
    try {
      Logger.log("bottomSheet init");
      BottomSheet.init();
    } catch (error) {
      Logger.error("bottomSheet init fail : ", error);
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
        Logger.error("CustomControl init error", error);
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
      Logger.log("마커 표시 완료");
    } catch (error) {
      Logger.error("마커 표시 실패:", error);
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
        Logger.error("첫 번째 메뉴 처리 오류:", error);
      }
    };

    const handleOtherMenuClick = async () => {
      if (boardingGate == null) {
        ModalService.boardingModalOpen();
      } else {
        try {
          BottomSheet.changeMenu(btnIdx);
          Logger.log("메뉴 변경 완료");
        } catch (error) {
          Logger.error("메뉴 변경 오류:", error);
        }
      }
    };

    const handleBoardingGateConfirm = async () => {
      try {
        const gateNum = document.getElementsByClassName("gate-input")[0];
        boardingGate = gateNum.value;
        Logger.log("입력된 탑승구:", boardingGate);

        if (MapService.boardingGateIdx(boardingGate)) {
          Logger.log("유효하지 않은 탑승구");
          MapService.alertGateNumCheck();
          return;
        } else {
          Logger.log("유효한 탑승구로 설정");
          sessionStorage.setItem("boardingGate", boardingGate);
          CustomControl.customControlAllDelete();
          // 서비스 재초기화
          const boardingMarker = await MarkerService.createBoardingMarker(
            boardingGate
          );
          CustomControl.init();
          BottomSheet.changeMenu(1);
          await MarkerService.showMarkers();

          // UI 업데이트
          updateBoardingGateUI();
          if (PolylineService.getBoardingPolyline() != null) {
            await PolylineService.updatePolyline(boardingGate);
            Logger.log("polyline update");
          } else {
            await PolylineService.createBoardingPolyline(boardingMarker);
            PolylineService.setPolyline();
            Logger.log("polyline create");
          }
          ModalService.boardingModalClose();
        }
      } catch (error) {
        Logger.error("탑승구 확인 처리 오류:", error);
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
          Logger.error(`게이트 ${index} 클릭 처리 오류:`, error);
        }
      });
    });
  };
  try {
    Logger.log("애플리케이션 초기화 시작...");

    await loadConfig();
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

    // 5. 초기 게이트 클릭 이벤트 설정
    setupGateClickEvents();
    // BottomSheet.recoLikeIconView();
    Logger.log("네이버 지도 API 프로토타입이 시작되었습니다.");
    Logger.log(
      "지도가 초기화되었습니다. '마커 추가하기' 버튼을 클릭하여 시작하세요."
    );
  } catch (error) {
    Logger.error("애플리케이션 초기화 중 치명적 오류:", error);
    // window.location.href = "errorPage.html";
    Logger.error(
      "애플리케이션을 초기화하는 중 오류가 발생했습니다. 페이지를 새로고침해주세요."
    );
  }
});
