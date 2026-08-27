<script setup>
import { useCounterStore } from '@/stores/counter.js'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()

const { count, doubleCount } = storeToRefs(counterStore)

const { increment, decrement, reset } = counterStore
</script>

<template>
  <div class="store-card">
    <h3 class="card-title">🍍 Counter Store 활용 실습 </h3>

    <div class="display-panel">
      <p class="data-row">
        🔢 원본 카운트 데이터(State): <strong class="text-bold">{{ count }}</strong>
      </p>
      <p class="data-row">
        ⚡ 2배 연산 데이터(Getters): <strong class="text-highlight">{{ doubleCount }}</strong>
      </p>
    </div>

    <div class="btn-group">
      <button @click="increment" class="btn btn-primary">숫자 1 증가 (+1)</button>
      <button @click="decrement" class="btn btn-secondary">숫자 1 감소 (-1)</button>
      <button @click="reset" class="btn btn-danger">0으로 리셋</button>
    </div>

    <p class="tip-text">
      💡 F12를 누르고 <strong>Vue Devtools ➔ 🍍 Pinia 탭</strong>을 열면 전역 State(count)가 실시간으로 변하는 모습을 관찰할 수 있습니다.
    </p>
  </div>
</template>

<style scoped>
.store-card {
  max-width: 560px;
  margin: 30px auto;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #000000;
}
.card-title { margin: 0 0 16px 0; font-size: 18px; color: #000000; font-weight: bold; }

.display-panel {
  padding: 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 18px;
}
.data-row { font-size: 15px; color: #000000; margin: 8px 0; }
.text-bold { font-weight: 800; color: #000000; font-size: 17px; }
.text-highlight { font-weight: 800; color: #2563eb; font-size: 17px; }

.btn-group { display: flex; gap: 10px; margin-bottom: 14px; }
.btn { padding: 9px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; font-size: 13px; transition: opacity 0.2s; }
.btn:hover { opacity: 0.9; }
.btn-primary { background-color: #2563eb; }
.btn-secondary { background-color: #475569; }
.btn-danger { background-color: #dc2626; }

.tip-text { font-size: 12px; color: #000000; font-weight: 500; margin: 0; line-height: 1.4; }
</style>