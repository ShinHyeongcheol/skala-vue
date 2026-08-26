<script setup>
import { ref } from 'vue'

const message = ref('현재 서버 상태 정상')
const userCount = ref(150)
</script>

<template>
  <div class="base-card">
    <h4 class="child-label">하위 컴포넌트 (Child)</h4>

    <slot :text="message" :count="userCount">
      <p class="fallback-text">부모가 마크업을 주입하지 않았을 때의 디폴트 화면</p>
    </slot>
  </div>
</template>

<style scoped>
.base-card {
  padding: 16px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  margin-bottom: 12px;
  color: #000000;
}
.child-label { margin: 0 0 10px 0; font-size: 14px; color: #475569; font-weight: bold; }
.fallback-text { color: #64748b; font-style: italic; margin: 0; }
</style>