<script setup>
import { ref } from 'vue'

const text1 = ref('')
const text2 = ref('')

</script>

<template>
  <div class="card">
    <h3 class="card-title">1. v-model 기본 사용법</h3>
    <div class="box">
      <h4 class="box-title">1) v-model 축약 문법 (양방향)</h4>
      <input type="text" v-model="text1" placeholder="여기에 입력하세요" class="input-field" />
      <p class="text">입력된 값: <strong class="text-bold">{{ text1 }}</strong></p>
    </div>
    <div class="box">
      <h4 class="box-title">2) v-model의 내부 작동 원리 (단방향 + 이벤트 분해)</h4>
      <input 
        type="text" 
        :value="text2" 
        @input="(e) => (text2 = e.target.value)" 
        placeholder="원리 파악용 입력창" 
        class="input-field"
      />
      <p class="text">입력된 값: <strong class="text-bold">{{ text2 }}</strong></p>
    </div>
  </div>
</template>

<style scoped>
</style>