<script setup>
import UnitToggler from '@/components/handsOn/weatherComponent/UnitToggler.vue'
</script>

<template>
  <section class="hands-on-page">
    <header class="page-heading">
      <div class="heading-copy">
        <p class="eyebrow">Practice</p>
        <h1>Hands-On</h1>
        <p>여러 Vue 기능을 하나의 결과물에 조합하는 과제형 실습입니다.</p>
      </div>

      <nav class="weather-nav" aria-label="날씨 실습 메뉴">
        <RouterLink to="/hands-on">날씨 대시보드</RouterLink>
        <RouterLink to="/hands-on/hourly">시간대별 날씨</RouterLink>
        <RouterLink to="/hands-on/about">날씨 소개</RouterLink>
      </nav>
    </header>

    <div class="unit-settings">
      <UnitToggler />
    </div>

    <RouterView />
  </section>
</template>

<style scoped>
.hands-on-page { display: grid; gap: 2rem; }
.page-heading { display: flex; align-items: end; justify-content: space-between; gap: 1rem; }
.heading-copy { display: grid; gap: 0.5rem; }
.eyebrow { color: #2563eb; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
h1 { color: var(--color-heading); font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; line-height: 1.2; }
.weather-nav { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.weather-nav a { padding: 0.5rem 0.75rem; color: var(--color-text); font-size: 0.875rem; font-weight: 700; text-decoration: none; border: 1px solid var(--color-border); border-radius: 0.375rem; }
.weather-nav a.router-link-exact-active { color: #1d4ed8; background: #eff6ff; border-color: #93c5fd; }
.unit-settings { justify-self: end; }
@media (max-width: 640px) { .page-heading { align-items: start; flex-direction: column; } }
</style>
