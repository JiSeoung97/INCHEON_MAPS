# 인천공항 제1여객터미널 혼잡도 안내 서비스

> 인천공항 제1여객터미널의 출국장 및 탑승게이트 혼잡도를 실시간으로 시각화하고, 사용자 위치 기반 최적 출국장 추천 및 경로 안내를 제공하는 웹 애플리케이션

## 📋 프로젝트 개요

인천공항 제1여객터미널의 출국장 및 탑승게이트 혼잡도를 실시간으로 시각화하는 웹 애플리케이션으로, 사용자 위치 기반 최적 출국장 추천 및 경로 안내 기능을 제공합니다. Vanilla JavaScript와 카카오맵 API를 활용하여 모듈화된 아키텍처(Component-Service-Utility)로 설계했으며, 바텀시트 UI와 다국어 지원을 통해 향상된 사용자 경험을 구현했습니다.

## ✨ 주요 기능

### 🗺️ 실시간 지도 및 혼잡도 시각화
- 카카오맵 API 기반 인터랙티브 지도
- 출국장별 실시간 혼잡도 시각화 (여유/보통/혼잡/매우혼잡)
- 마커 클릭 시 상세 정보 표시
- 줌 레벨에 따른 요소 마커 동적 표시/숨김

### 📍 사용자 위치 기반 서비스
- GPS 3회 측정 후 가중평균 알고리즘을 통한 정확한 위치 파악
- 사용자 위치 기반 출국장 추천 (거리 + 대기시간 고려)
- 현재 위치에서 출국장/탑승게이트까지 경로 표시 (Polyline)
- 실시간 예상 소요시간 계산 (도보 + 심사 대기 + 셔틀트레인)

### 🎯 지능형 출국장 추천
- 거리, 혼잡도, 대기시간을 종합적으로 고려한 최적 출국장 추천
- 1순위, 2순위, 3순위 추천 제공
- 탑승게이트 번호 입력 시 최적 경로 안내

### 🌐 다국어 지원
- 한국어, 영어, 일본어, 중국어 지원
- 언어 변경 시 실시간 UI 업데이트

### 📱 반응형 UI
- 모바일 최적화 바텀시트 인터페이스
- 드래그 가능한 바텀시트
- 스켈레톤 UI를 통한 로딩 상태 표시

## 🛠️ 기술 스택

### Frontend
- **Vanilla JavaScript** (ES6+) - 프레임워크 없이 순수 JavaScript로 개발
- **HTML5 / CSS3**
- **Kakao Maps API** - 지도 및 위치 기반 서비스
- **Axios** - HTTP 클라이언트

### Backend & Build
- **Node.js / Express** - 프록시 서버
- **Rollup** - 모듈 번들러
- **Terser** - JavaScript 압축
- **CleanCSS** - CSS 압축

### Architecture
- **Component-Service-Utility 패턴** - 관심사의 분리
- **Module Pattern** - 캡슐화 및 네임스페이스 관리

## 🚀 성능 최적화

### 1. 페이지 로딩 시간 최적화 (10초 → 2초, 80% 개선)

**문제점:**
- 초기 페이지 로딩 시 모든 리소스를 동기적으로 불러와 10초 이상 소요

**해결 방법:**
- 이미지 Preload 설정 (`<link rel="preload">`)
- Lazy Loading: 지도 요소를 첫 zoom 이벤트 시에만 로드
- 비동기 백그라운드 데이터 로딩
- Rollup을 통한 모듈 번들링 (29개 파일 → 1개)
- Terser/CleanCSS를 활용한 코드 압축

**결과:**
- HTTP 요청 수: 29개 → 1개 (96% 감소)
- 로딩 시간: 10초 → 2초 이내 (80% 개선)
- 스켈레톤 UI 표시 시간: 1000ms → 300ms (70% 단축)

### 2. GPS 위치 정확도 향상

**문제점:**
- 모바일 환경에서 단일 GPS 측정값의 오차(평균 10-30m)로 인한 위치 부정확

**해결 방법:**
```javascript
// 3회 GPS 측정 후 가중평균 계산
// 정확도의 제곱 역수를 가중치로 사용
const weight = 1 / (measurement.accuracy * measurement.accuracy);
```

**결과:**
- 위치 정확도 평균 30-50% 개선
- 사용자 위치 기반 경로 안내의 신뢰도 향상

## 📂 프로젝트 구조

