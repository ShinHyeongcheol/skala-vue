<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()

const unitLabel = computed(() => {
  return weatherStore.temperatureUnit === 'celsius' ? '섭씨' : '화씨'
})
</script>

<template>
  <div class="unit-toggler">
    <span>날씨 단위: {{ unitLabel }} ({{ weatherStore.temperatureSymbol }})</span>
    <button type="button" @click="weatherStore.toggleTemperatureUnit">
      단위 변경
    </button>
  </div>
</template>

<style scoped>
.unit-toggler { display: flex; align-items: center; gap: 0.5rem; color: var(--color-text); font-size: 0.8125rem; font-weight: 700; white-space: nowrap; }
button { padding: 0.375rem 0.625rem; color: #fff; font: inherit; font-size: 0.75rem; font-weight: 700; cursor: pointer; background: #475569; border: 0; border-radius: 0.375rem; }
button:hover { background: #334155; }
</style>
