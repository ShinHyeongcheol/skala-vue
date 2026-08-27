<script setup>
import Toast from 'primevue/toast'
</script>

<template>
  <Toast position="top-right" />
  <main class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/hands-on">Vue Practice</RouterLink>
      <nav aria-label="주요 메뉴">
        <RouterLink to="/hands-on">Hands-On</RouterLink>
        <RouterLink to="/challenges">Code Challenge</RouterLink>
      </nav>
    </header>

    <RouterView />
  </main>
</template>

<style scoped>
.app-shell { display: grid; gap: 3rem; width: min(100%, 960px); margin: 0 auto; padding: 2rem 1.5rem 3rem; }
.site-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border); }
.brand { color: var(--color-heading); font-size: 1.125rem; font-weight: 800; text-decoration: none; }
nav { display: flex; gap: 0.25rem; }
nav a { padding: 0.5rem 0.75rem; color: var(--color-text); font-size: 0.875rem; font-weight: 700; text-decoration: none; border-radius: 0.375rem; }
nav a.router-link-active { color: #1d4ed8; background: #eff6ff; }
@media (max-width: 640px) { .app-shell { gap: 2rem; padding: 1.5rem 1rem 2rem; } .site-header { align-items: start; flex-direction: column; } }
</style>
