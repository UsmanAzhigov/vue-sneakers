<script setup>
const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex items-center justify-between border-b border-slate-300 p-8">
    <router-link to="/">
      <div class="flex items-center gap-4 cursor-pointer">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-8">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" /><b>{{ totalPrice }} руб.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/heart.svg" alt="Favorites" /><b>Закладки</b>
        </li>
      </router-link>
      <router-link to="/orders">
        <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" /><b>Профиль</b>
        </li>
      </router-link>
    </ul>
  </header>
</template>
