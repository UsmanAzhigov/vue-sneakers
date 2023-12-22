import axios from 'axios'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore({
  id: 'favorites',
  state: () => ({
    favorites: []
  }),
  actions: {
    async fetchFavorite() {
      try {
        const { data } = await axios.get('https://5289814c0afd45de.mokky.dev/favorites')
        this.favorites = data.map((obj) => obj.item)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    hasFavorite() {
      return this.favorites.length > 0
    }
  }
})
