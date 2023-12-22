<script setup>
import { onMounted } from 'vue'
import { useOrdersStore } from '../store/OrderStore'
import CardList from '@/components/CardList.vue'

const ordersStore = useOrdersStore()

onMounted(() => {
  ordersStore.fetchOrders()
})
</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="text-3xl font-bold mb-10">Мои заказы</h2>
    <h3 class="text-1xl mb-10">Сумма покупок: {{ ordersStore.totalAmount }} руб.</h3>
  </div>
  <CardList :items="ordersStore.flattenItems" isFavorites />
  <div v-if="!ordersStore.hasOrders" class="text-center" auto-animate>
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
