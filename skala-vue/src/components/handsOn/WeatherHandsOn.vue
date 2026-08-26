<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseCard from './weatherComponent/BaseCard.vue'
import SearchBar from './weatherComponent/SearchBar.vue'
import WeatherCard from './weatherComponent/WeatherCard.vue'

const weatherList = ref([
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    forecast: [
      { time: '09:00', temp: 23, status: '맑음' },
      { time: '12:00', temp: 28, status: '맑음' },
      { time: '15:00', temp: 30, status: '구름' },
      { time: '18:00', temp: 26, status: '맑음' },
      { time: '21:00', temp: 21, status: '맑음' },
    ],
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    forecast: [
      { time: '09:00', temp: 22, status: '흐림' },
      { time: '12:00', temp: 24, status: '비' },
      { time: '15:00', temp: 23, status: '흐림' },
      { time: '18:00', temp: 21, status: '비' },
      { time: '21:00', temp: 19, status: '비' },
    ],
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    forecast: [
      { time: '09:00', temp: 22, status: '구름' },
      { time: '12:00', temp: 26, status: '구름' },
      { time: '15:00', temp: 27, status: '맑음' },
      { time: '18:00', temp: 24, status: '구름' },
      { time: '21:00', temp: 20, status: '맑음' },
    ],
  },
  {
    id: 'city_04',
    name: '판교',
    temp: 27,
    status: '맑음',
    forecast: [
      { time: '09:00', temp: 22, status: '맑음' },
      { time: '12:00', temp: 27, status: '맑음' },
      { time: '15:00', temp: 29, status: '맑음' },
      { time: '18:00', temp: 25, status: '구름' },
      { time: '21:00', temp: 20, status: '구름' },
    ],
  },
  {
    id: 'city_05',
    name: '용인',
    temp: 23,
    status: '비',
    forecast: [
      { time: '09:00', temp: 21, status: '비' },
      { time: '12:00', temp: 23, status: '비' },
      { time: '15:00', temp: 22, status: '흐림' },
      { time: '18:00', temp: 20, status: '비' },
      { time: '21:00', temp: 18, status: '흐림' },
    ],
  },
])

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const openForecastCityId = ref(null)
const selectedWeatherStatus = ref('전체')
const selectedTime = ref('12:00')

const timeOptions = [
  { value: '09:00', label: '오전 9시' },
  { value: '12:00', label: '오후 12시' },
  { value: '15:00', label: '오후 3시' },
  { value: '18:00', label: '오후 6시' },
  { value: '21:00', label: '오후 9시' },
]

const weatherAtSelectedTime = computed(() => {
  return weatherList.value.map((city) => {
    const forecast = city.forecast.find((item) => item.time === selectedTime.value)

    return {
      ...city,
      displayTemp: forecast?.temp ?? city.temp,
      displayStatus: forecast?.status ?? city.status,
    }
  })
})

const filteredWeatherList = computed(() => {
  return weatherAtSelectedTime.value.filter((city) => {
    const matchesSearch = !searchQuery.value || city.name.includes(searchQuery.value)
    const matchesStatus = selectedWeatherStatus.value === '전체'
      || city.displayStatus === selectedWeatherStatus.value

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

watch(selectedTime, (time) => {
  console.log(`[watch] 선택 시간: ${time}`)
})

watchEffect(() => {
  console.log(`[watchEffect] 검색어: ${searchQuery.value}`)
})

const selectCity = (city) => {
  selectedCityInfo.value = city
}

const showDetail = (cityName, status) => {
  const selectedHour = Number(selectedTime.value.split(':')[0])
  window.alert(`${cityName}의 ${selectedHour}시 날씨는 [${status}] 상태입니다.`)
}

const toggleForecast = (cityId) => {
  openForecastCityId.value = openForecastCityId.value === cityId ? null : cityId
}
</script>

<template>
  <section class="weather" aria-labelledby="weather-title">
    <h2 id="weather-title">🌤️ 과제 2: 날씨 (컴포지션)</h2>

    <BaseCard title="🔍 도시 검색">
      <SearchBar
        :search-query="searchQuery"
        @update-query="searchQuery = $event"
      />

      <hr class="filter-divider" />

      <label for="weather-status-filter">🌦️ 날씨 상태 필터</label>
      <select id="weather-status-filter" v-model="selectedWeatherStatus">
        <option>전체</option>
        <option>맑음</option>
        <option>비</option>
        <option>구름</option>
      </select>

      <hr class="filter-divider" />

      <span class="filter-label">🕘 시간 필터</span>
      <div class="time-filter" role="group" aria-label="시간대 선택">
        <button
          v-for="time in timeOptions"
          :key="time.value"
          type="button"
          class="time-button"
          :class="{ active: selectedTime === time.value }"
          :aria-pressed="selectedTime === time.value"
          @click="selectedTime = time.value"
        >
          {{ time.label }}
        </button>
      </div>
      <p>현재 <strong>{{ visibleCityCount }}</strong>개 도시를 표시 중입니다.</p>
    </BaseCard>

    <BaseCard title="🏙️ 지역별 날씨 현황">

      <template v-if="filteredWeatherList.length > 0">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          :selected-time="selectedTime"
          :is-forecast-open="openForecastCityId === city.id"
          @select-card="selectCity"
          @click-detail="showDetail"
          @toggle-forecast="toggleForecast"
        />
      </template>

      <p v-else class="empty-result">
        "{{ searchQuery }}"와 일치하는 도시가 없습니다.
      </p>
    </BaseCard>

    <p class="status-bar" aria-live="polite">
      {{ selectedCityInfo ? `${selectedCityInfo.name}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.' }}
    </p>
  </section>
</template>

<style scoped>
.weather {
  display: grid;
  gap: 1rem;
  color: #1e293b;
}

h2 {
  padding-bottom: 0.75rem;
  font-size: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
}

label {
  font-weight: 700;
}

.filter-label {
  font-weight: 700;
}

.filter-divider {
  width: 100%;
  margin: 0.25rem 0;
  border: 0;
  border-top: 1px solid #dbe2ea;
}

.time-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.time-button {
  min-width: 5.5rem;
}

.time-button.active {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}

select {
  width: 100%;
  padding: 0.5rem 0.625rem;
  color: #1e293b;
  font: inherit;
  background: #fff;
  border: 1px solid #94a3b8;
  border-radius: 0.25rem;
}

.weather > p,
.time-filter + p {
  font-size: 0.875rem;
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
  button {
    width: 100%;
  }
}
</style>
