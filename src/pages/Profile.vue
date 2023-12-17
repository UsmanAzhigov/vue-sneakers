<script setup>
import axios from 'axios'
import CardList from '@/components/CardList.vue'

import { computed, onMounted, ref } from 'vue'

const orders = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://5289814c0afd45de.mokky.dev/orders')
    orders.value = data
  } catch (error) {
    console.log(error)
  }
})

const flattenItems = computed(() => {
  return orders.value.reduce((acc, order) => {
    return acc.concat(order.items)
  }, [])
})

const totalAmount = computed(() => {
  return flattenItems.value.reduce((total, item) => total + item.price, 0)
})

const hasOrders = computed(() => {
  return orders.value.length > 0
})
</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="text-3xl font-bold mb-10">Мои заказы</h2>
    <h3 class="text-1xl mb-10">Сумма покупок: {{ totalAmount }} руб.</h3>
  </div>
  <CardList :items="flattenItems" isFavorites />
  <div v-if="!hasOrders" class="text-center" auto-animate>
    <span class="text-7xl">🥹</span>
    <h2 class="text-3xl font-bold mb-2">У вас нет заказов</h2>
    <p class="text-slate-400">Вы нищеброд? <br />Оформите хотя бы один заказ.</p>
    <router-link to="/">
      <button
        class="transition bg-lime-500 w-[200px] mt-5 rounded-xl disabled:bg-slate-300 py-3 text-white hover:bg-lime-600 active:bg-lime-700"
      >
        Вернуться назад
      </button>
    </router-link>
  </div>
</template>
