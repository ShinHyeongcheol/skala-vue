<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { weatherList } from '@/data/weather'
import { useWeatherStore } from '@/stores/weatherStore'
import { useFavoriteStore } from '@/stores/favoriteStore'

const route = useRoute()
const city = ref(null)
const weatherStore = useWeatherStore()
const favoriteStore = useFavoriteStore()

const displayTemperature = (celsius) => {
  if (weatherStore.temperatureUnit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32)
  }

  return celsius
}

onMounted(() => {
  city.value = weatherList.find((item) => item.id === route.params.cityId) ?? null
})
</script>

<template>
  <section class="weather-detail" aria-labelledby="weather-detail-title">
    <template v-if="city">
      <header class="page-heading detail-heading">
        <p class="eyebrow">Weather Detail</p>
        <h1 id="weather-detail-title">
          <span>{{ city.name }}</span> 상세 날씨 <span v-if="favoriteStore.isFavorite(city.id)" class="favorite-mark">⭐</span>
        </h1>
        <p>도시 ID: {{ city.id }}</p>
        <button class="favorite-button" type="button" @click="favoriteStore.toggleFavorite(city.id)">
          {{ favoriteStore.isFavorite(city.id) ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기' }}
        </button>
      </header>

      <article class="current-weather">
        <h2>현재 날씨</h2>
        <p><strong>{{ city.status }}</strong></p>
        <p class="temperature">{{ displayTemperature(city.temp) }}{{ weatherStore.temperatureSymbol }}</p>
      </article>

      <section class="forecast-section" aria-labelledby="forecast-title">
        <h2 id="forecast-title">시간대별 예보</h2>
        <div class="forecast-list">
          <article v-for="forecast in city.forecast" :key="forecast.time" class="forecast-card">
            <strong>{{ forecast.time }}</strong>
            <span>{{ displayTemperature(forecast.temp) }}{{ weatherStore.temperatureSymbol }}</span>
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
.detail-heading { color: var(--color-text); }
.detail-heading h1 { color: var(--color-heading); }
.eyebrow { color: #2563eb; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
h1, h2 { font-weight: 700; }
h1 { font-size: clamp(1.75rem, 4vw, 2.25rem); }
h2 { font-size: 1.125rem; }
.favorite-mark { margin: 0 0.25rem; }
.current-weather, .forecast-section, .not-found-city { padding: 1.25rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; }
.current-weather { display: grid; gap: 0.5rem; }
.temperature { color: #2563eb; font-size: 2rem; font-weight: 800; }
.forecast-list { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.75rem; }
.forecast-card { display: grid; gap: 0.25rem; padding: 0.75rem; background: #fff; border: 1px solid #dbe2ea; border-radius: 0.5rem; }
.favorite-button { justify-self: start; padding: 0.625rem 0.875rem; color: #92400e; font: inherit; font-size: 0.875rem; font-weight: 700; cursor: pointer; background: #fef3c7; border: 1px solid #fbbf24; border-radius: 0.375rem; }
.favorite-button:hover { background: #fde68a; }
.back-link { justify-self: start; padding: 0.625rem 0.875rem; color: #fff; font-weight: 700; text-decoration: none; background: #2563eb; border-radius: 0.375rem; }
.back-link:hover { background: #1d4ed8; }
@media (max-width: 640px) { .forecast-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
