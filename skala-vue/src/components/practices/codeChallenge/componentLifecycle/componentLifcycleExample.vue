<!-- src/components/practices/component/LifecycleChild.vue -->
<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const seconds = ref(0)
const isRunning = ref(false)
const logStatus = ref('컴포넌트 준비 중...')
let timerId = null // 백그라운드 타이머 ID

const startTimer = () => {
  if (isRunning.value) return 

  isRunning.value = true
  logStatus.value = '🟢 타이머가 1초마다 동작 중입니다.'
  
  timerId = setInterval(() => {
    seconds.value++
    console.log(`⏰ [setInterval] 경과 시간: ${seconds.value}초`)
  }, 1000)
}

const stopTimer = () => {
  if (!isRunning.value) return

  clearInterval(timerId)
  timerId = null
  isRunning.value = false
  logStatus.value = '⏸️ 타이머가 멈췄습니다.'
  console.log('⏸️ [clearInterval] 타이머가 중지되었습니다.')
}

const resetTimer = () => {
  stopTimer()
  seconds.value = 0
  logStatus.value = '🔄 타이머가 0초로 초기화되었습니다.'
}

onMounted(() => {
  console.log('🟢 [onMounted] 컴포넌트 마운트 완료 -> 타이머를 자동으로 시작합니다.')
  startTimer()
})

onUpdated(() => {
  console.log(`🟡 [onUpdated] 화면 갱신 완료 -> 현재: ${seconds.value}초`)
})

onUnmounted(() => {
  console.log('🔴 [onUnmounted] 컴포넌트 언마운트됨 -> 타이머를 즉시 해제합니다!')
  clearInterval(timerId)
})
</script>

<template>
  <div class="timer-card">
    <h3 class="card-title">⏱️ Lifecycle Hooks 타이머 실습</h3>
    
    <div class="display-box">
      <span class="time-text">{{ seconds }}</span>
      <span class="unit-text">초 경과</span>
    </div>

   
    <p class="status-msg">{{ logStatus }}</p>


    <div class="btn-group">
      <button 
        @click="startTimer" 
        :disabled="isRunning" 
        class="btn btn-start"
      >
        ▶️ 타이머 시작
      </button>

      <button 
        @click="stopTimer" 
        :disabled="!isRunning" 
        class="btn btn-stop"
      >
        ⏸️ 타이머 멈춤
      </button>

      <button 
        @click="resetTimer" 
        class="btn btn-reset"
      >
        🔄 0초 리셋
      </button>
    </div>
  </div>
</template>

<style scoped>
.timer-card {
  max-width: 520px;
  margin: 20px auto;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  text-align: center;
  color: #000000;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.card-title { margin: 0 0 16px 0; font-size: 18px; color: #000000; font-weight: bold; }

.display-box {
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  padding: 12px 32px;
  background-color: #f1f5f9;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  margin-bottom: 12px;
}
.time-text { font-size: 44px; font-weight: 800; color: #2563eb; font-family: monospace; }
.unit-text { font-size: 16px; font-weight: bold; color: #000000; }

.status-msg { font-size: 14px; color: #000000; font-weight: 500; margin: 8px 0 18px 0; }

.btn-group { display: flex; justify-content: center; gap: 12px; }
.btn { padding: 9px 18px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; font-size: 13px; transition: opacity 0.2s; }
.btn:disabled { background-color: #94a3b8; cursor: not-allowed; opacity: 0.6; }
.btn-start { background-color: #16a34a; }
.btn-stop { background-color: #dc2626; }
.btn-reset { background-color: #475569; }
</style>