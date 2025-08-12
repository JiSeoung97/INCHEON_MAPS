import axios from "axios";

// 설정 객체를 인자로 받아, 그에 맞는 axios 인스턴스를 생성하는 함수
function createAxiosInstance(config) {
  const instance = axios.create({
    baseURL: config.API_BASE_URL, // 서버에서 받은 baseURL 사용
    timeout: 5000,
    headers: {
      accessKey: config.API_KEY, // 서버에서 받은 API 키 사용
      type: "json",
    },
  });
  return instance;
}

// 이 함수를 다른 파일에서 사용할 수 있도록 export 합니다.
export default createAxiosInstance;
