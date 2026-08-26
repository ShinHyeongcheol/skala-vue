<script setup>
import DefaultSlotChild from './DefaultSlotChild.vue'
</script>

<template>
    <div class = "practice-section">
        <h2> default slot 레이아웃 주입 실습</h2>
        <DefaultSlotChild>
            <p>단순한 텍스트 문장 주입</p>
        </DefaultSlotChild>
        <default-slot-child>
            <h2 style="color: #e74c3c">🔥 경고 상태</h2>
            <button>확인</button>
        </default-slot-child>
        <default-slot-child>
        </default-slot-child>
    </div>
</template>

<style scoped>
.practice-section {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  color: #1e293b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
}

.practice-section > h2 {
  font-size: 1.125rem;
  font-weight: 800;
}
</style>
