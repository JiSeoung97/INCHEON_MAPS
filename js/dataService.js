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

  const calculateQueueScore = (queueLength) => {
    const count = parseInt(queueLength) || 0;
    return [
      [0, 0],
      [50, 25],
      [100, 50],
      [200, 75],
      [Infinity, 100],
    ].find(([limit]) => count <= limit)[1];
  };

  // 예상 대기시간 기준 점수 계산 (0-100)
  const calculateWaitTimeScore = (waitTime) => {
    if (waitTime === "D" || waitTime === "NA") return 0;
    const time = parseInt(waitTime) || 0;
    return [
      [0, 0],
      [300, 25],
      [600, 50],
      [1200, 75],
      [Infinity, 100],
    ].find(([limit]) => time <= limit)[1];
  };

  // 출국심사 소요시간 기준 점수 계산 (0-100)
  const calculateImmigrationScore = (immigrationTime) => {
    if (immigrationTime === "NA") return 0;
    const time = parseInt(immigrationTime) || 0;
    return time >= 600 ? 100 : time >= 480 ? 75 : time >= 360 ? 50 : 25;
  };

  // 종합 혼잡도 계산
  const calculateCongestionLevel = (item) => {
    const score =
      calculateQueueScore(item.quelength) * 0.5 +
      calculateWaitTimeScore(item.espwaittime) * 0.3 +
      calculateImmigrationScore(item.immigrationtime) * 0.2;

    console.log("대기인원점수", calculateQueueScore(item.quelength));
    console.log("예상 대기시간", calculateWaitTimeScore(item.espwaittime));
    console.log(
      "출국심사 소요시간",
      calculateImmigrationScore(item.immigrationtime)
    );
    return score <= 20
      ? "low"
      : score <= 50
      ? "medium"
      : score <= 75
      ? "high"
      : "veryhigh";
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
