<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)
const isSelected = ref(false)
const dynamicFontSize = ref(16)

const boxWidth = ref(100)
const baseBoxStyle = {
    transition: 'all 0.3s ease',
}
</script>

<template>
    <div class="item">
        <p class ="label">1. v-bind 디렉티브 (속성 바인딩)</p>
        <div class="item">
            <button :disabled="isSubmitting" class="btn">
                {{ isSubmitting ? '전송 중 (클릭 불가)...' : '제출하기 (클릭 가능)' }}
            </button>
            <button @click="isSubmitting = !isSubmitting" class="toggle-btn">상태 토글</button>
        </div>
    </div>
    <div class = "item">
        <p class  ="label">2. v-bind 디렉티브 (클래스 바인딩)</p>
        <div :class="['select-box', { 'selected-style': isSelected }]">
            <p style="color: black;">선택된 상태: {{ isSelected ? '선택됨' : '선택되지 않음' }}</p>
            <button @click="isSelected = !isSelected" class="toggle-btn">선택 상태 토글</button>
        </div>
    </div>
    <div class = "item">
        <p class  ="label">3. v-bind 디렉티브 (스타일 바인딩)</p>
        <div :style="{ fontSize: dynamicFontSize + 'px' }">
            <p style="color: black;">동적 폰트 크기: {{ dynamicFontSize }}px</p>
            <input type="range" min="10" max="30" v-model="dynamicFontSize" />
        </div>
    </div>
    <div class = "item">
        <p class  ="label">4. v-bind 디렉티브 (객체 스타일 바인딩)</p>
        <div class="object-style-content" :style="baseBoxStyle">
            <p style="color: black;">박스 너비: {{ boxWidth }}px</p>
            <input type="number" min="50" max="300" step="5" v-model="boxWidth" />
            <div class="size-preview" :style="{ width: boxWidth + 'px', backgroundColor: '#42b883', height: '40px', transition: 'all 0.3s ease' }">
                <p style="color: white; text-align: center; line-height: 40px;">{{ boxWidth }}px</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.step-card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
.item { margin-top: 15px; padding: 12px; background: white; border-radius: 6px; border: 1px solid #cbd5e1; }
.label { font-weight: bold; color: #475569; margin: 0 0 8px 0; font-size: 14px; }
.btn { padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 6px; }
.btn:disabled { background-color: #94a3b8; cursor: not-allowed; }
.toggle-btn { margin-left: 10px; padding: 6px 12px; background-color: #475569; color: white; border: none; border-radius: 4px; cursor: pointer; }
.select-box { padding: 16px; border: 2px solid #cbd5e1; border-radius: 6px; margin-bottom: 8px; transition: all 0.3s; }
.selected-style { border-color: #3b82f6; background-color: #eff6ff; color: #1e40af; }
.object-style-content { display: grid; gap: 8px; }
.size-preview { max-width: 100%; border-radius: 4px; overflow: hidden; }
</style>