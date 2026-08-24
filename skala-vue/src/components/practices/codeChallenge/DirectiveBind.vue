<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)
const isSelected = ref(false)
const dynamicFontSize = ref(16)

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
</style>