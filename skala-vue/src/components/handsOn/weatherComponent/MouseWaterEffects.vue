<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { Particles as ClickParticles } from 'mouse-animations'

let waterDrops

const canUseMouseEffects = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

onMounted(() => {
  if (!canUseMouseEffects()) return

  waterDrops = new ClickParticles({
    // 파란 계열의 작은 입자로 물방울이 퍼지는 느낌을 만든다.
    count: 12,
    colors: ['#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe'],
    size: 5,
    spread: 4,
    decay: 0.025,
  })
})

onBeforeUnmount(() => {
  waterDrops?.destroy()
})
</script>

<template>
  <span class="mouse-water-effects" aria-hidden="true" />
</template>

<style scoped>
.mouse-water-effects { display: none; }
</style>
