<script setup>
import { ref, watchEffect } from 'vue'


const username = ref('홍길동')
const age = ref(20)
const logMessage = ref('대기 중...')

watchEffect(() => {
  logMessage.value = `[자동 감지] 이름: ${username.value} / 나이: ${age.value}세`
  console.log('🤖 watchEffect가 내부 변수 변경을 감지하여 실행되었습니다.')
})
</script>

<template>
  <div class="card">
    <h3 class="card-title">3. watchEffect() 자동 감시자</h3>

    <div class="box">
      <p class="text">👤 이름: <strong class="text-bold">{{ username }}</strong></p>
      <p class="text">🎂 나이: <strong class="text-bold">{{ age }}세</strong></p>

      <div class="btn-group">
        <button @click="username = (username === '홍길동' ? '이순신' : '홍길동')" class="btn btn-primary">
          이름 변경 ('이순신')
        </button>
        <button @click="age++" class="btn btn-success">
          나이 한 살 추가 (age++)
        </button>
      </div>

      <div class="monitor-area">
        <h4 style="margin: 0 0 6px 0; color: #000000;">👁️‍🗨️ watchEffect 자동 모니터링 시스템</h4>
        <p class="text"><strong class="text-highlight">{{ logMessage }}</strong></p>
        <small class="desc">※ 새로고침하자마자 버튼을 안 눌러도 로그가 이미 떠 있는 즉시 실행(Immediate) 특징에 주목하세요!</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #cbd5e1; color: #000000; }
.card-title { margin: 0 0 12px 0; font-size: 18px; color: #000000; font-weight: bold; }
.box { margin-top: 14px; padding: 14px; background: #ffffff; border-radius: 6px; border: 1px solid #cbd5e1; }
.text { font-size: 14px; color: #000000; margin: 6px 0; }
.text-bold { font-weight: bold; color: #000000; }
.text-highlight { color: #2563eb; font-weight: bold; }
.desc { font-size: 12px; color: #000000; font-weight: 500; }

.btn-group { display: flex; gap: 12px; margin: 12px 0; }
.btn { padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; }
.btn-primary { background-color: #2563eb; }
.btn-success { background-color: #16a34a; }

.monitor-area { margin-top: 14px; padding: 12px; background: #f1f5f9; border-radius: 6px; }
</style>