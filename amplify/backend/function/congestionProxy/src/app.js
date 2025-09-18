/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["AIR_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const axios = require('axios'); // axios를 import 합니다.

// 새로운 express 앱을 선언합니다.
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// 모든 메소드에 CORS를 활성화합니다.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// 인천공항 API를 위한 프록시 경로입니다.
app.get('/airport/getDepartureCongestion', async (req, res) => {
  try {
    // API_BASE_URL과 AIR_API_KEY는 나중에 람다 함수 환경변수로 설정할 것입니다.
    const targetUrl = `${process.env.API_BASE_URL}${req.path}`;

    const response = await axios.get(targetUrl, {
      params: { ...req.query, serviceKey: process.env.AIR_API_KEY },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: 'Failed to fetch data from the upstream API.' });
  }
});

app.listen(3000, function() {
    console.log("App started");
});

module.exports = app;