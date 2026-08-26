<template>
  <section class="not-found" aria-labelledby="not-found-title">
    <h1 id="not-found-title">페이지를 찾을 수 없습니다.</h1>
    <p>주소를 다시 확인하거나 날씨 대시보드로 돌아가세요.</p>
    <RouterLink to="/hands-on">날씨 대시보드로 이동</RouterLink>
  </section>
</template>

<style scoped>
.not-found { display: grid; justify-items: center; gap: 1rem; padding: 3rem 1.5rem; color: #1e293b; text-align: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; }
h1 { font-size: 1.5rem; font-weight: 700; }
a { padding: 0.625rem 0.875rem; color: #fff; font-weight: 700; text-decoration: none; background: #2563eb; border-radius: 0.375rem; }
a:hover { background: #1d4ed8; }
</style>
