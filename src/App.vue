<script setup>
import axios from 'axios'

import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
import { computed, provide, ref, watch } from 'vue'

const cart = ref([])
const drawerOpen = ref(false)
const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => {
    return acc + item.price
  }, 0)
})

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const createOrder = async () => {
  try {
    const { data } = await axios.post('https://5289814c0afd45de.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []
    return data
  } catch (error) {
    console.log(error)
  }
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  {
    deep: true
  }
)
provide('cart', {
  closeDrawer,
  openDrawer,
  cart,
  addToCart,
  removeFromCart,
  totalPrice,
  createOrder
})
</script>

<template>
  <Drawer v-if="drawerOpen" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :totalPrice="totalPrice" @openDrawer="openDrawer" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
