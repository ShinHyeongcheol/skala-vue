<script setup>
import { ref } from 'vue'

const lazyText = ref('')
const age = ref('')
const userEmail = ref('')
const price = ref('')
</script>

<template>
  <div class="card">
    <h3 class="card-title">3. v-model 수식어 (Modifiers) 활용</h3>

    <div class="box">
      <h4 class="box-title">1) .lazy 수식어 (change 이벤트 시점 반영)</h4>
      <input type="text" v-model.lazy="lazyText" placeholder="입력 후 Enter 또는 외부 클릭" class="input-field" />
      <p class="text">실시간이 아닌 확정된 값: <strong class="text-bold">{{ lazyText }}</strong></p>
    </div>

    <div class="box">
      <h4 class="box-title">2) .number 수식어 (Number 타입 자동 형변환)</h4>
      <input type="text" v-model.number="age" placeholder="나이를 입력하세요" class="input-field" />
      <p class="text">입력된 값: <strong class="text-bold">{{ age }}</strong></p>
      <p class="text">데이터 타입: <strong class="text-highlight">{{ typeof age }}</strong></p>
    </div>

    <div class="box">
      <h4 class="box-title">3) .trim 수식어 (양끝 공백 자동 제거)</h4>
      <input type="text" v-model.trim="userEmail" placeholder="앞뒤 공백을 포함해 입력해 보세요" class="input-field" />
      <p class="text">공백 제거된 값: <strong class="text-bold">"{{ userEmail }}"</strong></p>
      <p class="text">문자열 길이: <strong class="text-highlight">{{ userEmail.length }}글자</strong></p>
    </div>

    <div class="box">
      <h4 class="box-title">4) Chaining (수식어 체이닝: .trim.number)</h4>
      <input type="text" v-model.trim.number="price" placeholder="공백과 숫자를 섞어 입력해 보세요" class="input-field" />
      <p class="text">처리된 값: <strong class="text-bold">"{{ price }}"</strong></p>
      <p class="text">데이터 타입: <strong class="text-highlight">{{ typeof price }}</strong></p>
    </div>
  </div>
</template>

<style scoped>
.card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #cbd5e1; color: #000000; }
.card-title { margin: 0 0 12px 0; font-size: 18px; color: #000000; font-weight: bold; }
.box { margin-top: 14px; padding: 14px; background: #ffffff; border-radius: 6px; border: 1px solid #cbd5e1; }
.box-title { margin: 0 0 8px 0; font-size: 15px; color: #000000; font-weight: bold; }
.text { font-size: 14px; color: #000000; margin: 6px 0 0 0; }
.text-bold { font-weight: bold; color: #000000; }
.text-highlight { font-weight: bold; color: #2563eb; }
.input-field { width: 80%; padding: 8px 12px; border: 1px solid #94a3b8; border-radius: 6px; font-size: 14px; color: #000000; }
</style>