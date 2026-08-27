<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import { useToast } from 'primevue/usetoast'
import { weatherList as weatherData } from '@/data/weather'
import { findLocation, getCurrentWeather, getForecast, toTimeForecasts } from '@/api/openWeather'
import { useWeatherStore } from '@/stores/weatherStore'
import BaseCard from '@/components/handsOn/weatherComponent/BaseCard.vue'
import SearchBar from '@/components/handsOn/weatherComponent/SearchBar.vue'
import WeatherCard from '@/components/handsOn/weatherComponent/WeatherCard.vue'
import WeatherParticles from '@/components/handsOn/weatherComponent/WeatherParticles.vue'

const router = useRouter()
const weatherStore = useWeatherStore()
const toast = useToast()
// 대시보드로 다시 돌아와도 Store에 추가한 도시를 목록에 함께 표시한다.
const weatherList = ref([...weatherData, ...weatherStore.additionalCities])
const searchQuery = ref('')
const selectedCityInfo = ref(null)
const openForecastCityId = ref(null)
const selectedWeatherStatus = ref('전체')
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
    const savedCurrentWeather = weatherStore.currentWeatherByCityId[city.id]
    const currentCity = { ...city, ...savedCurrentWeather }

    return {
      ...currentCity,
      // 현재 날씨는 시간 필터와 관계없이 Current Weather API 값을 유지한다.
      displayTemp: currentCity.temp,
      displayStatus: currentCity.status,
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

const particleWeatherStatus = computed(() => {
  if (selectedCityInfo.value) {
    return selectedCityInfo.value.displayStatus ?? selectedCityInfo.value.status
  }

  return weatherAtSelectedTime.value.find((city) => ['Rain', 'Drizzle', 'Thunderstorm', '비'].includes(city.displayStatus))?.displayStatus
    ?? weatherAtSelectedTime.value.find((city) => ['Clouds', '구름', '흐림'].includes(city.displayStatus))?.displayStatus
    ?? 'Clear'
})

watch(selectedCityInfo, (city) => {
  if (city) {
    console.log(`[watch] 선택 도시: ${city.name}`)
  }
})

watch(selectedWeatherStatus, (status) => {
  console.log(`[watch] 날씨 필터: ${status}`)
})

watch(() => weatherStore.lastUpdated, (updatedAt) => {
  if (updatedAt) {
    selectedWeatherStatus.value = '전체'
  }
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
    toast.add({ severity: 'warn', summary: '지역 이름 필요', detail: customCityErrorMessage.value, life: 3000 })
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
      toast.add({ severity: 'warn', summary: '이미 추가된 지역', detail: customCityErrorMessage.value, life: 3000 })
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
    weatherStore.setCurrentWeather(cityId, {
      temp: city.temp,
      status: city.status,
      isLiveWeather: true,
    })
    weatherStore.setForecast(cityId, forecasts)
    customCityQuery.value = ''
    selectedWeatherStatus.value = '전체'
    toast.add({ severity: 'success', summary: '지역 추가 완료', detail: `${city.name}의 날씨와 예보를 추가했습니다.`, life: 3000 })
    console.log(`[OpenWeatherMap] 추가한 ${city.name} 현재 날씨 원본:`, currentWeather)
    console.log(`[OpenWeatherMap] 추가한 ${city.name} 시간대별 예보 원본:`, forecastResponse.data)
  } catch (error) {
    console.error('[OpenWeatherMap] 지역 추가 중 오류:', error)
    customCityErrorMessage.value = error.message ?? '지역 정보를 가져오지 못했습니다.'
    toast.add({ severity: 'error', summary: '지역 추가 실패', detail: customCityErrorMessage.value, life: 4000 })
  } finally {
    isCustomCityLoading.value = false
  }
}

</script>

<template>
  <section class="weather" aria-labelledby="weather-title">
    <WeatherParticles :weather-status="particleWeatherStatus" />
    <h2 id="weather-title">🌤️ 날씨 대시보드</h2>

    <BaseCard title="🔍 도시 검색">
      <SearchBar
        :search-query="searchQuery"
        @update-query="searchQuery = $event"
      />

      <hr class="filter-divider" />

      <label for="custom-city-query">📍 원하는 지역 추가</label>
      <div class="custom-city-row">
        <InputText
          id="custom-city-query"
          v-model="customCityQuery"
          placeholder="예: 제주, Tokyo, London"
          :disabled="isCustomCityLoading"
          @keyup.enter="addCustomCity"
        />
        <Button
          :label="isCustomCityLoading ? '지역을 추가하는 중...' : '지역 추가'"
          severity="success"
          :loading="isCustomCityLoading"
          :disabled="isCustomCityLoading"
          @click="addCustomCity"
        />
      </div>
      <p class="api-status">입력한 지역의 현재 날씨와 시간대별 예보를 목록에 추가합니다.</p>
      <Message v-if="customCityErrorMessage" severity="error" :closable="false" class="api-error" aria-live="polite">
        {{ customCityErrorMessage }}
      </Message>

      <hr class="filter-divider" />

      <label for="weather-status-filter">🌦️ 날씨 상태 필터</label>
      <Select id="weather-status-filter" v-model="selectedWeatherStatus" :options="weatherStatusOptions" />

      <hr class="filter-divider" />

      <span class="filter-label">🕘 시간 필터</span>
      <div class="time-filter">
        <SelectButton
          :model-value="weatherStore.selectedTime"
          :options="timeOptions"
          option-label="label"
          option-value="value"
          :allow-empty="false"
          aria-label="시간대 선택"
          @update:model-value="weatherStore.setSelectedTime"
        />
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
  position: relative;
  isolation: isolate;
  display: grid;
  gap: 1rem;
  color: #1e293b;
}

.weather > :not(.weather-particles) {
  position: relative;
  z-index: 1;
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

.custom-city-row {
  display: flex;
  gap: 0.5rem;
}

.custom-city-row :deep(.p-inputtext) {
  flex: 1;
  min-width: 0;
}

.custom-city-row :deep(.p-button) {
  flex-shrink: 0;
}

.time-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.time-filter :deep(.p-selectbutton) {
  display: flex;
  flex-wrap: wrap;
}

.time-filter :deep(.p-togglebutton) {
  min-width: 5.5rem;
}

.time-filter + p {
  font-size: 0.875rem;
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
  .custom-city-row {
    flex-direction: column;
  }

  .custom-city-row :deep(.p-button),
  .time-filter :deep(.p-selectbutton) {
    width: 100%;
  }

  .time-filter :deep(.p-togglebutton) {
    flex: 1;
    min-width: 0;
  }
}
</style>
