/**
 * senior_health/script.js
 *
 * 환경: 이 스크립트는 Chrome 130 및 최신 브라우저 환경(ES6+)에서 테스트되었습니다.
 * 종속성: 순수 JavaScript만 사용하며, 외부 라이브러리가 필요하지 않습니다.
 * 실행: index.html에서 defer 속성으로 로드되며, DOMContentLoaded 이후에 실행됩니다.
 *
 * 주요 기능:
 * 1. 사용자 입력 검증 및 오류 처리: 연령, 성별, 관심 건강 분야를 필수로 선택하도록 유도합니다.
 * 2. 사용자가 선택한 건강 조건을 기반으로 적합한 영양제/비타민 추천 목록을 생성합니다.
 * 3. 추천 항목을 동적으로 화면에 표시하며, 제품명, 설명, 간단한 정보가 포함됩니다.
 * 4. 테스트 함수(test())를 통해 로직이 올바르게 동작하는지 콘솔에서 확인할 수 있습니다.
 *
 * 알고리즘 및 성능:
 * - getSelectedConditions()는 사용자가 체크한 체크박스를 순회하여 값 배열을 반환합니다. 최악의 경우 O(k) (k는 체크박스 개수)입니다.
 * - getRecommendations()는 선택된 조건 배열과 미리 정의된 PRODUCT_DATA 객체를 순회하여 추천 목록을 구성합니다. 조건 수를 n, 데이터 키 수를 m으로 두었을 때 시간복잡도는 O(n * m)이지만 m이 고정(6)이라 사실상 O(n)입니다.
 * - displayRecommendations()는 DOM 노드를 조작하며, 추천 목록의 길이에 비례한 작업을 수행합니다.
 *
 * 예외 처리:
 * - 필수 필드(연령, 성별)를 선택하지 않으면 오류 메시지를 표시합니다.
 * - 관심 건강 분야를 하나도 선택하지 않은 경우 오류 메시지를 표시합니다.
 *
 * 주의:
 * - 제품 링크는 예시이며 실제 구매 페이지가 아닙니다. 건강보조식품 섭취 전에는 반드시 의료 전문가와 상담하세요.
 */

// 추천 데이터: 건강 조건별로 제품 정보와 설명을 정의합니다.
const PRODUCT_DATA = {
  bone: {
    title: '뼈 건강 (칼슘 + 비타민 D)',
    description:
      '나이가 들수록 뼈 밀도가 감소하므로 칼슘과 비타민 D 섭취가 중요합니다. 칼슘은 뼈를 구성하고, 비타민 D는 칼슘 흡수를 돕습니다.',
    products: [
      {
        name: '칼슘&비타민 D 복합 영양제',
        link: '#',
        info: '하루 1정으로 칼슘 500mg과 비타민 D 400IU 제공',
      },
    ],
  },
  energy: {
    title: '에너지 및 피로 개선 (비타민 B군)',
    description:
      '비타민 B6와 B12는 체내 에너지 생성과 신경 기능을 돕습니다. 특히 비타민 B12는 2.4mcg 이상 필요하며, 음식으로 섭취가 어려울 경우 보충제를 고려할 수 있습니다.',
    products: [
      {
        name: '종합 비타민 B군',
        link: '#',
        info: '비타민 B1, B2, B3, B6, B12 등 포함',
      },
    ],
  },
  immunity: {
    title: '면역/항산화 (비타민 C, E)',
    description:
      '비타민 C와 E는 항산화 작용과 면역 기능 유지에 도움을 줍니다. 매일 충분한 과일과 채소 섭취가 어렵다면 보충제를 고려할 수 있습니다.',
    products: [
      {
        name: '비타민 C & E 복합제',
        link: '#',
        info: '비타민 C 500mg, 비타민 E 200IU 제공',
      },
    ],
  },
  memory: {
    title: '인지·기억 지원 (오메가-3, 비타민 D)',
    description:
      '오메가-3 지방산과 비타민 D는 뇌 기능과 인지 건강에 도움을 줄 수 있다는 연구들이 있습니다. 효과는 개인에 따라 다를 수 있으므로 전문가 상담이 필요합니다.',
    products: [
      {
        name: '오메가-3 캡슐',
        link: '#',
        info: 'EPA/DHA 1000mg 제공',
      },
    ],
  },
  joint: {
    title: '관절 건강 (글루코사민 & MSM)',
    description:
      '글루코사민과 MSM은 관절 통증 완화 및 연골 건강 유지에 도움을 줄 수 있습니다. 다만 일부 연구에서는 효과가 제한적일 수 있음을 지적합니다.',
    products: [
      {
        name: '글루코사민 & MSM',
        link: '#',
        info: '글루코사민 1500mg, MSM 1000mg',
      },
    ],
  },
  digestive: {
    title: '소화/위장 (프로바이오틱스, 식이섬유)',
    description:
      '노년기에 소화 기능이 저하될 수 있으므로 유산균과 식이섬유 섭취가 도움이 됩니다.',
    products: [
      {
        name: '프로바이오틱스',
        link: '#',
        info: '10종 혼합 균주 100억 CFU 제공',
      },
      {
        name: '식이섬유 보충제',
        link: '#',
        info: '수용성 식이섬유 5g 제공',
      },
    ],
  },
};

