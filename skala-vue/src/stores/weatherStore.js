import { computed, ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { getCurrentWeather, getForecast, toTimeForecasts } from '@/api/openWeather'

export const useWeatherStore = defineStore('weather', () => {
    const temperatureUnit = ref('celsius')
    const selectedTime = ref('12:00')
    const additionalCities = ref([])
    const currentWeatherByCityId = ref({})
    const isCurrentWeatherLoading = ref(false)
    const currentWeatherErrorMessage = ref('')
    const lastUpdated = ref('')
    const forecastByCityId = ref({})
    const isForecastLoading = ref(false)
    const forecastErrorMessage = ref('')

    const temperatureSymbol = computed(() => {
            return temperatureUnit.value === 'celsius' ? '°C' : '°F'
    })

    const toggleTemperatureUnit = () => {
        temperatureUnit.value = temperatureUnit.value === 'celsius' ? 'fahrenheit' : 'celsius'
        console.log(`[Pinia] 온도 단위 변경: ${temperatureUnit.value}`)
    }

    const setSelectedTime = (time) => {
        selectedTime.value = time
    }

    const addCustomCity = (city) => {
        additionalCities.value = [...additionalCities.value, city]
    }

    const setCurrentWeather = (cityId, currentWeather) => {
        currentWeatherByCityId.value = {
            ...currentWeatherByCityId.value,
            [cityId]: currentWeather,
        }
    }

    const refreshWeather = async (cities) => {
        isCurrentWeatherLoading.value = true
        currentWeatherErrorMessage.value = ''

        try {
            const results = await Promise.allSettled(
                cities.map(async (city) => getCurrentWeather(city.coordinates ?? city.apiName)),
            )
            let successCount = 0

            results.forEach((result, index) => {
                const city = cities[index]

                if (result.status !== 'fulfilled') {
                    console.error(`[OpenWeatherMap] ${city.name} 현재 날씨 요청 실패:`, result.reason)
                    return
                }

                const data = result.value.data
                successCount += 1
                console.log(`[OpenWeatherMap] ${city.name} 현재 날씨 원본:`, data)
                setCurrentWeather(city.id, {
                    temp: Math.round(data.main.temp),
                    status: data.weather?.[0]?.main ?? city.status,
                    rawWeatherDescription: data.weather?.[0]?.description ?? '',
                    isLiveWeather: true,
                })
            })

            if (successCount === 0) {
                currentWeatherErrorMessage.value = '실시간 날씨를 가져오지 못했습니다. 기존 Mock 데이터를 표시합니다.'
            } else {
                lastUpdated.value = new Intl.DateTimeFormat('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(new Date())

                if (successCount < cities.length) {
                    currentWeatherErrorMessage.value = `${successCount}개 도시의 실시간 날씨만 갱신했습니다.`
                }

                await fetchForecasts(cities)
            }
        } catch (error) {
            console.error('[OpenWeatherMap] 현재 날씨 갱신 중 오류:', error)
            currentWeatherErrorMessage.value = '실시간 날씨를 가져오지 못했습니다. 기존 Mock 데이터를 표시합니다.'
        } finally {
            isCurrentWeatherLoading.value = false
        }
    }

    const fetchForecasts = async (cities) => {
        isForecastLoading.value = true
        forecastErrorMessage.value = ''

        try {
            const results = await Promise.allSettled(
                cities.map(async (city) => getForecast(city.coordinates ?? city.apiName)),
            )
            const nextForecasts = { ...forecastByCityId.value }
            let successCount = 0

            results.forEach((result, index) => {
                const city = cities[index]

                if (result.status !== 'fulfilled') {
                    console.error(`[OpenWeatherMap] ${city.name} 시간대별 예보 요청 실패:`, result.reason)
                    return
                }

                const forecasts = toTimeForecasts(result.value.data)
                nextForecasts[city.id] = forecasts
                successCount += 1
                console.log(`[OpenWeatherMap] ${city.name} 시간대별 예보 원본:`, result.value.data)
            })

            forecastByCityId.value = nextForecasts

            if (successCount === 0) {
                forecastErrorMessage.value = '시간대별 예보를 가져오지 못했습니다. 기존 Mock 예보를 표시합니다.'
            } else if (successCount < cities.length) {
                forecastErrorMessage.value = `${successCount}개 도시의 시간대별 예보만 갱신했습니다.`
            }
        } catch (error) {
            console.error('[OpenWeatherMap] 시간대별 예보 갱신 중 오류:', error)
            forecastErrorMessage.value = '시간대별 예보를 가져오지 못했습니다. 기존 Mock 예보를 표시합니다.'
        } finally {
            isForecastLoading.value = false
        }
    }

    const setForecast = (cityId, forecasts) => {
        forecastByCityId.value = {
            ...forecastByCityId.value,
            [cityId]: forecasts,
        }
    }

    return {
        temperatureUnit,
        temperatureSymbol,
        selectedTime,
        additionalCities,
        currentWeatherByCityId,
        isCurrentWeatherLoading,
        currentWeatherErrorMessage,
        lastUpdated,
        forecastByCityId,
        isForecastLoading,
        forecastErrorMessage,
        toggleTemperatureUnit,
        setSelectedTime,
        addCustomCity,
        setCurrentWeather,
        refreshWeather,
        setForecast,
        fetchForecasts,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useWeatherStore, import.meta.hot))
}
