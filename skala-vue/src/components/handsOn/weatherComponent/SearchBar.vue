<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const updateQuery = (event) => {
  emit('update-query', event.target.value.trim())
}
</script>

<template>
  <div class="search-bar">
    <input
      :value="searchQuery"
      type="text"
      placeholder="검색할 도시 이름 입력"
      @input="updateQuery"
    />
    <p>검색 중인 도시: <strong>{{ searchQuery }}</strong></p>
  </div>
</template>

<style scoped>
.search-bar {
  display: grid;
  gap: 0.625rem;
}

input {
  width: 100%;
  padding: 0.5rem 0.625rem;
  color: #1e293b;
  font: inherit;
  background: #fff;
  border: 1px solid #94a3b8;
  border-radius: 0.25rem;
}

p {
  font-size: 0.875rem;
}
</style>
