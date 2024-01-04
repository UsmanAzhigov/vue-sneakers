<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
  <div class="bg-white h-full lg:w-1/3 fixed top-0 right-0 z-20 p-8 overflow-auto">
    <DrawerHead />
    <CartItemList />
  </div>
</template>
