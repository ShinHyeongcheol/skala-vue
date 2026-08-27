<script setup>
import { computed } from 'vue'

const props = defineProps({
  weatherStatus: {
    type: String,
    default: 'Clear',
  },
})

const particleOptions = computed(() => {
  const status = props.weatherStatus.toLowerCase()
  const isRainy = ['rain', 'drizzle', 'thunderstorm', '비'].includes(status)
  const isCloudy = ['clouds', '구름', '흐림'].includes(status)

  if (isRainy) {
    return {
      fullScreen: { enable: false },
      particles: {
        color: { value: '#0284c7' },
        move: { enable: true, direction: 'bottom', speed: 7, straight: true },
        number: { value: 70 },
        opacity: { value: 0.72 },
        shape: { type: 'circle' },
        size: { value: { min: 2, max: 4 } },
      },
    }
  }

  if (isCloudy) {
    return {
      fullScreen: { enable: false },
      particles: {
        color: { value: '#475569' },
        move: { enable: true, direction: 'right', speed: 0.8 },
        number: { value: 32 },
        opacity: { value: 0.48 },
        shape: { type: 'circle' },
        size: { value: { min: 16, max: 34 } },
      },
    }
  }

  return {
    fullScreen: { enable: false },
    particles: {
      color: { value: '#f59e0b' },
      move: { enable: true, speed: 0.6 },
      number: { value: 30 },
      opacity: { value: 0.7 },
      shape: { type: 'circle' },
      size: { value: { min: 3, max: 7 } },
    },
  }
})
</script>

<template>
  <div class="weather-particles" aria-hidden="true">
    <vue-particles
      id="weather-particles-canvas"
      :key="weatherStatus"
      :options="particleOptions"
    />
  </div>
</template>

<style scoped>
.weather-particles {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.weather-particles :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  filter: drop-shadow(0 0 3px rgba(15, 23, 42, 0.4));
}
</style>
