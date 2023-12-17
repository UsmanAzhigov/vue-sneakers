<script setup>
import axios from 'axios'

import CardList from '../components/CardList.vue'
import { inject, onMounted, reactive, ref, watch } from 'vue'

const items = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const { cart, addToCart, removeFromCart } = inject('cart')

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const onClickPlus = async (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onAddFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        favoriteId: item.id,
        item
      }
      item.isFavorite = true
      const { data } = await axios.post('https://5289814c0afd45de.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://5289814c0afd45de.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://5289814c0afd45de.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const isFavorite = favorites.some((obj) => obj.favoriteId === item.id)
      if (!isFavorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorites.find((obj) => obj.favoriteId === item.id).id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fethcItems = async () => {
  const params = {
    sortBy: filters.sortBy
  }

  if (filters.searchQuery) {
    params.title = `*${filters.searchQuery}*`
  }

  try {
    const { data } = await axios.get(`https://5289814c0afd45de.mokky.dev/items`, { params })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart')) || []
  await fethcItems(), await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((obj) => obj.id === item.id)
  }))
})
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
watch(filters, fethcItems)
</script>

<template>
  <div class="flex justify-between items-center mb-10">
    <h2 class="text-3xl font-bold">Все кроссовки</h2>
    <div class="flex items-center gap-4">
      <select
        @change="onChangeSelect"
        class="transition border border-gray-200 rounded-md py-2 px-3 outline-none focus:border-gray-300"
      >
        <option value="name">По названию</option>
        <option value="-price">Сначала дорогие</option>
        <option value="price">Сначала дешевые</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" />
        <input
          @change="onChangeSearchInput"
          class="transition border border-gray-200 rounded-md p-2 pl-10 outline-none focus:border-gray-300"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <CardList :items="items" @onAddFavorite="onAddFavorite" @onClickPlus="onClickPlus" />
</template>
