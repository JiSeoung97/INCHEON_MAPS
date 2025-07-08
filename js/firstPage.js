const moveBtn = document.getElementById("moveCongestionMap");

$(document).ready(async () => {
  const times = document.getElementsByClassName("time");
  const now = new Date();
  const nHour = now.getHours();
  const nMin = now.getMinutes();
  times[0].innerText = nHour;
  times[1].innerText = nMin;

  const ups = document.getElementsByClassName("up");
  const downs = document.getElementsByClassName("down");

  Array.from(ups).forEach((up, index) => {
    up.addEventListener("click", () => {
      let value = times[index].textContent;
      console.log(value);
      if (index == 0 && Number(value) == 24) value = 0;
      else if (index == 0) {
        value = Number(value) + 1;
      }
      if (index == 1 && Number(value) == 60) value = 0;
      else if (index == 1) {
        value = Number(value) + 1;
      }
      times[index].innerText = value;
    });
  });
  Array.from(downs).forEach((down, index) => {
    down.addEventListener("click", () => {
      let value = times[index].textContent;
      console.log(value);
      if (index == 0 && Number(value) == 0) value = 23;
      else if (index == 0) {
        value = Number(value) - 1;
      }
      if (index == 1 && Number(value) == 0) value = 59;
      else if (index == 1) {
        value = Number(value) - 1;
      }
      times[index].innerText = value;
    });
  });
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
});
