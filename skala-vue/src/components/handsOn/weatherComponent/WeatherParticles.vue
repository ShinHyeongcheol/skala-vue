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
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
        },
        modes: {
          repulse: { distance: 90, duration: 0.35 },
        },
      },
      particles: {
        color: { value: ['#0284c7', '#38bdf8', '#7dd3fc'] },
        move: { enable: true, direction: 'bottom', speed: { min: 8, max: 13 }, straight: true },
        number: { value: 108, density: { enable: true } },
        opacity: { value: { min: 0.35, max: 0.8 } },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
    }
  }

  if (isCloudy) {
    return {
      fullScreen: { enable: false },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
        },
        modes: {
          repulse: { distance: 120, duration: 0.7 },
        },
      },
      particles: {
        color: { value: ['#64748b', '#94a3b8', '#cbd5e1'] },
        move: { enable: true, direction: 'right', speed: { min: 0.25, max: 0.8 } },
        number: { value: 52, density: { enable: true } },
        opacity: { value: { min: 0.14, max: 0.38 } },
        shape: { type: 'circle' },
        size: { value: { min: 20, max: 46 } },
      },
    }
  }

  return {
    fullScreen: { enable: false },
    interactivity: {
      events: {
        // 햇살 입자는 커서 주변에서 커지고 밝아진다.
        onHover: { enable: true, mode: 'bubble' },
      },
      modes: {
        bubble: { distance: 145, duration: 0.8, opacity: 0.95, size: 11 },
      },
    },
    particles: {
      color: { value: ['#f59e0b', '#fbbf24', '#fde68a'] },
      move: { enable: true, speed: { min: 0.35, max: 1.1 } },
      number: { value: 50, density: { enable: true } },
      opacity: { value: { min: 0.35, max: 0.72 } },
      shape: { type: 'circle' },
      size: { value: { min: 2, max: 6 } },
    },
  }
})
</script>

<template>
  <div class="weather-particles" aria-hidden="true">
    <div v-if="weatherStatus.toLowerCase() === 'thunderstorm'" class="lightning-flash" />
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

.lightning-flash {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: rgba(219, 234, 254, 0.38);
  animation: lightning-flash 8s ease-in-out infinite;
}

@keyframes lightning-flash {
  0%, 91%, 93%, 100% { opacity: 0; }
  92% { opacity: 0.8; }
}

@media (prefers-reduced-motion: reduce) {
  .lightning-flash { animation: none; }
}
</style>
