// ===== START OF data/language.js =====

const languageData = {
  ko: {
    terminal: "제1여객터미널",
    update: "업데이트",
    departureHallCongestion: "출국장 혼잡도",
    departurehall: "출국장",
    showMap: "약도 보기",
    west: "서편",
    east: "동편",
    congestion: "혼잡도",
    none: "미사용",
    low: "여유",
    medium: "보통",
    high: "혼잡",
    veryhigh: "매우혼잡",
    distance: "거리",
    boardingGate: "탑승구",
    gate1: "1출국장",
    gate2: "2출국장",
    gate3: "3출국장",
    gate4: "4출국장",
    gate5: "5출국장",
    gate6: "6출국장",
    korean: "한국어",
    ko: "한국어",
    chinese: "중국어",
    zh: "중국어",
    japenese: "일본어",
    ja: "일본어",
    english: "영어",
    en: "영어",
    current: "사용중",
    am: "오전",
    pm: "오후",
    immigration: "출국심사",
    nthGate: "{{number}}번 탑승구",
    first: "1순위",
    second: "2순위",
    third: "3순위",
    hour: "시간",
    minute: "분",
    estimated: "예상 소요 시간",
    estimatedTime: "구간별 예상 소요시간",
    totalTime: "총 {{hour}}시간 {{minute}}분",
    selectHall: "출국장 선택",
    waitingTime: "심사 대기 시간",
    total: "총",
    transfer: "이동",
    walk: "도보",
    Immigration: "심사",
    needTrain: "셔틀 트레인 탑승이 필요한 탑승구입니다.",
    checkNum: "잘못된 게이트 번호입니다. 다시 확인해 주세요.",
    gateNum: "탑승구 번호를 입력해주세요.",
    tryMeal: "출국 전 든든한 한 끼 어떠신가요?",
    modalTitle: "인천공항 맛집 BEST 10!",
    modalBtn: "인천공항 맛집 보러가기",
    subTitle: "탑승구까지의 이동 예상 소요시간을 알려드려요",
    confirmBtn: "확인",
    hanaBank: "하나은행 환전소",
    location: "{{near}}근처",
    more: "더보기",
  },
  ja: {
    terminal: "第1旅客ターミナル",
    update: "更新",
    departureHallCongestion: "出発ホールの混雑状況",
    departurehall: "出発ホール",
    showMap: "地図を見る",
    west: "西側",
    east: "東側",
    congestion: "混雑状況",
    none: "未使用",
    low: "円滑",
    medium: "普通",
    high: "混雑",
    veryhigh: "非常に混雑",
    distance: "距離",
    boardingGate: "搭乗ゲート",
    gate1: "1番出発ホール",
    gate2: "2番出発ホール",
    gate3: "3番出発ホール",
    gate4: "4番出発ホール",
    gate5: "5番出発ホール",
    gate6: "6番出発ホール",
    korean: "韓国語",
    ko: "韓国語",
    chinese: "中国語",
    zh: "中国語",
    japenese: "日本語",
    ja: "日本語",
    english: "英語",
    en: "英語",
    current: "使用中",
    am: "午前",
    pm: "午後",
    immigration: "出国審査",
    nthGate: "搭乗口{{number}}番",
    first: "第1番",
    second: "第2番",
    third: "第3番",
    hour: "時間",
    minute: "分",
    estimated: "所要時間",
    estimatedTime: "区間別の所要時間（予想）",
    totalTime: "合計 {{hour}}時間 {{minute}}分",
    selectHall: "出発ゲートを選択",
    waitingTime: "審査待ち時間",
    total: "合計",
    transfer: "乗り継ぎ",
    walk: "徒歩",
    Immigration: "審査",
    needTrain: "この搭乗口へはシャトルトレインの乗車が必要です。",
    checkNum: "無効な搭乗口番号です。もう一度ご確認ください。",
    gateNum: "搭乗口番号を入力してください。",
    tryMeal: "ご出発前に、しっかりとお食事いかがですか?",
    modalTitle: "仁川空港のグルメおすすめ10選",
    modalBtn: "仁川空港のグルメを見る",
    subTitle: "搭乗口までの移動にかかる予想所要時間をご案内します。",
    confirmBtn: "確認",
    hanaBank: "하나은행 환전소",
    location: "{{near}}근처",
    more: "더보기",
  },
  zh: {
    update: "更新时间",
    departureHallCongestion: "出发大厅拥堵情况",
    departurehall: "出发大厅",
    showMap: "查看地图",
    west: "西侧",
    east: "东侧",
    congestion: "拥挤状况",
    none: "未使用",
    low: "顺畅",
    medium: "一般",
    high: "拥堵",
    veryhigh: "非常拥堵",
    distance: "距离",
    boardingGate: "登机口",
    gate1: "1号出发大厅",
    gate2: "2号出发大厅",
    gate3: "3号出发大厅",
    gate4: "4号出发大厅",
    gate5: "5号出发大厅",
    gate6: "6号出发大厅",
    korean: "韩语",
    ko: "韩语",
    chinese: "中文",
    zh: "中文",
    japenese: "日语",
    ja: "日语",
    english: "英语",
    en: "英语",
    current: "使用中",
    am: "上午",
    pm: "下午",
    immigration: "出境检查",
    nthGate: "{{number}}号登机口",
    first: "第1个",
    second: "第二个",
    third: "第三个",
    hour: "小时",
    minute: "分钟",
    estimated: "耗时",
    estimatedTime: "各区间预计耗时",
    totalTime: "总计 {{hour}}小时 {{minute}}分",
    selectHall: "请选择出境大厅",
    waitingTime: "出境检查等候时间",
    total: "总计",
    transfer: "中转",
    walk: "步行",
    Immigration: "审查",
    needTrain: "前往此登机口需搭乘摆渡列车。",
    checkNum: "登机口号码无效。请重新确认。",
    gateNum: "请输入登机口号码。",
    tryMeal: "出国前，来一顿丰盛的餐吧!",
    modalTitle: "仁川机场美食TOP 10!",
    modalBtn: "	查看仁川机场美食",
    subTitle: "我们将为您提供前往登机口的预计所需时间。",
    confirmBtn: "确认",
  },
  en: {
    terminal: "Passenger Terminal 1",
    update: "UPDATE",
    departureHallCongestion: "Departure Hall Congestion",
    departurehall: "Departure \n Hall",
    showMap: "View Map",
    west: "West",
    east: "East",
    congestion: "Crowd Level",
    none: "Not in use",
    low: "Smooth",
    medium: "Normal",
    high: "Crowded",
    veryhigh: "Very Crowded",
    distance: "distance",
    boardingGate: "Boarding Gate",
    gate1: "Departure <br>Hall 1",
    gate2: "Departure <br>Hall 2",
    gate3: "Departure <br>Hall 3",
    gate4: "Departure <br>Hall 4",
    gate5: "Departure <br>Hall 5",
    gate6: "Departure <br>Hall 6",
    korean: "KOR",
    ko: "Korean",
    chinese: "CHN",
    zh: "Chinese",
    japenese: "JP",
    ja: "Japanese",
    english: "ENG",
    en: "English",
    current: "In Use",
    am: "am",
    pm: "pm",
    immigration: "Immigration",
    nthGate: "Boarding Gate {{number}}",
    first: "1st",
    second: "2nd",
    third: "3rd",
    hour: "h",
    minute: "min",
    estimated: "Estimated Time",
    estimatedTime: "Estimated Time by Section",
    totalTime: "Total {{hour}}h {{minute}}m",
    selectHall: "Select Departure Hall",
    waitingTime: "Waiting Time",
    total: "total",
    transfer: "transfer",
    walk: "walk",
    Immigration: "Immigration",
    needTrain: "A shuttle train is required to reach this gate.",
    checkNum: "The gate number is invalid. Please check again.",
    gateNum: "Please enter your gate number.",
    tryMeal: "How about a hearty meal before your flight?",
    modalTitle: "Top 10 Must-Try Eats at Incheon Airport!",
    modalBtn: "View Incheon Airport Eats",
    subTitle:
      "We will inform you of the estimated time it takes to reach the boarding gate.",
    confirmBtn: "OK",
  },
};


// ===== END OF data/language.js =====

// ===== START OF data/mock-data2.js =====

"use strict";

const mockData2 = {
  data: [
    {
      response: {
        header: {
          resultCode: "0000",
          resultMsg: "ok",
        },
        body: {
          items: {
            item: [
              {
                deskname: "DG1", // 출국장
                espwaittime: "D", // 예상 대기시간
                immigrationtime: "NA", // 출국심사 소요시간
                island: "1", // 출국장 번호
                occurrtime: "20230606000000", // 발생일시
                quelength: "0", // 대기인원수
                terminalid: "P01", // 터미널
              },
              {
                deskname: "DG2_W",
                espwaittime: "300",
                immigrationtime: "30",
                island: "1",
                occurrtime: "20230606000000",
                quelength: "13",
                terminalid: "P01",
              },
              {
                deskname: "DG2_E",
                espwaittime: "60",
                immigrationtime: "180",
                island: "4",
                occurrtime: "20230606000000",
                quelength: "47",
                terminalid: "P01",
              },
              {
                deskname: "DG3_W",
                espwaittime: "34",
                immigrationtime: "40",
                island: "3",
                occurrtime: "20230606000000",
                quelength: "20",
                terminalid: "P01",
              },
              {
                deskname: "DG3_E",
                espwaittime: "40",
                immigrationtime: "190",
                island: "4",
                occurrtime: "20230606000000",
                quelength: "10",
                terminalid: "P01",
              },

              {
                deskname: "DG4_W",
                espwaittime: "30",
                immigrationtime: "NA",
                island: "2",
                occurrtime: "20230606000000",
                quelength: "3",
                terminalid: "P01",
              },
              {
                deskname: "DG4_E",
                espwaittime: "D",
                immigrationtime: "190",
                island: "3",
                occurrtime: "20230606000000",
                quelength: "49",
                terminalid: "P01",
              },
              {
                deskname: "DG5_W",
                espwaittime: "278",
                immigrationtime: "NA",
                island: "3",
                occurrtime: "20230606000000",
                quelength: "12",
                terminalid: "P01",
              },
              {
                deskname: "DG5_E",
                espwaittime: "D",
                immigrationtime: "NA",
                island: "5",
                occurrtime: "20230606000000",
                quelength: "0",
                terminalid: "P01",
              },
              {
                deskname: "DG6",
                espwaittime: "D",
                immigrationtime: "NA",
                island: "6",
                occurrtime: "20230606000000",
                quelength: "0",
                terminalid: "P01",
              },
            ],
          },
        },
      },
    },
  ],
};

window.mockData2 = mockData2;


// ===== END OF data/mock-data2.js =====

// ===== START OF data/mock-data.js =====

"use strict";

