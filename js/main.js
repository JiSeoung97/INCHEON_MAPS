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
import DataService from "./service/dataService.js";

$(document).ready(async () => {
  utLocation.init();

  await DataService.initData();
  let map;
  let boardingGate = sessionStorage.getItem("boardingGate");
  let btnIdx = 0;
  const initializeServices = async () => {
    try {
      sessionStorage.setItem("render", true);
      map = await MapService.init();
      if (!map) {
        throw new Error("지도 초기화 실패");
      }

      PolylineService.init();
      await MapService.setting();
      Logger.log("MapService 설정 완료");
      initBottomSheet();
      await initCustomControl();
      await initModalService();
      Logger.log("map, modal init 완료");

      return { success: true, hasLocation: true };
    } catch (error) {
      Logger.error("위치 권한 없음 : ", error);
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
  const initBottomSheet = async () => {
    try {
      Logger.log("bottomSheet init");
      await BottomSheet.init();
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
        }, 50);
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
          await BottomSheet.openRecoGate();
          CustomControl.init();
          BottomSheet.changeMenu(1);
          await MarkerService.showMarkers();
          // UI 업데이트
          updateBoardingGateUI();
          // 위치는 백그라운드에서 처리하므로 세션에서 가져옴
          const savedLocation = sessionStorage.getItem("myLocation");
          if (savedLocation) {
            const loca = JSON.parse(savedLocation);
            if (PolylineService.getBoardingPolyline() != null) {
              await PolylineService.updatePolyline(loca, boardingGate);
              Logger.log("polyline update");
            } else {
              await PolylineService.createBoardingPolyline(boardingMarker);
              PolylineService.setPolyline();
              Logger.log("polyline create");
            }
          } else {
            Logger.log("위치 정보 대기 중, 폴리라인은 나중에 생성됩니다");
          }
          ModalService.boardingModalClose();
        }
      } catch (error) {
        Logger.error("탑승구 확인 처리 오류:", error);
        MapService.alertGateNumCheck();
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
    $("#trainClose").click(() => {
      ModalService.trainCenterModalClose();
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
          PolylineService.selectPolyline(index);
        } catch (error) {
          Logger.error(`게이트 ${index} 클릭 처리 오류:`, error);
        }
      });
    });
  };

  // 백그라운드 위치 로딩 함수
  const startBackgroundLocationLoading = async () => {
    Logger.log("📍 백그라운드에서 위치 로딩 시작...");

    try {
      const userLocation = await utLocation.getCurrentPosition();
      Logger.log("✅ 위치 로딩 완료:", userLocation);

      // 탑승구가 설정된 경우 폴리라인 업데이트
      const boardingGate = sessionStorage.getItem("boardingGate");
      if (boardingGate) {
        await PolylineService.updatePolyline(userLocation, boardingGate);
      }
      BottomSheet.showGateCongestion();
    } catch (error) {
      Logger.log("⚠️ 위치 로딩 실패, 기본 기능으로 계속 진행");
    }
  };
  try {
    Logger.log("애플리케이션 초기화 시작...");

    // await loadConfig();
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
    // 6.
    startBackgroundLocationLoading();
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
