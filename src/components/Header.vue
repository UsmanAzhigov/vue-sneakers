<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex md:items-center justify-between border-b border-slate-300 p-6 md:p-8">
    <router-link to="/" class="mb-4 md:mb-0">
      <div class="flex items-center gap-4 cursor-pointer">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500 hidden md:block">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-4 mb-4 md:mb-0">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" /><b class="whitespace-nowrap hidden md:inline"
          >{{ totalPrice }} руб.</b
        >
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/heart.svg" alt="Favorites" />
          <b class="hidden md:inline">Закладки</b>
        </li>
      </router-link>
      <router-link to="/orders">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" />
          <b class="hidden md:inline">Профиль</b>
        </li>
      </router-link>
    </ul>
  </header>
</template>
