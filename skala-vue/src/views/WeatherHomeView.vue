<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { weatherList as weatherData } from '@/data/weather'
import { findLocation, getCurrentWeather, getForecast, toTimeForecasts } from '@/api/openWeather'
import { useWeatherStore } from '@/stores/weatherStore'
import BaseCard from '@/components/handsOn/weatherComponent/BaseCard.vue'
import SearchBar from '@/components/handsOn/weatherComponent/SearchBar.vue'
import WeatherCard from '@/components/handsOn/weatherComponent/WeatherCard.vue'

const router = useRouter()
const weatherStore = useWeatherStore()
// 대시보드로 다시 돌아와도 Store에 추가한 도시를 목록에 함께 표시한다.
const weatherList = ref([...weatherData, ...weatherStore.additionalCities])
const searchQuery = ref('')
const selectedCityInfo = ref(null)
const openForecastCityId = ref(null)
const selectedWeatherStatus = ref('전체')
const isWeatherLoading = ref(false)
const weatherErrorMessage = ref('')
const lastUpdated = ref('')
const customCityQuery = ref('')
const isCustomCityLoading = ref(false)
const customCityErrorMessage = ref('')

const timeOptions = [
  { value: '09:00', label: '오전 9시' },
  { value: '12:00', label: '오후 12시' },
  { value: '15:00', label: '오후 3시' },
  { value: '18:00', label: '오후 6시' },
  { value: '21:00', label: '오후 9시' },
]

const weatherAtSelectedTime = computed(() => {
  return weatherList.value.map((city) => {
    return {
      ...city,
      // 현재 날씨는 시간 필터와 관계없이 Current Weather API 값을 유지한다.
      displayTemp: city.temp,
      displayStatus: city.status,
      // 시간 필터는 시간대별 예보 목록과 시간대별 날씨 화면에서만 사용한다.
      forecast: weatherStore.forecastByCityId[city.id] ?? city.forecast,
    }
  })
})

