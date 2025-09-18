// 설정 객체를 인자로 받아, 그에 맞는 axios 인스턴스를 생성하는 함수
function createAxiosInstance(config) {
  const instance = axios.create({
    baseURL: "https://f7zndrait3.execute-api.ap-northeast-2.amazonaws.com/dev", // 새로 생성된 API Gateway 주소
    timeout: 5000,
    headers: {
      type: "json",
    },
  });
  console.log("instance생성완료");
  return instance;
}

// 이 함수를 다른 파일에서 사용할 수 있도록 export 합니다.
export default createAxiosInstance;
