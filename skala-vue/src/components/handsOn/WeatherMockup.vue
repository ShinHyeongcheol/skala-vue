<script setup>
import { ref } from 'vue'

const weatherList = ref([
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    forecast: [
      { time: '12:00', temp: 28, status: '맑음' },
      { time: '15:00', temp: 30, status: '구름' },
      { time: '18:00', temp: 26, status: '맑음' },
    ],
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    forecast: [
      { time: '12:00', temp: 24, status: '비' },
      { time: '15:00', temp: 23, status: '흐림' },
      { time: '18:00', temp: 21, status: '비' },
    ],
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    forecast: [
      { time: '12:00', temp: 26, status: '구름' },
      { time: '15:00', temp: 27, status: '맑음' },
      { time: '18:00', temp: 24, status: '구름' },
    ],
  },
  {
    id: 'city_04',
    name: '판교',
    temp: 27,
    status: '맑음',
    forecast: [
      { time: '12:00', temp: 27, status: '맑음' },
      { time: '15:00', temp: 29, status: '맑음' },
      { time: '18:00', temp: 25, status: '구름' },
    ],
  },
  {
    id: 'city_05',
    name: '용인',
    temp: 23,
    status: '비',
    forecast: [
      { time: '12:00', temp: 23, status: '비' },
      { time: '15:00', temp: 22, status: '흐림' },
      { time: '18:00', temp: 20, status: '비' },
    ],
  },
])

const searchCity = ref('')

const selectedMessage = ref('카드를 클릭하거나 검색해 보세요.')
const openForecastCityId = ref(null)

const updateSearchCity = (event) => {
  searchCity.value = event.target.value
}

const selectCity = (cityName) => {
  selectedMessage.value = `${cityName}이 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const toggleForecast = (cityId) => {
  openForecastCityId.value = openForecastCityId.value === cityId ? null : cityId
}
</script>

<template>
  <section class="weather-mockup" aria-labelledby="weather-mockup-title">
    <h2 id="weather-mockup-title">🌤️ 과제 1: 날씨 (Mockup)</h2>

    <section class="panel" aria-labelledby="search-title">
      <h3 id="search-title">🔍 도시 검색</h3>
      <input
        v-model.trim="searchCity"
        type="text"
        placeholder="검색할 도시 이름 입력"
        @input="updateSearchCity"
      />
      <p>검색 중인 도시: <strong>{{searchCity}}</strong></p>
    </section>

    <section class="panel" aria-labelledby="weather-list-title">
      <h3 id="weather-list-title">🏙️ 지역별 날씨 현황</h3>

      <article
        v-for="city in weatherList"
        :key="city.id"
        class="weather-card"
        role="button"
        tabindex="0"
        @click="selectCity(city.name)"
        @keydown.enter="selectCity(city.name)"
        @keydown.space.prevent="selectCity(city.name)"
      >
        <div class="weather-content">
          <h4>{{ city.name }} ({{ city.status }})</h4>
          <p>현재 기온: {{ city.temp }}°C</p>

          <span v-if="city.temp >= 25" class="temperature-label hot">
            🔥 더움 (25도 이상)
          </span>
          <span v-else class="temperature-label cool">
            ❄️ 선선함 (25도 미만)
          </span>
          <span v-if="city.status === '비'" class="weather-label rain">
            ☔ 비 오는 중
          </span>

        </div>

        <div class="card-actions">
          <button type="button" @click.stop="showDetail(city.name, city.status)">
            상세보기
          </button>
          <button
            type="button"
            class="forecast-toggle"
            @click.stop="toggleForecast(city.id)"
          >
            {{ openForecastCityId === city.id ? '시간대별 예보 닫기' : '시간대별 예보 보기' }}
          </button>
        </div>

        <div v-show="openForecastCityId === city.id" class="forecast-list">
          <p v-for="forecast in city.forecast" :key="forecast.time">
            <strong>{{ forecast.time }}</strong>
            <span>{{ forecast.temp }}°C</span>
            <span>{{ forecast.status }}</span>
          </p>
        </div>
      </article>
    </section>

    <p class="status-bar" aria-live="polite">{{ selectedMessage }}</p>
  </section>
</template>

<style scoped>
.weather-mockup {
  display: grid;
  gap: 1rem;
  color: #1e293b;
}

h2 {
  padding-bottom: 0.75rem;
  font-size: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
}

.panel {
  display: grid;
  gap: 0.625rem;
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

h3, h4 {
  font-weight: 700;
}

h3 {
  font-size: 1rem;
}

h4 {
  font-size: 0.9375rem;
}

input {
  width: 100%;
  padding: 0.5rem 0.625rem;
  color: #1e293b;
  font: inherit;
  background: #fff;
  border: 1px solid #94a3b8;
  border-radius: 0.25rem;
}

.panel > p,
.weather-card p {
  font-size: 0.875rem;
}

.weather-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dbe2ea;
  border-radius: 0.5rem;
}

.weather-card:hover,
.weather-card:focus-visible {
  border-color: #2563eb;
  outline: 2px solid #bfdbfe;
  outline-offset: 1px;
}

.weather-content {
  display: grid;
  gap: 0.375rem;
}


.temperature-label {
  justify-self: start;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 0.25rem;
}

.hot {
  color: #9a3412;
  background: #fed7aa;
}

.cool {
  color: #1e40af;
  background: #bfdbfe;
}

.weather-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.weather-label {
  justify-self: start;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 0.25rem;
}

.rain {
  color: #1e40af;
  background: #dbeafe;
}

.card-actions {
  display: grid;
  gap: 0.5rem;
}

.forecast-list {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  padding: 0.625rem;
  background: #f8fafc;
  border-left: 3px solid #93c5fd;
  border-radius: 0.25rem;
}

.forecast-list p {
  display: grid;
  gap: 0.125rem;
  min-width: 0;
  padding: 0.625rem;
  color: #475569;
  font-size: 0.8125rem;
  background: #fff;
  border: 1px solid #dbe2ea;
  border-radius: 0.25rem;
}

button {
  flex: 0 0 auto;
  padding: 0.5rem 0.75rem;
  color: #1e293b;
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  background: #fff;
  border: 1px solid #94a3b8;
  border-radius: 0.25rem;
}

button:hover {
  background: #f1f5f9;
}

.status-bar {
  padding: 0.75rem 1rem;
  color: #166534;
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  background: #dcfce7;
  border-radius: 0.375rem;
}

@media (max-width: 480px) {
  .weather-card {
    align-items: stretch;
    grid-template-columns: 1fr;
  }

  .card-actions {
    grid-template-columns: 1fr;
  }

  .forecast-list {
    grid-template-columns: 1fr;
  }

  button {
    width: 100%;
  }
}
</style>
