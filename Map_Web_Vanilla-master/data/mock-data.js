"use strict";

const mockData = {
  buildings: [
    {
      id: "gate_1",
      name: "제 1여객터미널",
      position: { lat: 37.449227, lng: 126.450611 },
      areas: [
        {
          id: "gate_1_2_e",
          name: "2출국장 서편",
          position: { lat: 37.450200, lng: 126.453245 },
          congestion: "low",
          count: 12,
          capacity: 50,
          floorInfo: "3층",
          eastWest:"east",
          description: "제 1여객터미널 2출국장 서편",
        },
        {
          id: "gate_1_2_w",
          name: "2출국장 동편",
          position: { lat: 37.450267, lng: 126.454050 },
          congestion: "medium",
          count: 45,
          capacity: 80,
          floorInfo: "3층",
          eastWest:"west",
          description: "제 1여객터미널 2출국장 동편",
        },
        {
          id: "gate_1_3_e",
          name: "3출국장 서편",
          position: { lat: 37.449700, lng: 126.451449 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest:"east",
          description: "제 1여객터미널 3출국장 서편",
        },
        {
          id: "gate_1_3_w",
          name: "3출국장 동편",
          position: { lat: 37.450000, lng: 126.452349 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest:"west",
          description: "제 1여객터미널 3출국장 동쪽",
        },
        {
          id: "gate_1_4_e",
          name: "4출국장 서편",
          position: { lat: 37.448480, lng: 126.449500 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest:"east",
          description: "제 1여객터미널 4출국장 서편",
        },
        {
          id: "gate_1_4_w",
          name: "4출국장 동편",
          position: { lat: 37.449000, lng: 126.450050 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest:"west",
          description: "제 1여객터미널 4출국장 동편",
        },
        {
          id: "gate_1_5_e",
          name: "5출국장 서편",
          position: { lat: 37.447150, lng: 126.448600 },
          congestion: "veryhigh",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest:"east",
          description: "제 1여객터미널 4출국장 서편",
        },
        {
          id: "gate_1_5_w",
          name: "5출국장 동편",
          position: { lat: 37.447780, lng: 126.449000 },
          congestion: "high",
          count: 120,
          capacity: 150,
          floorInfo: "3층",
          eastWest:"west",
          description: "제 1여객터미널 4출국장 동편",
        },
        
      ],
    },
    {
      id: "gate_2",
      name: "제 2여객터미널",
      position: { lat: 37.467448, lng: 126.434596 },
      areas: [
        {
          id: "gate_2_1",
          name: "1출국장",
          position: { lat: 37.467054, lng: 126.433682 },
          congestion: "low",
          count: 8,
          capacity: 40,
          floorInfo: "3층",
          description: "제 2여객터미널 1출국장",
        },
        {
          id: "gate_2_2",
          name: "2출국장",
          position: { lat: 37.468179, lng: 126.435994 },
          congestion: "medium",
          count: 25,
          capacity: 60,
          floorInfo: "3층",
          description: "제 2여객터미널 2출국장",
        },
      ],
    }
  ],

  companyLocation: {
    name: "1번 키오스크",
    position: { lat: 37.447100, lng: 126.449380 },
    description: "1출국장 5번출구 앞",
  },

  lastUpdated: new Date().toISOString(),

  congestionLevels: {
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
    veryhigh:{
      name:"매우혼잡",
      color: "#FF5959",
      description: "혼잡함 (수용 인원의 90% 이상)",
    }
  },
};

window.mockData = mockData;
