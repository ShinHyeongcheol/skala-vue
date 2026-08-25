<template>
  <section class="hands-on-page" aria-labelledby="hands-on-title">
    <header class="page-heading">
      <p class="eyebrow">Practice</p>
      <h1 id="hands-on-title">Hands-On</h1>
      <p>여러 Vue 기능을 하나의 결과물에 조합하는 과제형 실습입니다.</p>
    </header>

    <article class="hands-on-card">
      <p class="card-label">Coming soon</p>
      <h2>Weather Mockup</h2>
      <p>`v-for`, 조건부 렌더링, 한글 검색, 이벤트 수식어를 적용하는 첫 Hands-On 과제입니다.</p>
      <p class="card-note">구현을 시작하면 이 카드에서 실습 화면으로 연결하세요.</p>
    </article>
  </section>
</template>

<style scoped>
.hands-on-page, .page-heading { display: grid; gap: 0.5rem; }
.hands-on-page { gap: 2rem; }
.eyebrow, .card-label { color: #2563eb; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
h1, h2 { color: var(--color-heading); font-weight: 700; line-height: 1.2; }
h1 { font-size: clamp(2rem, 5vw, 3rem); }
h2 { font-size: 1.25rem; }
.hands-on-card { display: grid; gap: 0.75rem; padding: 1.5rem; background: var(--color-background-soft); border: 1px dashed var(--color-border-hover); border-radius: 0.75rem; }
.card-note { color: #64748b; font-size: 0.875rem; }
</style>
