import Logger from "../utility/logger.js";

// 에러 정보 처리 클래스
class ErrorPageHandler {
  constructor() {
    this.errorInfo = null;
    this.init();
  }

  // 초기화
  init() {
    // 약간의 지연 후 에러 정보 로드 (로딩 애니메이션 표시)
    setTimeout(() => {
      this.loadErrorInfo();
      this.displayErrorInfo();
    }, 500);
  }

  // URL에서 에러 정보 추출
  loadErrorInfo() {
    const urlParams = JSON.parse(sessionStorage.getItem("errorData"));
    console.log(urlParams);
    this.errorInfo = {
      errorCode: urlParams.errorCode || urlParams.code || "NETWORK_ERROR",
      errorMessage:
        urlParams.errorMessage ||
        urlParams.originalError ||
        "네트워크 연결을 확인해주세요.",
      timestamp: urlParams.timestamp || new Date().toISOString(),
      type: urlParams.type || "NETWORK_ERROR",
    };

    Logger.log("받은 에러 정보:", this.errorInfo);
  }

  // 에러 정보를 화면에 표시
  displayErrorInfo() {
    const { errorCode, errorMessage, timestamp, type } = this.errorInfo;
    // 에러 코드별 제목 설정
    const titleMap = {
      404: "페이지를 찾을 수 없습니다",
      //   408: "요청 시간이 초과되었습니다",
      500: "서버 내부 오류가 발생했습니다",
      //   504: "게이트웨이 시간 초과",
      NETWORK_ERROR: "네트워크 연결 오류",
      LOCATION_ERROR: "위치 오류",

      //   UNKNOWN: "알 수 없는 오류",
    };

    // 에러 코드별 권장 조치
    const suggestionMap = {
      404: "주소를 확인하거나 홈페이지로 돌아가세요.",
      //   408: "네트워크 연결을 확인하고 다시 시도해주세요.",
      500: "잠시 후 다시 시도해주세요. 문제가 지속되면 관리자에게 문의하세요.",
      //   504: "네트워크 연결을 확인하고 다시 시도해주세요.",
      NETWORK_ERROR: "인터넷 연결 상태를 확인하고 다시 시도해주세요.",
      LOCATION_ERROR: "GPS 연결 상태를 확인하고 다시 시도해주세요",
      //   UNKNOWN: "페이지를 새로고침하거나 관리자에게 문의해주세요.",
    };

    const errors = document.getElementsByClassName("glitch");
    const message = document.querySelector(".message-container h2");
    const suggestion = document.querySelector(".message-container p");

    for (let i = 0; i < 3; i++) {
      errors[i].textContent = errorCode;
    }

    message.innerHTML = errorMessage;
    suggestion.innerHTML =
      titleMap[errorCode] + "<br>" + suggestionMap[errorCode];

    // 에러 로깅 (개발 환경)
    this.logError();
  }

  // 에러 로깅
  logError() {
    const errorEntry = {
      ...this.errorInfo,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      viewedAt: new Date().toISOString(),
    };


    // 개발 환경에서 콘솔에 상세 정보 출력
    Logger.log("에러 코드:", this.errorInfo.errorCode);
    Logger.log("에러 메시지:", this.errorInfo.errorMessage);
    Logger.log("발생 시간:", this.errorInfo.timestamp);
    Logger.log("에러 타입:", this.errorInfo.type);
    Logger.log("사용자 에이전트:", navigator.userAgent);
    Logger.log("이전 페이지:", document.referrer);
  }
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  new ErrorPageHandler();
});
