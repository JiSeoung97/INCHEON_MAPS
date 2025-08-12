const Logger = {
  /**
   * 일반 정보를 출력하는 로그입니다.
   * 'dev' 환경에서만 콘솔에 표시됩니다.
   * @param {...any} args - console.log와 동일한 인자를 받습니다.
   */
  log: function (...args) {
    // window.appConfig 객체가 존재하고, BRANCH가 'dev'일 때만 실행
    if (window.appConfig?.ENV_MODE === "dev") {
      console.log(...args);
    }
  },

  /**
   * 경고를 출력하는 로그입니다.
   * 'dev' 환경에서만 콘솔에 표시됩니다.
   * @param {...any} args - console.warn과 동일한 인자를 받습니다.
   */
  warn: function (...args) {
    if (window.appConfig?.ENV_MODE === "dev") {
      console.warn(...args);
    }
  },

  /**
   * 에러를 출력하는 로그입니다.
   * ‼️ 중요: 에러는 모든 환경(dev, production)에서 항상 표시되어야
   * 운영 중인 서비스의 문제를 빠르게 파악할 수 있습니다.
   * @param {...any} args - console.error와 동일한 인자를 받습니다.
   */
  error: function (...args) {
    console.error(...args);
  },
};

// 다른 파일에서 import하여 사용할 수 있도록 export 합니다.
export default Logger;
