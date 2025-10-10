// import BottomSheet from "../component/bottomSheet.js";
// import Logger from "../utility/logger.js";
// import Utility from "../utility/utility.js";

// const DragService = (() => {
//   let handle;
//   let peekElement;
//   let isDragging = false;
//   let startY = 0;
//   let startBottom = 0;
//   let currentBottom = 0;
//   let currentPosition;
//   let bottomSheet;
//   let dragOn = false;
//   const POSITIONS = {
//     CLOSED: 0,
//     OPEN: 2,
//   };
//   function getEventY(e) {
//     return e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
//   }
//   function calculatePeekHeight() {
//     let peekHeight = 0;

//     // peek 영역만 계산
//     if (!peekElement) {
//       Logger.error("peek 클래스 요소를 찾을 수 없습니다!");
//     } else {
//       Array.from(peekElement).forEach((peek) => {
//         const style = window.getComputedStyle(peek);
//         const marginTop = parseInt(style.marginTop) || 0;
//         const marginBottom = parseInt(style.marginBottom) || 0;
//         const paddingTop = parseInt(style.paddingTop) || 0;
//         const paddingBottom = parseInt(style.paddingBottom) || 0;

//         peekHeight +=
//           peek.offsetHeight +
//           marginTop +
//           marginBottom +
//           paddingTop +
//           paddingBottom;
//       });
//     }
//     const menu = document.getElementById("menu");
//     peekHeight += menu.offsetHeight;
//     Logger.log("Peek height only:", peekHeight);
//     return peekHeight;
//   }

//   function calculateVisibleHeight() {
//     let totalHeight = calculatePeekHeight();

//     // controls 영역 계산
//     const controlsElement = document.getElementById("controls");
//     if (controlsElement) {
//       const style = window.getComputedStyle(controlsElement);
//       const marginTop = parseInt(style.marginTop) || 0;
//       const marginBottom = parseInt(style.marginBottom) || 0;
//       const paddingTop = parseInt(style.paddingTop) || 0;
//       const paddingBottom = parseInt(style.paddingBottom) || 0;

//       totalHeight +=
//         controlsElement.offsetHeight +
//         marginTop +
//         marginBottom +
//         paddingTop +
//         paddingBottom;
//     }

//     // 추가 여유 공간 10px
//     totalHeight += 10;

//     Logger.log("Total visible height (peek + controls + 10px):", totalHeight);
//     return totalHeight;
//   }
//   function calculatePositions() {
//     const sheetHeight = bottomSheet.offsetHeight;
//     const visibleHeight = calculateVisibleHeight(); // peek + controls + 10px

//     // OPEN: peek + controls + 10px 영역만 보이도록 계산
//     const openHiddenHeight = sheetHeight - visibleHeight;
//     POSITIONS.OPEN = -pxToVh(openHiddenHeight);

//     // controls 영역 높이 계산
//     const controlsElement = document.getElementById("controls");
//     let controlsHeight = 0;
//     if (controlsElement) {
//       const style = window.getComputedStyle(controlsElement);
//       const marginTop = parseInt(style.marginTop) || 0;
//       const marginBottom = parseInt(style.marginBottom) || 0;
//       const paddingTop = parseInt(style.paddingTop) || 0;
//       const paddingBottom = parseInt(style.paddingBottom) || 0;
//       controlsHeight =
//         controlsElement.offsetHeight +
//         marginTop +
//         marginBottom +
//         paddingTop +
//         paddingBottom;
//     }

//     // CLOSED: OPEN 위치에서 controls + 10px만큼 더 아래로
//     const additionalHide = controlsHeight + 10;
//     POSITIONS.CLOSED = POSITIONS.OPEN - pxToVh(additionalHide);

