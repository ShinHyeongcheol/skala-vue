<script setup>
import { ref } from 'vue'

const currentValue = ref(70)
const isModalOpen = ref(true)
</script>


<template>
    <div class="step-card">
        <h3 class="label">1. v-if 디렉티브 (조건부 렌더링)</h3>
        <div class="item">
            <p class="label">현재 값: {{ currentValue }}</p>
            <div v-if="currentValue >= 90" class="result"> A등급 </div>
            <div v-else-if="currentValue >= 80" class="result"> B등급 </div>
            <div v-else-if="currentValue >= 70" class="result"> C등급 </div>
            <div v-else-if="currentValue >= 60" class="result"> D등급 </div>
            <div v-else class="result"> F등급 </div>
            
            <div class="btn-group">
                <button @click="currentValue = 95" class="btn">95로 변경</button>
                <button @click="currentValue = 85" class="btn">85로 변경</button>
                <button @click="currentValue = 75" class="btn">75로 변경</button>
                <button @click="currentValue = 65" class="btn">65로 변경</button>
                <button @click="currentValue = 55" class="btn">55로 변경</button>
            </div>
        </div>
    </div>
    <div class="step-card">
        <h3 class="label">2. v-show 디렉티브 (조건부 표시)</h3>
        <div class="item">
            <p class="label">모달 상태: {{ isModalOpen ? '열림' : '닫힘' }}</p>
            <div v-show="isModalOpen" class="result"> 모달이 열려 있습니다. </div>
            <button @click="isModalOpen = !isModalOpen" class="btn">모달 상태 토글</button>
        </div>
    </div>
</template>

<style scoped>
.step-card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
.item { margin-top: 15px; padding: 12px; background: white; border-radius: 6px; border: 1px solid #cbd5e1; }
.label { font-weight: bold; color: #475569; margin: 0 0 8px 0; font-size: 14px; }
.item > .label, .result { color: #000; }
.badge { padding: 10px; border-radius: 6px; font-weight: bold; margin-bottom: 8px; }
.grade-a { background-color: #dcfce7; color: #166534; }
.grade-b { background-color: #dbeafe; color: #1e40af; }
.grade-c { background-color: #fef3c7; color: #92400e; }
.grade-f { background-color: #fee2e2; color: #991b1b; }
.btn-group button { margin-right: 6px; padding: 4px 10px; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer; }
.toggle-btn { padding: 6px 12px; background-color: #0284c7; color: white; border: none; border-radius: 4px; cursor: pointer; }
.modal-box { margin-top: 10px; padding: 14px; background-color: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 6px; color: #0369a1; }
</style>