```
Incheon_maps/
├── css/
│   └── style.css                    # 스타일시트
│
├── data/
│   ├── mock-data.js                 # 출국장 및 탑승게이트 데이터
│   ├── mock-data2.js                # Mock 혼잡도 데이터
│   └── language.js                  # 다국어 번역 데이터
│
├── images/                          # 이미지 리소스
│
├── js/
│   ├── component/
│   │   ├── bottomSheet.js           # 바텀시트 UI 및 드래그
│   │   ├── infoWindow.js            # 지도 정보창
│   │   ├── customControl.js         # 커스텀 지도 컨트롤
│   │   └── errorPage.js             # 에러 페이지
│   │
│   ├── service/
│   │   ├── dataService.js           # 데이터 핸들링 및 API 연동
│   │   ├── mapService.js            # 지도 생성 및 이벤트 관리
│   │   ├── markerService.js         # 마커 생성, 관리, 삭제
│   │   ├── polylineService.js       # 경로 라인 생성 및 관리
│   │   ├── modalService.js          # 모달 생성 및 관리
│   │   ├── recoService.js           # 출국장 추천 알고리즘
│   │   └── dragService.js           # 바텀시트 드래그 기능
│   │
│   ├── utility/
│   │   ├── location.js              # GPS 위치 측정 (가중평균 알고리즘)
│   │   ├── timeCalculator.js        # 예상 소요시간 계산
│   │   ├── translate.js             # 다국어 번역
│   │   ├── utility.js               # 공통 유틸리티
│   │   ├── logger.js                # 로깅 시스템
│   │   ├── httpError.js             # HTTP 에러 핸들러
│   │   └── customError.js           # 커스텀 에러 클래스
│   │
│   └── main.js                      # 애플리케이션 진입점
│
├── api/
│   └── axios-instance.js            # Axios 인스턴스 설정
│
├── build.js                         # Rollup 빌드 스크립트
├── proxy.js                         # Express 프록시 서버
├── index.html                       # 메인 페이지
├── errorPage.html                   # 에러 페이지
└── package.json
```

## 🏗️ 아키텍처 설계

### Component-Service-Utility 패턴

```
┌─────────────┐
│  Component  │  ← UI 컴포넌트 (bottomSheet, infoWindow, customControl)
└──────┬──────┘
       │
┌──────▼──────┐
│   Service   │  ← 비즈니스 로직 (map, marker, polyline, data, reco)
└──────┬──────┘
       │
┌──────▼──────┐
│   Utility   │  ← 공통 기능 (location, timeCalculator, translate, logger)
└─────────────┘
```

**설계 원칙:**
- **관심사의 분리 (Separation of Concerns)**: 각 모듈은 단일 책임을 가짐
- **재사용성**: Utility 레이어는 프로젝트 전체에서 재사용 가능
- **유지보수성**: 모듈화된 구조로 코드 수정 및 확장 용이
- **테스트 용이성**: 각 모듈을 독립적으로 테스트 가능

## 💻 실행 방법

### 1. 설치

```bash
# 저장소 클론
git clone https://github.com/JiSeoung97/INCHEON_MAPS.git
cd INCHEON_MAPS

# 의존성 설치
npm install
```

### 2. 환경 변수 설정

`.env.development` 파일 생성:

```env
NODE_ENV=development
API_BASE_URL=your_api_base_url
API_KEY=your_api_key
```

### 3. 개발 서버 실행

```bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm start
```

### 4. 빌드

```bash
# 개발 빌드
npm run build

# 프로덕션 빌드
npm run build:prod
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

## 🎓 개발 경험 및 배운 점

### Vanilla JavaScript 환경에서의 대규모 프로젝트 경험
프레임워크 없이 Vanilla JavaScript로 개발하며 모듈 설계와 코드 분리의 중요성을 깨닫고, 체계적인 아키텍처 패턴을 적용하여 협업 효율성과 확장성을 개선했습니다.

### 성능 최적화 경험
- 번들링 및 압축을 통한 HTTP 요청 최소화
- Lazy Loading을 통한 초기 로딩 시간 단축
- 알고리즘 개선을 통한 GPS 정확도 향상

### 사용자 경험 개선
- 스켈레톤 UI를 통한 로딩 상태 시각화
- 다국어 지원을 통한 접근성 향상
- 모바일 최적화 UI/UX 설계

## 📝 라이선스

이 프로젝트는 개인 포트폴리오용으로 제작되었습니다.

## 📧 연락처

- Email: pwltmd489@gmail.com
- GitHub: [@JiSeoung97](https://github.com/JiSeoung97)
