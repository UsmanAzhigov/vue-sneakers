<script setup>
const emit = defineEmits(['onClickRemove'])
defineProps({
  id: Number,
  title: String,
  price: Number,
  imageUrl: String
})
</script>

<template>
  <div
    class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 hover:-translate-y-1 transition"
  >
    <img class="w-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-col">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }} руб.</b>
        <img
          @click="emit('onClickRemove')"
          class="cursor-pointer opacity-40 hover:opacity-100 transition"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>