//     // 안전장치: 적절한 범위로 제한
//     let safeClose = POSITIONS.CLOSED;
//     let safeOpen = POSITIONS.OPEN;
//     let isSamsung = Utility.detectSamsungBrowser();
//     let departure1Open = BottomSheet.openDeparture1();
//     if (departure1Open) {
//       safeClose = POSITIONS.CLOSED + 4;
//       safeOpen = POSITIONS.OPEN + 4;
//     }
//     if (isSamsung) {
//       safeClose = POSITIONS.CLOSED + 4;
//       safeOpen = POSITIONS.OPEN + 4;
//     }
//     POSITIONS.CLOSED = Math.max(safeClose, -pxToVh(sheetHeight - 60));
//     POSITIONS.OPEN = Math.max(safeOpen, -pxToVh(sheetHeight));
//     return POSITIONS;
//   }
//   function pxToVh(px) {
//     // dvh 기반으로 계산 (동적 뷰포트 높이 사용)
//     const viewportHeight = window.innerHeight;
//     return (px / viewportHeight) * 100;
//   }

//   function updatePosition(bottomVh) {
//     bottomSheet.style.bottom = bottomVh + "dvh";
//     currentBottom = bottomVh;
//   }

//   function startDrag(e) {
//     isDragging = true;
//     startY = getEventY(e);
//     startBottom = currentBottom;
//     handle.style.cursor = "grabbing";

//     bottomSheet.style.transition = "none";

//     e.preventDefault();
//   }

//   // 드래그 중
//   function drag(e) {
//     if (!isDragging) return;
//     const currentY = getEventY(e);
//     const deltaY = currentY - startY;
//     const deltaVh = pxToVh(deltaY);
//     let newBottom = startBottom - deltaVh;
//     // 경계 제한 (dvh 기준으로 조정)
//     const safetyMargin = pxToVh(50); // 50px를 dvh로 변환
//     const minPosition = Math.max(POSITIONS.CLOSED - safetyMargin, -80); // dvh 기준 최소값
//     const maxPosition = Math.min(POSITIONS.OPEN + pxToVh(20), 10); // dvh 기준 최대값

//     newBottom = Math.max(minPosition, Math.min(maxPosition, newBottom));
//     updatePosition(newBottom);

//     e.preventDefault();
//   }

//   // 드래그 종료
//   function endDrag() {
//     if (!isDragging) return;

//     isDragging = false;
//     handle.style.cursor = "grab";

//     // 트랜지션 다시 활성화
//     bottomSheet.style.transition = "bottom 0.3s ease";

//     let targetPosition = POSITIONS.CLOSED;
//     let minDistance = Math.abs(currentBottom - POSITIONS.CLOSED);
//     for (const [, position] of Object.entries(POSITIONS)) {
//       const distance = Math.abs(currentBottom - position);
//       if (distance < minDistance) {
//         Logger.log("min,distance : ", distance);
//         minDistance = distance;
//         targetPosition = position;
//       }
//     }
//     currentPosition = targetPosition;
//     updatePosition(targetPosition);
//   }
//   function initialize() {
//     currentPosition = POSITIONS.CLOSED;
//     if (!peekElement) {
//       Logger.error("peek 클래스 요소가 없습니다. HTML을 확인해주세요.");
//       return;
//     }

//     calculatePositions();
//     currentBottom = POSITIONS.OPEN;
//     updatePosition(POSITIONS.OPEN);
//     currentPosition = POSITIONS.OPEN;
//   }
//   function getElement() {
//     bottomSheet = document.getElementById("bottomSheet");
//     handle = document.getElementById("handle");
//     peekElement = document.getElementsByClassName("peek");
//   }
//   function bottomSheetEvent() {
//     if (!dragOn) {
//       handle.addEventListener("mousedown", startDrag);
//       document.addEventListener("mousemove", drag);
//       document.addEventListener("mouseup", endDrag);

//       // 터치 이벤트 (passive: false로 설정)
//       handle.addEventListener("touchstart", startDrag, { passive: false });
//       document.addEventListener("touchmove", drag, { passive: false });
//       document.addEventListener("touchend", endDrag, { passive: false });
//       dragOn = true;
//     }
//   }
//   return {
//     init: async () => {
//       try {
//         getElement();
//         initialize();
//         bottomSheetEvent();
//       } catch (error) {
//         Logger.error("bottomSheet drag 초기화 실패 : ", error);
//       }
//     },
//   };
// })();

// export default DragService;
