<template>
  <section class="weather-about" aria-labelledby="weather-about-title">
    <p class="eyebrow">Weather Service</p>
    <h1 id="weather-about-title">날씨 대시보드 소개</h1>
    <p>
      도시별 날씨와 시간대별 예보를 확인하고, 검색과 필터로 원하는 정보를 찾는 Vue Router 실습 화면입니다.
    </p>
    <RouterLink class="home-link" to="/hands-on">메인 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.weather-about { display: grid; justify-items: start; gap: 1rem; padding: 1.5rem; color: #1e293b; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; }
.eyebrow { color: #2563eb; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
h1 { font-size: clamp(1.75rem, 4vw, 2.25rem); font-weight: 700; }
p { line-height: 1.7; }
.home-link { padding: 0.625rem 0.875rem; color: #fff; font-weight: 700; text-decoration: none; background: #2563eb; border-radius: 0.375rem; }
.home-link:hover { background: #1d4ed8; }
</style>
