import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tests',
    name: 'Tests',
    component: () => import('@/views/Tests.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
