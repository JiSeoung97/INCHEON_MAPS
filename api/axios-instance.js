function createAxiosInstance(config) {
  const instance = axios.create({
    baseURL: "https://wiki.urcode.link/api/v1/airport/congestion/departure", // 새로 생성된 API Gateway 주소
    timeout: 5000,
    headers: {},
  });
  return instance;
}

export default createAxiosInstance;
