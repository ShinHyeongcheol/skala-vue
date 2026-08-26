<script setup>
import WeatherMockup from '@/components/handsOn/WeatherMockup.vue'

const practices = [
  {
    id: 'weatherMockup',
    category: 'Hands-On Assignment',
    title: 'Weather Mockup',
    component: WeatherMockup,
  },
]

</script>

<template>
  <section class="practice-page" aria-labelledby="hands-on-title">
    <header class="page-heading">
      <p class="eyebrow">Practice</p>
      <h1 id="hands-on-title">Hands-On</h1>
      <p>여러 Vue 기능을 하나의 결과물에 조합하는 과제형 실습입니다.</p>
    </header>

    <div class="practice-grid">
      <article v-for="practice in practices" :key="practice.id" class="practice-card" style="background: white;">
        <div class="card-heading">
          <div>
            <p>{{ practice.category }}</p>
            <h2 style = "color: #1e293b;">{{ practice.title }}</h2>
          </div>
        </div>
        <div>
          <component :is="practice.component" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.practice-page { display: grid; gap: 2rem; }
.page-heading { display: grid; gap: 0.5rem; }
.eyebrow, .card-heading p { color: #2563eb; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
h1, h2 { color: var(--color-heading); font-weight: 700; line-height: 1.2; }
h1 { font-size: clamp(2rem, 5vw, 3rem); }
h2 { font-size: 1.25rem; }
.practice-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
.practice-card { display: grid; gap: 1.25rem; padding: 1.5rem; background: var(--color-background-soft); border: 1px solid var(--color-border); border-radius: 0.75rem; }
.card-heading { display: flex; align-items: start; justify-content: space-between; gap: 1rem; }
.card-heading > div { display: grid; gap: 0.25rem; }
.card-description { color: #475569; font-size: 0.9375rem; }
</style>
