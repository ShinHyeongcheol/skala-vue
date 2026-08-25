<script setup>
import { ref } from 'vue'

const cnt = ref(0)

const sayHello = () => {
  alert('안녕하세요! 메서드 핸들러가 호출되었습니다.')
}
</script>

<template>
    <div class="card">
        <h3 class="label">1. 이벤트 핸들링</h3>
        <div class="box">
            <p class="label">카운트: {{ cnt }}</p>
            <button class="btn btn-primary" @click="cnt++">카운트 증가</button>
            <button class="btn btn-secondary" @click="cnt--">카운트 감소</button>
            <button class="btn btn-success" @click="sayHello">메서드 호출</button>
        </div>
    </div>
</template>

<style scoped>
.card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #cbd5e1; color: #000000; }
.card-title { margin: 0 0 12px 0; font-size: 18px; color: #000000; font-weight: bold; }
.box { margin-top: 15px; padding: 14px; background: #ffffff; border-radius: 6px; border: 1px solid #cbd5e1; }
.box-title { margin: 0 0 8px 0; font-size: 15px; color: #000000; font-weight: bold; }
.text { font-size: 14px; color: #000000; margin: 8px 0 12px 0; line-height: 1.5; }
.text-bold { font-weight: bold; color: #000000; }
.btn { padding: 8px 14px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 8px; }
.btn-primary { background-color: #2563eb; color: #ffffff; }
.btn-secondary { background-color: #475569; color: #ffffff; }
.btn-success { background-color: #16a34a; color: #ffffff; }
</style>