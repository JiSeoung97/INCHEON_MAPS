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

export default createAxiosInstance;