const mockData = {
  buildings: [
    {
      id: "gate_1",
      name: "제 1여객터미널",
      position: { lat: 37.449227, lng: 126.450611 },
      areas: [
        {
          id: "DG1",
          name: "1출국장",
          position: { lat: 37.450312, lng: 126.4542 },
          congestion: "none",
          count: 12,
          capacity: 50,
          floorInfo: "3층",
          eastWest: "none",
          description: "제 1여객터미널 1출국장",
        },
        {
          id: "DG2_W",
          name: "2출국장 서편",
          position: { lat: 37.45016, lng: 126.45286 },
          congestion: "medium",
          count: 45,
          capacity: 80,
          floorInfo: "3층",
          eastWest: "west",
          description: "제 1여객터미널 2출국장 서편",
        },
        {
          id: "DG2_E",
          name: "2출국장 동편",
          position: { lat: 37.45021, lng: 126.45328 },
          congestion: "low",
          count: 12,
          capacity: 50,
          floorInfo: "3층",
          eastWest: "east",
          description: "제 1여객터미널 2출국장 동편",
        },
        {
          id: "DG3_W",
          name: "3출국장 서편",
          position: { lat: 37.44982, lng: 126.4516 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest: "west",
          description: "제 1여객터미널 3출국장 서쪽",
        },
        {
          id: "DG3_E",
          name: "3출국장 동편",
          position: { lat: 37.44995, lng: 126.452 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest: "east",
          description: "제 1여객터미널 3출국장 동편",
        },
        {
          id: "DG4_W",
          name: "4출국장 서편",
          position: { lat: 37.4486, lng: 126.44964 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest: "west",
          description: "제 1여객터미널 4출국장 서편",
        },
        {
          id: "DG4_E",
          name: "4출국장 동편",
          position: { lat: 37.44884, lng: 126.44993 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest: "east",
          description: "제 1여객터미널 4출국장 동편",
        },
        {
          id: "DG5_W",
          name: "5출국장 서편",
          position: { lat: 37.44773, lng: 126.44894 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest: "west",
          description: "제 1여객터미널 5출국장 서편",
        },
        {
          id: "DG5_E",
          name: "5출국장 동편",
          position: { lat: 37.44805, lng: 126.44918 },
          congestion: "veryhigh",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest: "east",
          description: "제 1여객터미널 5출국장 동편",
        },

        {
          id: "DG6",
          name: "6출국장",
          position: { lat: 37.447, lng: 126.4484 },
          congestion: "none",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest: "none",
          description: "제 1여객터미널 6출국장",
        },
      ],
    },
    {
      id: "boardinGate",
      name: "탑승게이트",
      position: { lat: 37.467448, lng: 126.434596 },
      areas: [
        {
          id: "boardinGate_1",
          name: "탑승게이트1",
          position: { lat: 37.4501, lng: 126.455812 },
          congestion: "low",
          count: 8,
          capacity: 40,
          floorInfo: "3층",
          description: "제 2여객터미널 1출국장",
        },
        {
          id: "boardinGate_2",
          name: "탑승게이트2",
          position: { lat: 37.45009, lng: 126.45602 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_3",
          name: "탑승게이트3",
          position: { lat: 37.45016, lng: 126.45622 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_6",
          name: "탑승게이트6",
          position: { lat: 37.450305, lng: 126.45633 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_7",
          name: "탑승게이트7",
          position: { lat: 37.450525, lng: 126.45629 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_8",
          name: "탑승게이트8",
          position: { lat: 37.450645, lng: 126.45605 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_9",
          name: "탑승게이트9",
          position: { lat: 37.4508, lng: 126.45536 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_10",
          name: "탑승게이트10",
          position: { lat: 37.45089, lng: 126.454665 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_11",
          name: "탑승게이트11",
          position: { lat: 37.45091, lng: 126.453925 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_12",
          name: "탑승게이트12",
          position: { lat: 37.451455, lng: 126.452225 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_14",
          name: "탑승게이트14",
          position: { lat: 37.452085, lng: 126.45202 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_15",
          name: "탑승게이트15",
          position: { lat: 37.45275, lng: 126.45192 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_16",
          name: "탑승게이트16",
          position: { lat: 37.45338, lng: 126.45168 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_17",
          name: "탑승게이트17",
          position: { lat: 37.45365, lng: 126.45154 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_18",
          name: "탑승게이트18",
          position: { lat: 37.45375, lng: 126.45135 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_19",
          name: "탑승게이트19",
          position: { lat: 37.45375, lng: 126.45107 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_20",
          name: "탑승게이트20",
          position: { lat: 37.45362, lng: 126.45085 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_21",
          name: "탑승게이트21",
          position: { lat: 37.453475, lng: 126.45079 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_22",
          name: "탑승게이트22",
          position: { lat: 37.453185, lng: 126.45087 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_23",
          name: "탑승게이트23",
          position: { lat: 37.45255, lng: 126.45113 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_24",
          name: "탑승게이트24",
          position: { lat: 37.45195, lng: 126.45142 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_25",
          name: "탑승게이트25",
          position: { lat: 37.45093, lng: 126.45199 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_26",
          name: "탑승게이트26",
          position: { lat: 37.4504, lng: 126.45119 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_27",
          name: "탑승게이트27",
          position: { lat: 37.45012, lng: 126.450565 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_28",
          name: "탑승게이트28",
          position: { lat: 37.4498, lng: 126.44998 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_29",
          name: "탑승게이트29",
          position: { lat: 37.44905, lng: 126.44855 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_30",
          name: "탑승게이트30",
          position: { lat: 37.44938, lng: 126.44824 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_31",
          name: "탑승게이트31",
          position: { lat: 37.44976, lng: 126.44758 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_32",
          name: "탑승게이트32",
          position: { lat: 37.45021, lng: 126.44697 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_33",
          name: "탑승게이트33",
          position: { lat: 37.45059, lng: 126.44631 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_34",
          name: "탑승게이트34",
          position: { lat: 37.450735, lng: 126.445985 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_35",
          name: "탑승게이트35",
          position: { lat: 37.45073, lng: 126.44577 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_36",
          name: "탑승게이트36",
          position: { lat: 37.45061, lng: 126.44556 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_37",
          name: "탑승게이트37",
          position: { lat: 37.45041, lng: 126.44549 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_38",
          name: "탑승게이트38",
          position: { lat: 37.45024, lng: 126.44554 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_39",
          name: "탑승게이트39",
          position: { lat: 37.45005, lng: 126.44581 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_40",
          name: "탑승게이트40",
          position: { lat: 37.44967, lng: 126.44647 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_41",
          name: "탑승게이트41",
          position: { lat: 37.44937, lng: 126.44722 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_42",
          name: "탑승게이트42",
          position: { lat: 37.44802, lng: 126.44822 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_43",
          name: "탑승게이트43",
          position: { lat: 37.447495, lng: 126.44794 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_45",
          name: "탑승게이트45",
          position: { lat: 37.446945, lng: 126.44774 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_46",
          name: "탑승게이트46",
          position: { lat: 37.446395, lng: 126.44761 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_47",
          name: "탑승게이트47",
          position: { lat: 37.445825, lng: 126.44756 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_48",
          name: "탑승게이트48",
          position: { lat: 37.445575, lng: 126.44762 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_49",
          name: "탑승게이트49",
          position: { lat: 37.44549, lng: 126.44787 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_50",
          name: "탑승게이트50",
          position: { lat: 37.44557, lng: 126.44812 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_101",
          name: "탑승게이트101",
          position: { lat: 37.45836, lng: 126.4493 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_102",
          name: "탑승게이트102",
          position: { lat: 37.45843, lng: 126.44913 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_103",
          name: "탑승게이트103",
          position: { lat: 37.458145, lng: 126.44935 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_104",
          name: "탑승게이트104",
          position: { lat: 37.45843, lng: 126.44899 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_105",
          name: "탑승게이트105",
          position: { lat: 37.45798, lng: 126.44919 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_106",
          name: "탑승게이트106",
          position: { lat: 37.45838, lng: 126.44885 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_107",
          name: "탑승게이트107",
          position: { lat: 37.4576, lng: 126.44851 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_108",
          name: "탑승게이트108",
          position: { lat: 37.457985, lng: 126.448175 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_109",
          name: "탑승게이트109",
          position: { lat: 37.45721, lng: 126.44784 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_110",
          name: "탑승게이트110",
          position: { lat: 37.45761, lng: 126.44751 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_111",
          name: "탑승게이트111",
          position: { lat: 37.45675, lng: 126.44702 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_112",
          name: "탑승게이트112",
          position: { lat: 37.45714, lng: 126.44669 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_113",
          name: "탑승게이트113",
          position: { lat: 37.45635, lng: 126.44635 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_114",
          name: "탑승게이트114",
          position: { lat: 37.45676, lng: 126.44602 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_115",
          name: "탑승게이트115",
          position: { lat: 37.45587, lng: 126.44582 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_117",
          name: "탑승게이트117",
          position: { lat: 37.45549, lng: 126.44516 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_118",
          name: "탑승게이트118",
          position: { lat: 37.45586, lng: 126.44412 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_119",
          name: "탑승게이트119",
          position: { lat: 37.45511, lng: 126.44449 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_121",
          name: "탑승게이트121",
          position: { lat: 37.45484, lng: 126.44369 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_122",
          name: "탑승게이트122",
          position: { lat: 37.45524, lng: 126.44335 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_123",
          name: "탑승게이트123",
          position: { lat: 37.45446, lng: 126.44302 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_124",
          name: "탑승게이트124",
          position: { lat: 37.45485, lng: 126.44267 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_125",
          name: "탑승게이트125",
          position: { lat: 37.45399, lng: 126.44218 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_126",
          name: "탑승게이트126",
          position: { lat: 37.4544, lng: 126.44185 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_127",
          name: "탑승게이트127",
          position: { lat: 37.45361, lng: 126.44152 },
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_128",
          name: "탑승게이트128",
          position: { lat: 37.454005, lng: 126.44117 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_129",
          name: "탑승게이트129",
          position: { lat: 37.45333, lng: 126.44103 },
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_130",
          name: "탑승게이트130",
          position: { lat: 37.45377, lng: 126.44075 },
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_131",
          name: "탑승게이트131",
          position: { lat: 37.45331, lng: 126.44082 },
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
        {
          id: "boardinGate_132",
          name: "탑승게이트132",
          position: { lat: 37.45351, lng: 126.4406 },
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
      ],
    },
  ],
  elements: {
    name: "지도요소",
    areas: [
      {
        id: "element_1",
        name: "하나은행 환전소",
        position: { lat: 37.4478796, lng: 126.4490107 },
        floorInfo: "3층",
        description: "5출국장 부근",
      },
      {
        id: "element_2",
        name: "하나은행 환전소",
        position: { lat: 37.4476621, lng: 126.4498713 },
        floorInfo: "3층",
        description: "12번 출입구 부근",
      },
      {
        id: "element_3",
        name: "하나은행 환전소",
        position: { lat: 37.4493786, lng: 126.4482364 },
        floorInfo: "3층",
        description: "30번 게이트 부근",
      },
      {
        id: "element_4",
        name: "하나은행 환전소",
        position: { lat: 37.4491683, lng: 126.4485249 },
        floorInfo: "3층",
        description: "29번 게이트 부근",
      },
      {
        id: "element_5",
        name: "하나은행 환전소",
        position: { lat: 37.4494291, lng: 126.4530266 },
        floorInfo: "3층",
        description: "4번 출입구 부근",
      },
      {
        id: "element_6",
        name: "우리은행 환전소",
        position: { lat: 37.4508934, lng: 126.45195 },
        floorInfo: "3층",
        description: "12번 게이트 건너편 부근",
      },
      {
        id: "element_7",
        name: "우리은행 환전소",
        position: { lat: 37.4506967, lng: 126.4538365 },
        floorInfo: "3층",
        description: "11번 게이트 부근",
      },
      {
        id: "element_8",
        name: "국민은행 환전소",
        position: { lat: 37.447751, lng: 126.4487962 },
        floorInfo: "3층",
        description: "5출국장 부근",
      },
      {
        id: "element_9",
        name: "국민은행 환전소",
        position: { lat: 37.4502041, lng: 126.453151 },
        floorInfo: "3층",
        description: "2출국장 부근",
      },
      {
        id: "element_10",
        name: "KT 로밍센터",
        position: { lat: 37.4472714, lng: 126.4485585 },
        floorInfo: "3층",
        description: "6출국장 부근",
      },
      {
        id: "element_11",
        name: "KT 로밍센터",
        position: { lat: 37.4489191, lng: 126.4498721 },
        floorInfo: "3층",
        description: "4출국장 부근",
      },
      {
        id: "element_12",
        name: "KT 로밍센터",
        position: { lat: 37.4499395, lng: 126.4514591 },
        floorInfo: "3층",
        description: "3출국장 부근",
      },
      {
        id: "element_13",
        name: "와이파이 도시락",
        position: { lat: 37.4477249, lng: 126.4487764 },
        floorInfo: "3층",
        description: "5출국장 부근",
      },
      {
        id: "element_13",
        name: "LG U+ 로밍센터",
        position: { lat: 37.4498429, lng: 126.4514952 },
        floorInfo: "3층",
        description: "3출국장 부근",
      },
      {
        id: "element_14",
        name: "안내데스크",
        position: { lat: 37.4487388, lng: 126.4508303 },
        floorInfo: "3층",
        description: "8번 출입구 부근",
      },
      {
        id: "element_15",
        name: "안내데스크",
        position: { lat: 37.4486476, lng: 126.4489714 },
        floorInfo: "3층",
        description: "4출국장 부근",
      },
      {
        id: "element_16",
        name: "안내데스크",
        position: { lat: 37.4505389, lng: 126.4523054 },
        floorInfo: "3층",
        description: "2출국장 부근",
      },
      {
        id: "element_17",
        name: "장애인 안심여행센터",
        position: { lat: 37.4486988, lng: 126.4511418 },
        floorInfo: "3층",
        description: "7번 출입구 밖",
      },
    ],
  },

  companyLocation: {
    name: "1번 키오스크",
    position: { lat: 37.447, lng: 126.4493 },
    description: "1출국장 5번출구 앞",
    areas: [],
  },

  lastUpdated: new Date().toISOString(),

  congestionLevels: {
    none: {
      name: "미운영",
      color: "#999",
      description: "미운영",
    },
    low: {
      name: "여유",
      color: "#32A1FF",
      description: "여유로움 (수용 인원의 40% 미만)",
    },
    medium: {
      name: "보통",
      color: "#00C73C",
      description: "보통 (수용 인원의 40% 이상 70% 미만)",
    },
    high: {
      name: "혼잡",
      color: "#FF823F",
      description: "혼잡함 (수용 인원의 70% 이상)",
    },
    veryhigh: {
      name: "매우혼잡",
      color: "#FF5959",
      description: "혼잡함 (수용 인원의 90% 이상)",
    },
  },
};

window.mockData = mockData;


// ===== END OF data/mock-data.js =====

// ===== START OF js/utility/httpError.js =====

import Logger from "./logger.js";

const ErrorHandler = (() => {
  const ERROR_PAGE = "errorPage.html"; // 에러 발생 시 이동할 페이지

  // 에러 코드에 따른 기본 메시지
  const getErrorMessage = (statusCode) => {
    const messages = {
      404: "요청한 페이지나 리소스를 찾을 수 없습니다.",
      500: "서버 내부에서 오류가 발생했습니다.",
      NETWORK_ERROR: "네트워크 연결을 확인해주세요.",
      LOCATION_ERROR: "인천공항내에서만 이용가능합니다",
      // 필요한 다른 상태 코드 메시지 추가
    };
    return messages[statusCode] || "네트워크 연결을 확인해주세요..";
  };

  /**
   * 에러 정보를 받아 에러 페이지로 리다이렉트시키는 공통 함수
   * @param {Error | object | string} error - 발생한 에러 객체 또는 정보
   */
  const handleGlobalError = (error) => {
    Logger.error("전역 에러 발생:", error);
    console.log(error);
    // 에러 정보 추출
    const statusCode = error?.status || error?.statusCode || "UNKNOWN";
    const message = error?.message || getErrorMessage(statusCode);
    const errorType =
      error instanceof PromiseRejectionEvent
        ? "PROMISE_REJECTION"
        : "GLOBAL_ERROR";

    // URL 파라미터로 에러 정보 전달
    const params = new URLSearchParams({
      errorCode: statusCode,
      errorMessage: message,
      timestamp: new Date().toISOString(),
      type: errorType,
    });

    // 에러 페이지로 이동
    window.location.href = `${ERROR_PAGE}?${params.toString()}`;
  };

  // 전역 에러 핸들러 설정
  const setupGlobalErrorHandlers = () => {
    // 1. Promise 에러 (비동기) 처리
    window.addEventListener("unhandledrejection", (event) => {
      event.preventDefault(); // 브라우저의 기본 에러 처리 방지
      handleGlobalError(event.reason || new Error("Unknown promise rejection"));
    });

    // 2. 일반 자바스크립트 에러 (동기) 처리
    window.onerror = (message, source, lineno, colno, error) => {
      handleGlobalError(error || new Error(message));
      return true; // 브라우저의 기본 에러 처리 방지
    };
  };

  const handleSpecificError = (error) => {
    // 1. 에러에서 상태 코드를 추출합니다. (Axios 에러는 error.response.status에 정보가 있습니다)
    const statusCode =
      error?.response?.status ||
      error?.status ||
      error?.statusCode ||
      "NETWORK_ERROR";
    // 2. 에러 페이지로 보낼 정보를 JSON 객체로 만듭니다.
    const errorDetails = {
      code: statusCode,
      logMessage: `클라이언트에서 처리된 에러가 발생했습니다. (코드: ${statusCode})`,
      originalError: error.message, // 원본 에러 메시지
      timestamp: new Date().toISOString(),
    };

    // 3. URLSearchParams를 사용해 쿼리 스트링을 생성합니다.
    sessionStorage.setItem("errorData", JSON.stringify(errorDetails));
    //    JSON.stringify로 객체를 문자열로 만들면, 자동으로 URL 인코딩됩니다.
    // const params = new URLSearchParams({
    //   errorData: JSON.stringify(errorDetails),
    // });
    // 4. 에러 페이지로 리다이렉트시킵니다.
    Logger.log(`${statusCode} 에러 발생. 에러 페이지로 이동합니다.`);
    window.location.href = `${ERROR_PAGE}`;
  };

  return {
    init: () => {
      setupGlobalErrorHandlers();
      Logger.log("✅ 전역 에러 핸들러가 초기화되었습니다.");
    },
    handleSpecificError: handleSpecificError,
  };
})();

export default ErrorHandler;


// ===== END OF js/utility/httpError.js =====

// ===== START OF js/utility/logger.js =====

const Logger = {
  /**
   * 일반 정보를 출력하는 로그입니다.
   * 'dev' 환경에서만 콘솔에 표시됩니다.
   * @param {...any} args - console.log와 동일한 인자를 받습니다.
   */
  log: function (...args) {
    // window.appConfig 객체가 존재하고, BRANCH가 'dev'일 때만 실행
    if (window.appConfig?.ENV_MODE === "dev") {
      console.log(...args);
    }
  },

  /**
   * 경고를 출력하는 로그입니다.
   * 'dev' 환경에서만 콘솔에 표시됩니다.
   * @param {...any} args - console.warn과 동일한 인자를 받습니다.
   */
  warn: function (...args) {
    if (window.appConfig?.ENV_MODE === "dev") {
      console.warn(...args);
    }
  },

  /**
   * 에러를 출력하는 로그입니다.
   * ‼️ 중요: 에러는 모든 환경(dev, production)에서 항상 표시되어야
   * 운영 중인 서비스의 문제를 빠르게 파악할 수 있습니다.
   * @param {...any} args - console.error와 동일한 인자를 받습니다.
   */
  error: function (...args) {
    console.error(...args);
  },
};

// 다른 파일에서 import하여 사용할 수 있도록 export 합니다.
export default Logger;


// ===== END OF js/utility/logger.js =====

// ===== START OF js/utility/utility.js =====

import Logger from "./logger.js";
import DataService from "../service/dataService.js";
import MarkerService from "../service/markerService.js";
import InfoWindowService from "../component/infoWindow.js";
import MapService from "../service/mapService.js";
import RecoService from "../service/recoService.js";
const Utility = (() => {
  let map;
  let markers = [];
  let selectedMarker = null;

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const getDistance = async (area, boardingGateNum, bottomSheet) => {
    try {
      let startLocation = null;
      let targetLocation = null;

      targetLocation = JSON.parse(sessionStorage.getItem("myLocation"));
      startLocation = area;

      if (bottomSheet) {
        startLocation = area;
        const datas = await DataService.getAllAreas();
        datas.forEach((data) => {
          if (data.name == "탑승게이트" + boardingGateNum) {
            targetLocation = data.position;
          }
        });
      }

      if (targetLocation !== null) {
        const lng1 = startLocation.position.lng;
        const lat1 = startLocation.position.lat;
        const lng2 = targetLocation.lng;
        const lat2 = targetLocation.lat;

        const earthR = 6371000; // 지구 반지름
        const degToRad = (deg) => deg * (Math.PI / 180);

        const dLat = degToRad(lat2 - lat1);
        const dlng = degToRad(lng2 - lng1);

        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(degToRad(lat1)) *
            Math.cos(degToRad(lat2)) *
            Math.sin(dlng / 2) ** 2;
        const distance =
          Math.round(
            earthR * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          ).toLocaleString() + "M";
        return distance;
      }
    } catch (error) {
      Logger.error("위치권한이 필요합니다 : ", error);
    }
  };

  const calculateMidPoint = (positon1, position2) => {
    let lat1 = positon1.lat;
    let lat2 = position2.lat;
    let lng1 = positon1.lng;
    let lng2 = position2.lng;

    let resultLat = Math.round(((lat1 + lat2) / 2) * 1000000) / 1000000;
    let resultLng = Math.round(((lng1 + lng2) / 2) * 1000000) / 1000000;
    return naver.maps.LatLng(resultLat, resultLng);
  };

  const moveGate = async (index) => {
    map = MapService.getMap();
    let idx = index;
    selectedMarker = MarkerService.getSelectedMarker();
    markers = MarkerService.getMarkers();
    var transition = {
      duration: 1000,
      easing: "easeOutCubic",
    };
    MarkerService.replaceAllMarkerIcon();
    selectedMarker = markers[idx];
    let newPosition = naver.maps.LatLng(
      markers[idx].position._lat - 0.0003,
      markers[idx].position._lng
    );
    map.panTo(newPosition, transition);
    await delay(1000);
    setTimeout(() => {
      if (map.getZoom() <= 17) {
        map.setZoom(18, true);
      }
    }, 100);
    MarkerService.replaceMarkerIcon(markers[idx]);
  };

  const openWindowInfo = (index = null) => {
    markers = MarkerService.getMarkers();
    let infoWindows = InfoWindowService.getInfoWindows();
    let selectedInfowindow = MarkerService.getSelectedInfowindow();
    let idx = index;
    if (index == null) {
      idx = infoWindows.length - 1;
      infoWindows[idx].setMap(null);
    } else {
      selectedInfowindow = infoWindows[idx];
      infoWindows[idx].open(map, markers[idx]);
    }
  };
  const translateAreaName = (areaName, language) => {
    if (areaName.includes("출국장")) {
      const gateNumber = areaName.match(/(\d+)출국장/)?.[1];
      const direction = areaName.includes("서편")
        ? "west"
        : areaName.includes("동편")
        ? "east"
        : "";
      if (gateNumber != null && direction != null) {
        return language[`gate${gateNumber}`] + " " + language[direction];
      } else if (gateNumber) {
        return language[`gate${gateNumber}`];
      }
    }

    if (areaName.includes("탑승게이트")) {
      return areaName;
    }

    return areaName;
  };
  const congestionColor = (areaData) => {
    let gaugeColor;

    switch (areaData.congestion) {
      case "none":
        gaugeColor = "#999";
        break;
      case "low":
        gaugeColor = "#32A1FF";
        break;
      case "medium":
        gaugeColor = "#00C73C";
        break;
      case "high":
        gaugeColor = "#FF823F";
        break;
      case "veryhigh":
        gaugeColor = "#FF5959";
        break;
      default:
        gaugeColor = "#999";
    }
    return gaugeColor;
  };
  return {
    getDistance: async (area, boardingGateNum = null, bottomSheet = false) => {
      return await getDistance(area, boardingGateNum, bottomSheet);
    },
    calculateMidPoint: (position1, position2) => {
      return calculateMidPoint(position1, position2);
    },
    moveGate: (index) => {
      moveGate(index);
    },
    openWindowInfo: (index) => {
      openWindowInfo(index);
    },
    openBoardingWindowInfo: () => {
      openWindowInfo();
    },
    translateAreaName: (areaName, language) => {
      return translateAreaName(areaName, language);
    },
    congestionColor: (areaData) => {
      return congestionColor(areaData);
    },
  };
})();
export default Utility;


// ===== END OF js/utility/utility.js =====

// ===== START OF js/utility/location.js =====

import Logger from "./logger.js";
import ErrorHandler from "./httpError.js";
import { LocationError } from "./customError.js";
const utLocation = (() => {
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(Logger.log("gps is not supported by this browser"));
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            // if (limitLocation(userLocation)) {
            Logger.log("userLocation : ", userLocation);
            resolve(userLocation);
            // } else {
            //   alert("인천공항 내부에서만 이용할 수 있습니다.");
            // try {
            //   throw new LocationError(
            //     "인천공항 내부에서만 이용할 수 있습니다."
            //   );
            // } catch (error) {
            //   ErrorHandler.handleSpecificError(error);
            // }
            // }
          },
          (error) => {
            Logger.error("위치 정보 가져오기 실패", error);
            switch (error.code) {
              case 1: // PERMISSION_DENIED
                alert("위치 정보 제공을 거부하셨습니다. 설정을 확인해주세요.");
                break;
              case 2: // POSITION_UNAVAILABLE
                alert("현재 위치를 확인할 수 없습니다. ");
                break;
              case 3: // TIMEOUT
                alert("위치 정보를 가져오는 데 시간이 초과되었습니다.");
                break;
              default:
                alert("알 수 없는 오류로 위치 정보를 가져올 수 없습니다.");
                break;
            }
            ErrorHandler.handleSpecificError(error);
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      }
    });
  };
  const savedLocation = async (location) => {
    try {
      const position = location;
      const locationData = {
        lat: position.lat,
        lng: position.lng,
      };
      sessionStorage.setItem("myLocation", JSON.stringify(locationData));
      return locationData;
    } catch (error) {
      Logger.error("위치 정보를 가져올 수 없습니다 : ", error);
    }
  };

  const limitLocation = (userLocation) => {
    const maxLat = 37.496831;
    const minLat = 37.420388;
    const maxLng = 126.499959;
    const minLng = 126.388376;
    const userLat = userLocation.lat;
    const userLng = userLocation.lng;
    return (
      userLat < maxLat &&
      userLat > minLat &&
      userLng < maxLng &&
      userLng > minLng
    );
  };
  return {
    getCurrentPosition: async () => {
      return await getCurrentPosition();
    },
    savedLocation: async (location) => {
      await savedLocation(location);
    },
  };
})();

export default utLocation;


// ===== END OF js/utility/location.js =====

// ===== START OF js/service/dragService.js =====

import Logger from "../utility/logger.js";

const DragService = (() => {
  let handle;
  let peekElement;
  let isDragging = false;
  let startY = 0;
  let startBottom = 0;
  let currentBottom = 0;
  let currentPosition;
  let bottomSheet;
  const POSITIONS = {
    CLOSED: 0,
    OPEN: 0,
  };
  function getEventY(e) {
    return e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
  }
  function calculatePeekHeight() {
    if (!peekElement) {
      Logger.error("peek 클래스 요소를 찾을 수 없습니다!");
      return 100; // 기본값
    }
    let totalHeight = 0;
    let marginTop;
    let marginBottom;
    let paddingTop;
    let paddingBottom;
    Array.from(peekElement).forEach((peek) => {
      const style = window.getComputedStyle(peek);
      marginTop = parseInt(style.marginTop) || 0;
      marginBottom = parseInt(style.marginBottom) || 0;
      paddingTop = parseInt(style.paddingTop) || 0;
      paddingBottom = parseInt(style.paddingBottom) || 0;
      let height =
        peek.offsetHeight +
        marginTop +
        marginBottom +
        paddingTop +
        paddingBottom +
        50;
      totalHeight += height;
    });

    Logger.log("Total peek height:", totalHeight);

    return totalHeight;
  }
  function calculatePositions() {
    const sheetHeight = bottomSheet.offsetHeight;
    const peekHeight = calculatePeekHeight();
    const viewportHight = window.innerHeight;
    const hiddenHeight = sheetHeight - peekHeight;
    const closedRem = -pxToRem(hiddenHeight);
    if (closedRem > 0) {
      POSITIONS.CLOSED = -4;
    } else {
      const maxHiddenRem = -pxToRem(viewportHight);
      POSITIONS.CLOSED = Math.max(closedRem, maxHiddenRem);
    }
    POSITIONS.OPEN = -5;

    if (POSITIONS.CLOSED > 0 || POSITIONS.CLOSED < -30) {
      POSITIONS.CLOSED = -10;
    }

    return POSITIONS;
  }
  function pxToRem(px) {
    const rootFontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  }

  function updatePosition(bottomRem) {
    bottomSheet.style.bottom = bottomRem + "rem";
    currentBottom = bottomRem;
  }

  function startDrag(e) {
    isDragging = true;
    startY = getEventY(e);
    startBottom = currentBottom;
    handle.style.cursor = "grabbing";

    bottomSheet.style.transition = "none";

    e.preventDefault();
  }

  // 드래그 중
  function drag(e) {
    if (!isDragging) return;
    const currentY = getEventY(e);
    const deltaY = currentY - startY;
    const deltaRem = pxToRem(deltaY);
    let newBottom = startBottom - deltaRem;
    // 경계 제한
    const minPosition = Math.max(POSITIONS.CLOSED - 7, -25); // 안전한 최소값
    const maxPosition = Math.min(POSITIONS.OPEN + 2, 7); // 안전한 최대값

    newBottom = Math.max(minPosition, Math.min(maxPosition, newBottom));
    updatePosition(newBottom);

    e.preventDefault();
  }

  // 드래그 종료
  function endDrag() {
    if (!isDragging) return;

    isDragging = false;
    handle.style.cursor = "grab";

    // 트랜지션 다시 활성화
    bottomSheet.style.transition = "bottom 0.3s ease";

    let targetPosition = POSITIONS.CLOSED;
    let minDistance = Math.abs(currentBottom - POSITIONS.CLOSED);
    for (const [key, position] of Object.entries(POSITIONS)) {
      const distance = Math.abs(currentBottom - position);
      if (distance < minDistance) {
        Logger.log("min,distance : ", distance);
        minDistance = distance;
        targetPosition = position;
      }
    }
    currentPosition = targetPosition;
    updatePosition(targetPosition);
  }
  function initialize() {
    currentPosition = POSITIONS.CLOSED;
    if (!peekElement) {
      Logger.error("peek 클래스 요소가 없습니다. HTML을 확인해주세요.");
      return;
    }

    calculatePositions();
    currentBottom = POSITIONS.OPEN;
    updatePosition(POSITIONS.OPEN);
    currentPosition = POSITIONS.OPEN;
  }
  function getElement() {
    bottomSheet = document.getElementById("bottomSheet");
    handle = document.getElementById("handle");
    peekElement = document.getElementsByClassName("peek");
  }
  function bottomSheetEvent() {
    handle.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);

    // 터치 이벤트 (passive: false로 설정)
    handle.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", endDrag, { passive: false });
  }
  return {
    init: async () => {
      try {
        getElement();
        initialize();
        bottomSheetEvent();
      } catch (error) {
        Logger.error("bottomSheet drag 초기화 실패 : ", error);
      }
    },
  };
})();

export default DragService;


// ===== END OF js/service/dragService.js =====

// ===== START OF js/service/recoService.js =====

import Logger from "../utility/logger.js";
import DataService from "./dataService.js";
import Utility from "../utility/utility.js";

const RecoService = (() => {
  let recoArray = [];
  const recoGate = async () => {
    try {
      const areas = DataService.getAllAreas();
      const apiData = DataService.getApiData();
      recoArray = [];
      for (let i = 0; i < areas.length; i++) {
        if (i < 10 && areas[i].id !== "DG1" && areas[i].id !== "DG6") {
          const distance = await getAreaDistance(areas[i]);
          const apiDataForArea = apiData.find(
            (api) => api.deskname === areas[i].id
          );

          if (apiDataForArea) {
            const waitingTime = Math.round(
              DataService.getTotalWaitTime(apiDataForArea) / 60
            );

            recoArray.push({
              name: areas[i].name,
              time: distance + waitingTime,
              position: areas[i].position,
            });
          }
        }
      }

      recoArray.sort((a, b) => a.time - b.time);

      Logger.log("추천 게이트 계산 완료:", recoArray);
    } catch (error) {
      Logger.error("추천 게이트 계산 실패:", error);
    }
  };
  const getAreaDistance = async (area) => {
    try {
      const distanceStr = await Utility.getDistance(area);
      return Math.round(
        Number(distanceStr.replace("M", "").replace(",", "")) / 70
      );
    } catch (error) {
      Logger.error("거리 계산 실패:", error);
      return 0;
    }
  };
  const recoLikeIconView = () => {
    const data = DataService.getAllAreas();
    const departureAreas = data.slice(1, 9);
    const eastWest = document.getElementsByClassName("eastWest");
    let idx;
    departureAreas.forEach((departure, index) => {
      if (departure.name == recoArray[0].name) {
        idx = index;
      }
    });
    eastWest[idx].getElementsByClassName("like-icon")[0].style.display = "flex";
  };

  return {
    recoGate: async () => {
      try {
        await recoGate();
        return recoArray;
      } catch (error) {
        Logger.error("추천 게이트 설정 실패 : ", error);
      }
    },
    recoLikeIconView: () => {
      recoLikeIconView();
    },
    getRecoArray: () => {
      return recoArray;
    },
  };
})();

export default RecoService;


// ===== END OF js/service/recoService.js =====

// ===== START OF js/utility/timeCalculator.js =====

import Logger from "./logger.js";
import MapService from "../service/mapService.js";
import Utility from "./utility.js";
const TimeCalculator = (() => {
  let boardingGateNum;
  const timereset = async () => {
    return new Promise((resolve) => {
      try {
        const time = document.getElementById("nTime");
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        let hour = now.getHours();
        let minute = String(now.getMinutes()).padStart(2, "0");
        const hourStr = String(hour).padStart(2, "0");

        time.innerHTML =
          "UPDATE : " +
          year +
          "." +
          month +
          "." +
          day +
          " " +
          hourStr +
          ":" +
          minute;
        resolve();
      } catch (error) {
        Logger.error("시간 설정 실패");
        resolve();
      }
    });
  };
  const calculateAllTimes = async (foundData, foundApi) => {
    try {
      let totalTime = 0;
      let language = MapService.languageReturn();
      boardingGateNum = sessionStorage.getItem("boardingGate");
      // 홀까지 이동 시간
      const distanceStr = await Utility.getDistance(foundData);
      const distance = Number(distanceStr.replace("M", "").replace(",", ""));
      const hallTime = Math.floor(distance / 60);
      totalTime += hallTime;

      const hallWaiting =
        hallTime > 60
          ? `${Math.floor(hallTime / 60)}${language["hour"]} ${hallTime % 60}${
              language["minute"]
            }`
          : `${hallTime}${language["minute"]}`;
      // 탑승구까지 이동 시간
      const boardingDistance = await Utility.getDistance(
        foundData,
        boardingGateNum,
        true
      );
      const boardingTime = Math.floor(
        Number(boardingDistance.replace("M", "").replace(",", "")) / 60
      );
      totalTime += boardingTime;
      const boardingTimeStr =
        boardingGateNum > 100
          ? `${boardingTime - 10}${language["minute"]}`
          : `${boardingTime}${language["minute"]}`;

      // 대기 시간
      const waitTime = foundApi.espwaittime === "D" ? 0 : foundApi.espwaittime;
      const waitingMinutes = Math.floor(waitTime / 60);
      totalTime += waitingMinutes;
      const waitingTime = `${waitingMinutes}${language["minute"]}`;

      // 출입국 시간
      const immigrationTotal =
        foundApi.immigrationtime === "NA"
          ? 60
          : foundApi.immigrationtime * foundApi.quelength;
      const immigrationMinutes = Math.floor(immigrationTotal / 60);
      totalTime += immigrationMinutes;
      let estimatedTime =
        immigrationMinutes + waitingMinutes + language["minute"];
      const immigration =
        immigrationTotal > 3600
          ? `${Math.floor(immigrationTotal / 3600)}${
              language["hour"]
            } ${Math.floor((immigrationTotal % 3600) / 60)}${
              language["minute"]
            }`
          : `${immigrationMinutes}${language["minute"]}`;

      // 총 시간
      const strTotal =
        totalTime > 60
          ? `${Math.floor(totalTime / 60)}${language["hour"]} ${
              totalTime % 60
            }${language["minute"]}`
          : `${totalTime}${language["minute"]}`;

      return {
        total: strTotal,
        times: [hallWaiting, estimatedTime, boardingTimeStr],
      };
    } catch (error) {
      Logger.error("시간 계산 실패:", error);
      return {
        total: `0${language["minute"]}`,
        times: [
          `0${language["minute"]}`,
          `0${language["minute"]}`,
          `0${language["minute"]}`,
          `0${language["minute"]}`,
        ],
      };
    }
  };
  const padZero = () => {
    String(num).padStart(2, "0");
  };
  const formatCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = padZero(now.getMonth() + 1); // getMonth()는 0부터 시작
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };
  const updateTimeDisplay = async (timeData) => {
    try {
      const total = document.getElementsByClassName("total-time");
      const latingTime = document.getElementsByClassName("latingTime");

      if (total[0]) {
        total[0].innerText = timeData.total;
      }

      Array.from(latingTime).forEach((time, idx) => {
        if (idx < timeData.times.length) {
          time.innerHTML = "";
          time.innerText = timeData.times[idx];
        }
      });
    } catch (error) {
      Logger.error("시간 표시 업데이트 실패:", error);
    }
  };
  return {
    timereset: async () => {
      await timereset();
    },
    calculateAllTimes: async (foundData, foundApi) => {
      return await calculateAllTimes(foundData, foundApi);
    },
    updateTimeDisplay: async (timeData) => {
      try {
        await updateTimeDisplay(timeData);
      } catch (error) {
        Logger.error("시간 표시 업데이트 실패:", error);
      }
    },
    formatCurrentDateTime: () => {
      return formatCurrentDateTime();
    },
  };
})();

export default TimeCalculator;


// ===== END OF js/utility/timeCalculator.js =====

// ===== START OF js/utility/translate.js =====

import Logger from "./logger.js";
import MapService from "../service/mapService.js";
const Translate = (() => {
  let language;
  const transName = async (name) => {
    return new Promise((resolve) => {
      try {
        language = MapService.languageReturn();
        let names = name.split(" ");
        names[0] = names[0].replace("출국장", "");
        let newName = "gate" + names[0];

        let eastWest;
        if (names[1] == "동편") {
          eastWest = "east";
        } else {
          eastWest = "west";
        }

        const result =
          language[newName].replace("<br>", "") + " " + language[eastWest];
        resolve(result);
      } catch (error) {
        Logger.error("이름 번역 실패:", error);
        resolve(name); // 원본 이름 반환
      }
    });
  };
  const translateMenu = async () => {
    let menuBtn;
    let conEx;
    language = MapService.languageReturn();
    try {
      menuBtn = Array.from(document.getElementsByClassName("menuBtn"));
      conEx = document.getElementById("congestionEx");
    } catch (error) {
      Logger.error("시간 표시 업데이트 실패 :", error);
    }
    menuBtn.forEach((menu, index) => {
      if (index == 0) {
        menu.innerHTML = language["departureHallCongestion"];
      } else {
        menu.innerHTML = language["estimated"];
      }
    });
    conEx.innerHTML =
      "• " +
      language["departureHallCongestion"] +
      '  <span id="questionMark">?</span>';
  };

  return {
    transName: (name) => {
      return transName(name);
    },
    translateMenu: async () => {
      try {
        await translateMenu();
      } catch (error) {
        Logger.error("메뉴 번역 실패:", error);
      }
    },
  };
})();

export default Translate;


// ===== END OF js/utility/translate.js =====

// ===== START OF js/service/markerService.js =====

import Logger from "../utility/logger.js";
import MapService from "./mapService.js";
import DataService from "./dataService.js";
import Utility from "../utility/utility.js";
import InfoWindowService from "../component/infoWindow.js";
const MarkerService = (() => {
  let markers = [];
  let infoWindows = [];
  let boardingInfoWindows = [];
  let boardingMarkers = [];
  let language;
  let areas = [];
  let map;
  let zoomOutMarkers = [];
  let selectedMarker;
  let selectedInfowindow;
  let selectedBoardingMarker;
  let boardingGateNum = null;
  let elementsMarker = [];
  const createMarker = async (areaData, index, boardingGateNum) => {
    try {
      const data = DataService.getAllAreas();
      let area = null;
      let content;
      let marker;
      if (boardingGateNum == null) {
        area = areaData.area || areaData;
        if (index == 0 || index == 9) return;
        content = getMarkerIcon(areaData, index);
        if (index % 2 == 1) {
          marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(
              area.position.lat,
              area.position.lng
            ),
            map: null,
            title: area.name,
            icon: {
              content: content,
              size: new naver.maps.Size(27, 35),
              anchor: new naver.maps.Point(55, 30),
            },
          });
        } else {
          marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(
              area.position.lat,
              area.position.lng
            ),
            map: null,
            title: area.name,
            icon: {
              content: content,
              size: new naver.maps.Size(27, 35),
              anchor: new naver.maps.Point(20, 30),
            },
          });
        }
      } else {
        area = data.find(
          (data) => data.name === "탑승게이트" + boardingGateNum
        );
        marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(area.position.lat, area.position.lng),
          map: null,
          title: area.name,
          icon: {
            content:
              '<div style="font-size:0.7rem;display:flex ;justify-content:center;align-items:center;width:auto;flex-direction:column;margin-top:10px"><div class = "boarding-icon" style="display: flex;font-size:1.25rem;font-weight:bold;padding-top:0.3125rem;flex-direction:column;height:2rem;width:2.5rem; border-radius: 0.5rem 0.5rem 0.2rem 0.2rem;border: 1px solid #BDBDBD; background-color:#fff;color:#056CFE;justify-content:center;align-items:center;"><p style="font-size:0.4rem;font-weight:semibold">GATE<p>' +
              boardingGateNum +
              '</div><span style ="display:flex;width:100%;text-align:center;justify-content:center;align-items:center;">' +
              language["boardingGate"] +
              boardingGateNum +
              "</span></div>",
            size: new naver.maps.Size(27, 35),
            anchor: boardingAncPoint(),
          },
        });
      }
      area.floorInfo = await Utility.getDistance(area, boardingGateNum);

      const infoWindow = await InfoWindowService.createInfoWindow(
        area,
        boardingGateNum
      );
      naver.maps.Event.addListener(marker, "click", () => {
        markerEvent(marker, infoWindow);
      });
      if (boardingGateNum == null) {
        markers.push(marker);
        infoWindows.push(infoWindow);
      } else {
        boardingMarkers.push(marker);
        boardingInfoWindows.push(infoWindow);
      }

      return { marker, infoWindow };
    } catch (error) {
      Logger.error("출국장 마커 생성 실패 : ", error);
    }
  };

  const boardingAncPoint = () => {
    const lang = sessionStorage.getItem("language");
    let point;
    switch (lang) {
      case "zh":
      case "ko":
        point = new naver.maps.Point(21, 15);
        break;
      case "en":
        point = new naver.maps.Point(21, 15);
        break;
      case "ja":
        point = new naver.maps.Point(21, 15);
        break;
    }
    return point;
  };

  const createElementMarker = () => {
    const elements = DataService.getAllElements();
    elements.forEach((element) => {
      const marker = new naver.maps.Marker({
        position: element.position,
        map: null,
        title: null,
        icon: {
          content:
            '<div style ="display:flex;flex-direction:column;z-index:10;font-size:10px;justify-content:center;align-items:center;"><div style="height : 10px;width:10px;background-color:blue; border-radius:5px"></div>' +
            element.name +
            "</div>",
          size: new naver.maps.Size(27, 35),
          anchor: new naver.maps.Point(0, 0),
        },
      });
      elementsMarker.push(marker);
    });
  };

  const allElementShow = () => {
    elementsMarker.forEach((element) => {
      element.setMap(map);
    });
  };
  const allElementhide = () => {
    elementsMarker.forEach((element) => {
      element.setMap(null);
    });
  };

  const createZoomOutMarker = async (index) => {
    try {
      if (index % 2 == 1 || index == 0) return;

      const data = DataService.getAllAreas();
      let position = Utility.calculateMidPoint(
        data[index].position,
        data[index - 1].position
      );
      const zoommarker = new naver.maps.Marker({
        position: position,
        map: null,
        title: null,
        icon: {
          content: getZoomMarkerIcon(data[index]),
          size: new naver.maps.Size(27, 35),
          anchor: new naver.maps.Point(18, 10),
        },
      });
      naver.maps.Event.addListener(zoommarker, "click", () => {
        setTimeout(() => {
          map.setZoom(map.getZoom() + 1, true);
        }, 100);
      });
      zoomOutMarkers.push(zoommarker);

      return { zoommarker };
    } catch (error) {
      Logger.error("탑승구 줌아웃 마커 생성 실패", error);
    }
  };
  const getZoomMarkerIcon = (area) => {
    const congestionInfo = DataService.getCongestionInfo(area.congestion);
    const color = congestionInfo ? congestionInfo.color : "#32A1FF";
    let departure = area.name.replace("출국장", "").split(" ");

    return (
      '<div style="display:flex;flex-direction: column;align-items: center;justify-content:center "><div style="display:flex ;background-color:#fff;width: 2.5rem; height: 2.5rem;padding-top:2px;flex-direction: column; border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;font-size:1rem;color:;align-items: center;color:#056CFE; justify-content:center;border:0.848px solid #BDBDBD"><img class ="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px">' +
      departure[0] +
      '</div><span style="display:flex;flex-direction:row;height:auto;weight:auto;font-size:0.875rem;align-items: center; justify-content:center">' +
      language["departurehall"] +
      "</span></div>"
    );
  };
  const replaceMarkerIcon = (selectMarker) => {
    let newIcon;
    let idx;
    markers.forEach((marker, index) => {
      if (marker == selectMarker) {
        idx = index;
      }
    });
    replaceAllMarkerIcon();

    if (selectedMarker == selectMarker) {
      newIcon = {
        ...selectMarker.getIcon(),
        content: selectMarker
          .getIcon()
          ["content"].replace("white", "blue")
          .replace("color:#fff", "color:#056CFE")
          .replace("background-color:#056CFE", "background-color:#fff")
          .replace(";transform:scale(1.2);transform-origin:center;", ";"),
      };
      selectedMarker = null;
    } else {
      newIcon = {
        ...selectMarker.getIcon(),
        content: selectMarker
          .getIcon()
          ["content"].replace("blue", "white")
          .replace("color:#056CFE", "color:#fff")
          .replace("background-color:#fff", "background-color:#056CFE")
          .replace(";", ";transform:scale(1.2);transform-origin:center;"),
      };

      selectedMarker = selectMarker;
    }

    selectMarker.setIcon(newIcon);
  };
  const replaceBoardingMarkerIcon = (selectMarker) => {
    let newIcon;
    if (selectedBoardingMarker != null) {
      newIcon = {
        ...selectMarker.getIcon(),
        content: selectMarker
          .getIcon()
          ["content"].replace("white", "blue")
          .replace("color:#fff", "color:#056CFE")
          .replace("background-color:#056CFE", "background-color:#fff")
          .replace(";transform:scale(1.2);transform-origin:center;", ";"),
      };
      selectedBoardingMarker = null;
    } else {
      newIcon = {
        ...selectMarker.getIcon(),
        content: selectMarker
          .getIcon()
          ["content"].replace("blue", "white")
          .replace("color:#056CFE", "color:#fff")
          .replace("background-color:#fff", "background-color:#056CFE")
          .replace(";", ";transform:scale(1.2);transform-origin:center;"),
      };
      selectedBoardingMarker = selectMarker;
    }
    selectMarker.setIcon(newIcon);
  };
  const replaceAllMarkerIcon = () => {
    let newIcon;
    let boardingIcon;
    let newContent;
    markers.forEach((marker, index) => {
      if (index % 2 == 1) {
        newContent = marker
          .getIcon()
          ["content"].replace("white", "blue")
          .replace("color:#fff", "color:#056CFE")
          .replace("background-color:#056CFE", "background-color:#fff")
          .replace(";transform:scale(1.2);transform-origin:center;", ";");
      } else {
        newContent = marker
          .getIcon()
          ["content"].replace("white", "blue")
          .replace("color:#fff", "color:#056CFE")
          .replace("background-color:#056CFE", "background-color:#fff")
          .replace(";transform:scale(1.2);transform-origin:center;", ";");
      }
      newIcon = {
        ...marker.getIcon(),
        content: newContent,
      };
      if (boardingMarkers[0] != null) {
        boardingIcon = {
          ...boardingMarkers[0].getIcon(),
          content: boardingMarkers[0]
            .getIcon()
            ["content"].replace("white", "blue")
            .replace("color:#fff", "color:#056CFE")
            .replace("background-color:#056CFE", "background-color:#fff")
            .replace(";transform:scale(1.2);transform-origin:center;", ";"),
        };
        boardingMarkers[0].setIcon(boardingIcon);
        selectedBoardingMarker = null;
      }
      marker.setIcon(newIcon);
    });
  };
  function zoomMarkerEvent() {
    let currentZoom = Number(map.getZoom());
    if (currentZoom <= 17) {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      zoomOutMarkers.forEach((marker) => {
        marker.setMap(map);
      });
    } else {
      markers.forEach((marker) => {
        marker.setMap(map);
      });
      zoomOutMarkers.forEach((marker) => {
        marker.setMap(null);
      });
    }
  }
  const markerEvent = (marker, infoWindow) => {
    replaceMarkerIcon(marker);

    if (selectedInfowindow == null) {
      selectedInfowindow = infoWindow;
    } else {
      selectedInfowindow = null;
    }

    if (infoWindow.getMap() != null) {
      infoWindow.close();
    } else {
      infoWindows.forEach((iw) => {
        iw.close();
      });
      infoWindow.open(map, marker);
    }
  };
  const getMarkerIcon = (area, index) => {
    let departure = area.name.replace("출국장", "").split(" ");
    let eastWest;
    if (departure[1] == "서편") {
      eastWest = language["west"];
    } else if (departure[1] == "동편") {
      eastWest = language["east"];
    } else {
      Logger.log("eastwest error");
    }

    if (index % 2 == 1) {
      return (
        '<div class = "markerIcon"style="display:flex ;z-index :11;flex-direction:row;align-items: center; justify-content:center;height: 2.5rem;width:auto;margin-top:10px"><span style="display:flex;flex-direction:row;height:2rem;width:2rem;font-size:0.875rem;align-items: center; justify-content:center">' +
        eastWest +
        "</span>" +
        '<div style="display:flex ;background-color:#fff;padding-top:2px;flex-direction: column;width: 2.6rem; height: 2.6rem;color:#056CFE;align-items: center; justify-content:center;border:0.848px solid #BDBDBD ; border-radius: 50%;font-size:1rem;border-color:#BDBDBD"><img class ="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px;">' +
        departure[0] +
        "</div></div>"
      );
    } else {
      return (
        '<div style="display:flex ;flex-direction:row;align-items: center;z-index :11; justify-content:cente;margin-top:10px;width:5rem"><div style="display:flex ;background-color:#fff;width: 2.6rem !important; height: 2.6rem;padding-top:2px;flex-direction: column; border-radius: 50%;font-size:1rem;color:;align-items: center;color:#056CFE; justify-content:center;border:0.848px solid #BDBDBD"><img class ="markerImg" src="./images/flight_blue.svg" style="height:0.875rem;margin-right:1px">' +
        departure[0] +
        '</div><span style="display:flex;flex-direction:row;height:2rem;weight:auto;font-size:0.875rem;align-items: center; justify-content:center">' +
        eastWest +
        "</span></div>"
      );
    }
  };
  const allMarkerDelete = async () => {
    try {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      boardingMarkers.forEach((marker) => {
        marker.setMap(null);
      });
    } catch (error) {
      Logger.error("marker가 존재하지 않음");
    }
  };

  return {
    init: async () => {
      language = MapService.languageReturn();
      map = MapService.getMap();
      if (markers[0] != null) {
        markers.forEach((marker) => {
          marker.setMap(null);

          Logger.log("maker.setMap(null) 작동함");
        });
        zoomOutMarkers.forEach((marker) => {
          marker.setMap(null);
        });
      }
      zoomOutMarkers = [];
      markers = [];
      const allAreas = DataService.getAllAreas();
      for (let index = 0; index < allAreas.length; index++) {
        const area = allAreas[index];
        areas.push(area);
        if (index < 10) {
          await createZoomOutMarker(index);
          await createMarker(area, index);
        }
      }
    },
    getMarkers: () => {
      return markers;
    },
    createBoardingMarker: async (boardingGateNum) => {
      if (boardingMarkers[0] != null) {
        boardingMarkers[0].setMap(null);
        boardingMarkers = [];
      }
      await createMarker(null, null, boardingGateNum);
      return boardingMarkers[0];
    },
    allMarkerDelete: async () => {
      await allMarkerDelete();
    },
    showMarkers: () => {
      try {
        if (map.getZoom() < 18) {
          zoomOutMarkers.forEach((marker) => {
            marker.setMap(map);
          });
        } else {
          markers.forEach((marker, index) => {
            if (index >= 9) return;
            marker.setMap(map);
          });
        }
        boardingGateNum = sessionStorage.getItem("boardingGate");
        if (boardingGateNum != null) {
          boardingMarkers[0].setMap(map);
        }
      } catch (error) {
        Logger.error("showMarker 실패 : ", error);
      }
    },
    getZoomEvent: () => {
      zoomMarkerEvent();
    },
    getInfoWindows: () => {
      return infoWindows;
    },
    getSelectedInfowindow: () => {
      return selectedInfowindow;
    },
    replaceAllMarkerIcon: () => {
      replaceAllMarkerIcon();
    },
    getSelectedMarker: () => {
      return selectedMarker;
    },
    setSelectedMarker: (marker) => {
      selectedMarker = marker;
    },
    replaceMarkerIcon: (marker) => {
      replaceMarkerIcon(marker);
    },
    replaceBoardingMarkerIcon: () => {
      replaceBoardingMarkerIcon(boardingMarkers[0]);
    },
    getZoomMarker: () => {
      return zoomOutMarkers;
    },
    getBoardingMarker: () => {
      return boardingMarkers;
    },
    elementSetting: () => {
      createElementMarker();
    },
    allElementShow: () => {
      allElementShow();
    },
    allElementhide: () => {
      allElementhide();
    },
  };
})();

export default MarkerService;


// ===== END OF js/service/markerService.js =====

// ===== START OF js/component/infoWindow.js =====

import MapService from "../service/mapService.js";
import Utility from "../utility/utility.js";
const InfoWindowService = (() => {
  let infoWindows = [];
  let language;
  const createInfoWindow = async (area, boardingGateNum) => {
    let infoWindow;
    if (boardingGateNum == null) {
      infoWindow = new naver.maps.InfoWindow({
        content: await getInfoWindowContent(area, boardingGateNum),
        maxWidth: 300,
        backgroundColor: "#fff",
        borderColor: Utility.congestionColor(area),
        disableAutopan: true,
        borderWidth: 3,
        borderRadius: 12,
        disableAnchor: false,
      });
    } else {
      infoWindow = new naver.maps.InfoWindow({
        content: await getInfoWindowContent(area, boardingGateNum),
        maxWidth: 300,
        backgroundColor: "#fff",
        borderColor: Utility.congestionColor(area),
        disableAutopan: true,
        borderWidth: 0,
        borderRadius: 12,
        disableAnchor: false,
      });
    }
    infoWindows.push(infoWindow);
    return infoWindow;
  };
  const getInfoWindowContent = async (areaData, boardingGateNum) => {
    let gaugeColor;
    let distance = await Utility.getDistance(areaData);
    let conLevel;
    switch (areaData.congestion) {
      case "none":
        gaugeColor = "#999";
        conLevel = language["none"];
        break;
      case "low":
        gaugeColor = "#EBF6FF";
        conLevel = language["low"];
        break;
      case "medium":
        gaugeColor = "#E6FAEC";
        conLevel = language["medium"];
        break;
      case "high":
        gaugeColor = "#FFF3EC";
        conLevel = language["high"];
        break;
      case "veryhigh":
        gaugeColor = "#FFEFEF";
        conLevel = language["veryhigh"];
        break;
      default:
        gaugeColor = "#4CAF50";
    }
    const translatedName = Utility.translateAreaName(areaData.name, language);
    if (boardingGateNum == null) {
      return (
        '<div class="info-window ' +
        areaData.congestion +
        '">' +
        "<h3>" +
        translatedName +
        "</h3>" +
        '<p><span class="status ' +
        areaData.congestion +
        '"></span>' +
        conLevel +
        "</p>" +
        '<p style = "color:#21212280">' +
        language["distance"] +
        ": " +
        distance +
        "</p>" +
        "</div>"
      );
    } else {
      let distance = await Utility.getDistance(areaData, boardingGateNum);
      return (
        '<div class="info-window shadow">' +
        "<h3>" +
        language["nthGate"].replace("{{number}}", boardingGateNum) +
        "</h3>" +
        '<p style = "color:#21212280">' +
        language["distance"] +
        ": " +
        distance +
        "</p>" +
        "</div>"
      );
    }
  };
  const getElementContent = (area) => {
    let name = language[area.name];
    let location = language[area.description];
    const contents =
      '<div class="info-window shadow">' +
      "<h3>" +
      name +
      "</h3>" +
      "<p>" +
      location +
      "</p>";
    '<span style="left:auto;font-size:12px;color:#2E90FA">' +
      language["more"] +
      "></span>";
    ("</div>");
  };
  const elementInfo = async () => {
    let infoWindow;
    infoWindow = new naver.maps.InfoWindow({
      content: await getElementContent(area),
      maxWidth: 300,
      backgroundColor: "#fff",
      borderColor: Utility.congestionColor(area),
      disableAutopan: true,
      borderWidth: 0,
      borderRadius: 12,
      disableAnchor: false,
    });
  };
  return {
    createInfoWindow: async (area, boardingGate = null) => {
      language = MapService.languageReturn();
      if (boardingGate != null) {
      }
      return await createInfoWindow(area, boardingGate);
    },
    getInfoWindows: () => {
      return infoWindows;
    },
  };
})();
export default InfoWindowService;


// ===== END OF js/component/infoWindow.js =====

// ===== START OF js/service/polylineService.js =====

import Logger from "../utility/logger.js";
import MapService from "./mapService.js";
import utLocation from "../utility/location.js";
import DataService from "./dataService.js";
const PolylineService = (() => {
  let polylines = [];
  let map;
  let boardingMarker;
  let boardingPolyline = null;
  const createPolyline = (markers) => {
    for (let i = 0; i < markers.length; i += 2) {
      let polyline = new naver.maps.Polyline({
        map: null,
        path: [markers[i].position, markers[i + 1].position],
        clickable: false,
        strokeColor: "#056CFE1A",
        strokeOpacity: 1,
        strokeWeight: 40,
        strokeLineCap: "butt",
      });
      polylines.push(polyline);
    }
  };
  const createBoardingPolyline = async (marker) => {
    const userLocation = await utLocation.getCurrentPosition();
    boardingMarker = marker;
    boardingPolyline = new naver.maps.Polyline({
      map: null,
      path: [userLocation, marker.position],
      clickable: false,
      strokeColor: "#2E90FA",
      strokeOpacity: 1,
      strokeWeight: 1,
      strokeLineCap: "butt",
      strokeStyle: "longdash",
    });
  };

  const updatePolyline = async (boardingGateNum) => {
    const userLocation = await utLocation.getCurrentPosition();
    let areas = DataService.getAllAreas();
    if (boardingGateNum != null) {
      const area = areas.find(
        (area) => area.name === "탑승게이트" + boardingGateNum
      );
      boardingPolyline.setPath([area.position, userLocation]);
    } else {
      let xy = { x: boardingMarker.position.x, y: boardingMarker.position.y };
      boardingPolyline.setPath([xy, userLocation]);
    }
  };

  const setPolyline = () => {
    boardingPolyline.setMap(map);
  };

  const deletePolyLine = async () => {
    try {
      polylines.forEach((polyline) => {
        polyline.setMap(null);
      });
    } catch (error) {
      Logger.error("polyline setMap(null)실패 : ", error);
    }
  };
  const viewPolyLine = async () => {
    try {
      polylines.forEach((polyline) => {
        polyline.setMap(map);
      });
    } catch (error) {
      Logger.error("polyline setMap(map)실패 : ", error);
    }
  };
  return {
    init: () => {
      map = MapService.getMap();
    },
    createPolyline: (markers) => {
      if (polylines.length == 0) {
        createPolyline(markers);
      }
    },
    deletePolyLine: () => {
      deletePolyLine();
    },
    viewPolyLine: () => {
      viewPolyLine();
    },
    createBoardingPolyline: async (boardingMarker) => {
      if (boardingPolyline != null) {
        boardingPolyline.setMap(null);
        boardingPolyline = null;
      }
      await createBoardingPolyline(boardingMarker);
    },
    updatePolyline: async (boardingGateNum = null) => {
      await updatePolyline(boardingGateNum);
    },
    setPolyline: () => {
      setPolyline();
    },
    getBoardingPolyline: () => {
      return boardingPolyline;
    },
  };
})();

export default PolylineService;


// ===== END OF js/service/polylineService.js =====

// ===== START OF js/service/dataService.js =====

import Logger from "../utility/logger.js";
import TimeCalculator from "../utility/timeCalculator.js";
import ErrorHandler from "../utility/httpError.js";
const DataService = (() => {
  let data = null;
  let apiDatas = null;
  let congestions = [];
  let elements = [];
  const updateCongestion = () => {
    if (!data) return;
    Array.from(apiDatas).forEach((apiData) => {
      congestions.push(calculateCongestionLevel(apiData));
    });

    data.buildings.forEach((building) => {
      building.areas.forEach((area, idx) => {
        if (idx !== 0 && idx !== 9) {
          area.congestion = congestions[idx];
        }
      });
    });

    data.lastUpdated = new Date().toISOString();

    return data;
  };
  const getAirportData = async () => {
    try {
      const requestParams = {
        accessKey: window.appConfig.API_KEY || "",
        _type: "json",
        datetime: TimeCalculator.formatCurrentDateTime(),
      };

      const result = await apiDatas.get(
        "/service/DptgtSnsrDatT1/dptgtsnsrdatt1",
        { params: requestParams }
      );

      apiDatas = result.data.response.body.items.item || null;
      Logger.log("실시간 혼잡도 API 수신 완료", apiDatas);
    } catch (error) {
      Logger.error("혼잡도 api데이터 로드 실패");
      // ErrorHandler.handleSpecificError(error);
    }
  };
  const calculateTotalWaitTime = (item) => {
    const queueLength = parseInt(item.quelength) || 0;
    const immigrationTime =
      item.immigrationtime === "NA" ? 0 : parseInt(item.immigrationtime) || 0;
    const expectedWaitTime =
      item.espwaittime === "D" || item.espwaittime === "NA"
        ? 0
        : parseInt(item.espwaittime) || 0;

    return queueLength * immigrationTime + expectedWaitTime;
  };

  // 총 대기시간 기준 혼잡도 계산
  const calculateCongestionLevel = (item) => {
    const totalWaitTime = calculateTotalWaitTime(item);
    // 시간 기준 혼잡도 (초 단위)
    if (totalWaitTime <= 600) return "low"; // 10분 이하
    if (totalWaitTime <= 1800) return "medium"; // 30분 이하
    if (totalWaitTime <= 3600) return "high"; // 1시간 이하
    return "veryhigh"; // 1시간 초과
  };

  return {
    initData: async () => {
      data = window.mockData || null;
      apiDatas = window.mockData2.data[0].response.body.items.item || null;
      await getAirportData();
      elements = data.elements.areas;
      if (!data) {
        Logger.error("모킹 데이터 로드 실패함");
        return null;
      }
      updateCongestion();
      return data;
    },
    getAllElements: () => {
      return elements;
    },
    getAllData: () => {
      return data;
    },
    getApiData: () => {
      return apiDatas;
    },
    getTotalWaitTime: (item) => {
      return calculateTotalWaitTime(item);
    },
    getCompanyLocation: () => {
      if (!data) {
        Logger.log("data", data);
        return null;
      }
      return data.companyLocation;
    },

    getBuildingData: (buildingId) => {
      if (!data) return null;

      return (
        data.buildings.find((building) => building.id === buildingId) || null
      );
    },

    getAllBuildings: () => {
      if (!data) return null;

      return data.buildings;
    },

    getAreaData: (areaId) => {
      if (!data) return null;

      for (let i = 0; i < data.buildings.length; i++) {
        const building = data.buildings[i];

        for (let j = 0; j < building.areas.length; j++) {
          if (building.areas[j].id === areaId) {
            return building.areas[j];
          }
        }
      }
      return null;
    },

    getAllAreas: () => {
      if (!data) {
        Logger.log(data);
        return null;
      }
      const allAreas = [];
      data.buildings.forEach((building) => {
        building.areas.forEach((area) => {
          allAreas.push(area);
        });
      });
      return allAreas;
    },

    getCongestionInfo: (level) => {
      if (!data) return null;

      return data.congestionLevels[level] || null;
    },

    // 혼잡도 데이터 업데이트 (시뮬레이션용)
    updateCongestionData: () => {
      return updateCongestionRandomly();
    },
  };
})();
export default DataService;


// ===== END OF js/service/dataService.js =====

// ===== START OF js/component/bottomSheet.js =====

import Logger from "../utility/logger.js";
import RecoService from "../service/recoService.js";
import DataService from "../service/dataService.js";
import TimeCalculator from "../utility/timeCalculator.js";
import Translate from "../utility/translate.js";
import Utility from "../utility/utility.js";
const BottomSheet = (() => {
  let language;
  let departurehall = [];
  let boardingGateNum = null;
  let recoArray = [];

  const showGateCongestion = async () => {
    try {
      const allAreadata = DataService.getAllAreas();
      const areadata = [];

      allAreadata.forEach((area, idx) => {
        if (idx != 0 && idx < 9) {
          areadata.push(area);
        }
      });

      const contentsEl = document.getElementsByClassName("eastWest");
      if (!contentsEl || contentsEl.length === 0) {
        Logger.error("eastWest 요소들을 찾을 수 없습니다.");
        return;
      }

      // 200ms 후에 실행 (기존 setTimeout을 Promise로 변경)
      await new Promise((resolve) => setTimeout(resolve, 200));

      for (const [index, conData] of areadata.entries()) {
        if (index >= contentsEl.length) continue;

        const congestionInfo = getCongestionInfo(conData.congestion);
        const htmlContents = createCongestionHTML(
          congestionInfo,
          index % 2 === 1
        );

        contentsEl[index].innerHTML = htmlContents;
      }
      RecoService.recoLikeIconView();
    } catch (error) {
      Logger.error("게이트 혼잡도 표시 실패:", error);
    }
  };
  const getCongestionInfo = (congestionLevel) => {
    const congestionMap = {
      none: {
        color: "#999",
        border: "1px solid #999",
        textColor: "#99999",
        text: language["none"],
      },
      low: {
        color: "#EBF6FF",
        border: "1px solid #E8E8E8",
        textColor: "#32A1FF",
        text: language["low"],
      },
      medium: {
        color: "#E6FAEC",
        border: "1px solid #E8E8E8",
        textColor: "#00C73C",
        text: language["medium"],
      },
      high: {
        color: "#FFF3EC",
        border: "1px solid #E8E8E8",
        textColor: "#FF823F",
        text: language["high"],
      },
      veryhigh: {
        color: "#FFEFEF",
        border: "1px solid #E8E8E8",
        textColor: "#FF5959",
        text: language["veryhigh"],
      },
    };

    return (
      congestionMap[congestionLevel] || {
        color: "#4CAF50",
        border: "1px solid #E8E8E8",
        textColor: "#000",
        text: language["none"] || "정보없음",
      }
    );
  };

  // 5. 혼잡도 HTML 생성
  const createCongestionHTML = (congestionInfo, isEast) => {
    const direction = isEast ? language["east"] : language["west"];

    return `<div style="text-align: center;border:${congestionInfo.border}">
      <p class="gatePoint">${direction}</p>
      <h4 style="color:${congestionInfo.textColor}">${congestionInfo.text}</h4>
      <div class="like-icon" style="display:none ;justify-content:center;align-items:center;height:1rem;width:1rem;background-color:#32A1FF;position:fixed;transform:translate(10px,-38px);border-radius:50%"><img src="./images/like_icon.svg" style="height:0.7rem;width:0.7rem;border-radius:50%"></div>
    </div>`;
  };
  const changeBorderColor = async (index) => {
    try {
      const allareas = DataService.getAllAreas();
      let idx = index + 1;
      const div = document.querySelectorAll(".eastWest div");

      let eastWest = [];
      div.forEach((a, divIndex) => {
        if (divIndex % 2 == 0) {
          eastWest.push(a);
        }
      });

      eastWest.forEach((divBox, boxIndex) => {
        if (index == boxIndex) {
          divBox.style.setProperty(
            "border-color",
            Utility.congestionColor(allareas[idx])
          );
        } else {
          divBox.style.setProperty("border-color", "#E8E8E8");
        }
      });
    } catch (error) {
      Logger.error("error :", error);
    }
  };
  const resetAllBorderColor = () => {
    const div = document.querySelectorAll(".eastWest div");
    div.forEach((divBox) => {
      divBox.style.setProperty("border-color", "#E8E8E8");
    });
  };
  const setupGateEventListeners = async () => {
    try {
      const moveGate = document.getElementsByClassName("eastWest");
      if (!moveGate || moveGate.length === 0) {
        Logger.error("eastWest 요소들을 찾을 수 없습니다.");
        return;
      }

      // 기존 이벤트 리스너 제거 (중복 방지)
      Array.from(moveGate).forEach((gate) => {
        const newGate = gate.cloneNode(true);
        gate.parentNode.replaceChild(newGate, gate);
      });
      // 새로운 이벤트 리스너 추가
      const updatedGates = document.getElementsByClassName("eastWest");
      Array.from(updatedGates).forEach((gate, index) => {
        gate.addEventListener("click", async () => {
          try {
            Utility.moveGate(index);
            Utility.openWindowInfo(index);
            await changeBorderColor(index);
          } catch (error) {
            Logger.error(`게이트 ${index} 클릭 처리 오류:`, error);
          }
        });
      });
    } catch (error) {
      Logger.error("게이트 이벤트 리스너 설정 실패:", error);
    }
  };

  const changeMenu = async (idx = 0) => {
    try {
      boardingGateNum = sessionStorage.getItem("boardingGate");
      const menuBtn = document.getElementsByClassName("menuBtn");
      const controls = document.getElementById("controls");

      if (!menuBtn || !controls) {
        Logger.error("필요한 DOM 요소를 찾을 수 없습니다.");
        return;
      }

      if (idx === 0) {
        await handleFirstMenu(menuBtn, controls);
      } else if (boardingGateNum != null) {
        await handleSecondMenu(menuBtn, controls);
      } else {
        ModalService.boardingModalOpen();
      }
    } catch (error) {
      Logger.error("메뉴 변경 실패:", error);
    }
  };
  const handleFirstMenu = async (menuBtn, controls) => {
    try {
      menuBtn[0].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[1].style.setProperty("border-bottom", "1px solid #2121221A");

      controls.innerHTML = createFirstMenuHTML();
      await showGateCongestion();
      await TimeCalculator.timereset();
      await setupGateEventListeners();
    } catch (error) {
      Logger.error("첫 번째 메뉴 처리 실패:", error);
    }
  };
  const handleSecondMenu = async (menuBtn, controls) => {
    try {
      menuBtn[1].style.setProperty("border-bottom", "3px solid #212122");
      menuBtn[0].style.setProperty("border-bottom", "1px solid #2121221A");

      departurehall = [];
      const translationPromises = RecoService.getRecoArray()
        .slice(0, 3)
        .map((reco) => Translate.transName(reco.name));
      departurehall = await Promise.all(translationPromises);
      const innerHTML = createSecondMenuHTML();
      controls.innerHTML = innerHTML;

      await trainShow();
      await setupRecommendationEvents();
    } catch (error) {
      Logger.error("두 번째 메뉴 처리 실패:", error);
    }
  };
  const createFirstMenuHTML = () => {
    return `<div class="tabs">
      <table>
        <tr>
          <th id="congestionEx">•${language["departureHallCongestion"]}<span id="questionMark">?</span></th>
          <th><p id="nTime"></p></th>
        </tr>
      </table>
    </div>
    <table id="contents">
      <tr class="gate">
        <th>${language["gate2"]}</th>
        <th class="eastWest"></th>
        <th class="eastWest"></th>
      </tr>
      <tr class="gate">
        <th>${language["gate3"]}</th>
        <th class="eastWest"></th>
        <th class="eastWest"></th>
      </tr>
      <tr class="gate">
        <th>${language["gate4"]}</th>
        <th class="eastWest"></th>
        <th class="eastWest"></th>
      </tr>
      <tr class="gate">
        <th>${language["gate5"]}</th>
        <th class="eastWest"></th>
        <th class="eastWest"></th>
      </tr>
    </table>`;
  };
  const createSecondMenuHTML = () => {
    return `<div class="recoContainer">
      <div class="title">
        <div id="title-text">${language["estimatedTime"]}</div>
        <div class="total-time">${language["total"]} - ${language["minute"]}</div>
      </div>
      <div class="segment">
        <img class="icon" src="./images/walk.png" />
        <span class="flag">${language["transfer"]}</span>
        <div id="reco-priority" class="segment-inner">
          <span id="selectHall">${language["selectHall"]}<small></small><img id="down" src="./images/dropDown.svg"></span>
        </div>
        <div class="time-info">
          <span class="latingTime">-${language["minute"]}</span>
        </div>
      </div>
      <div class="segment">
        <img class="icon" src="./images/ticket.png" />
        <span class="flag">${language["Immigration"]}</span>
        <div class="segment-inner">
          <span>${language["waitingTime"]}<small></small></span>
        </div>
        <div class="time-info">
          <span class="latingTime">-${language["minute"]}</span>
        </div>
      </div>
      <div class="segment" id="trainAlert">
        <img class="icon" src="./images/train.svg"/>
        <div>${language["needTrain"]}</div>
        <span>10${language["minute"]}</span>
      </div>
      <div class="segment">
        <img class="icon" src="./images/walk.png" />
        <span class="flag">${language["walk"]}</span>
        <div id="segment-check" class="segment-inner">
          <span id="boardingGateCheck" style="display:flex;align-items:center;justify-content:center">
            ${language["boardingGate"]} : <span style="color:#2E90FA">${boardingGateNum}</span>
            <img src="./images/pen.svg" style="height:1rem;width:1rem">
          </span>
        </div>
        <div class="time-info">
          <span class="latingTime">-${language["minute"]}</span>
        </div>
      </div>
    </div>`;
  };
  const setupRecommendationEvents = async () => {
    try {
      const priority = document.getElementById("reco-priority");
      const boardingGateCheck = document.getElementById("boardingGateCheck");

      if (boardingGateCheck) {
        boardingGateCheck.addEventListener("click", () => {
          const modal = document.getElementById("modal-background");
          if (modal) {
            modal.style.display = "flex";
          }
        });
      }

      if (priority) {
        priority.addEventListener("click", async () => {
          await handlePriorityClick(priority);
        });
      }

      await updateRecommendationRanks();
    } catch (error) {
      Logger.error("추천 이벤트 설정 실패:", error);
    }
  };
  const handlePriorityClick = async (priority) => {
    try {
      const reco = document.getElementById("reco-select");
      if (!reco) return;

      reco.style.left = priority.getBoundingClientRect().left + "px";
      reco.style.top = priority.getBoundingClientRect().top + 35 + "px";

      if (reco.style.display === "none" || !reco.style.display) {
        reco.style.display = "flex";
        await selectEvent();

        const handleOutsideClick = (event) => {
          if (
            !reco.contains(event.target) &&
            !priority.contains(event.target)
          ) {
            reco.style.display = "none";
            document.removeEventListener("click", handleOutsideClick);
          }
        };

        setTimeout(() => {
          document.addEventListener("click", handleOutsideClick);
        }, 100);
      } else {
        reco.style.display = "none";
      }
    } catch (error) {
      Logger.error("우선순위 클릭 처리 실패:", error);
    }
  };
  const updateRecommendationRanks = async () => {
    try {
      const ranks = [language["first"], language["second"], language["third"]];
      const recoRank = document.getElementsByClassName("reco-rank");
      Array.from(recoRank).forEach((rank, idx) => {
        if (idx < departurehall.length) {
          rank.innerHTML = `<div>${departurehall[idx]} <small>(${ranks[idx]})</small></div>`;
        }
      });
    } catch (error) {
      Logger.error("추천 순위 업데이트 실패:", error);
    }
  };
  const trainShow = async () => {
    return new Promise((resolve) => {
      try {
        const train = document.getElementById("trainAlert");
        if (boardingGateNum > 100 && boardingGateNum < 133) {
          train.style.display = "flex";
        }
        resolve();
      } catch (error) {
        Logger.error("train 표시 실패 : ", error);
        resolve();
      }
    });
  };

  const selectEvent = async () => {
    try {
      const ranks = [language["first"], language["second"], language["third"]];
      const recoRanks = document.getElementsByClassName("reco-rank");
      Array.from(recoRanks).forEach((reco, idx) => {
        reco.addEventListener("click", async () => {
          try {
            await estimated(idx);
            await updateSelectedHall(idx, ranks);
            await updateRankDisplay(idx, ranks);
          } catch (error) {
            Logger.log("선택 이벤트 처리 실패 : ", index, error);
          }
        });
      });
    } catch (error) {
      Logger.error("선택 이벤트 설정 실패 : ", error);
    }
  };
  const updateSelectedHall = async (idx) => {
    try {
      const reco = document.getElementById("reco-select");
      const selectHall = document.getElementById("selectHall");

      if (reco) reco.style.display = "none";

      if (selectHall && recoArray[idx]) {
        const departure = recoArray[idx].name.replace("출국장", "").split(" ");
        const eastWest =
          departure[1] === "동편" ? language["east"] : language["west"];

        selectHall.innerHTML = `${language["departurehall"]} : <span style="color:#2E90FA">${departure[0]} ${eastWest}</span><small></small><img id="down" src="./images/dropDown.svg">`;
      }
    } catch (error) {
      Logger.error("선택된 홀 업데이트 실패:", error);
    }
  };
  const updateRankDisplay = async (selectedIdx, ranks) => {
    try {
      const recoRanks = document.getElementsByClassName("reco-rank");

      [0, 1, 2].forEach((index) => {
        if (index < recoRanks.length && index < departurehall.length) {
          if (index === selectedIdx) {
            recoRanks[
              index
            ].innerHTML = `<div style="display:flex; align-items: center;justify-content: center">${departurehall[index]} <small>(${ranks[index]})</small><img src="./images/check.svg" style="height:1.25rem;width:1.25rem; margin-left:auto"></div>`;
          } else {
            recoRanks[
              index
            ].innerHTML = `<div style="display:flex; align-items: center;justify-content: center">${departurehall[index]} <small>(${ranks[index]})</small></div>`;
          }
        }
      });
    } catch (error) {
      Logger.error("순위 표시 업데이트 실패:", error);
    }
  };
  const estimated = async (idx) => {
    try {
      const datas = DataService.getAllAreas();
      const apiData = DataService.getApiData();
      const foundData = datas.find((data) => data.name === recoArray[idx].name);
      const foundApi = apiData.find((data) => data.deskname === foundData.id);

      if (!foundData || !foundApi) {
        Logger.error("data를 찾을 수 없습니다");
        return;
      }
      const times = await TimeCalculator.calculateAllTimes(foundData, foundApi);
      await TimeCalculator.updateTimeDisplay(times);
    } catch (error) {
      Logger.error("예상 시간 계산 실패 : ", error);
    }
  };

  return {
    init: async () => {
      recoArray = await RecoService.recoGate();
    },
    languageChan: (lang) => {
      language = lang;
    },
    changeMenu: async (idx) => {
      try {
        await changeMenu(idx);
      } catch (error) {
        Logger.error("메뉴 변경 실패 : ", error);
      }
    },

    trainShow: async () => {
      try {
        await trainShow();
      } catch (error) {
        Logger.error("기차 표시 실패:", error);
      }
    },

    showGateCongestion: async () => {
      try {
        await showGateCongestion();
      } catch (error) {
        Logger.error("게이트 혼잡도 표시 실패:", error);
      }
    },

    setupRecommendationEvents: async () => {
      try {
        await setupRecommendationEvents();
      } catch (error) {
        Logger.error("추천 이벤트 설정 실패:", error);
      }
    },
    changeBorderColor: async (index) => {
      await changeBorderColor(index);
    },
    resetAllBorderColor: () => {
      resetAllBorderColor();
    },
  };
})();

export default BottomSheet;


// ===== END OF js/component/bottomSheet.js =====

// ===== START OF js/service/modalService.js =====

import Logger from "../utility/logger.js";
import MapService from "./mapService.js";
const ModalService = (() => {
  let language;

  const init = () => {
    language = MapService.languageReturn();
  };
  const modalLangChange = () => {
    const tryMeal = document.getElementById("modalTryMeal");
    const modalTitle = document.getElementById("modalTitle");
    const subtext = document.getElementsByClassName("subtext");
    const modalBtn = document.getElementById("reco");
    const gateNum = document.getElementById("input-gateNum");
    const confirmBtn = document.getElementsByClassName("confirm-btn");
    tryMeal.innerText = language["tryMeal"];
    subtext[0].innerText = language["subTitle"];
    gateNum.innerText = language["gateNum"];
    confirmBtn[0].innerText = language["confirmBtn"];
    modalTitle.innerText = language["modalTitle"];
    modalBtn.innerHTML =
      language["modalBtn"] +
      '<img id="arrow-right" src="./images/arrow-right.png" />';
  };

  const modalOpen = (index) => {
    const modal = document.getElementsByClassName("modal-overlay");
    modal[index].classList.add("show");
  };
  const modalClose = (index) => {
    const modal = document.getElementsByClassName("modal-overlay");
    modal[index].classList.remove("show");
  };
  return {
    init: () => {
      Logger.log("modalService init");
      init();
      let modalHeader = document.getElementsByClassName("modal-header");
      modalLangChange();
      modalHeader.innerHTML = language["gateNum"];
    },
    langChange: () => {
      init();
      modalLangChange();
    },
    adModalOpen: () => {
      modalOpen(0);
    },

    adModalClose: () => {
      modalClose(0);
    },
    boardingModalClose: () => {
      modalClose(1);
    },
    boardingModalOpen: () => {
      modalOpen(1);
    },
  };
})();

export default ModalService;


// ===== END OF js/service/modalService.js =====

// ===== START OF js/service/mapService.js =====

import Logger from "../utility/logger.js";
import BottomSheet from "../component/bottomSheet.js";
import DataService from "./dataService.js";
import PolylineService from "./polylineService.js";
import RecoService from "./recoService.js";
import MarkerService from "./markerService.js";
import DragService from "./dragService.js";
import Translate from "../utility/translate.js";
import InfoWindowService from "../component/infoWindow.js";
const MapService = (() => {
  let map = null;
  let markers = [];
  let boardingMarkers = [];
  let infoWindows = [];
  let boardingInfoWindows = [];
  let areas = [];
  let language;
  let firstlang = null;
  let languageText = null;
  let ampm = null;
  let boardingGateNum;
  let selectedInfowindow = null;
  let zoomOutMarkers = [];
  let polylines = [];

  const loadTranslateData = async (lang) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      BottomSheet.languageChan(languageData[lang]);
      return languageData[lang];
    } catch (error) {
      Logger.error("언어 로드 실패 : ", error);
    }
  };

  const zoomEvent = () => {
    naver.maps.Event.addListener(map, "zoom_changed", () => {
      selectedInfowindow = InfoWindowService.getInfoWindows();
      MarkerService.replaceAllMarkerIcon();
      MarkerService.getZoomEvent();
      if (map.getZoom() < 18) {
        selectedInfowindow.forEach((infoWindow) => {
          infoWindow.setMap(null);
          MarkerService.allElementhide();
        });
        PolylineService.deletePolyLine();
      } else if (map.getZoom() < 20) {
        zoomOutMarkers.forEach((marker) => {
          marker.setMap(null);
        });
        PolylineService.viewPolyLine();
        MarkerService.allElementhide();
      } else {
        MarkerService.allElementShow();
      }
    });
  };

  const getBoardingGateIdx = (index) => {
    index = Number(index);
    return (
      (index > 50 && index < 101) ||
      index > 132 ||
      index == 4 ||
      index == 5 ||
      index == 13 ||
      index == 44 ||
      index == null
    );
  };

  const initMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.44703, 126.449211),
      zoom: 17,
      mapTypes: new naver.maps.MapTypeRegistry({
        normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
      }),
      mapDataControl: false,
      disableKineticPan: false,
      tileSpare: 5,
      mapDataControl: false,
      scaleControl: false,
      logoControl: true,
      logoControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      zoomControl: false,
      scrollWheel: true,
      maxZoom: 20,
      minZoom: 16,
    };

    map = new naver.maps.Map("map", mapOptions);
    Logger.log("map객체 생성완료");
    return map;
  };

  return {
    init: async () => {
      Logger.log("MapService 초기화 시작");

      const mapElement = document.getElementById("map");
      if (!mapElement) {
        Logger.error("지도를 표시할 엘리먼트를 찾을 수 없음.");
        return null;
      }

      if (!window.naver || !naver.maps) {
        Logger.error("네이버 지도 API가 로드되지 않았습니다.");
        return null;
      }
      let lang = sessionStorage.getItem("language");
      firstlang = lang;
      if (lang == null) {
        languageText = "Language";
        lang = "ko";
        language = await loadTranslateData(lang);
      } else {
        language = await loadTranslateData(lang);
        languageText = language[lang];
      }
      Logger.log("language load완료");
      try {
        map = initMap();
        return map;
      } catch (error) {
        Logger.error("지도 초기화 중 오류 발생: ", error);
        Logger.log("지도 초기화 중 오류가 발생했습니다.", error);
        return null;
      }
    },
    setting: async () => {
      try {
        Logger.log("setting 시작");
        let lang = sessionStorage.getItem("language");
        firstlang = lang;
        if (lang == null) {
          languageText = "Language";
          lang = "ko";
          language = await loadTranslateData(lang);
        } else {
          language = await loadTranslateData(lang);
          languageText = language[lang];
        }
        const data = await DataService.initData();
        PolylineService.init();
        await RecoService.recoGate();
        await MarkerService.init();
        boardingGateNum = sessionStorage.getItem("boardingGate");
        Logger.log("boardingGateNum :", boardingGateNum);

        if (!data) {
          Logger.log("데이터 초기화 실패", "error");
          return map;
        }
        const allAreas = DataService.getAllAreas();
        await MarkerService.allMarkerDelete();
        markers = [];
        boardingMarkers = [];
        infoWindows = [];
        boardingInfoWindows = [];
        zoomOutMarkers = [];
        if (boardingGateNum != null) {
          boardingMarkers = await MarkerService.createBoardingMarker(
            boardingGateNum
          );

          console.log(boardingMarkers);
          await PolylineService.createBoardingPolyline(boardingMarkers);
          PolylineService.setPolyline();
        } else {
          Logger.error("boardingMarker 생성 실패");
        }
        for (let index = 0; index < allAreas.length; index++) {
          const area = allAreas[index];
          areas.push(area);
        }

        ampm = language["am"];
        await BottomSheet.changeMenu();
        await DragService.init();
        await Translate.translateMenu();
        if (polylines[0] == null) {
          markers = MarkerService.getMarkers();
          PolylineService.createPolyline(markers);
        }
        zoomEvent();
        naver.maps.Event.addListener(map, "click", function (e) {
          let latLng = { x: e.coord.x, y: e.coord.y };
          Logger.log(latLng);
          infoWindows = InfoWindowService.getInfoWindows();
          MarkerService.replaceAllMarkerIcon();
          if (MarkerService.getSelectedMarker() != null) {
            MarkerService.setSelectedMarker(null);
          }
          BottomSheet.resetAllBorderColor();
          infoWindows.forEach((infoWindow) => {
            infoWindow.close();
          });
        });

        await BottomSheet.showGateCongestion();
        Logger.log("setting 완료");
      } catch (error) {
        Logger.error("data를 가져오는 도중 error발생 : ", error);
      }
    },
    languageReturn: () => {
      return language;
    },
    boardingGateIdx: (idx) => {
      return getBoardingGateIdx(idx);
    },
    getMap: () => {
      return map;
    },
    alertGateNumCheck: () => {
      alert(language["checkNum"]);
    },
    moveBoardingGate: (boardingGateNum) => {
      const areaData = DataService.getAllAreas();

      var transition = {
        duration: 800,
        easing: "easeOutCubic",
      };
      boardingMarkers = MarkerService.getBoardingMarker();
      MarkerService.replaceBoardingMarkerIcon(boardingMarkers);
      let movePosition;
      Array.from(areaData).forEach((area) => {
        if (area.name == "탑승게이트" + boardingGateNum) {
          movePosition = naver.maps.LatLng(
            area.position.lat - 0.0003,
            area.position.lng
          );
          map.panTo(movePosition, transition);
        }
      });
      return movePosition;
    },
    getCurrentPosition: async () => {
      return await getCurrentPosition();
    },
  };
})();

export default MapService;


// ===== END OF js/service/mapService.js =====

// ===== START OF js/component/customControl.js =====

import Logger from "../utility/logger.js";
import MapService from "../service/mapService.js";
import MarkerService from "../service/markerService.js";
import InfoWindowService from "./infoWindow.js";
import ModalService from "../service/modalService.js";
import Utility from "../utility/utility.js";
import utLocation from "../utility/location.js";
import PolylineService from "../service/polylineService.js";
const CustomControl = (() => {
  let language = [];
  let markers = [];
  let boardingMarkers = [];
  let zoomMarkers = [];
  let boardingInfoWindows = [];
  let infoWindows = [];
  let boardingGateNum;
  let languageText = null;
  let selectedLangArray = [];
  let firstlang;
  let locaCon;
  let moveGateCon;
  let boardingInfo;
  let selectLangCon;
  let langArray = ["en", "zh", "ja", "ko"];
  let langchangeCon;
  let map;
  let movePosition = null;
  let userMarker = [];
  const positions = [
    naver.maps.Position.TOP_LEFT,
    naver.maps.Position.LEFT_TOP,
    naver.maps.Position.RIGHT_TOP,
    naver.maps.Position.TOP_RIGHT,
    naver.maps.Position.RIGHT_CENTER,
  ];
  const changeLanguage = async (newLang) => {
    try {
      sessionStorage.setItem("language", newLang);
      markers = MarkerService.getMarkers();
      infoWindows = InfoWindowService.getInfoWindows();
      // 기존 마커들 제거
      markers.forEach((e) => {
        e.setMap(null);
      });
      zoomMarkers = MarkerService.getZoomMarker();
      zoomMarkers.forEach((e) => {
        e.setMap(null);
      });
      // 배열 초기화
      boardingMarkers = [];
      markers = [];
      boardingInfoWindows = [];
      infoWindows = [];
      zoomMarkers = [];
      // 재설정
      await MapService.setting();
      await MarkerService.showMarkers();
      MarkerService.getZoomEvent();

      customControlAllDelete();
      createCustomControl();
      customControlEvent();
      customControlSetMap();
    } catch (error) {
      Logger.error("언어변경실패", error);
    }
  };
  const deletecustomControl = () => {
    const logoControl = map.controls[naver.maps.Position.TOP_RIGHT].getAt(0);
    positions.forEach((position) => {
      map.controls[position].clear();
    });
    map.controls[naver.maps.Position.TOP_RIGHT].push(logoControl);
  };
  const createCustomControl = () => {
    const selectedLang = sessionStorage.getItem("language");
    language = MapService.languageReturn();
    languageText = language[selectedLang];
    if (languageText == null) {
      languageText = "language";
    } else {
      languageText = language[selectedLang];
    }

    const locationBtnHtml =
      '<div id="requestLocation" style="height:2rem;display:flex ;align-items: center;justify-content: center;background-color:#fff;border-radius:1rem 1rem 1rem 1rem ;width:2rem;margin-right:10px;margin-bottom:8rem"><img id = "gps-black"src="./images/gps_black.svg" style="height:25px; width:25px;" ><img id ="gps-blue" src="./images/gps_blue.svg" style="height:1.5rem; width:1.5rem;display:none;" ></div>';

    let boarding;
    let moveGateBtn;

    if (boardingGateNum != null) {
      moveGateBtn =
        '<div id ="boardingInfo" style="display:flex ; height : 2rem;width:auto ; margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center;padding-left:10px;padding-right:10px" >' +
        '<img id="send-black" src="./images/send_black.svg" style="height:20px;width:20px">' +
        '<img id="send-blue" src="./images/send_blue.svg" style="display:none ;height:20px;width:20px">' +
        language["boardingGate"] +
        " : " +
        boardingGateNum +
        "</div>";
      boarding =
        '<div id="moveBoardingGate" style="display: flex ;z-index:900;height:2rem; width:2rem;margin-right:10px;margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center"><img src="./images/pen.svg" style="height:20px;width:20px"></div>';
    } else {
      moveGateBtn =
        '<div id ="boardingInfo-none" style="display:flex;height : 2rem ;width:auto; margin-top:15px;background-color:#fff;transform: translateX(3rem); color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center;padding-left:10px;padding-right:10px" ><img src="./images/send_black.svg" style="height:1.1rem;width:1.1rem">' +
        language["boardingGate"] +
        " : </div>";
      boarding =
        '<div id="moveBoardingGate" style="display: none ;z-index:900;height:2rem; width:2rem;margin-right:10px;margin-top:15px;background-color:#fff; color:#000; font-size:0.8rem;border-radius:15px 15px 15px 15px; align-items: center;justify-content: center"><img src="./images/pen.svg" style="height:20px;width:20px"></div>';
    }
    const selectLang =
      '<div id="selectLang" style="height:2rem; width:8rem; display: flex; justify-content: center; align-items: center;' +
      'background-color:white; margin-top: 15px; margin-left:10px; font-size:0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius: 1rem;">' +
      '<div style="flex: 8; height:100%; display: flex; align-items: center; justify-content: left; ' +
      'overflow: hidden; text-overflow: ellipsis;padding-left:5px; white-space: nowrap;">' +
      '<img src="./images/languageIcon.svg" style="height : 1.75vh;margin-right:5px;margin-left:5px">' +
      languageText +
      "</div>" +
      '<img id="icon" src="./images/dropDown.svg" style="flex: 2; height:70%; display: flex; align-items: center; justify-content: center;">' +
      "</div>";
    let languageList = {
      ko:
        '<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">한국어(' +
        language["korean"] +
        ")</div>",
      en:
        '<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">English(' +
        language["english"] +
        ")</div>",
      ja:
        '<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">日本語(' +
        language["japenese"] +
        ")</div>",
      zh:
        '<div class = "mapLang" style="width : 100% ; height:2rem; display: flex; align-items: center;padding-left:5px">简体中文(' +
        language["chinese"] +
        ")</div>",
    };

    selectedLangArray = [];
    langArray.forEach((lang) => {
      if (lang == selectedLang) {
        selectedLangArray.push(selectedLang);
        firstlang = lang;
      }
    });
    langArray.forEach((lang) => {
      if (lang != selectedLang) {
        selectedLangArray.push(lang);
      }
    });
    const langImgArray = createLanguageArrayWithSelectiveImg(
      languageList,
      firstlang
    );

    let langChan = "";
    selectedLangArray.forEach((lang) => {
      langImgArray.forEach((langImg) => {
        if (langImg[0] == lang) {
          langChan += langImg[1];
        }
      });
    });
    const languageChange =
      '<div style = "height: 8rem ;width :10rem; background-color:white; margin-top :1vh;margin-left:10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius : 4px;font-size:0.6rem">' +
      langChan +
      "</div>";
    locaCon = new naver.maps.CustomControl(locationBtnHtml, {
      position: naver.maps.Position.RIGHT_CENTER,
    });
    moveGateCon = new naver.maps.CustomControl(moveGateBtn, {
      position: naver.maps.Position.TOP_RIGHT,
    });
    boardingInfo = new naver.maps.CustomControl(boarding, {
      position: naver.maps.Position.RIGHT_TOP,
    });
    selectLangCon = new naver.maps.CustomControl(selectLang, {
      position: naver.maps.Position.LEFT_TOP,
    });
    langchangeCon = new naver.maps.CustomControl(languageChange, {
      position: naver.maps.Position.LEFT_TOP,
    });
  };
  const customControlEvent = async () => {
    let mapLangs;

    naver.maps.Event.addDOMListener(boardingInfo.getElement(), "click", () => {
      ModalService.boardingModalOpen();
    });
    naver.maps.Event.addListener(map, "center_changed", () => {
      const currentCenter = map.getCenter();
      const sendBlack = document.getElementById("send-black");
      const sendBlue = document.getElementById("send-blue");
      const gpsBlack = document.getElementById("gps-black");
      const gpsBlue = document.getElementById("gps-blue");
      const user_location = JSON.parse(sessionStorage.getItem("myLocation"));
      const userLat = Math.round(user_location.lat * 10000000) / 10000000;
      const userLng = Math.round(user_location.lng * 10000000) / 10000000;
      if (movePosition != null) {
        if (
          movePosition._lat == currentCenter._lat &&
          movePosition._lng == currentCenter._lng
        ) {
          sendBlack.style.display = "none";
          sendBlue.style.display = "block";
        } else {
          sendBlack.style.display = "block";
          sendBlue.style.display = "none";
        }
      }
      if (user_location != null) {
        if (currentCenter._lat == userLat && currentCenter._lng == userLng) {
          gpsBlack.style.display = "none";
          gpsBlue.style.display = "block";
        } else {
          gpsBlack.style.display = "block";
          gpsBlue.style.display = "none";
        }
      }
    });
    naver.maps.Event.addDOMListener(selectLangCon.getElement(), "click", () => {
      if (conSwitch) {
        conSwitch = null;
        langchangeCon.setMap(conSwitch);
        const icon = selectLangCon.getElement().querySelector("#icon");
        icon.src = "./images/dropDown.svg";
      } else {
        conSwitch = map;
        langchangeCon.setMap(conSwitch);
        const icon = selectLangCon.getElement().querySelector("#icon");
        icon.src = "./images/up.svg";
      }
    });
    let conSwitch = null;
    mapLangs = Array.from(
      langchangeCon.getElement().getElementsByClassName("mapLang")
    );
    mapLangs.forEach((mapLang, index) => {
      mapLang.addEventListener("click", async () => {
        await changeLanguage(selectedLangArray[index]);
        await ModalService.langChange();
      });
    });
    mapLangs.forEach((mapLang) => {
      mapLang.addEventListener("mouseenter", () => {
        mapLang.style.backgroundColor = "#F3F4F6";
      });
      mapLang.addEventListener("mouseleave", () => {
        mapLang.style.backgroundColor = "white";
      });
    });

    naver.maps.Event.addDOMListener(moveGateCon.getElement(), "click", () => {
      if (boardingGateNum != null) {
        movePosition = MapService.moveBoardingGate(boardingGateNum);
        Logger.log(boardingGateNum);
        Utility.openBoardingWindowInfo();
      } else {
        ModalService.boardingModalOpen();
      }
    });

    naver.maps.Event.addDOMListener(locaCon.getElement(), "click", async () => {
      try {
        const userPos = await utLocation.getCurrentPosition();

        const latLng = new naver.maps.LatLng(userPos["lat"], userPos["lng"]);
        if (userPos) {
          map.getCenter();
          map.setCenter(latLng);
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(latLng),
            map: null,
            title: "내 위치",
            icon: {
              content:
                '<img src="./images/user_Location.png" style="width:30px;height:30px">',
              size: new naver.maps.Size(27, 35),
              anchor: new naver.maps.Point(7, 14),
            },
          });
          if (userMarker[0] != null) {
            userMarker.forEach((uMarker) => {
              uMarker.setMap(null);
            });
          }
          marker.setMap(map);
          userMarker.push(marker);
          const boardingPolyline = PolylineService.getBoardingPolyline();
          Logger.log("boardingPolyline : ", boardingPolyline);
          if (boardingPolyline != null) {
            PolylineService.updatePolyline();
          }
        } else {
          alert("위치 정보가 없습니다.");
        }
      } catch (error) {
        alert("위치 정보를 가져오는데 실패했습니다. 위치 권한을 허용해주세요.");
        Logger.log("위치 권한 오류: " + error.message, "error");
      }
    });
  };
  const customControlSetMap = () => {
    setTimeout(() => {
      locaCon.setMap(map);
      boardingInfo.setMap(map);
      selectLangCon.setMap(map);
      moveGateCon.setMap(map);
    }, 50);
  };
  const customControlAllDelete = () => {
    try {
      const logoControl = map.controls[naver.maps.Position.TOP_RIGHT].getAt(0);
      positions.forEach((position) => {
        map.controls[position].clear();
      });

      map.controls[naver.maps.Position.TOP_RIGHT].push(logoControl);
    } catch (error) {
      Logger.error(`커스텀 컨트롤 삭제 실패:`, error);
    }
  };
  const createLanguageArrayWithSelectiveImg = (
    languageList,
    currentLang,
    imgSrc = "./images/check.svg"
  ) => {
    return Object.entries(languageList).map(([key, html]) => {
      const baseHtml = html.replace(
        'style="width : 100% ; height:3vh; display: flex; align-items: center"',
        'style="width : 100% ; height:3vh; display: flex; align-items: center; justify-content: space-between; padding: 0 10px;"'
      );
      if (key === currentLang) {
        // 현재 선택된 언어에만 img 추가\
        return [
          key,
          baseHtml.replace(
            "</div>",
            `<img src="${imgSrc}" style="width:15px; height:15px;margin-left:auto"></div>`
          ),
        ];
      } else {
        // 다른 언어들은 원본 그대로 반환
        return [
          key,
          baseHtml.replace(
            "</div>",
            `<span style="width:15px; height:15px;"></span></div>`
          ),
        ];
      }
    });
  };

  return {
    init: async () => {
      Logger.log("customControl init");
      map = MapService.getMap();
      boardingGateNum = sessionStorage.getItem("boardingGate");
      language = MapService.languageReturn();
      Logger.log("language : ", language);
      InfoWindowService.getInfoWindows();
      MarkerService.getMarkers();
      createCustomControl();
      await customControlEvent();
      customControlSetMap();
    },
    customControlAllDelete: () => {
      customControlAllDelete();
    },
  };
})();

export default CustomControl;


// ===== END OF js/component/customControl.js =====

// ===== START OF js/main.js =====

import Logger from "./utility/logger.js";
import utLocation from "./utility/location.js";
import MapService from "./service/mapService.js";
import BottomSheet from "./component/bottomSheet.js";
import CustomControl from "./component/customControl.js";
import ModalService from "./service/modalService.js";
import MarkerService from "./service/markerService.js";
import PolylineService from "./service/polylineService.js";
import ErrorHandler from "./utility/httpError.js";
import Utility from "./utility/utility.js";
$(document).ready(async () => {
  // ErrorHandler.init();
  let appConfig = {};

  // 서버의 /api/config 경로로 요청을 보내 환경 변수를 가져오는 함수
  const loadConfig = async () => {
    try {
      const response = await fetch("/api/config");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      appConfig = await response.json();
      window.appConfig = appConfig;
      Logger.log("서버 환경 설정 로드 완료:", appConfig);
    } catch (error) {
      Logger.error(
        "서버 환경 설정을 불러오는 데 실패했습니다. 기본 설정으로 실행합니다.",
        error
      );
    }
  };
  let map;
  let boardingGate = sessionStorage.getItem("boardingGate");
  let btnIdx = 0;
  const initializeServices = async () => {
    try {
      sessionStorage.setItem("render", true);
      let userLocation = await utLocation.getCurrentPosition();
      await utLocation.savedLocation(userLocation);
      Logger.log("사용자 위치 저장 완료");
      map = await MapService.init();
      if (!map) {
        throw new Error("지도 초기화 실패");
      }
      await MapService.setting();
      Logger.log("MapService 설정 완료");

      initBottomSheet();
      await initCustomControl();
      await initModalService();
      MarkerService.elementSetting();
      Logger.log("map, modal init 완료");

      return { success: true, hasLocation: true };
    } catch (error) {
      Logger.warn("위치 권한 없음 : ", error);
      try {
        map = await MapService.init();
        if (!map) {
          throw new Error("지도 초기화 실패");
        }
        await MapService.setting();
        await initCustomControl();

        Logger.log("MapService 설정 완료");

        await Promise.all([initBottomSheet, initModalService]);
        Logger.log("map, modal init 완료");

        return { success: true, hasLocation: false };
      } catch (criticalError) {
        Logger.error("critical initialize error : ", criticalError);
        return { success: false, hasLocation: false, error: criticalError };
      }
    }
  };
  const initBottomSheet = () => {
    try {
      Logger.log("bottomSheet init");
      BottomSheet.init();
    } catch (error) {
      Logger.error("bottomSheet init fail : ", error);
    }
  };
  const initCustomControl = async () => {
    return new Promise((resolve) => {
      try {
        setTimeout(async () => {
          await CustomControl.init();
          resolve();
        }, 100);
      } catch (error) {
        Logger.error("CustomControl init error", error);
      }
    });
  };
  const initModalService = async () => {
    await ModalService.init();
  };

  const handleMarkerDisplay = async () => {
    try {
      setTimeout(async () => {
        await MarkerService.showMarkers();
      }, 100);
      Logger.log("마커 표시 완료");
    } catch (error) {
      Logger.error("마커 표시 실패:", error);
    }
  };

  const setupEventListeners = () => {
    const handleFirstMenuClick = async () => {
      try {
        BottomSheet.changeMenu(btnIdx);
        await BottomSheet.showGateCongestion();

        // 게이트 클릭 이벤트 재설정
        setupGateClickEvents();
      } catch (error) {
        Logger.error("첫 번째 메뉴 처리 오류:", error);
      }
    };

    const handleOtherMenuClick = async () => {
      if (boardingGate == null) {
        ModalService.boardingModalOpen();
      } else {
        try {
          BottomSheet.changeMenu(btnIdx);
          Logger.log("메뉴 변경 완료");
        } catch (error) {
          Logger.error("메뉴 변경 오류:", error);
        }
      }
    };

    const handleBoardingGateConfirm = async () => {
      try {
        const gateNum = document.getElementsByClassName("gate-input")[0];
        boardingGate = gateNum.value;
        Logger.log("입력된 탑승구:", boardingGate);

        if (MapService.boardingGateIdx(boardingGate)) {
          Logger.log("유효하지 않은 탑승구");
          MapService.alertGateNumCheck();
          return;
        } else {
          Logger.log("유효한 탑승구로 설정");
          sessionStorage.setItem("boardingGate", boardingGate);
          CustomControl.customControlAllDelete();
          // 서비스 재초기화
          const boardingMarker = await MarkerService.createBoardingMarker(
            boardingGate
          );
          CustomControl.init();
          BottomSheet.changeMenu(1);
          await MarkerService.showMarkers();

          // UI 업데이트
          updateBoardingGateUI();
          if (PolylineService.getBoardingPolyline() != null) {
            await PolylineService.updatePolyline(boardingGate);
            Logger.log("polyline update");
          } else {
            await PolylineService.createBoardingPolyline(boardingMarker);
            PolylineService.setPolyline();
            Logger.log("polyline create");
          }
          ModalService.boardingModalClose();
          handleAdModal();
        }
      } catch (error) {
        Logger.error("탑승구 확인 처리 오류:", error);
        alert("탑승구 설정 중 오류가 발생했습니다.");
      }
    };

    const updateBoardingGateUI = () => {
      const boardingInfo_none = document.getElementById("boardingInfo-none");
      const moveBoardingGate = document.getElementById("moveBoardingGate");

      if (boardingInfo_none != null) {
        boardingInfo_none.style.display = "none";
      }

      if (moveBoardingGate != null) {
        moveBoardingGate.style.display = "flex";
      }
    };

    $(".menuBtn").click(async (e) => {
      try {
        btnIdx = Number(e.currentTarget.dataset.idx);
      } catch (error) {}
      if (btnIdx === 0) {
        await handleFirstMenuClick();
      } else {
        await handleOtherMenuClick();
      }
    });

    $(".modal-close").click(() => {
      ModalService.boardingModalClose();
    });

    $(".confirm-btn").click(async () => {
      await handleBoardingGateConfirm();
      handleAdModal();
    });

    $("#adClose").click(() => {
      ModalService.adModalClose();
    });

    $("#reco").click(() => {
      window.open("https://test.drarr0cp4471y.amplifyapp.com/incheon_airport");
    });
  };
  const setupGateClickEvents = () => {
    const moveGate = document.getElementsByClassName("eastWest");

    // 기존 이벤트 리스너 제거 (중복 방지)
    Array.from(moveGate).forEach((gate) => {
      const newGate = gate.cloneNode(true);
      gate.parentNode.replaceChild(newGate, gate);
    });

    // 새로운 이벤트 리스너 추가
    const updatedGates = document.getElementsByClassName("eastWest");
    Array.from(updatedGates).forEach((gate, index) => {
      gate.addEventListener("click", async () => {
        try {
          Utility.moveGate(index);
          Utility.openWindowInfo(index);
          BottomSheet.changeBorderColor(index);
        } catch (error) {
          Logger.error(`게이트 ${index} 클릭 처리 오류:`, error);
        }
      });
    });
  };
  const handleAdModal = () => {
    if (sessionStorage.getItem("render")) {
      ModalService.adModalOpen();
    }
    sessionStorage.setItem("render", true);
  };

  try {
    Logger.log("애플리케이션 초기화 시작...");

    await loadConfig();
    // 1. 서비스 초기화
    const initResult = await initializeServices();

    if (!initResult.success) {
      throw new Error("서비스 초기화 실패: " + initResult.error?.message);
    }

    if (!initResult.hasLocation) {
      alert("위치 권한을 허용하지 않아 지도 기능이 일부 제한될 수 있습니다.");
    }
    // 2. 마커 표시
    await handleMarkerDisplay();

    // 3. 이벤트 리스너 설정
    setupEventListeners();

    // 4. 광고 모달 처리
    handleAdModal();

    // 5. 초기 게이트 클릭 이벤트 설정
    setupGateClickEvents();
    // BottomSheet.recoLikeIconView();
    Logger.log("네이버 지도 API 프로토타입이 시작되었습니다.");
    Logger.log(
      "지도가 초기화되었습니다. '마커 추가하기' 버튼을 클릭하여 시작하세요."
    );
  } catch (error) {
    Logger.error("애플리케이션 초기화 중 치명적 오류:", error);
    // window.location.href = "errorPage.html";
    Logger.error(
      "애플리케이션을 초기화하는 중 오류가 발생했습니다. 페이지를 새로고침해주세요."
    );
  }
});


// ===== END OF js/main.js =====

