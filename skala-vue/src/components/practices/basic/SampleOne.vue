<script setup>
import {ref} from 'vue'

let testCnt = 0;

const refCnt = ref(0);
</script>

<template>
  <div>
    <h1>Sample One</h1>
    <p>Test Count: {{ testCnt }}</p>
    <p>Ref Count: {{ refCnt }}</p>
    <button @click="testCnt++">Increment Test Count</button>
    <button @click="refCnt++">Increment Ref Count</button>
  </div>
</template>

<style scoped>
button {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
}
button:hover {
  background-color: #2563eb;
}
.desc {
  font-size: 12px;
  color: #64748b;
  margin-top: 8px;
}
</style>