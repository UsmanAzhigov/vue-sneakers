<script setup>
import { defineProps } from 'vue'
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emits = defineEmits(['onClickPlus', 'onAddFavorite'])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      :onClickPlus="isFavorites ? null : () => emits('onClickPlus', item)"
      :onClickFavorite="isFavorites ? null : () => emits('onAddFavorite', item)"
    />
  </div>
</template>
