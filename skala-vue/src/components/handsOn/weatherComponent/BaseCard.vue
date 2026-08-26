<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="base-card">
    <h3>{{ title }}</h3>
    <slot />
  </section>
</template>

<style scoped>
.base-card {
  display: grid;
  gap: 0.625rem;
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

h3 {
  font-size: 1rem;
  font-weight: 700;
}
</style>
