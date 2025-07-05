$(document).ready(function () {
  const bottomSheet = document.getElementById("bottomSheet");
  const handle = document.getElementById("handle");
  const container = document.querySelector(".container");

  let isDragging = false;
  let startY = 0;
  let startTransform = 0;
  let currentTransform = 0;

  // BottomSheet 초기 높이 설정
  const sheetHeight = bottomSheet.offsetHeight;
  const maxTransform = sheetHeight - 115; // 최소 120vh는 보이도록 (기존: 80px)

  // 터치/마우스 이벤트 통합 처리
  function getEventY(e) {
    return e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
  }

  // 드래그 시작
  function startDrag(e) {
    isDragging = true;
    startY = getEventY(e);
    startTransform = currentTransform;
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
    let newTransform = startTransform + deltaY;

    // 경계 제한
    newTransform = Math.max(0, Math.min(maxTransform, newTransform));

    currentTransform = newTransform;
    bottomSheet.style.transform = `translateX(-50%) translateY(${newTransform}rem)`;

    e.preventDefault();
  }

  // 드래그 종료
  function endDrag() {
    if (!isDragging) return;

    isDragging = false;
    handle.style.cursor = "grab";

    // 트랜지션 다시 활성화
    bottomSheet.style.transition = "transform 0.3s ease";

    // 스냅 동작 (중간 지점에서 위/아래로 스냅)
    const snapThreshold = maxTransform / 2;

    if (currentTransform < snapThreshold) {
      // 위로 스냅
      currentTransform = 0;
      bottomSheet.style.transform = "translateX(-50%) translateY(0)";
    } else {
      // 아래로 스냅
      currentTransform = maxTransform;
      bottomSheet.style.transform = `translateX(-50%) translateY(${maxTransform}px)`;
    }
  }

  // 마우스 이벤트
  handle.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);

  // 터치 이벤트 (passive: false로 설정)
  handle.addEventListener("touchstart", startDrag, { passive: false });
  document.addEventListener("touchmove", drag, { passive: false });
  document.addEventListener("touchend", endDrag, { passive: false });

  // 메뉴 버튼 클릭
  document.querySelectorAll(".menuBtn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".menuBtn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