const weatherStatusOptions = computed(() => {
  return ['전체', ...new Set(weatherAtSelectedTime.value.map((city) => city.displayStatus))]
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

watch(() => weatherStore.selectedTime, (time) => {
  console.log(`[watch] 선택 시간: ${time}`)
})

watchEffect(() => {
  console.log(`[watchEffect] 검색어: ${searchQuery.value}`)
})

const selectCity = (city) => {
  selectedCityInfo.value = city
}

const showDetail = (cityId) => {
  router.push(`/weather/${cityId}`)
}

const toggleForecast = (cityId) => {
  openForecastCityId.value = openForecastCityId.value === cityId ? null : cityId
}

const addCustomCity = async () => {
  const query = customCityQuery.value.trim()

  if (!query) {
    customCityErrorMessage.value = '추가할 지역 이름을 입력하세요.'
    return
  }

  isCustomCityLoading.value = true
  customCityErrorMessage.value = ''

  try {
    const location = await findLocation(query)
    const [currentResponse, forecastResponse] = await Promise.all([
      getCurrentWeather(location),
      getForecast(location),
    ])
    const currentWeather = currentResponse.data

    if (weatherList.value.some((city) => city.apiCityId === currentWeather.id)) {
      customCityErrorMessage.value = '이미 지역별 날씨 목록에 추가된 도시입니다.'
      return
    }

    const cityId = `api_${currentWeather.id}`
    const forecasts = toTimeForecasts(forecastResponse.data)
    const city = {
      id: cityId,
      apiCityId: currentWeather.id,
      name: location.local_names?.ko ?? currentWeather.name,
      apiName: `${currentWeather.name},${currentWeather.sys.country}`,
      coordinates: { lat: location.lat, lon: location.lon },
      temp: Math.round(currentWeather.main.temp),
      status: currentWeather.weather?.[0]?.main ?? 'Unknown',
      isLiveWeather: true,
      forecast: forecasts,
    }

    weatherList.value = [...weatherList.value, city]
    weatherStore.addCustomCity(city)
    weatherStore.setForecast(cityId, forecasts)
    customCityQuery.value = ''
    selectedWeatherStatus.value = '전체'
    console.log(`[OpenWeatherMap] 추가한 ${city.name} 현재 날씨 원본:`, currentWeather)
    console.log(`[OpenWeatherMap] 추가한 ${city.name} 시간대별 예보 원본:`, forecastResponse.data)
  } catch (error) {
    console.error('[OpenWeatherMap] 지역 추가 중 오류:', error)
    customCityErrorMessage.value = error.message ?? '지역 정보를 가져오지 못했습니다.'
  } finally {
    isCustomCityLoading.value = false
  }
}

const loadCurrentWeather = async () => {
  isWeatherLoading.value = true
  weatherErrorMessage.value = ''

  try {
    const results = await Promise.allSettled(
      weatherList.value.map(async (city) => getCurrentWeather(city.apiName)),
    )

    let successCount = 0

    weatherList.value = weatherList.value.map((city, index) => {
      const result = results[index]

      if (result.status !== 'fulfilled') {
        console.error(`[OpenWeatherMap] ${city.name} 현재 날씨 요청 실패:`, result.reason)
        return city
      }

      const data = result.value.data
      successCount += 1
      console.log(`[OpenWeatherMap] ${city.name} 현재 날씨 원본:`, data)

      return {
        ...city,
        temp: Math.round(data.main.temp),
        // 매핑 전 단계: API가 전달한 영어 상태값을 그대로 사용한다.
        status: data.weather?.[0]?.main ?? city.status,
        rawWeatherDescription: data.weather?.[0]?.description ?? '',
        isLiveWeather: true,
      }
    })

    if (successCount === 0) {
      weatherErrorMessage.value = '실시간 날씨를 가져오지 못했습니다. 기존 Mock 데이터를 표시합니다.'
    } else if (successCount < weatherList.value.length) {
      weatherErrorMessage.value = `${successCount}개 도시의 실시간 날씨만 갱신했습니다.`
    }

    if (successCount > 0) {
      selectedWeatherStatus.value = '전체'
      lastUpdated.value = new Intl.DateTimeFormat('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())

      await weatherStore.fetchForecasts(weatherList.value)
    }
  } catch (error) {
    console.error('[OpenWeatherMap] 현재 날씨 갱신 중 오류:', error)
    weatherErrorMessage.value = '실시간 날씨를 가져오지 못했습니다. 기존 Mock 데이터를 표시합니다.'
  } finally {
    isWeatherLoading.value = false
  }
}
</script>

<template>
  <section class="weather" aria-labelledby="weather-title">
    <h2 id="weather-title">🌤️ 날씨 대시보드</h2>

    <BaseCard title="🔍 도시 검색">
      <SearchBar
        :search-query="searchQuery"
        @update-query="searchQuery = $event"
      />

      <button
        type="button"
        class="weather-refresh-button"
        :disabled="isWeatherLoading || weatherStore.isForecastLoading"
        @click="loadCurrentWeather"
      >
        {{ isWeatherLoading || weatherStore.isForecastLoading ? '실시간 날씨와 예보를 불러오는 중...' : '실시간 날씨·예보 갱신' }}
      </button>
      <p v-if="lastUpdated" class="api-status">마지막 갱신: {{ lastUpdated }}</p>
      <p v-if="weatherErrorMessage" class="api-status api-error" aria-live="polite">
        {{ weatherErrorMessage }}
      </p>
      <p v-if="weatherStore.forecastErrorMessage" class="api-status api-error" aria-live="polite">
        {{ weatherStore.forecastErrorMessage }}
      </p>

      <hr class="filter-divider" />

      <label for="custom-city-query">📍 원하는 지역 추가</label>
      <div class="custom-city-row">
        <input
          id="custom-city-query"
          v-model="customCityQuery"
          type="text"
          placeholder="예: 제주, Tokyo, London"
          :disabled="isCustomCityLoading"
          @keyup.enter="addCustomCity"
        />
        <button
          type="button"
          class="custom-city-button"
          :disabled="isCustomCityLoading"
          @click="addCustomCity"
        >
          {{ isCustomCityLoading ? '지역을 추가하는 중...' : '지역 추가' }}
        </button>
      </div>
      <p class="api-status">입력한 지역의 현재 날씨와 시간대별 예보를 목록에 추가합니다.</p>
      <p v-if="customCityErrorMessage" class="api-status api-error" aria-live="polite">
        {{ customCityErrorMessage }}
      </p>

      <hr class="filter-divider" />

      <label for="weather-status-filter">🌦️ 날씨 상태 필터</label>
      <select id="weather-status-filter" v-model="selectedWeatherStatus">
        <option v-for="status in weatherStatusOptions" :key="status" :value="status">
          {{ status }}
        </option>
      </select>

      <hr class="filter-divider" />

      <span class="filter-label">🕘 시간 필터</span>
      <div class="time-filter" role="group" aria-label="시간대 선택">
        <button
          v-for="time in timeOptions"
          :key="time.value"
          type="button"
          class="time-button"
          :class="{ active: weatherStore.selectedTime === time.value }"
          :aria-pressed="weatherStore.selectedTime === time.value"
          @click="weatherStore.setSelectedTime(time.value)"
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
        :selected-time="weatherStore.selectedTime"
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
  color: var(--color-heading);
  font-weight: 700;
}

h2 {
  padding-bottom: 0.75rem;
  font-size: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

label,
.filter-label {
  font-weight: 700;
}

.filter-divider {
  width: 100%;
  margin: 0.25rem 0;
  border: 0;
  border-top: 1px solid #dbe2ea;
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

.custom-city-row {
  display: flex;
  gap: 0.5rem;
}

.custom-city-row input {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0.625rem;
  color: #1e293b;
  font: inherit;
  background: #fff;
  border: 1px solid #94a3b8;
  border-radius: 0.25rem;
}

.custom-city-button {
  flex-shrink: 0;
  color: #fff;
  font-weight: 700;
  background: #16a34a;
  border-color: #16a34a;
}

.custom-city-button:hover {
  background: #15803d;
}

.custom-city-button:disabled {
  cursor: not-allowed;
  background: #94a3b8;
  border-color: #94a3b8;
}

.time-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
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

.time-button {
  min-width: 5.5rem;
}

.time-button.active {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}

.time-filter + p {
  font-size: 0.875rem;
}

.weather-refresh-button {
  justify-self: start;
  color: #fff;
  font-weight: 700;
  background: #2563eb;
  border-color: #2563eb;
}

.weather-refresh-button:hover {
  background: #1d4ed8;
}

.weather-refresh-button:disabled {
  cursor: not-allowed;
  background: #94a3b8;
  border-color: #94a3b8;
}

.api-status {
  color: #475569;
  font-size: 0.8125rem;
}

.api-error {
  color: #b91c1c;
  font-weight: 700;
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

  .custom-city-row {
    flex-direction: column;
  }
}
</style>
