import { createRouter, createWebHashHistory  } from 'vue-router'
import Home from '../views/Home.vue'
import SutraView from '../views/SutraView.vue'
import GalleryView from '../views/GalleryView.vue'

const router = createRouter({
  history: createWebHashHistory(), // ⭐ 이걸로 바꿔
  routes: [
    { path: '/', component: Home },
    { path: '/sutra', component: SutraView },
    { path: '/gallery', component: GalleryView }
  ]
})

export default router