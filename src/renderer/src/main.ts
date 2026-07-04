import { createApp } from 'vue'
import App from './App.vue'
import router from '@renderer/router' // electron.vite.config.ts 目录别名

import '@renderer/assets/tailwind.scss'
import '@renderer/assets/global.scss'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

const app = createApp(App)
// vue-router@4
app.use(router)
// pinia
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
