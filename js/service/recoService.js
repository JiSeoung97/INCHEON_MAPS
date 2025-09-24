import Logger from "../utility/logger.js";
import DataService from "./dataService.js";
import Utility from "../utility/utility.js";

const RecoService = (() => {
  let recoArray = [];
  let areas;
  const recoGate = async () => {
    try {
      areas = DataService.getAllAreas();
      const apiData = DataService.getApiData();
      recoArray = [];
      for (let i = 2; i < 10; i++) {
        const distance = Number(await getAreaDistance(areas[i]));
        const apiDataForArea = apiData.find(
          (api) => api.gateId === areas[i].id
        );
        if (apiDataForArea) {
          const waitingTime = Number(apiDataForArea.waitTime);

          recoArray.push({
            name: areas[i].name,
            time: distance + waitingTime,
            position: areas[i].position,
          });
        }
      }
      recoArray.sort((a, b) => a.time - b.time);
      console.log(recoArray);
    } catch (error) {
      for (let i = 0; i < 3; i++) {
        recoArray.push({
          name: areas[i].name,
          time: distance + waitingTime,
          position: areas[i].position,
        });
      }
      console.log("추천게이트 계산 실패");
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
    const departureAreas = data.slice(0, 10);
    const eastWest = document.getElementsByClassName("eastWest");
    let idx;
    departureAreas.forEach((departure, index) => {
      if (departure.name == recoArray[0].name) {
        idx = index;
      }
    });
    console.log(eastWest[idx]);
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
