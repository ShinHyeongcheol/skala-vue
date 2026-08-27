<script setup>
import { computed } from 'vue'
import { weatherList } from '@/data/weather'
import { useWeatherStore } from '@/stores/weatherStore'
import { useFavoriteStore } from '@/stores/favoriteStore'

const weatherStore = useWeatherStore()
const favoriteStore = useFavoriteStore()

const displayTemperature = (celsius) => {
  if (weatherStore.temperatureUnit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32)
  }

  return celsius
}

const timeOptions = [
  { value: '09:00', label: '오전 9시' },
  { value: '12:00', label: '오후 12시' },
  { value: '15:00', label: '오후 3시' },
  { value: '18:00', label: '오후 6시' },
  { value: '21:00', label: '오후 9시' },
]

const weatherAtSelectedTime = computed(() => {
  return weatherList.map((city) => {
    const forecast = city.forecast.find((item) => item.time === weatherStore.selectedTime)

    return {
      ...city,
      displayTemp: forecast?.temp ?? city.temp,
      displayStatus: forecast?.status ?? city.status,
    }
  })
})

const hottestCity = computed(() => {
  return weatherAtSelectedTime.value.reduce((hottest, city) => {
    return city.displayTemp > hottest.displayTemp ? city : hottest
  })
})

const rainyCities = computed(() => {
  return weatherAtSelectedTime.value.filter((city) => city.displayStatus === '비')
})
</script>

<template>
  <section class="weather-hourly" aria-labelledby="weather-hourly-title">
    <header class="page-heading">
      <p class="eyebrow">Hourly Weather</p>
      <h2 id="weather-hourly-title">🕘 시간대별 날씨</h2>
      <p>선택한 시각을 기준으로 지역별 날씨와 기온을 비교합니다.</p>
    </header>

    <section class="time-panel" aria-labelledby="time-filter-title">
      <h3 id="time-filter-title">시간 선택</h3>
      <div class="time-filter" role="group" aria-label="시간대 선택">
        <button
          v-for="time in timeOptions"
          :key="time.value"
          type="button"
          :class="{ active: weatherStore.selectedTime === time.value }"
          :aria-pressed="weatherStore.selectedTime === time.value"
          @click="weatherStore.setSelectedTime(time.value)"
        >
          {{ time.label }}
        </button>
      </div>
    </section>

    <section class="summary-panel" aria-label="선택 시간 요약">
      <p><strong>{{ weatherStore.selectedTime }}</strong> 기준 최고 기온은 <strong>{{ hottestCity.name }} {{ displayTemperature(hottestCity.displayTemp) }}{{ weatherStore.temperatureSymbol }}</strong>입니다.</p>
      <p v-if="rainyCities.length > 0">☔ 비가 오는 지역: {{ rainyCities.map((city) => city.name).join(', ') }}</p>
      <p v-else>☀️ 비가 오는 지역이 없습니다.</p>
    </section>

    <section class="weather-grid" aria-label="도시별 시간대 날씨">
      <article
        v-for="city in weatherAtSelectedTime"
        :key="city.id"
        class="weather-card"
        :class="{ favorite: favoriteStore.isFavorite(city.id) }"
      >
        <h3>{{ city.name }}<span v-if="favoriteStore.isFavorite(city.id)"> ⭐</span></h3>
        <p class="temperature">{{ displayTemperature(city.displayTemp) }}{{ weatherStore.temperatureSymbol }}</p>
        <p>{{ city.displayStatus }}</p>
      </article>
    </section>
  </section>
</template>

<style scoped>
.weather-hourly { display: grid; gap: 1.25rem; color: #1e293b; }
.page-heading, .time-panel { display: grid; gap: 0.5rem; }
.eyebrow { color: #2563eb; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
h2, h3 { font-weight: 700; }
h2 { color: var(--color-heading); font-size: 1.5rem; }
h3 { font-size: 1rem; }
.time-panel, .summary-panel { padding: 1rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; }
.time-filter { display: flex; flex-wrap: wrap; gap: 0.5rem; }
button { padding: 0.5rem 0.75rem; color: #1e293b; font: inherit; font-size: 0.875rem; cursor: pointer; background: #fff; border: 1px solid #94a3b8; border-radius: 0.25rem; }
button:hover { background: #f1f5f9; }
button.active { color: #fff; background: #2563eb; border-color: #2563eb; }
.summary-panel { display: grid; gap: 0.375rem; }
.weather-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.75rem; }
.weather-card { display: grid; gap: 0.375rem; padding: 1rem; background: #fff; border: 1px solid #dbe2ea; border-radius: 0.5rem; }
.weather-card.favorite { background: #fffbeb; border-color: #fbbf24; box-shadow: inset 0 0 0 1px #fbbf24; }
.temperature { color: #2563eb; font-size: 1.5rem; font-weight: 800; }
@media (max-width: 640px) { .weather-grid { grid-template-columns: 1fr; } button { width: 100%; } }
</style>
