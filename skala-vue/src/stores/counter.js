import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
    console.log(`🍍 [Pinia] count 증가: ${count.value}`)
  }
  function decrement() {
    count.value--
    console.log(`🍍 [Pinia] count 감소: ${count.value}`)
  }
  function reset() {
    count.value = 0
    console.log('🍍 [Pinia] count 0으로 리셋')
  }
  return { count, doubleCount, increment, decrement, reset }
})
