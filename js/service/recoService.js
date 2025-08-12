import Logger from "../utility/logger.js";

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
