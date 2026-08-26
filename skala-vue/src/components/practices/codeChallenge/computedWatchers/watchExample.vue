<!-- src/components/practices/composition/2_WatchExample.vue -->
<script setup>
import { ref, reactive, watch } from 'vue'

const count = ref(0)
const logSingle = ref('대기 중...')

// 단일 변수 감시 (p.133)
watch(count, (newVal, oldVal) => {
  logSingle.value = `[단일 감시] 이전 카운트: ${oldVal} ➔ 현재 카운트: ${newVal}`
})

const state = reactive({
  productName: '노트북',
  price: 1000
})

const logAutoDeep = ref('대기 중...')
const logTarget = ref('대기 중...')

watch(state, (newVal, oldVal) => {
  logAutoDeep.value = `[자동 deep] 가격 변동! 이전값인척:${oldVal.price}원 ➔ 현재값:${newVal.price}원`
})

watch(
  () => state.price,
  (newPrice, oldPrice) => {
    logTarget.value = `[타겟 조준] 진짜 가격 상승! 옛날값:${oldPrice}원 ➔ 바뀐값:${newPrice}원`
  }
)
</script>

<template>
  <div class="card">
    <h3 class="card-title">2. watch() 단일 및 reactive 감시 규칙</h3>


    <div class="box">
      <h4 class="box-title">1) 단일 ref 변수 감시</h4>
      <p class="text">현재 카운트: <strong class="text-bold">{{ count }}</strong></p>
      <div class="btn-group">
        <button @click="count++" class="btn btn-primary">1 증가 (+1)</button>
        <button @click="count--" class="btn btn-secondary">1 감소 (-1)</button>
      </div>
      <p class="text">로그: <strong class="text-highlight">{{ logSingle }}</strong></p>
    </div>

    <div class="box">
      <h4 class="box-title">2)  reactive 속성 감시 (과거값 추적 비교)</h4>
      <p class="text">상품명: {{ state.productName }} / 가격: <strong class="text-bold">{{ state.price }}원</strong></p>
      
      <div class="btn-group">
        <button @click="state.price += 500" class="btn btn-success">가격 500원 인상</button>
      </div>

      <div class="monitor-area">
        <p class="text">👁️‍🗨️ <strong>1. state 통째로 감시:</strong> {{ logAutoDeep }}</p>
        <small class="desc">※ 주의: 참조 객체이므로 이전값과 현재값이 똑같이 찍힙니다.</small>

        <p class="text" style="margin-top: 8px;">🎯 <strong>2. () => state.price 타겟 감시:</strong> <span class="text-highlight">{{ logTarget }}</span></p>
        <small class="desc">※ 성공: 특정 알맹이 값만 추출했으므로 옛날 원본 가격이 칼같이 보존됩니다!</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #cbd5e1; color: #000000; }
.card-title { margin: 0 0 12px 0; font-size: 18px; color: #000000; font-weight: bold; }
.box { margin-top: 14px; padding: 14px; background: #ffffff; border-radius: 6px; border: 1px solid #cbd5e1; }
.box-title { margin: 0 0 8px 0; font-size: 15px; color: #000000; font-weight: bold; }
.text { font-size: 14px; color: #000000; margin: 6px 0; }
.text-bold { font-weight: bold; color: #000000; }
.text-highlight { color: #2563eb; font-weight: bold; }
.desc { font-size: 12px; color: #000000; font-weight: 500; }

.btn-group { display: flex; gap: 12px; margin: 10px 0; }
.btn { padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; }
.btn-primary { background-color: #2563eb; }
.btn-secondary { background-color: #475569; }
.btn-success { background-color: #16a34a; }

.monitor-area { margin-top: 10px; padding: 12px; background: #f1f5f9; border-radius: 6px; }
</style>