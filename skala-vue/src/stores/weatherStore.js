import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', () => {
    const temperatureUnit = ref('celsius')

    const temperatureSymbol = computed(() => {
            return temperatureUnit.value === 'celsius' ? '°C' : '°F'
    })

    const toggleTemperatureUnit = () => {
        temperatureUnit.value = temperatureUnit.value === 'celsius' ? 'fahrenheit' : 'celsius'
        console.log(`[Pinia] 온도 단위 변경: ${temperatureUnit.value}`)
    }

    return { temperatureUnit, temperatureSymbol, toggleTemperatureUnit }
})