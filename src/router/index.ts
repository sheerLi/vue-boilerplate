import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/pages/home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
