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
const axios = require("axios"); // axios를 import 합니다.

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

// 인천공항 API를 위한 프록시 경로입니다.
app.get("/api/airport/getDepartureCongestion", async (req, res) => {
  try {
    const targetUrl = `${process.env.API_BASE_URL}${req.path.replace(
      "/api/airport",
      ""
    )}`;

    console.log("Target URL:", targetUrl);
    console.log("Query params:", req.query);

    const response = await axios.get(targetUrl, {
      params: {
        ...req.query,
        serviceKey: process.env.AIR_API_KEY,
        numOfRows: req.query.numOfRows || 20,
        pageNo: req.query.pageNo || 1,
        type: req.query.type || "json",
      },
      timeout: 10000,
    });
    console.log("API Response status:", response.status);
    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    if (error.response) {
      res.status(error.response.status).json({
        error: "API call failed",
        details: error.response.data,
        status: error.response.status,
      });
    } else if (error.request) {
      res.status(503).json({
        error: "No response from upstream API",
        details: error.message,
      });
    } else {
      res.status(500).json({
        error: "Failed to process request",
        details: error.message,
      });
    }
  }
});

// 헬스체크 엔드포인트 추가
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    environment: {
      hasApiBaseUrl: !!process.env.API_BASE_URL,
      hasApiKey: !!process.env.AIR_API_KEY,
    },
  });
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
