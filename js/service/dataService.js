import Logger from "../utility/logger.js";
import TimeCalculator from "../utility/timeCalculator.js";
import mockData from "../../data/mock-data.js";
import createAxiosInstance from "../../api/axios-instance.js";

const DataService = (() => {
  let data = null;
  let apiDatas = null;
  let congestions = [];
  let elements = [];
  let apiInstance;
  let waitingTimes = [];
  const updateCongestion = () => {
    if (!data) return;
    if (!apiDatas || !Array.isArray(apiDatas)) {
      return;
    }
    Array.from(apiDatas).forEach((apiData) => {
      congestions.push(calculateCongestionLevel(apiData));
      waitingTimes.push(apiData.waitTime);
    });

    data.buildings.forEach((building) => {
      building.areas.forEach((area, idx) => {
        if (idx < 10) {
          if (idx % 2 == 0) {
            area.congestion = congestions[idx + 1];
            area.capacity = waitingTimes[idx + 1];
          } else {
            area.congestion = congestions[idx - 1];
            area.capacity = waitingTimes[idx - 1];
          }
        }
      });
    });
    console.log("areadata : ", data.buildings[0].areas);
    console.log("apidata : ", apiDatas);
    data.lastUpdated = new Date().toISOString();
    return data;
  };
  const getAirportData = async () => {
    try {
      Logger.log("time formating", TimeCalculator.formatCurrentDateTime());
      const requestParams = {
        type: "json",
        datetime: TimeCalculator.formatCurrentDateTime(),
      };
      const result = await apiInstance.get(
        "/api/airport/getDepartureCongestion",
        {
          params: requestParams,
        }
      );
      apiDatas = result.data.response.body.items || null;
      Logger.log("실시간 혼잡도 API 수신 완료", apiDatas);
    } catch (error) {
      Logger.error("혼잡도 api데이터 로드 실패 :", error);
    }
  };

  // 총 대기시간 기준 혼잡도 계산
  const calculateCongestionLevel = (item) => {
    const totalWaitTime = item.waitTime;
    // 시간 기준 혼잡도 (초 단위)
    if (totalWaitTime <= 6) return "low"; // 6분 이하
    if (totalWaitTime <= 8) return "medium"; // 8분 이하
    if (totalWaitTime <= 10) return "high"; // 10분 이하
    return "veryhigh"; // 1시간 초과
  };

  return {
    initData: async () => {
      data = mockData || null;
      if (!data) {
        Logger.error("모킹 데이터 로드 실패함");
        return null;
      }
      elements = data.elements.areas;

      apiInstance = createAxiosInstance();

      await getAirportData();

      if (!apiDatas) {
        Logger.error("실시간 혼잡도 API 데이터 로드에 실패했습니다.");
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
      return item.waitTime;
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
