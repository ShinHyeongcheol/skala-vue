<script setup>
import { ref } from 'vue'

const cnt = ref(0)
const name = ref('홍길동')
const isActive = ref(true)
const items = ref(['사과', '바나나', '체리'])
const user = ref({
  name: '홍길동',
  age: 30,})
const increaseCount = () => {
  cnt.value++
}
const changeUserName = () => {
  user.value.name = '장보고'
}
</script>


<template>
    <div class="practice-section">
        <h2>반응형 상태 ref() 기초</h2>
        <p>Ref 카운트: <strong>{{ cnt }}</strong></p>
        <p>이름: <input v-model="name" />{{ name }}</p>
        <p>활성 상태: {{ isActive ? '활성' : '비활성' }}</p>
        <p>과일 목록: {{ items.join(', ') }}</p>
        <p>사용자 정보: 이름- {{ user.name }}, 나이- {{ user.age }}</p>
        <button @click="increaseCount">Ref 변수 증가</button>
        <button @click="isActive = !isActive">토글</button>
        <button @click="items.push('귤')">과일 추가</button>
        <button @click="changeUserName">사용자 이름 변경</button>
    </div>
</template>