/**
 * 사용자가 체크한 건강 분야를 배열로 반환합니다.
 * @returns {string[]} 선택된 조건 값 배열
 */
function getSelectedConditions() {
  const checkboxes = document.querySelectorAll('input[name="condition"]:checked');
  return Array.from(checkboxes).map((cb) => cb.value);
}

/**
 * 선택된 조건과 연령, 성별에 따라 추천 목록을 생성합니다.
 * @param {string[]} conditions - 사용자 선택 조건 배열
 * @param {string} age - 연령대 (사용 안 함, 향후 확장 가능)
 * @param {string} gender - 성별 (사용 안 함, 향후 확장 가능)
 * @returns {object[]} 추천 항목 배열
 */
function getRecommendations(conditions, age = '', gender = '') {
  const recommendations = [];
  const added = new Set();
  for (const cond of conditions) {
    const data = PRODUCT_DATA[cond];
    if (data && !added.has(cond)) {
      recommendations.push(data);
      added.add(cond);
    }
  }
  return recommendations;
}

/**
 * 추천 목록을 DOM에 표시합니다.
 * @param {object[]} recs - 추천 항목 배열
 */
function displayRecommendations(recs) {
  const container = document.getElementById('recommendations');
  // 이전 내용 지우기
  container.innerHTML = '';
  recs.forEach((rec) => {
    const div = document.createElement('div');
    div.className = 'recommendation';
    const title = document.createElement('h3');
    title.textContent = rec.title;
    div.appendChild(title);
    const desc = document.createElement('p');
    desc.textContent = rec.description;
    div.appendChild(desc);
    rec.products.forEach((prod) => {
      const prodElem = document.createElement('p');
      prodElem.innerHTML = `<strong>${prod.name}</strong> – ${prod.info}`;
      div.appendChild(prodElem);
    });
    container.appendChild(div);
  });
}

/**
 * 제출 이벤트 핸들러: 입력 검증 후 추천을 생성하고 표시합니다.
 * @param {Event} event - submit 이벤트
 */
function handleSubmit(event) {
  event.preventDefault();
  const age = document.getElementById('age').value;
  const genderElement = document.querySelector('input[name="gender"]:checked');
  const gender = genderElement ? genderElement.value : '';
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = '';
  // 필수값 검증
  if (!age || !gender) {
    errorMsg.textContent = '연령대와 성별을 모두 선택해주세요.';
    return;
  }
  const conditions = getSelectedConditions();
  if (conditions.length === 0) {
    errorMsg.textContent = '관심 건강 분야를 최소 한 개 선택하세요.';
    return;
  }
  const recs = getRecommendations(conditions, age, gender);
  displayRecommendations(recs);
}

/**
 * 테스트 함수: 예시 데이터를 기반으로 추천 목록을 콘솔에 출력합니다.
 * 개발자만을 위한 함수이며, 사용자에게는 표시되지 않습니다.
 */
function test() {
  const testConditions = ['bone', 'energy'];
  const results = getRecommendations(testConditions, '60-69', 'male');
  console.log('테스트 결과:', results);
}

// 이벤트 리스너 등록: DOMContentLoaded 후 폼 제출 이벤트 처리
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('healthForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
  // 테스트 함수 호출 (개발 시 주석 해제 후 확인 가능)
  // test();
});