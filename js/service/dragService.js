"use strict";

const DragService = (() => {
  let handle;
  let peekElement;
  let isDragging = false;
  let startY = 0;
  let startBottom = 0;
  let currentBottom = 0;
  let currentPosition;
  let bottomSheet;
  const POSITIONS = {
    CLOSED: 0,
    OPEN: 0,
  };
  function getEventY(e) {
    return e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
  }
  function calculatePeekHeight() {
    if (!peekElement) {
      console.error("peek 클래스 요소를 찾을 수 없습니다!");
      return 100; // 기본값
    }
    let totalHeight = 0;
    let marginTop;
    let marginBottom;
    let paddingTop;
    let paddingBottom;
    Array.from(peekElement).forEach((peek) => {
      const style = window.getComputedStyle(peek);
      marginTop = parseInt(style.marginTop) || 0;
      marginBottom = parseInt(style.marginBottom) || 0;
      paddingTop = parseInt(style.paddingTop) || 0;
      paddingBottom = parseInt(style.paddingBottom) || 0;
      let height =
        peek.offsetHeight +
        marginTop +
        marginBottom +
        paddingTop +
        paddingBottom +
        50;
      totalHeight += height;
    });

    console.log("Peek element height1:", peekElement[0].offsetHeight);
    console.log("Peek element height2:", peekElement[1].offsetHeight);
    console.log("Total peek height:", totalHeight);

    return totalHeight;
  }
  function calculatePositions() {
    const sheetHeight = bottomSheet.offsetHeight;
    const peekHeight = calculatePeekHeight();
    const viewportHight = window.innerHeight;
    const hiddenHeight = sheetHeight - peekHeight;
    const closedRem = -pxToRem(hiddenHeight);
    if (closedRem > 0) {
      POSITIONS.CLOSED = -4;
    } else {
      const maxHiddenRem = -pxToRem(viewportHight);
      POSITIONS.CLOSED = Math.max(closedRem, maxHiddenRem);
    }
    POSITIONS.OPEN = -5;

    if (POSITIONS.CLOSED > 0 || POSITIONS.CLOSED < -30) {
      POSITIONS.CLOSED = -10;
    }

    return POSITIONS;
  }
  function pxToRem(px) {
    const rootFontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  }

  function updatePosition(bottomRem) {
    bottomSheet.style.bottom = bottomRem + "rem";
    currentBottom = bottomRem;
  }

  function startDrag(e) {
    isDragging = true;
    startY = getEventY(e);
    startBottom = currentBottom;
    handle.style.cursor = "grabbing";

    bottomSheet.style.transition = "none";

    e.preventDefault();
  }

  // 드래그 중
  function drag(e) {
    if (!isDragging) return;
    const currentY = getEventY(e);
    const deltaY = currentY - startY;
    const deltaRem = pxToRem(deltaY);
    let newBottom = startBottom - deltaRem;
    // 경계 제한
    const minPosition = Math.max(POSITIONS.CLOSED - 7, -25); // 안전한 최소값
    const maxPosition = Math.min(POSITIONS.OPEN + 2, 7); // 안전한 최대값

    newBottom = Math.max(minPosition, Math.min(maxPosition, newBottom));
    updatePosition(newBottom);

    e.preventDefault();
  }

  // 드래그 종료
  function endDrag() {
    if (!isDragging) return;

    isDragging = false;
    handle.style.cursor = "grab";

    // 트랜지션 다시 활성화
    bottomSheet.style.transition = "bottom 0.3s ease";

    let targetPosition = POSITIONS.CLOSED;
    let minDistance = Math.abs(currentBottom - POSITIONS.CLOSED);
    for (const [key, position] of Object.entries(POSITIONS)) {
      console.log(POSITIONS);
      console.log(position);
      const distance = Math.abs(currentBottom - position);
      if (distance < minDistance) {
        console.log("min,distance : ", distance);
        minDistance = distance;
        targetPosition = position;
      }
    }
    currentPosition = targetPosition;
    updatePosition(targetPosition);
  }
  function initialize() {
    currentPosition = POSITIONS.CLOSED;
    if (!peekElement) {
      console.error("peek 클래스 요소가 없습니다. HTML을 확인해주세요.");
      return;
    }

    calculatePositions();
    currentBottom = POSITIONS.OPEN;
    updatePosition(POSITIONS.OPEN);
    currentPosition = POSITIONS.OPEN;
  }
  function getElement() {
    bottomSheet = document.getElementById("bottomSheet");
    handle = document.getElementById("handle");
    peekElement = document.getElementsByClassName("peek");
  }
  function bottomSheetEvent() {
    handle.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);

    // 터치 이벤트 (passive: false로 설정)
    handle.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", endDrag, { passive: false });
  }
  return {
    init: async () => {
      try {
        getElement();
        initialize();
        bottomSheetEvent();
        console.log("bottomSheet 초기화 완료");
      } catch (error) {
        console.error("bottomSheet 초기화 실패 : ", error);
      }
    },
  };
})();
