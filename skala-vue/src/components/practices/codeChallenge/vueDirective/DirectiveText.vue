<script setup>
import { ref } from 'vue'

const message = ref('Hello!!')
const formattedMessage = ref('<span style="color: #2563eb; font-weight: bold;">Hello!!</span>')
</script>


<template>
  <div class="step-card">
    <!-- 1) Mustache 보간법: 태그를 글자 그대로 출력 (안전) -->
    <div class="item">
      <p class="label">1. 기본 Mustache 보간법 {{ }}</p>
      <p class="result">{{ message }}</p>
      <p class="result"> {{ formattedMessage }}</p> 
    </div>
    <!-- 2) v-html: 태그를 파싱하여 스타일이 적용된 파란 글씨로 렌더링 -->
    <div class="item">
      <p class="label">2. v-html 디렉티브 (태그 파싱)</p>
      <div class="result" v-html="formattedMessage"></div>
    </div>
  </div>
</template>

<style scoped>
.step-card {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
}

.item {
  padding: 0.875rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.label {
  margin: 0 0 0.5rem;
  color: #475569;
  font-size: 0.8125rem;
  font-weight: 700;
}

.result {
  margin: 0;
  color: #1e3a8a;
  font-weight: 600;
}
</style>
