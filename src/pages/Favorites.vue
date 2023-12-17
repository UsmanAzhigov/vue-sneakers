<script setup>
import axios from 'axios'
import CardList from '@/components/CardList.vue'

import { computed, onMounted, ref } from 'vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://5289814c0afd45de.mokky.dev/favorites')
    favorites.value = data.map((obj) => obj.item)
  } catch (error) {
    console.log(error)
  }
})

const hasOrders = computed(() => {
  return favorites.value.length > 0
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-10">Мои заклакди</h2>
  <CardList :items="favorites" isFavorites />
  <div v-if="!hasOrders" class="text-center" auto-animate>
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
