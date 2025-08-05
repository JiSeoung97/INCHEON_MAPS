"use strict";

const ModalService = (() => {
  let language;

  const init = () => {
    language = MapService.languageReturn();
  };
  const modalLangChange = () => {
    console.log(language);
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

  const adModalOpen = () => {
    const modal = document.getElementById("adModal");
    modal.style.setProperty("display", "flex");
  };
  const adModalClose = () => {
    const modal = document.getElementById("adModal");
    console.log("modalClose");
    modal.style.setProperty("display", "none");
  };
  const boardingModalOpen = () => {
    const modal = document.getElementById("modal-background");
    modal.style.display = "flex";
  };
  const boardingModalClose = () => {
    const modal = document.getElementById("modal-background");
    modal.style.display = "none";
  };
  return {
    init: () => {
      console.log("modalService init");
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
      adModalOpen();
    },

    adModalClose: () => {
      adModalClose();
    },
    boardingModalClose: () => {
      boardingModalClose();
    },
    boardingModalOpen: () => {
      boardingModalOpen();
    },
  };
})();
