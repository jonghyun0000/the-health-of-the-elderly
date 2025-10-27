<!--
  노인 건강 자가진단 및 영양제 추천 웹사이트

  환경 및 실행:
  - 이 HTML 문서는 모든 표준 웹 브라우저에서 열 수 있습니다.
  - 외부 라이브러리 없이 동작하며, 같은 디렉터리에 있는 style.css와 script.js를
    로드하여 스타일과 기능을 제공합니다.
  - 한국어로 작성되어 노년층 사용자에게 친숙한 경험을 제공합니다.
-->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>노인 건강 자가진단 및 영양제 추천</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 외부 스타일 시트 로드 -->
  <link rel="stylesheet" href="style.css">
  <!-- 자바스크립트 로드: defer 속성으로 HTML 파싱 후 실행 -->
  <script defer src="script.js"></script>
</head>
<body>
  <header>
    <h1>노인 건강 자가진단 및 영양제 추천</h1>
  </header>
  <main>
    <!-- 사이트 설명 -->
    <section id="description">
      <p>본 사이트는 노인분들이 손쉽게 사용할 수 있도록 설계되었습니다. 아래 설문을 통해 건강 상태를 간단히 체크한 후, 결과에 맞는 영양제 또는 비타민을 추천합니다.</p>
    </section>
    <!-- 건강 설문 폼 -->
    <section id="survey">
      <form id="healthForm">
        <h2>건강 상태 체크</h2>
        <div class="form-group">
          <label for="age">연령대 선택:</label>
          <select id="age" name="age" required>
            <option value="">선택하세요</option>
            <option value="60-69">60-69세</option>
            <option value="70-79">70-79세</option>
            <option value="80+">80세 이상</option>
          </select>
        </div>
        <div class="form-group">
          <label>성별:</label>
          <label><input type="radio" name="gender" value="male" required> 남성</label>
          <label><input type="radio" name="gender" value="female"> 여성</label>
        </div>
        <fieldset>
          <legend>관심 건강 분야를 선택하세요 (중복 선택 가능)</legend>
          <label><input type="checkbox" name="condition" value="bone"> 뼈 건강/골다공증 예방</label>
          <label><input type="checkbox" name="condition" value="energy"> 피로/에너지</label>
          <label><input type="checkbox" name="condition" value="immunity"> 면역/항산화</label>
          <label><input type="checkbox" name="condition" value="memory"> 인지/기억</label>
          <label><input type="checkbox" name="condition" value="joint"> 관절 건강</label>
          <label><input type="checkbox" name="condition" value="digestive"> 소화/위장</label>
        </fieldset>
        <button type="submit">결과 보기</button>
        <!-- 오류 메시지 표시 영역 -->
        <div id="errorMsg" class="error" aria-live="polite"></div>
      </form>
    </section>
    <!-- 결과 표시 섹션 -->
    <section id="results">
      <h2>추천 결과</h2>
      <div id="recommendations" aria-live="polite"></div>
    </section>
  </main>
  <footer>
    <p>※ 본 정보는 참고용이며, 건강보조식품 섭취 전에는 반드시 의료 전문가와 상담하시기 바랍니다.</p>
    <p>영양소 권장량은 미국 국립 노화연구소(NIA)의 비타민 및 미네랄 가이드【124456461532†L286-L365】【739019653477857†L254-L299】를 참고했습니다.</p>
  </footer>
</body>
</html>
