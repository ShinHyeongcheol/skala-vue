<script setup>
import { ref } from 'vue'

const comment = ref('')
const isAgreed = ref(false)   
const favoriteFruits = ref([])
const gender = ref('')
const selectedCar = ref('')
</script>

<template>
  <div class="card">
    <h3 class="card-title">2. 모든 HTML Form 요소와 v-model 매핑</h3>

    <div class="box">
      <h4 class="box-title">1) Textarea (장문 텍스트)</h4>
      <textarea v-model="comment" placeholder="의견을 남겨주세요" class="textarea-field"></textarea>
      <p class="text">데이터 상태: <span class="text-highlight">{{ comment }}</span></p>
    </div>

    <div class="box">
      <h4 class="box-title">2) 단일 Checkbox (동의 여부: Boolean)</h4>
      <label class="check-label">
        <input type="checkbox" v-model="isAgreed" /> 약관에 동의합니다.
      </label>
      <p class="text">데이터 상태: <span class="text-highlight">{{ isAgreed }}</span></p>
    </div>

    <div class="box">
      <h4 class="box-title">3) 다중 Checkbox (복수 선택 -> 배열에 저장)</h4>
      <div class="flex-row">
        <label><input type="checkbox" value="사과" v-model="favoriteFruits" /> 사과</label>
        <label><input type="checkbox" value="바나나" v-model="favoriteFruits" /> 바나나</label>
        <label><input type="checkbox" value="딸기" v-model="favoriteFruits" /> 딸기</label>
      </div>
      <p class="text">데이터 상태 (배열): <span class="text-highlight">{{ favoriteFruits }}</span></p>
    </div>

    <div class="box">
      <h4 class="box-title">4) Radio (단일 선택)</h4>
      <div class="flex-row">
        <label><input type="radio" value="남성" v-model="gender" /> 남성</label>
        <label><input type="radio" value="여성" v-model="gender" /> 여성</label>
      </div>
      <p class="text">데이터 상태: <span class="text-highlight">{{ gender }}</span></p>
    </div>

    <div class="box">
      <h4 class="box-title">5) Select (드롭다운 선택)</h4>
      <select v-model="selectedCar" class="select-field">
        <option value="">-- 선택하세요 --</option>
        <option value="chicken">치킨</option>
        <option value="tang">탕수육</option>
        <option value="pizza">피짜</option>
      </select>
      <p class="text">데이터 상태: <span class="text-highlight">{{ selectedCar }}</span></p>
    </div>
  </div>
</template>

<style scoped>
.card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #cbd5e1; color: #000000; }
.card-title { margin: 0 0 12px 0; font-size: 18px; color: #000000; font-weight: bold; }
.box { margin-top: 14px; padding: 14px; background: #ffffff; border-radius: 6px; border: 1px solid #cbd5e1; }
.box-title { margin: 0 0 8px 0; font-size: 15px; color: #000000; font-weight: bold; }
.text { font-size: 14px; color: #000000; margin: 8px 0 0 0; }
.text-highlight { font-weight: bold; color: #2563eb; }

.textarea-field { width: 90%; height: 60px; padding: 8px; border: 1px solid #94a3b8; border-radius: 6px; font-size: 14px; color: #000000; }
.select-field { padding: 8px 12px; border: 1px solid #94a3b8; border-radius: 6px; font-size: 14px; color: #000000; }
.flex-row { display: flex; gap: 16px; font-size: 14px; color: #000000; font-weight: 500; }
.check-label { font-size: 14px; color: #000000; font-weight: 500; }
</style>