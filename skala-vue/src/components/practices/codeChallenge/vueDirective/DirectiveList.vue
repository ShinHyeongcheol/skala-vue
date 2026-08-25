<script setup>
import { ref } from 'vue'

const fruitList = ref(['사과', '바나나', '체리'])

const userProfile = ref({
    name: '홍길동',
    age: 30,
    email: 'hong@example.com'
})

const courseList = ref([
    { id: 1, title: 'Vue.js 기초', completed: true },
    { id: 2, title: 'Vue.js 심화', completed: false },
    { id: 3, title: 'Vue.js 프로젝트', completed: false }
])
</script>

<template>
    <div class="step-card">
        <h3 class="label">1. v-for 디렉티브 (리스트 렌더링)</h3>
        <div class="item">
            <p class="label">과일 목록:</p>
            <ul>
                <li v-for="(fruit, index) in fruitList" :key="index">{{ fruit }}</li>
            </ul>
        </div>
        <div class="item">
            <p class="label">사용자 프로필:</p>
            <ul>
                <li v-for="(value, key) in userProfile" :key="key">{{ key }}: {{ value }}</li>
            </ul> 
        </div>
        <div class="item">
            <p class="label">강의 목록:</p>
            <div class="course-grid">
                <div v-for="course in courseList" :key="course.id" class="course-card">
                    <h4>{{ course.title }}</h4>
                    <p>상태: {{ course.completed ? '완료' : '진행 중' }}</p>
                    <p class="course-id">ID: {{ course.id }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.step-card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
.item { margin-top: 15px; padding: 12px; background: white; border-radius: 6px; border: 1px solid #cbd5e1; }
.label { font-weight: bold; color: #475569; margin: 0 0 8px 0; font-size: 14px; }
ul { margin: 0; padding-left: 20px; font-size: 14px; }
li { margin-bottom: 4px; text-align: left; color: #1e293b; }
.course-grid { display: flex; gap: 10px; margin-top: 8px; }
.course-card { flex: 1; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: #fafafa; }
.course-card h4 { margin: 6px 0; font-size: 14px; color: #1e293b; }
.course-card p { margin: 0; font-size: 12px; color: #64748b; }
.course-id { font-size: 11px; font-weight: bold; color: #3b82f6; }
</style>