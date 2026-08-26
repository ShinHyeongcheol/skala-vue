<script setup>
defineProps({
  city: {
    type: Object,
    required: true,
  },
  selectedTime: {
    type: String,
    required: true,
  },
  isForecastOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-card', 'click-detail', 'toggle-forecast'])
</script>

<template>
  <article
    class="weather-card"
    role="button"
    tabindex="0"
    @click="emit('select-card', city)"
    @keydown.enter="emit('select-card', city)"
    @keydown.space.prevent="emit('select-card', city)"
  >
    <div class="weather-content">
      <h4>{{ city.name }}</h4>
      <p>현재 날씨: {{ city.displayStatus }}</p>
      <p>현재 기온: {{ city.displayTemp }}°C</p>

      <span v-if="city.displayTemp >= 25" class="temperature-label hot">
        🔥 더움 (25도 이상)
      </span>
      <span v-else class="temperature-label cool">
        ❄️ 선선함 (25도 미만)
      </span>
      <span v-if="city.displayStatus === '비'" class="weather-label rain">
        ☔ 비 오는 중
      </span>
    </div>

    <div class="card-actions">
      <button type="button" @click.stop="emit('click-detail', city.id)">
        상세보기
      </button>
      <button type="button" @click.stop="emit('toggle-forecast', city.id)">
        {{ isForecastOpen ? '시간대별 예보 닫기' : '시간대별 예보 보기' }}
      </button>
    </div>

    <div v-show="isForecastOpen" class="forecast-list">
      <p
        v-for="forecast in city.forecast"
        :key="forecast.time"
        :class="{ selected: forecast.time === selectedTime }"
      >
        <strong>{{ forecast.time }}</strong>
        <span>{{ forecast.temp }}°C</span>
        <span>{{ forecast.status }}</span>
      </p>
    </div>
  </article>
</template>

<style scoped>
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

h4 {
  font-size: 0.9375rem;
  font-weight: 700;
}

p {
  font-size: 0.875rem;
}

.temperature-label,
.weather-label {
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

.rain {
  color: #1e40af;
  background: #dbeafe;
}

.card-actions {
  display: grid;
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

.forecast-list {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(5, minmax(0, 1fr));
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

.forecast-list p.selected {
  color: #1e3a8a;
  background: #dbeafe;
  border-color: #60a5fa;
  box-shadow: inset 0 0 0 1px #60a5fa;
}

@media (max-width: 480px) {
  .weather-card {
    align-items: stretch;
    grid-template-columns: 1fr;
  }

  .card-actions {
    grid-template-columns: 1fr;
  }

  button {
    width: 100%;
  }
}
</style>
