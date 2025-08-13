const dotenv = require("dotenv");
const nodeEnv = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${nodeEnv}` });

// --- 디버깅용 코드 ---
console.log("--- 환경 변수 확인 ---");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("BRANCH:", process.env.BRANCH); // 여기서 'dev'가 출력되어야 합니다.
console.log("--------------------");
// --------------------

const express = require("express");
const path = require("path");

// 1. 환경 변수 설정 (.env 파일 로드)

const app = express();
const PORT = 3000; // 서버를 열 포트 번호

// 2. 프론트엔드에 환경 변수를 전달할 API 경로(Endpoint) 생성
app.get("/api/config", (req, res) => {
  res.json({
    BRANCH: process.env.BRANCH,
    // 필요한 다른 환경 변수들도 여기에 추가
  });
});

app.get("/api/config", (req, res) => {
  res.json({
    BRANCH: process.env.BRANCH,
    API_BASE_URL: process.env.API_BASE_URL,
    API_KEY: process.env.API_KEY,
  });
});

// 3. 현재 폴더의 모든 정적 파일(html, css, js, images 등)을 제공
//    이 부분이 프로젝트 구조 전체를 웹에서 접근 가능하게 해줍니다.
app.use(express.static(path.join(__dirname)));

// 4. 루트 경로('/')로 접속 시 index.html을 보여주도록 설정
app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "development") {
    // 개발 환경일 경우: index.local.html 실행
    res.sendFile(path.join(__dirname, "index.local.html"));
  } else {
    // 그 외 환경(production 등)일 경우: index.html 실행
    res.sendFile(path.join(__dirname, "index.html"));
  }
});

// 5. 서버 실행
app.listen(PORT, () => {
  console.log(
    `✅ Node.js 서버가 http://localhost:${PORT} 에서 실행되었습니다.`
  );
  console.log(`✅ 현재 환경(BRANCH): ${process.env.BRANCH}`);
});
