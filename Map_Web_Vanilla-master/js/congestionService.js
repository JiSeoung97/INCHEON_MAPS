/* congestionMap.js */

// 1) loadTemplate: 외부 HTML 템플릿을 불러와 DocumentFragment 반환
async function loadTemplate(url, tplId) {
  const res = await fetch(url);
  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, 'text/html');
  const tpl = doc.getElementById(tplId);
  if (!tpl) throw new Error(`${tplId} 템플릿을 찾을 수 없습니다.`);
  return tpl.content;
}

// 2) 상태 코드 → 한글 텍스트 변환 헬퍼
function formatStatus(code) {
  switch (code) {
    case 'low':      return '원활';
    case 'medium':   return '보통';
    case 'high':     return '혼잡';
    case 'veryhigh': return '매우혼잡';
    default:         return '미운영';
  }
}
function formatColors(code) {
  switch (code) {
    case 'low':      return '#32A1FF';
    case 'medium':   return '#00C73C';
    case 'high':     return '#FF823F';
    case 'veryhigh': return '#FF5959';
    default:         return '#999999';
  }
}
function compareSeverity(a,b){
    const severityRank = { low: 0, medium: 1, high: 2, veryhigh: 3 };
    if(severityRank[a]>=severityRank[b]){
        return b
    }else{
        return a
    }
}
// 3) 혼잡도 템플릿 서비스
const CongestionService = (() => {
  let tplContent;

  async function render() {
    // 템플릿 로드
    if (!tplContent) {
      tplContent = await loadTemplate(
        './component/congestionMap.html',
        'congestionMap'
      );
    }

    // 데이터 가져오기 및 템플릿 복제
    const areas = DataService.getAllAreas();
    const frag = tplContent.cloneNode(true);
    const tagDivs = frag.querySelectorAll('.tag');
    const bubble = frag.querySelectorAll('.bubble-container');
    let color;
    // 데이터 삽입
    areas.forEach((area, idx) => {
      const div = tagDivs[idx];
      if (!div) return;
      const statusText = formatStatus(area.congestion);
      let dir;
      if(idx%2===0){
        dir ='서편';
      }else{
        dir = '동편'
      }
      color = formatColors(area.congestion);
      const statusClass = area.congestion;
      div.innerHTML = '<span class="dir">'+dir+'</span>'
      +'<span class="status '+statusClass+'">'+statusText+'</span>';
        switch(idx){
            case 0:
            case 1:
                compare = compareSeverity(areas[0].congestion,areas[1].congestion)
                if(idx%2==0){
                    div.style.setProperty('border','1.5px solid '+color);
                    div.style.setProperty('border-radius','10px 0px 0px 10px');
                    div.style.setProperty('transform','translate(1.5px,0px)');
                }else{
                    div.style.setProperty('border','1.5px solid'+color);
                    div.style.setProperty('border-radius','0px 10px 10px 0px');
                }
                color = formatColors(compare);
                if(areas[idx].congestion===compare){
                    
                    div.style.setProperty('z-index','1000');
                }
                bubble[1].style.setProperty('--badge-color',color);
                break;
            case 2:
            case 3:
                compare = compareSeverity(areas[2].congestion,areas[3].congestion)
                if(idx%2==0){
                    div.style.setProperty('border','1.5px solid '+color);
                    div.style.setProperty('border-radius','10px 0px 0px 10px');
                    div.style.setProperty('transform','translate(1.5px,0px)');
                }else{
                    div.style.setProperty('border','1.5px solid'+color);
                    div.style.setProperty('border-radius','0px 10px 10px 0px');
                }
                color = formatColors(compare);
                if(areas[idx].congestion===compare){
                    
                    div.style.setProperty('z-index','1000');
                }
                bubble[2].style.setProperty('--badge-color',color);
                break;
            case 4:
            case 5:
                compare = compareSeverity(areas[4].congestion,areas[5].congestion)
                if(idx%2==0){
                    div.style.setProperty('border','1.5px solid '+color);
                    div.style.setProperty('border-radius','10px 0px 0px 10px');
                    div.style.setProperty('transform','translate(1.5px,0px)');
                }else{
                    div.style.setProperty('border','1.5px solid'+color);
                    div.style.setProperty('border-radius','0px 10px 10px 0px');
                }
                color = formatColors(compare);
                if(areas[idx].congestion===compare){
                    
                    div.style.setProperty('z-index','1000');
                }
                bubble[3].style.setProperty('--badge-color',color);
                break;
            case 6:
            case 7:
                compare = compareSeverity(areas[6].congestion,areas[7].congestion)
                if(idx%2==0){
                    div.style.setProperty('border','1.5px solid '+color);
                    div.style.setProperty('border-radius','10px 0px 0px 10px');
                    div.style.setProperty('transform','translate(1.5px,0px)');
                }else{
                    div.style.setProperty('border','1.5px solid'+color);
                    div.style.setProperty('border-radius','0px 10px 10px 0px');
                    
                }
                color = formatColors(compare);
                if(areas[idx].congestion===compare){
                    
                    div.style.setProperty('z-index','1000');
                }
                bubble[4].style.setProperty('--badge-color',color);
                break;
            default:
                console.log('err');
        }
    });



    // 템플릿 교체
    // 기존 <template> 태그 대체
    const container = document.getElementById('cMapContainer');
    container.innerHTML='';
     // 버블 컨테이너가 map 영역 밖으로 나가지 않도록 위치 클램핑
    const parentWidth = container.clientWidth;
    const parentHeight = container.clientHeight;
    const bubbles = frag.querySelectorAll('.bubble-container');
    bubbles.forEach(b => {
      // percentage top/left 추출
      const topPct = parseFloat(getComputedStyle(b).top) / 100;
      const leftPct = parseFloat(getComputedStyle(b).left) / 100;
      // 픽셀로 변환
      let topPx = topPct * parentHeight;
      let leftPx = leftPct * parentWidth;
      // 클램프
      topPx = Math.min(Math.max(0, topPx), parentHeight);
      leftPx = Math.min(Math.max(0, leftPx), parentWidth);
      // 다시 퍼센트로 설정
      b.style.top = (topPx / parentHeight * 100) + '%';
      b.style.left = (leftPx / parentWidth * 100) + '%';

    });
    container.appendChild(frag);
    // bottomSheet 높이 조정: cMapContainer 높이에 맞추기
    const sheet = document.getElementById('bottomSheet');
    const cMapContainer = document.getElementById('cMapContainer');
    if (sheet && cMapContainer) {
      const height = sheet.getBoundingClientRect().height;
      cMapContainer.style.height = `-${height}px`;
    }
  }

  return {render};
})();

// DOMContentLoaded에서 render 호출
window.addEventListener('DOMContentLoaded', () => {
  CongestionService.render().catch(err => console.error(err));
});
