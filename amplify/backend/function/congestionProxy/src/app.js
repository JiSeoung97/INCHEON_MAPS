/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const axios = require("axios");

// 새로운 express 앱을 선언합니다.
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// CORS 설정
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// 환경 설정 엔드포인트 추가
app.get("/api/config", (req, res) => {
  console.log("=== /api/config 호출됨 ===");
  // 프로덕션 환경에서는 민감한 정보를 노출하지 않고 필요한 정보만 제공
  res.json({
    ENV_MODE: "production",
    API_BASE_URL: "", // 프론트엔드는 이미 API Gateway URL을 알고 있음
    API_KEY: "", // 보안상 제공하지 않음
  });
});

// 인천공항 API를 위한 프록시 경로입니다.
app.get("/api/airport/getDepartureCongestion", async (req, res) => {
  try {
    // proxy.js와 동일한 방식으로 경로 구성
    const targetUrl = `${process.env.API_BASE_URL}${req.path.replace(
      "/api/airport",
      ""
    )}`;

    console.log("=== API 호출 디버깅 ===");
    console.log("Environment API_BASE_URL:", process.env.API_BASE_URL);
    console.log("Request path:", req.path);
    console.log("Target URL:", targetUrl);
    console.log("Service Key exists:", !!process.env.AIR_API_KEY);
    console.log("Request Query:", req.query);

    const params = {
      ...req.query,
      serviceKey: process.env.AIR_API_KEY,
      terminalId: req.query.terminalId || "P01", // 기본값 제1터미널
      type: req.query.type || "json",
      numOfRows: req.query.numOfRows || 20,
      pageNo: req.query.pageNo || 1,
    };

    console.log("Final params:", params);

    const response = await axios.get(targetUrl, {
      params: params,
      timeout: 15000, // 15초 타임아웃
    });

    console.log("API Response Status:", response.status);
    console.log(
      "Response Data Preview:",
      JSON.stringify(response.data).substring(0, 200) + "..."
    );

    res.json(response.data);
  } catch (error) {
    console.error("=== Proxy Error Details ===");
    console.error("Error Message:", error.message);

    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);

      res.status(error.response.status).json({
        error: "API call failed",
        details: error.response.data,
        status: error.response.status,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error("No response received");
      res.status(503).json({
        error: "No response from upstream API",
        message: error.message,
      });
    } else {
      console.error("Request setup error:", error.message);
      res.status(500).json({
        error: "Failed to process request",
        message: error.message,
      });
    }
  }
});

// 환경변수 확인용 디버그 엔드포인트 (개발용)
app.get("/api/debug/env", (req, res) => {
  res.json({
    status: "healthy",
    hasApiBaseUrl: !!process.env.API_BASE_URL,
    apiBaseUrlPrefix: process.env.API_BASE_URL
      ? process.env.API_BASE_URL.substring(0, 30) + "..."
      : "not set",
    hasApiKey: !!process.env.AIR_API_KEY,
    region: process.env.REGION,
    env: process.env.ENV,
  });
});

// 헬스체크 엔드포인트
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
