import { createRouter, createWebHashHistory  } from 'vue-router'
import Home from '../views/Home.vue'
import SutraView from '../views/SutraView.vue'

const router = createRouter({
  history: createWebHashHistory(), // ⭐ 이걸로 바꿔
  routes: [
    { path: '/', component: Home },
    { path: '/sutra', component: SutraView }
  ]
})

export default router