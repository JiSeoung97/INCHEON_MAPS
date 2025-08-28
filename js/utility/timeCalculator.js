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
      const waitTime = Number(foundApi.waitTime)
      totalTime += waitTime;
      const waitingTime = `${waitTime}${language["minute"]}`;

      console.log(totalTime);
      // 총 시간
      const strTotal =
        totalTime > 60
          ? `${Math.floor(totalTime / 60)}${language["hour"]} ${
              totalTime % 60
            }${language["minute"]}`
          : `${totalTime}${language["minute"]}`;

      return {
        total: strTotal,
        times: [hallWaiting, waitingTime, boardingTimeStr],
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
