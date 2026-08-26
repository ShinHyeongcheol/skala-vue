<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

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

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const openForecastCityId = ref(null)
const selectedWeatherStatus = ref('전체')

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((city) => {
    const matchesSearch = !searchQuery.value || city.name.includes(searchQuery.value)
    const matchesStatus = selectedWeatherStatus.value === '전체'
      || city.status === selectedWeatherStatus.value

    return matchesSearch && matchesStatus
  })
})

const visibleCityCount = computed(() => filteredWeatherList.value.length)

watch(selectedCityInfo, (city) => {
  if (city) {
    console.log(`[watch] 선택 도시: ${city.name}`)
  }
})

watch(selectedWeatherStatus, (status) => {
  console.log(`[watch] 날씨 필터: ${status}`)
})

watchEffect(() => {
  console.log(`[watchEffect] 검색어: ${searchQuery.value}`)
})

const selectCity = (city) => {
  selectedCityInfo.value = city
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
    <h2 id="weather-mockup-title">🌤️ 과제 2: 날씨 (컴포지션)</h2>

    <section class="panel" aria-labelledby="search-title">
      <h3 id="search-title">🔍 도시 검색</h3>
      <input
        v-model.trim="searchQuery"
        type="text"
        placeholder="검색할 도시 이름 입력"
      />
      <p>검색 중인 도시: <strong>{{ searchQuery  }}</strong></p>

      <hr class="filter-divider" />

      <label for="weather-status-filter">🌦️ 날씨 상태 필터</label>
      <select id="weather-status-filter" v-model="selectedWeatherStatus">
        <option>전체</option>
        <option>맑음</option>
        <option>비</option>
        <option>구름</option>
      </select>
      <p>현재 <strong>{{ visibleCityCount }}</strong>개 도시를 표시 중입니다.</p>
    </section>

    <section class="panel" aria-labelledby="weather-list-title">
      <h3 id="weather-list-title">🏙️ 지역별 날씨 현황</h3>

      <template v-if="filteredWeatherList.length > 0">
        <article
          v-for="city in filteredWeatherList"
          :key="city.id"
          class="weather-card"
          role="button"
          tabindex="0"
          @click="selectCity(city)"
          @keydown.enter="selectCity(city)"
          @keydown.space.prevent="selectCity(city)"
        >
          <div class="weather-content">
            <h4>{{ city.name }}</h4>
            <p>현재 날씨: {{ city.status }}</p>
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
      </template>

      <p v-else class="empty-result">
        "{{ searchQuery }}"와 일치하는 도시가 없습니다.
      </p>
    </section>

    <p class="status-bar" aria-live="polite">
      {{ selectedCityInfo ? `${selectedCityInfo.name}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.' }}
    </p>
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

label {
  font-weight: 700;
}

.filter-divider {
  width: 100%;
  margin: 0.25rem 0;
  border: 0;
  border-top: 1px solid #dbe2ea;
}

h3 {
  font-size: 1rem;
}

h4 {
  font-size: 0.9375rem;
}

input,
select {
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

.empty-result {
  padding: 1rem;
  color: #64748b;
  text-align: center;
  background: #fff;
  border: 1px dashed #94a3b8;
  border-radius: 0.5rem;
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
