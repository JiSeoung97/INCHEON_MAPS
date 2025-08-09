import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://big.airport.kr:8443/api,/service/DptgtSnsrDatT1/dptgtsnsrdatt1",
  timeout: 5000,
  headers: {
    accessKey: "",
    type: "json",
    dataTime: "",
  },
});
