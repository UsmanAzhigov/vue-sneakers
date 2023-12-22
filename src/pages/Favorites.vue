<script setup>
import CardList from '@/components/CardList.vue'

import { useFavoriteStore } from '../store/FavoriteStore'
import { onMounted } from 'vue'

const favoritesStore = useFavoriteStore()
onMounted(async () => {
  favoritesStore.fetchFavorite()
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-10">Мои заклакди</h2>
  <CardList :items="favoritesStore.favorites" isFavorites />
  <div v-if="!favoritesStore.hasFavorite" class="text-center" auto-animate>
    <span class="text-7xl">😔</span>
    <h2 class="text-3xl font-bold mb-2">Закладок нет :(</h2>
    <p class="text-slate-400">Вы ничего не добавляли в закладки</p>
    <router-link to="/">
      <button
        class="transition bg-lime-500 w-[200px] mt-5 rounded-xl disabled:bg-slate-300 py-3 text-white hover:bg-lime-600 active:bg-lime-700"
      >
        Вернуться назад
      </button>
    </router-link>
  </div>
</template>
