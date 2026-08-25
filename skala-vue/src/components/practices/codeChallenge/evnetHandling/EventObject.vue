<script setup>
import { ref } from 'vue'
const position = ref()
const tagNmae = ref()

const getOnlyEvent = (event) => {
  position.value = `X: ${event.clientX}, Y: ${event.clientY}`
}

const getWithParam = (name, event) => {
  tagNmae.value = `Tag Name: ${name} / target Tag Name: ${event.target.tagName}`
}   
</script>

<template>
    <div class="card">
        <h3 vlass="label">2. 이벤트 객체</h3>
        <div class="box">
            <p vlass = "status-text">마우스를 클릭하면 이벤트 객체를 확인할 수 있습니다.</p>
            <button class="btn btn-blue" @click="getOnlyEvent($event)">이벤트 객체 확인</button>
            <p class="text-bold">{{ position }}</p>
            <button class="btn btn-purple" @click="getWithParam('버튼', $event)">이벤트 객체와 파라미터 확인</button>
            <p class="text-bold">{{ tagNmae }}</p>
        </div>
    </div>  
</template>




<style scoped>
.card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #cbd5e1; color: #000000; }
.card-title { margin: 0 0 12px 0; font-size: 18px; color: #000000; font-weight: bold; }
.box { margin-top: 15px; padding: 14px; background: #ffffff; border-radius: 6px; border: 1px solid #cbd5e1; }
.text { font-size: 14px; color: #000000; margin: 8px 0 12px 0; line-height: 1.5; }
.text-bold { font-weight: bold; color: #000000; }
.status-text { font-size: 14px; color: #000000; margin: 8px 0; font-weight: 500; }
.btn { padding: 8px 14px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; }
.btn-blue { background-color: #0284c7; }
.btn-purple { background-color: #7c3aed; }
</style>