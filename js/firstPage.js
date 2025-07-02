const moveBtn = document.getElementById("moveCongestionMap");

moveBtn.addEventListener("click", () => {
  const flightId = document.getElementById("flightId").value.trim();
  const boardingGate = document.getElementById("boardingGate").value.trim();

  // 입력 검증
  if (boardingGate > 132) {
    alert("존재하지 않은 게이트 입니다.");
    return;
  }

  // URLSearchParams로 안전하게 쿼리스트링 생성
  const params = new URLSearchParams();
  params.append("flightId", flightId);
  params.append("boardingGate", boardingGate);
  window.location.href = "congestion.html?boardingGate=" + boardingGate;
});
