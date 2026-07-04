import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    // electron 打包后路由不匹配
    path: '/:any(.*)*',
    component: () => import('../views/convert-home.vue')
  },
  {
    name: 'Settings',
    path: '/settings',
    component: () => import('../views/convert-settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
