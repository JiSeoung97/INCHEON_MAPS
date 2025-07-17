$(document).ready(function () {
  const bottomSheet = document.getElementById("bottomSheet");
  const handle = document.getElementById("handle");
  const peekElement = document.querySelector(".peek");

  let isDragging = false;
  let startY = 0;
  let startBottom = 0;
  let currentBottom = 0;
  const POSITIONS = {
    CLOSED: 0,
    OPEN: 0,
  };

  let currentPosition = POSITIONS.CLOSED;
  // 터치/마우스 이벤트 통합 처리
  function getEventY(e) {
    return e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
  }
  function calculatePeekHeight() {
    if (!peekElement) {
      console.error("peek 클래스 요소를 찾을 수 없습니다!");
      return 100; // 기본값
    }

    const style = window.getComputedStyle(peekElement);
    const marginTop = parseInt(style.marginTop) || 0;
    const marginBottom = parseInt(style.marginBottom) || 0;
    const paddingTop = parseInt(style.paddingTop) || 0;
    const paddingBottom = parseInt(style.paddingBottom) || 0;

    const totalHeight = peekElement.offsetHeight + marginTop + marginBottom;

    console.log("Peek element height:", peekElement.offsetHeight);
    console.log("Margins:", marginTop, marginBottom);
    console.log("Total peek height:", totalHeight);

    return totalHeight;
  }
  function calculatePositions() {
    const sheetHeight = bottomSheet.offsetHeight;
    const peekHeight = calculatePeekHeight();

    const hiddenHeight = sheetHeight - peekHeight;
    const closedRem = -pxToRem(hiddenHeight);

    POSITIONS.CLOSED = Math.max(closedRem, -60);
    POSITIONS.OPEN = 0;

    console.log("Sheet Height:", sheetHeight);
    console.log("Peek Height:", peekHeight);
    console.log("Hidden Height:", hiddenHeight);
    console.log("Closed Position (vh):", POSITIONS.CLOSED);

    return POSITIONS;
  }
  function pxToRem(px) {
    const rootFontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  }

  // rem을 픽셀로 변환
  function remToPx(rem) {
    const rootFontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return rem * rootFontSize;
  }
  function updatePosition(bottomRem) {
    bottomSheet.style.bottom = bottomRem + "rem";
    currentBottom = bottomRem;
  }
  // 드래그 시작
  function startDrag(e) {
    isDragging = true;
    startY = getEventY(e);
    startBottom = currentBottom;
    handle.style.cursor = "grabbing";

    // 트랜지션 비활성화 (부드러운 드래그를 위해)
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
    newBottom = Math.max(-28, Math.min(0, newBottom));
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
      const distance = Math.abs(currentBottom - position);
      if (distance < minDistance) {
        minDistance = distance;
        targetPosition = position;
      }
    }
    currentPosition = targetPosition;
    updatePosition(targetPosition);
  }
  function initialize() {
    if (!peekElement) {
      console.error("peek 클래스 요소가 없습니다. HTML을 확인해주세요.");
      return;
    }

    calculatePositions();
    currentBottom = POSITIONS.CLOSED;
    updatePosition(POSITIONS.CLOSED);
    currentPosition = POSITIONS.CLOSED;
  }
  // 마우스 이벤트
  handle.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);

  // 터치 이벤트 (passive: false로 설정)
  handle.addEventListener("touchstart", startDrag, { passive: false });
  document.addEventListener("touchmove", drag, { passive: false });
  document.addEventListener("touchend", endDrag, { passive: false });

  if (peekElement && window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
      console.log("Peek element size changed, recalculating...");
      calculatePositions();
      if (currentPosition === POSITIONS.CLOSED) {
        updatePosition(POSITIONS.CLOSED);
      }
    });
    resizeObserver.observe(peekElement);
  }

  window.addEventListener("load", initialize);
});
