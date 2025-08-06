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
ㅣ   ㅣ   ㄴ-- customControl.js => customControl 생성, 제거, event
ㅣ   ㅣ
ㅣ   ㅣ-- service/
ㅣ   ㅣ   ㅣ-- dataService.js => data 핸들링
ㅣ   ㅣ   ㅣ-- mapService.js => map 생성 및 이벤트
ㅣ   ㅣ   ㅣ-- markerService.js => marker 생성, 관리, 삭제
ㅣ   ㅣ   ㅣ-- modalService.js => modal 생성 및 관리
ㅣ   ㅣ   ㄴ-- polylineService.js => polyline 생성 및 관리
ㅣ   ㅣ
ㅣ   ㅣ-- utility/
ㅣ   ㅣ   ㅣ-- location.js => 유저 현재위치
ㅣ   ㅣ   ㄴ-- utility.js => 계산로직
ㅣ   ㅣ
ㅣ   ㄴ-- main.js
ㅣ
ㅣ-- index.html
ㅣ-- .gitignore
ㄴ-- README.md
```
