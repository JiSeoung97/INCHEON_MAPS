export class LocationError extends Error {
  /**
   * @param {string} message - 에러 메시지
   * @param {string} code - 에러를 식별하기 위한 코드 (예: PERMISSION_DENIED)
   */
  constructor(message) {
    // 1. 부모 클래스(Error)의 생성자를 호출합니다.
    super(message);

    // 2. 에러 이름을 클래스 이름과 동일하게 설정합니다. (디버깅 시 유용)
    this.name = "LOCATION_ERROR";

    // 3. 커스텀 에러에만 필요한 추가 정보를 담습니다.
    this.code = "LOCATION_ERROR";
    this.status = "LOCATION_ERROR";
  }
}

/**
 * API 통신과 관련된 에러를 나타내는 커스텀 에러 클래스
 */
export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "API_ERROR";
    this.statusCode = statusCode; // HTTP 상태 코드를 담을 수 있습니다.
  }
}
