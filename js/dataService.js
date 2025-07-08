"use strict";

const DataService = (() => {
  let data = null;
  let apiDatas = null;
  let congestions = [];
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
    console.log(totalWaitTime);
    // 시간 기준 혼잡도 (초 단위)
    if (totalWaitTime <= 600) return "low"; // 10분 이하
    if (totalWaitTime <= 1800) return "medium"; // 30분 이하
    if (totalWaitTime <= 3600) return "high"; // 1시간 이하
    return "veryhigh"; // 1시간 초과
  };

  return {
    initData: () => {
      data = window.mockData || null;
      apiDatas = window.mockData2.data[0].response.body.items.item || null;
      console.log(apiDatas);
      if (!data) {
        console.error("모킹 데이터 로드 실패함");
        return null;
      }
      updateCongestion();
      return data;
    },

    getAllData: () => {
      return data;
    },

    getCompanyLocation: () => {
      if (!data) return null;

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
      if (!data) return null;

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

    // 랜덤 시간마다 혼잡도 자동 업데이트 start

    startAutomaticUpdates: (updateCallback) => {
      const updateAndSchedule = () => {
        const updatedData = updateCongestionRandomly();
        if (updateCallback && typeof updateCallback === "function") {
          updateCallback(updatedData);
        }

        const nextUpdateTime = 10000 + Math.random() * 20000; // 10초에서 30초 사이의 랜덤 시간
        setTimeout(updateAndSchedule, nextUpdateTime);
      };

      updateAndSchedule();

      if (Logger) {
        Logger.log("자동 업데이트 시작됨");
      }
    },
  };
})();
