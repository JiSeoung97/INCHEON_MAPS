"use strict";

const ModalService = (() => {
  let language;

  const init = () => {
    language = MapService.languageReturn();
  };
  const adModalLangChange = () => {
    const tryMeal = document.getElementById("modalTryMeal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBtn = document.getElementById("reco");

    tryMeal.innerText = language["tryMeal"];
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
      init();
      adModalLangChange();
      let modalHeader = document.getElementsByClassName("modal-header");
      modalHeader.innerHTML = language["gateNum"];
      $(".confirm-btn").click(() => {
        const modal = document.getElementById("modal-background");
        modal.style.display = "none";
        const gateNum = document.getElementsByClassName("gate-input")[0];
        let boardingGate = gateNum.value;
        console.log(boardingGate);

        if (
          (boardingGate < 101 && boardingGate > 50) ||
          boardingGate > 132 ||
          boardingGate == null ||
          boardingGate == 4 ||
          boardingGate == 5 ||
          boardingGate == 44
        ) {
          MapService.alertGateNumCheck();
        } else {
          sessionStorage.setItem("boardingGate", boardingGate);
          const boardingInfo = document.getElementById("boardingInfo");
          const langSelect = document.getElementById("selectlang");
          if (boardingInfo != null) {
            boardingInfo.remove();
          }
          MapService.init();
          BottomSheet.changeMenu(1);
          MapService.showMarkers();
          BottomSheet.trainShow();
          const moveBoardingGate = document.getElementById("moveBoardingGate");

          moveBoardingGate.style.display = "flex";
        }
      });
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
