import Logger from "../utility/logger.js";
import TimeCalculator from "../utility/timeCalculator.js";
import mockData from "../../data/mock-data.js";
import mockData2 from "../../data/mock-data2.js";
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
      data = mockData || null;
      apiDatas = mockData2.data[0].response.body.items.item || null;
      // await getAirportData();
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
