<script setup>
import { computed, inject } from 'vue'
import CartItem from './CartItem.vue'
import InfoBlock from './InfoBlock.vue'

const { cart, removeFromCart, totalPrice, createOrder } = inject('cart')

const tax = computed(() => {
  return totalPrice.value * 0.05
})
</script>

<template>
  <div class="flex flex-col gap-5 h-full" v-auto-animate>
    <div v-if="!totalPrice" class="flex h-full items-center">
      <InfoBlock
        title="Корзина пуста"
        description="Добавьте хотя бы одну пару кроссовок, чтобы оформить заказ."
        imageUrl="/package-icon.png"
      />
    </div>
    <CartItem
      v-for="item in cart"
      v-if="totalPrice"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :imageUrl="item.imageUrl"
      @onClickRemove="() => removeFromCart(item)"
    />
    <div v-if="totalPrice" class="flex flex-col gap-4 mt-5">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} руб.</b>
      </div>
      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ tax }} руб.</b>
      </div>
      <button
        :disabled="!cart.length"
        @click="() => createOrder()"
        class="transition bg-lime-500 w-full rounded-xl disabled:bg-slate-300 py-3 text-white hover:bg-lime-600 active:bg-lime-700"
      >
        {{ !cart.length ? 'Корзина пуста, добавьте товар' : 'Оформить заказ' }}
      </button>
    </div>
  </div>
</template>
