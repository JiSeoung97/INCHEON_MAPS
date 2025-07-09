const moveBtn = document.getElementById("moveCongestionMap");

// 시간 선택기 초기화 함수들을 전역으로 분리
function pad(num) {
  return num.toString().padStart(2, "0");
}

// 시간 선택기 생성 함수
function createTimePicker() {
  const ampmColumn = document.getElementById("ampm-column");
  const hourColumn = document.getElementById("hour-column");
  const minuteColumn = document.getElementById("minute-column");

  // 기존 내용 초기화 (중복 방지)
  ampmColumn.innerHTML = "";
  hourColumn.innerHTML = "";
  minuteColumn.innerHTML = "";

  // 오전/오후 컬럼 - 여러 번 반복
  const ampmOptions = ["오전", "오후"];
  const ampmRepeats = 20; // 20번 반복 = 40개 항목
  for (let repeat = 0; repeat < ampmRepeats; repeat++) {
    ampmOptions.forEach((ampm, index) => {
      const el = document.createElement("div");
      el.className = "picker-option";
      el.textContent = ampm;
      el.dataset.value = index;
      el.dataset.repeat = repeat;
      ampmColumn.appendChild(el);
    });
  }

  // 시간 컬럼 - 12시간을 여러 번 반복 (무한 스크롤 효과)
  const hourRepeats = 10; // 10번 반복 = 120개 항목
  for (let repeat = 0; repeat < hourRepeats; repeat++) {
    for (let i = 1; i <= 12; i++) {
      const el = document.createElement("div");
      el.className = "picker-option";
      el.textContent = i.toString();
      el.dataset.value = i;
      el.dataset.repeat = repeat;
      hourColumn.appendChild(el);
    }
  }

  // 분 컬럼 - 60분을 여러 번 반복 (무한 스크롤 효과)
  const minuteRepeats = 8; // 8번 반복 = 480개 항목
  for (let repeat = 0; repeat < minuteRepeats; repeat++) {
    for (let i = 0; i < 60; i++) {
      const el = document.createElement("div");
      el.className = "picker-option";
      el.textContent = pad(i);
      el.dataset.value = i;
      el.dataset.repeat = repeat;
      minuteColumn.appendChild(el);
    }
  }
}

// 스크롤 시 중앙 요소 감지
function initPicker(column) {
  const options = column.querySelectorAll(".picker-option");
  let isScrolling = false;

  const onScroll = () => {
    const centerY = column.offsetHeight / 2;
    let closest = null;
    let minDiff = Infinity;

    options.forEach((opt) => {
      const box = opt.getBoundingClientRect();
      const colBox = column.getBoundingClientRect();
      const optCenter = box.top + box.height / 2;
      const colCenter = colBox.top + centerY;
      const diff = Math.abs(optCenter - colCenter);

      if (diff < minDiff) {
        minDiff = diff;
        closest = opt;
      }
    });

    // 모든 옵션에서 selected 제거
    options.forEach((opt) => opt.classList.remove("selected"));
    if (closest) closest.classList.add("selected");
  };

  // 스크롤 이벤트 (데스크톱)
  column.addEventListener("scroll", () => {
    isScrolling = true;
    clearTimeout(column._scrollTimeout);
    column._scrollTimeout = setTimeout(() => {
      isScrolling = false;
      snapToCenter(column);
      onScroll();
    }, 150);
    onScroll();
  });

  // 터치 이벤트 (모바일)
  let touchStartY = 0;
  let touchStartTime = 0;

  column.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    isScrolling = true;
  });

  column.addEventListener("touchend", () => {
    if (isScrolling) {
      clearTimeout(column._touchTimeout);
      column._touchTimeout = setTimeout(() => {
        isScrolling = false;
        snapToCenter(column);
        onScroll();
      }, 100);
    }
  });

  // 클릭/터치 이벤트 추가
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      if (!isScrolling) {
        e.preventDefault();
        option.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  // 초기화
  setTimeout(() => {
    onScroll();
    snapToCenter(column);
  }, 100);
}

