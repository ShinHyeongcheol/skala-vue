<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const getErrorMessage = (error) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    return 'API 키를 확인하세요. OpenWeatherMap에서 발급한 키가 필요합니다.'
  }

  return '날씨 정보를 가져오지 못했습니다. 네트워크 연결을 확인한 뒤 다시 시도하세요.'
}

const handleFetchWeather = async () => {
  if (!API_KEY) {
    errorMessage.value = '.env 파일에 VITE_OPENWEATHER_API_KEY를 설정하세요.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  weatherData.value = null

  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        lat: 37.5665,
        lon: 126.9780,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr'
      }
    })

    console.log('📦 Axios 통신 응답 전체 객체:', response)
    console.log('🌟 백엔드가 응답한 data (자동 JSON 변환):', response.data)

    weatherData.value = response.data
  } catch (error) {
    console.error('🚨 통신 중 에러 발생:', error)
    errorMessage.value = getErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="card">
    <h3 class="card-title">🌤️ Axios 실시간 날씨 통신</h3>

    <div class="btn-group">
      <button type="button" @click="handleFetchWeather" :disabled="isLoading" class="btn btn-primary">
        {{ isLoading ? '⏳ 데이터 로딩 중...' : '실시간 서울 날씨 가져오기 (GET)' }}
      </button>
    </div>

    <div v-if="weatherData" class="result-box">
      <p class="text">📍 위치: <strong class="text-bold">{{ weatherData.name }}</strong></p>
      <p class="text">🌡️ 현재 기온: <strong class="text-highlight">{{ weatherData.main.temp }}°C</strong></p>
      <p class="text">☁️ 날씨 상태: <strong class="text-bold">{{ weatherData.weather?.[0]?.description ?? '정보 없음' }}</strong></p>
      <p class="text">💧 습도: <strong class="text-bold">{{ weatherData.main.humidity }}%</strong></p>
      <p class="text">💨 풍속: <strong class="text-bold">{{ weatherData.wind.speed }} m/s</strong></p>
    </div>

    <div v-else-if="errorMessage" class="error-box">
      <p class="error-text">⚠️ {{ errorMessage }}</p>
    </div>

    <div v-else class="empty-box">
      <p class="desc-text">아직 가져온 데이터가 없습니다. 상단 버튼을 눌러 통신을 가동하세요.</p>
    </div>
  </div>
</template>

<style scoped>
.card { width: 100%; min-width: 0; max-width: 100%; padding: 20px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; color: #000000; }
.card-title { margin: 0 0 16px 0; font-size: 18px; color: #000000; font-weight: bold; }

.btn-group { display: flex; gap: 10px; margin-bottom: 16px; }
.btn { padding: 9px 18px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; font-size: 14px; }
.btn-primary { background-color: #2563eb; }
.btn:disabled { background-color: #94a3b8; cursor: not-allowed; }

.result-box { padding: 16px; background-color: #f1f5f9; border-radius: 8px; border: 1px solid #cbd5e1; }
.text { font-size: 14px; color: #000000; margin: 6px 0; }
.text-bold { font-weight: bold; color: #000000; }
.text-highlight { color: #2563eb; font-weight: 800; font-size: 16px; }

.error-box { padding: 14px; background-color: #fee2e2; border-radius: 8px; border: 1px solid #f87171; }
.error-text { color: #dc2626; font-weight: bold; margin: 0; font-size: 14px; }

.empty-box { padding: 24px; text-align: center; background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; }
.desc-text { font-size: 13px; color: #64748b; margin: 0; }
</style>
