import './assets/main.css'

import App from './App.vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Profile from './pages/Profile.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
    { path: '/orders', name: 'Profile', component: Profile }
  ]
})

app.use(router)
app.mount('#app')
app.use(createPinia())
app.use(autoAnimatePlugin)
