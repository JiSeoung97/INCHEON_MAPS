import Logger from "../utility/logger.js";
import MapService from "./mapService.js";
const ModalService = (() => {
  let language;
  const init = () => {
    language = MapService.languageReturn();
  };
  const modalLangChange = (name = null) => {
    const adtitle = document.getElementById("modalTryMeal");
    const admodalSubtitle = document.getElementById("modalTitle");
    const subtext = document.getElementsByClassName("subtext");
    const admodalBtn = document.getElementById("reco");
    const gateNum = document.getElementById("input-gateNum");
    const confirmBtn = document.getElementsByClassName("confirm-btn");
    const modalImg = document.getElementById("modelImg");
    if (name == null) {
      confirmBtn[0].innerText = language["confirmBtn"];
      gateNum.innerText = language["gateNum"];
      subtext[0].innerText = language["subTitle"];
    } else {
      modalImg.src = "./images/" + name + "ModalImg.svg";
      adtitle.innerText = language[name + "Title"];
      admodalSubtitle.innerText = language[name + "ModalTitle"];
      admodalBtn.innerHTML =
        language["modalBtn"] +
        '<img id="arrow-right" src="./images/more.svg" />';
    }
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
    langChange: (name) => {
      modalLangChange(name);
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
