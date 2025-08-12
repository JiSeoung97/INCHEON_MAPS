import Logger from "./logger.js";

const HttpError = (() => {
  const HTTP_STATUS_CODES = {
    NOT_FOUND: 404,
    // REQUEST_TIMEOUT: 408,
    INTERNAL_SERVER_ERROR: 500,
    // GATEWAY_TIMEOUTL: 504,
  };
  const ERROR_PAGE = "errorPage.html";

  class HttpError extends Error {
    constructor(message, statuscode, response = null) {
      super(message);
      this.statuscode = statuscode;
      this.response = response;
      this.name = "HttpError";
    }
  }

  const getHttpErrorMessage = (statusCode) => {
    const messages = {
      [HTTP_STATUS_CODES.NOT_FOUND]: "요청한 페이지를 찾을 수 없습니다.",
      //   [HTTP_STATUS_CODES.REQUEST_TIMEOUT]: "요청 시간이 초과되었습니다.",
      [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]:
        "서버 내부 오류가 발생했습니다.",
      //   [HTTP_STATUS_CODES.GATEWAY_TIMEOUT]: "게이트웨이 시간 초과입니다.",
      NETWORK_ERROR: "네트워크 연결을 확인해주세요.",
    };

    return messages[statusCode] || "알 수 없는 HTTP 오류가 발생했습니다.";
  };

  const handleHttpError = (error) => {
    Logger.error("HTTP 오류:", error);

    const errorCode = error.statusCode || error.status || "UNKNOWN";
    const errorMessage = error.message || getHttpErrorMessage(errorCode);

    // URL 파라미터 생성
    const params = new URLSearchParams({
      errorCode: errorCode,
      errorMessage: errorMessage,
      timestamp: new Date().toISOString(),
      type: "HTTP_ERROR",
    });

    // 통합 에러 페이지로 리다이렉트
    window.location.href = `${ERROR_PAGE}?${params.toString()}`;
  };
  // 전역 에러 핸들러 설정
  const setupGlobalErrorHandlers = () => {
    window.addEventListener("unhandledrejection", (event) => {
      if (isHttpError(event.reason)) {
        handleHttpError(event.reason);
        event.preventDefault();
      }
    });
  };

  // 모듈 초기화
  const initHttpErrorHandler = () => {
    setupGlobalErrorHandlers();
    Logger.log("HTTP Error Handler 초기화 완료");
  };
  return {
    initHttpErrorHandler: () => {
      initHttpErrorHandler();
    },
  };
})();
