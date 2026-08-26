<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { weatherList } from '@/data/weather'

const route = useRoute()
const city = ref(null)

onMounted(() => {
  city.value = weatherList.find((item) => item.id === route.params.cityId) ?? null
})
</script>

<template>
  <section class="weather-detail" aria-labelledby="weather-detail-title">
    <template v-if="city">
      <header class="page-heading">
        <p class="eyebrow">Weather Detail</p>
        <h1 id="weather-detail-title">{{ city.name }} 상세 날씨</h1>
        <p>도시 ID: {{ city.id }}</p>
      </header>

      <article class="current-weather">
        <h2>현재 날씨</h2>
        <p><strong>{{ city.status }}</strong></p>
        <p class="temperature">{{ city.temp }}°C</p>
      </article>

      <section class="forecast-section" aria-labelledby="forecast-title">
        <h2 id="forecast-title">시간대별 예보</h2>
        <div class="forecast-list">
          <article v-for="forecast in city.forecast" :key="forecast.time" class="forecast-card">
            <strong>{{ forecast.time }}</strong>
            <span>{{ forecast.temp }}°C</span>
            <span>{{ forecast.status }}</span>
          </article>
        </div>
      </section>
    </template>

    <section v-else class="not-found-city" aria-labelledby="not-found-city-title">
      <h1 id="not-found-city-title">도시 정보를 찾을 수 없습니다.</h1>
      <p>요청한 도시 ID: {{ route.params.cityId }}</p>
    </section>

    <RouterLink class="back-link" to="/hands-on">날씨 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.weather-detail { display: grid; gap: 1.5rem; color: #1e293b; }
.page-heading, .forecast-section { display: grid; gap: 0.5rem; }
.eyebrow { color: #2563eb; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
h1, h2 { font-weight: 700; }
h1 { font-size: clamp(1.75rem, 4vw, 2.25rem); }
h2 { font-size: 1.125rem; }
.current-weather, .forecast-section, .not-found-city { padding: 1.25rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; }
.current-weather { display: grid; gap: 0.5rem; }
.temperature { color: #2563eb; font-size: 2rem; font-weight: 800; }
.forecast-list { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.75rem; }
.forecast-card { display: grid; gap: 0.25rem; padding: 0.75rem; background: #fff; border: 1px solid #dbe2ea; border-radius: 0.5rem; }
.back-link { justify-self: start; padding: 0.625rem 0.875rem; color: #fff; font-weight: 700; text-decoration: none; background: #2563eb; border-radius: 0.375rem; }
.back-link:hover { background: #1d4ed8; }
@media (max-width: 640px) { .forecast-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
