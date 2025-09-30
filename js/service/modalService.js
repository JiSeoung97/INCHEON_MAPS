import Logger from "../utility/logger.js";
import MapService from "./mapService.js";
import MarkerService from "./markerService.js";
const ModalService = (() => {
  let language;
  let modalOn = false;
  let imgArray = [
    "images/trainCenter1.gif",
    "images/trainCenter2.gif",
    "images/trainCenter3.gif",
    "images/trainCenter4.gif",
  ];
  const init = () => {
    language = MapService.languageReturn();
  };
  const modalLangChange = (name = null) => {
    language = MapService.languageReturn();
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
    MarkerService.setSelectedMarker(false);
  };

  const modalOpen = (index, kiosk = null) => {
    if (modalOn) {
      document.getElementById("adClose").src = "images/x.png";
    }
    if (index == 2) {
      init();
      const modalImg = document.getElementById("trainCenterImg");
      const trainMap = document.getElementById("trainMap");
      trainMap.innerText = language["departurehall_map"];
      const kioskImg = document.getElementById("kioskImg");
      const kioskFlag = document.getElementById("kioskFlag");
      kioskImg.innerHTML = `<img src='/images/kiosk.svg' style="width:10px; height:17px"> ${language["kioskimg"]}`;

      let imgSrc = null;
      switch (kiosk) {
        case 5:
          imgSrc = imgArray[0];
          kioskFlag.innerText = `${language["kiosk1"]}`;
          break;
        case 6:
          imgSrc = imgArray[1];
          kioskFlag.innerText = `${language["kiosk2"]}`;
          break;
        case 7:
          imgSrc = imgArray[2];
          kioskFlag.innerText = `${language["kiosk3"]}`;
          break;
        case 8:
          imgSrc = imgArray[3];
          kioskFlag.innerText = `${language["kiosk4"]}`;
          break;
      }
      modalImg.src = imgSrc;
    }
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
    trainCenterModalOpen: (kiosk) => {
      if (kiosk < 5) {
        return;
      }
      modalOpen(2, kiosk);
    },
    trainCenterModalClose: () => {
      modalClose(2);
    },
  };
})();

export default ModalService;
