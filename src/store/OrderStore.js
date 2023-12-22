import axios from 'axios'
import { defineStore } from 'pinia'

export const useOrdersStore = defineStore({
  id: 'orders',
  state: () => ({
    orders: []
  }),
  actions: {
    async fetchOrders() {
      try {
        const { data } = await axios.get('https://5289814c0afd45de.mokky.dev/orders')
        this.orders = data
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    flattenItems() {
      return this.orders.reduce((acc, order) => acc.concat(order.items), [])
    },
    totalAmount() {
      return this.flattenItems.reduce((total, item) => total + item.price, 0)
    },
    hasOrders() {
      return this.orders.length > 0
    }
  }
})
