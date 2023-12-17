<script setup>
defineProps({
  imageUrl: String,
  title: String,
  description: String
})
</script>
<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img height="80" width="80" :src="imageUrl" :alt="title" />
    <h2 class="mt-4 text-2xl font-bold">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>
