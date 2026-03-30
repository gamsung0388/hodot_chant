import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SutraView from '../views/SutraView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/sutra', component: SutraView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router