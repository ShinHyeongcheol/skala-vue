<script setup>
import NamedSlotChild from './NamedSlotChild.vue'
</script>


<template>
  <div class="practice-section">
    <h2 class="title">Named Slot 주입 실습 </h2>
    <NamedSlotChild>
      <template v-slot:header>
        <h3 class="injected-title">Child 주입 제목</h3>
      </template>
      <p class="text">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      </p>
    </NamedSlotChild>
    <NamedSlotChild>
    </NamedSlotChild>
  </div>
</template>
<style scoped>
.practice-section { padding: 20px; background: #f8fafc; border-radius: 10px; border: 1px solid #cbd5e1; color: #000000; }
.title { margin: 0 0 16px 0; font-size: 18px; color: #000000; font-weight: bold; }
.injected-title { margin: 0; color: #2563eb; font-size: 16px; font-weight: bold; }
.text { font-size: 14px; color: #000000; margin: 0; }
</style>