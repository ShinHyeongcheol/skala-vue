<script setup>
import { ref } from 'vue'
import PropsEmitChild from './PropsEmitChild.vue'

const currentUserName = ref('홍길동')
const totalPoint = ref(0)
const isVip = ref(false)
const systemLog = ref('')

const handleChargePoint = (point) => {
  totalPoint.value += point
  systemLog.value = `포인트가 ${point}만큼 충전되었습니다.`
}

const handleResetPoint = () => {
  totalPoint.value = 0
  systemLog.value = '포인트가 초기화되었습니다.'
}

const toggleVip = () => {
  isVip.value = !isVip.value
  systemLog.value = isVip.value ? 'VIP 상태가 활성화되었습니다.' : 'VIP 상태가 비활성화되었습니다.'
}
</script>

<template>
  <div class="parent-card">
    <header class="parent-header">
      <h3 class="parent-title">👨‍💼 상위 컴포넌트 (PropsEmitParent.vue)</h3>
      <p class="parent-sub">부모가 상태(State)를 독점 관리하며 자식의 요청(Emit)에 응답합니다.</p>
    </header>
    <div class="parent-status-box">
      <p class="text">👤 관리 회원: <strong class="text-bold">{{ currentUserName }}</strong></p>
      <p class="text">💰 부모가 보관 중인 총 포인트: <strong class="text-highlight">{{ totalPoint.toLocaleString() }} P</strong></p>
      
      <div class="btn-group">
        <button @click="toggleVip" class="btn btn-dark">부모에서 VIP 등급 토글</button>
      </div>
      <div class="log-panel">
        📢 <strong>시스템 알림 로그:</strong> {{ systemLog }}
      </div>
    </div>

    <PropsEmitChild 
      :userName="currentUserName"
      :userPoint="totalPoint"
      :isVip="isVip"
      @charge-point="handleChargePoint"
      @reset-point="handleResetPoint"
      @notify-parent="systemLog = $event"
    />
  </div>
</template>

<style scoped>
.parent-card {
  max-width: 680px;
  margin: 30px auto;
  padding: 24px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #000000;
}
.parent-header { margin-bottom: 16px; }
.parent-title { margin: 0 0 6px 0; font-size: 20px; color: #000000; font-weight: bold; }
.parent-sub { margin: 0; font-size: 13px; color: #000000; font-weight: 500; }
.parent-status-box { padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; }
.text { font-size: 14px; color: #000000; margin: 6px 0; }
.text-bold { font-weight: bold; color: #000000; }
.text-highlight { color: #2563eb; font-weight: 800; font-size: 17px; }
.btn-group { display: flex; gap: 10px; margin: 10px 0; }
.btn { padding: 8px 14px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; font-size: 13px; }
.btn-dark { background-color: #0f172a; }
.log-panel {
  margin-top: 12px;
  padding: 10px 14px;
  background-color: #f1f5f9;
  border-left: 4px solid #2563eb;
  border-radius: 4px;
  font-size: 13px;
  color: #000000;
  font-weight: 500;
}
</style>
