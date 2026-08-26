<script setup>
import SlotScopedChild from './ScopedSlotChild.vue'
</script>

<template>
  <div class="practice-section">
    <h2 class="title">Scoped Slot 주입 실습</h2>
    <h3 class="parent-label">상위 컴포넌트 (Parent)</h3>

    <SlotScopedChild v-slot="slotBag">
      <div class="display-panel">
        <p class="panel-text">📢 알림 메시지: <strong class="text-bold">{{ slotBag.text }}</strong></p>
        <p class="panel-text">👥 접속자 수: <strong class="text-highlight">{{ slotBag.count }}명</strong></p>
      </div>
    </SlotScopedChild>

    <SlotScopedChild></SlotScopedChild>
  </div>
</template>

<style scoped>
.practice-section { padding: 20px; background: #f8fafc; border-radius: 10px; border: 1px solid #cbd5e1; color: #000000; }
.title { margin: 0 0 12px 0; font-size: 18px; color: #000000; font-weight: bold; }
.parent-label { margin: 0 0 12px 0; font-size: 15px; color: #000000; font-weight: bold; }

.display-panel {
  padding: 12px 16px;
  background-color: #f1f5f9;
  border-radius: 6px;
  border-left: 4px solid #2563eb;
}
.panel-text { font-size: 14px; color: #000000; margin: 4px 0; }
.text-bold { font-weight: bold; color: #000000; }
.text-highlight { color: #2563eb; font-weight: bold; font-size: 15px; }
</style>