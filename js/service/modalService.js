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
