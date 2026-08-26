<!-- src/components/practices/composition/1_ComputedExample.vue -->
<script setup>
import { ref, computed } from 'vue'

const price = ref(1000)
const quantity = ref(2)
const otherCount = ref(0)

const totalPrice = computed(() => {
  console.log('⚡ [computed 실행] 총 결제 금액을 새로 계산합니다!')
  return price.value * quantity.value
})

const getTotalMethod = () => {
  console.log('🔄 [Method 호출] 일반 메서드가 호출되었습니다.')
  return price.value * quantity.value
}

const firstName = ref('길동')
const lastName = ref('홍')

const fullName = computed({
  get() {
    return `${lastName.value} ${firstName.value}`
  },
  set(newValue) {
    const names = newValue.split(' ')
    lastName.value = names[0] || ''
    firstName.value = names[1] || ''
  }
})
</script>

<template>
  <div class="card">
    <h3 class="card-title">1. computed() 캐싱 & Writable computed</h3>

    <div class="box">
      <h4 class="box-title">1) [PDF p.129~130 원본] computed 캐싱 vs 일반 Method</h4>
      <p class="text">단가: {{ price }}원 / 수량: {{ quantity }}개</p>
      <p class="text">1) computed 결과: <strong class="text-highlight">{{ totalPrice }}원</strong></p>
      <p class="text">2) Method 결과: <strong class="text-highlight">{{ getTotalMethod() }}원</strong></p>

      <div class="btn-group">
        <button @click="quantity++" class="btn btn-primary">수량 증가 (quantity++)</button>
        <button @click="otherCount++" class="btn btn-secondary">무관한 카운트 ({{ otherCount }})</button>
      </div>
      <p class="desc">💡 F12 콘솔을 열고 '무관한 카운트'를 눌러보세요. Method는 계속 찍히지만 computed는 1번도 재실행되지 않습니다!</p>
    </div>

    <div class="box">
      <h4 class="box-title">2) [추가 확장 실습] Writable computed (get / set)</h4>
      <p class="text">성과 이름: <strong class="text-bold">{{ lastName }} / {{ firstName }}</strong></p>
      <p class="text">전체 이름 (fullName): <strong class="text-highlight">{{ fullName }}</strong></p>

      <div class="btn-group">
        <button @click="fullName = '이 순신'" class="btn btn-success">이름을 '이 순신'으로 세팅 (setter 발동)</button>
        <button @click="fullName = '강 감찬'" class="btn btn-primary">이름을 '강 감찬'으로 세팅</button>
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
.desc { font-size: 12px; color: #000000; font-weight: 500; margin-top: 8px; }

.btn-group { display: flex; gap: 12px; margin: 12px 0; }
.btn { padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; }
.btn-primary { background-color: #2563eb; }
.btn-secondary { background-color: #475569; }
.btn-success { background-color: #16a34a; }
</style>