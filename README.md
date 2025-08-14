###인천공항 혼잡도

```
1. 프로젝트 구조

Map_Web_Vanilla-master/
ㅣ-- css/
ㅣ   ㄴ-- style.css
ㅣ
ㅣ-- data/
ㅣ   ㅣ-- mock-data.js => 출국장 및 탑승게이트 정보
ㅣ   ㄴ-- mock-data2.js => 추후 api들어오면 삭제 예정
ㅣ
ㅣ-- images/
ㅣ
ㅣ-- js/
ㅣ   ㅣ-- component/
ㅣ   ㅣ   ㅣ-- bottomSheet.js => 바텀시트 데이터삽입 및 drag
ㅣ   ㅣ   ㅣ-- infoWindow.js => infoWindow생성
ㅣ   ㅣ   ㅣ-- errorPage.js => errorPage에서 error정보 받기
ㅣ   ㅣ   ㄴ-- customControl.js => customControl 생성, 제거, event
ㅣ   ㅣ
ㅣ   ㅣ-- service/
ㅣ   ㅣ   ㅣ-- dataService.js => data 핸들링
ㅣ   ㅣ   ㅣ-- dragService.js =>bottomSheet drag 기능
ㅣ   ㅣ   ㅣ-- mapService.js => map 생성 및 이벤트
ㅣ   ㅣ   ㅣ-- markerService.js => marker 생성, 관리, 삭제
ㅣ   ㅣ   ㅣ-- modalService.js => modal 생성 및 관리
ㅣ   ㅣ   ㅣ-- polylineService.js => polyline 생성 및 관리
ㅣ   ㅣ   ㄴ-- recoService.js => 출국장 추천
ㅣ   ㅣ
ㅣ   ㅣ-- utility/
ㅣ   ㅣ   ㅣ-- customError.js => LocationError클래스 생성
ㅣ   ㅣ   ㅣ-- httpError.js => errorHandler 생성
ㅣ   ㅣ   ㅣ-- location.js => 유저 현재위치
ㅣ   ㅣ   ㅣ-- logger.js => Logger생성
ㅣ   ㅣ   ㅣ-- timeCalculator.js => 예상소요시간 계산
ㅣ   ㅣ   ㅣ-- translate.js => 번역 및 문자열 수정
ㅣ   ㅣ   ㄴ-- utility.js => 계산로직
ㅣ   ㅣ
ㅣ   ㄴ-- main.js
ㅣ
ㅣ-- errorPage.html
ㅣ-- index.html
ㅣ-- .gitignore
ㄴ-- README.md
```
