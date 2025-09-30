// 필요한 모듈들을 가져옵니다.
const fs = require("fs-extra");
const rollup = require("rollup"); // Rollup 번들러를 사용합니다.
const terser = require("@rollup/plugin-terser"); // Rollup용 압축 플러그인
const CleanCSS = require("clean-css");
const path = require("path");
const replace = require("@rollup/plugin-replace");

// 프로젝트의 루트 경로와 결과물이 저장될 dist 폴더 경로를 설정합니다.
const rootDir = __dirname;
const distDir = path.join(rootDir, "dist");

/**
 * 빌드 프로세스를 실행하는 메인 함수
 */
async function build() {
  try {
    console.log("🚀 빌드 시작");

    // 1. 기존 dist 폴더가 있으면 비우고 시작
    await fs.emptyDir(distDir);
    console.log("- dist 폴더를 정리했습니다.");

    // 2. JS 파일들을 순서에 맞게 번들링 및 압축
    const jsBundleCode = await bundleAndMinifyJS();
    await fs.outputFile(
      path.join(distDir, "js", "bundle.min.js"),
      jsBundleCode
    );
    console.log("✅ JS 번들링 및 압축 완료");

    // 3. CSS 파일 번들링 및 압축
    const cssBundleCode = await bundleAndMinifyCSS();
    await fs.outputFile(
      path.join(distDir, "css", "style.min.css"),
      cssBundleCode
    );
    console.log("✅ CSS 번들링 및 압축 완료");

    // 4. images 폴더 등 정적 자원 dist폴더로 복사
    await copyStaticAssets();
    console.log("✅ 정적 자원(images) 복사 완료");

    // 5. HTML 파일 읽어와서 script와 link 태그 수정 후 dist 폴더에 저장
    await processHtml();
    console.log("✅ HTML 파일 처리 완료: dist/index.html");

    console.log("\n🎉 빌드가 성공적으로 완료되었습니다!");
    process.exit(0);
  } catch (error) {
    console.error("❌ 빌드 중 오류가 발생했습니다: ", error);
    process.exit(1);
  }
}

/**
 * Rollup을 사용해 JS 파일들을 번들링하고 압축합니다.
 * @returns {Promise<string>} 압축된 JavaScript 코드
 */
async function bundleAndMinifyJS() {
  console.log("- JS 파일 정리중...");
  const ENV_MODE = process.env.ENV_MODE || "dev";
  const bundle = await rollup.rollup({
    input: "js/main.js", // 시작점(Entry Point) 파일
    plugins: [
      replace({
        preventAssignment: true,
        "process.env.ENV_MODE": JSON.stringify(ENV_MODE),
      }),
      terser(), // 압축(minify) 플러그인 적용
    ],
  });

  const { output } = await bundle.generate({
    format: "iife", // 브라우저에서 즉시 실행 가능한 함수 형태로 만듭니다.
    sourcemap: false,
  });

  // [수정됨] 생성된 코드 문자열을 반드시 반환해야 합니다.
  return output[0].code;
}

/**
 * CSS 파일을 합치고 압축합니다.
 * @returns {Promise<string>} 압축된 CSS 코드
 */
async function bundleAndMinifyCSS() {
  console.log("- CSS 처리중...");

  // style.css 처리
  const styleFilePath = path.join(rootDir, "css", "style.css");
  const styleCode = await fs.readFile(styleFilePath, "utf8");
  console.log("  - [CSS] css/style.css 파일 읽었음");

  // error.css 처리 (추가)
  const errorFilePath = path.join(rootDir, "css", "error.css");
  const errorCode = await fs.readFile(errorFilePath, "utf8");
  console.log("  - [CSS] css/error.css 파일 읽었음");

  // 두 파일을 각각 압축
  const styleResult = new CleanCSS().minify(styleCode);
  const errorResult = new CleanCSS().minify(errorCode);

  // 두 개의 압축된 CSS 파일 생성
  await fs.outputFile(
    path.join(distDir, "css", "style.min.css"),
    styleResult.styles
  );
  await fs.outputFile(
    path.join(distDir, "css", "error.min.css"),
    errorResult.styles
  );

  return styleResult.styles; // 메인 CSS 반환
}

/**
 * 정적 자원(images 폴더)을 dist 폴더로 복사합니다.
 */
async function copyStaticAssets() {
  const imageSrc = path.join(rootDir, "images");
  const imageDest = path.join(distDir, "images");
  if (await fs.pathExists(imageSrc)) {
    await fs.copy(imageSrc, imageDest);
  }
}

/**
 * index.html 파일을 읽고, CSS와 JS 경로를 번들 파일로 교체한 후 저장합니다.
 */
async function processHtml() {
  // 두 HTML 파일 읽기
  let indexHtml = await fs.readFile(path.join(rootDir, "index.html"), "utf8");
  let errorHtml = await fs.readFile(
    path.join(rootDir, "errorPage.html"),
    "utf8"
  );

  // ===== index.html 처리 =====
  // CSS 경로 변경: style.css → style.min.css
  indexHtml = indexHtml.replace(
    /<link.*href=".*css\/style\.css".*>/,
    '<link rel="stylesheet" href="css/style.min.css">'
  );

  // JS 번들 교체
  indexHtml = indexHtml.replace(
    /<!--SCRIPTS-->[\s\S]*?<!--\/SCRIPTS-->/,
    '<script src="js/bundle.min.js"></script>'
  );

  // ===== errorPage.html 처리 =====
  // CSS 경로 변경: error.css → error.min.css (분리 방식)
  errorHtml = errorHtml.replace(
    /<link.*href="css\/error\.css".*>/,
    '<link rel="stylesheet" href="css/error.min.css">'
  );

  // errorPage JS 처리 (혹시 스크립트 태그가 있다면)
  errorHtml = errorHtml.replace(
    /<script.*src="js\/.*\.js".*><\/script>/g,
    '<script src="js/bundle.min.js"></script>'
  );

  // ===== 파일 저장 =====
  await fs.writeFile(path.join(distDir, "index.html"), indexHtml, "utf8");
  await fs.writeFile(path.join(distDir, "errorPage.html"), errorHtml, "utf8");
}

// 빌드 함수 실행
build();