function snapToCenter(column) {
  const options = column.querySelectorAll(".picker-option");
  const centerY = column.offsetHeight / 2;

  let closest = null;
  let minDiff = Infinity;

  options.forEach((opt) => {
    const box = opt.getBoundingClientRect();
    const colBox = column.getBoundingClientRect();
    const optCenter = box.top + box.height / 2;
    const colCenter = colBox.top + centerY;
    const diff = Math.abs(optCenter - colCenter);

    if (diff < minDiff) {
      minDiff = diff;
      closest = opt;
    }
  });

  if (closest) {
    closest.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// 초기값 설정
function setInitialValues() {
  const ampmColumn = document.getElementById("ampm-column");
  const hourColumn = document.getElementById("hour-column");
  const minuteColumn = document.getElementById("minute-column");

  // 현재 시간으로 초기화
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // 오전/오후 설정 - 중간 지점에서 현재 값 찾기
  const ampmOptions = ampmColumn.querySelectorAll(".picker-option");
  const ampmTargetValue = hour >= 12 ? 1 : 0;
  const ampmMidIndex = Math.floor(ampmOptions.length / 2);
  // 중간 지점 근처에서 해당 값 찾기
  for (let i = ampmMidIndex - 5; i < ampmMidIndex + 5; i++) {
    if (
      ampmOptions[i] &&
      parseInt(ampmOptions[i].dataset.value) === ampmTargetValue
    ) {
      ampmOptions[i].classList.add("selected");
      ampmOptions[i].scrollIntoView({ block: "center" });
      break;
    }
  }

  // 시간 설정 - 중간 지점에서 현재 시간 찾기
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const hourOptions = hourColumn.querySelectorAll(".picker-option");
  const hourMidIndex = Math.floor(hourOptions.length / 2);
  // 중간 지점 근처에서 해당 시간 찾기
  for (let i = hourMidIndex - 10; i < hourMidIndex + 10; i++) {
    if (hourOptions[i] && parseInt(hourOptions[i].dataset.value) === hour12) {
      hourOptions[i].classList.add("selected");
      hourOptions[i].scrollIntoView({ block: "center" });
      break;
    }
  }

  // 분 설정 - 중간 지점에서 현재 분 찾기
  const minuteOptions = minuteColumn.querySelectorAll(".picker-option");
  const minuteMidIndex = Math.floor(minuteOptions.length / 2);
  // 중간 지점 근처에서 해당 분 찾기
  for (let i = minuteMidIndex - 30; i < minuteMidIndex + 30; i++) {
    if (
      minuteOptions[i] &&
      parseInt(minuteOptions[i].dataset.value) === minute
    ) {
      minuteOptions[i].classList.add("selected");
      minuteOptions[i].scrollIntoView({ block: "center" });
      break;
    }
  }
}

// 선택된 시간 값 가져오기 함수
function getSelectedTime() {
  const selectedAmpm = document.querySelector(
    "#ampm-column .picker-option.selected"
  );
  const selectedHour = document.querySelector(
    "#hour-column .picker-option.selected"
  );
  const selectedMinute = document.querySelector(
    "#minute-column .picker-option.selected"
  );

  if (selectedAmpm && selectedHour && selectedMinute) {
    return {
      ampm: selectedAmpm.textContent,
      hour: selectedHour.textContent,
      minute: selectedMinute.textContent,
    };
  }
  return null;
}

// 페이지 로드 시 시간 선택기 초기화
$(document).ready(async () => {
  // 시간 선택기 생성 및 초기화
  createTimePicker();

  // 각 컬럼에 스크롤 이벤트 초기화
  document.querySelectorAll(".picker-column").forEach(initPicker);

  // 초기값 설정 (약간의 지연 후)
  setTimeout(setInitialValues, 300);

  // 버튼 클릭 이벤트
  moveBtn.addEventListener("click", () => {
    const boardingGate = document.getElementById("boardingGate").value.trim();

    // 입력 검증
    if (
      boardingGate > 132 ||
      (boardingGate > 50 && boardingGate < 100) ||
      boardingGate == 4 ||
      boardingGate == 5 ||
      boardingGate == 44
    ) {
      alert("존재하지 않은 게이트 입니다.");
      return;
    }

    // 선택된 시간 정보 가져오기
    const selectedTime = getSelectedTime();
    console.log("선택된 시간:", selectedTime);

    // URLSearchParams로 안전하게 쿼리스트링 생성
    const params = new URLSearchParams();
    params.append("boardingGate", boardingGate);

    if (selectedTime) {
      params.append("ampm", selectedTime.ampm);
      params.append("hour", selectedTime.hour);
      params.append("minute", selectedTime.minute);
    }

    window.location.href = "congestion.html?" + params.toString();
  });
});
