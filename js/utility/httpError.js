import Logger from "./logger.js";

const ErrorHandler = (() => {
  const ERROR_PAGE = "./errorPage.html"; // 에러 발생 시 이동할 페이지

  // 에러 코드에 따른 기본 메시지
  const getErrorMessage = (statusCode) => {
    const messages = {
      404: "요청한 페이지나 리소스를 찾을 수 없습니다.",
      500: "서버 내부에서 오류가 발생했습니다.",
      NETWORK_ERROR: "네트워크 연결을 확인해주세요.",
      LOCATION_ERROR: "인천공항내에서만 이용가능합니다",
      // 필요한 다른 상태 코드 메시지 추가
    };
    return messages[statusCode] || "네트워크 연결을 확인해주세요..";
  };

  /**
   * 에러 정보를 받아 에러 페이지로 리다이렉트시키는 공통 함수
   * @param {Error | object | string} error - 발생한 에러 객체 또는 정보
   */
  const handleGlobalError = (error) => {
    Logger.error("전역 에러 발생:", error);
    console.log(error);
    // 에러 정보 추출
    const statusCode = error?.status || error?.statusCode || "UNKNOWN";
    const message = error?.message || getErrorMessage(statusCode);
    const errorType =
      error instanceof PromiseRejectionEvent
        ? "PROMISE_REJECTION"
        : "GLOBAL_ERROR";

    // URL 파라미터로 에러 정보 전달
    const params = new URLSearchParams({
      errorCode: statusCode,
      errorMessage: message,
      timestamp: new Date().toISOString(),
      type: errorType,
    });

    // 에러 페이지로 이동
    window.location.href = `${ERROR_PAGE}?${params.toString()}`;
  };

  // 전역 에러 핸들러 설정
  const setupGlobalErrorHandlers = () => {
    // 1. Promise 에러 (비동기) 처리
    window.addEventListener("unhandledrejection", (event) => {
      event.preventDefault(); // 브라우저의 기본 에러 처리 방지
      handleGlobalError(event.reason || new Error("Unknown promise rejection"));
    });

    // 2. 일반 자바스크립트 에러 (동기) 처리
    window.onerror = (message, source, lineno, colno, error) => {
      handleGlobalError(error || new Error(message));
      return true; // 브라우저의 기본 에러 처리 방지
    };
  };

  const handleSpecificError = (error) => {
    // 1. 에러에서 상태 코드를 추출합니다. (Axios 에러는 error.response.status에 정보가 있습니다)
    const statusCode =
      error?.response?.status ||
      error?.status ||
      error?.statusCode ||
      "LocationError";
    // 2. 에러 페이지로 보낼 정보를 JSON 객체로 만듭니다.
    const errorDetails = {
      code: statusCode,
      logMessage: `클라이언트에서 처리된 에러가 발생했습니다. (코드: ${statusCode})`,
      originalError: error.message, // 원본 에러 메시지
      timestamp: new Date().toISOString(),
    };

    // 3. sessionStorage에 에러 정보를 저장합니다.
    sessionStorage.setItem("errorData", JSON.stringify(errorDetails));
    // 4. 에러 페이지로 리다이렉트시킵니다.
    Logger.log(`${statusCode} 에러 발생. 에러 페이지로 이동합니다.`);
    window.location.href = `${ERROR_PAGE}`;
  };

  return {
    init: () => {
      setupGlobalErrorHandlers();
      Logger.log("✅ 전역 에러 핸들러가 초기화되었습니다.");
    },
    handleSpecificError: handleSpecificError,
  };
})();

export default ErrorHandler;
