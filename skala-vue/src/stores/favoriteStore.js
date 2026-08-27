import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteCityIds = ref([])

  const favoriteCount = computed(() => favoriteCityIds.value.length)

  const isFavorite = (cityId) => favoriteCityIds.value.includes(cityId)

  const toggleFavorite = (cityId) => {
    if (isFavorite(cityId)) {
      favoriteCityIds.value = favoriteCityIds.value.filter((id) => id !== cityId)
      return
    }

    favoriteCityIds.value.push(cityId)
  }

  return { favoriteCityIds, favoriteCount, isFavorite, toggleFavorite }
})
