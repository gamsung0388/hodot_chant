<template>
  <div class="gallery-wrapper">
    <div class="header-actions">
      <button class="back-btn" @click="goHome">← 홈으로</button>
    </div>
    <h1 class="gallery-title">호돋 만다라</h1>
    <p class="gallery-subtitle">신성한 호돋의 모습을 관조하세요</p>

    <div class="gallery-container">
      <GalleryCard 
        :index="1"
        :isUnlocked="galleryStore.unlocked[0]"
        :hintText="galleryStore.hints[0]"
        :imageSrc="hodot1"
        :isVisible="visibleItems.includes(1)"
        :ref="el => { if(el) frameRefs[0] = el.$el }"
      />
      
      <GalleryCard 
        :index="2"
        :isUnlocked="galleryStore.unlocked[1]"
        :hintText="galleryStore.hints[1]"
        :imageSrc="hodot2"
        :isVisible="visibleItems.includes(2)"
        :ref="el => { if(el) frameRefs[1] = el.$el }"
      />

      <GalleryCard 
        :index="3"
        :isUnlocked="galleryStore.unlocked[2]"
        :hintText="galleryStore.hints[2]"
        :imageSrc="hodot3"
        :isVisible="visibleItems.includes(3)"
        :ref="el => { if(el) frameRefs[2] = el.$el }"
      />

      <GalleryCard 
        :index="4"
        :isUnlocked="galleryStore.unlocked[3]"
        :hintText="galleryStore.hints[3]"
        :imageSrc="hodot4"
        :isVisible="visibleItems.includes(4)"
        :ref="el => { if(el) frameRefs[3] = el.$el }"
      />
    </div>

    <transition name="fade">
      <button v-if="showResetBtn" class="reset-btn" @click="handleReset">데이터 초기화</button>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useGalleryStore } from '../stores/gallery.js'
import GalleryCard from '../components/GalleryCard.vue'

import hodot1 from '../assets/image/hodot1.png'
import hodot2 from '../assets/image/hodot2.png'
import hodot3 from '../assets/image/hodot3.png'
import hodot4 from '../assets/image/hodot4.png'

const router = useRouter()
const galleryStore = useGalleryStore()
const goHome = () => router.push('/')

const handleReset = () => {
  if (confirm('모든 갤러리 해금 데이터를 초기화하고 처음부터 다시 시작하시겠습니까?')) {
    galleryStore.resetGallery()
  }
}

const frameRefs = ref([])
const visibleItems = ref([])
let observer = null

const showResetBtn = ref(false)
const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  
  // 바닥에 도달했을 때만 표시 (50px 여유)
  showResetBtn.value = scrollTop + clientHeight >= scrollHeight - 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = parseInt(entry.target.dataset.index)
      if (entry.isIntersecting) {
        if (!visibleItems.value.includes(index)) {
          visibleItems.value.push(index)
        }
      }
    })
  }, {
    threshold: 0.4
  })

  // 컴포넌트 인스턴스의 최상단 DOM 노드($el)를 감지
  frameRefs.value.forEach(el => {
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700&display=swap');

.gallery-wrapper {
  background: radial-gradient(circle at top, #061f14 0%, #010705 100%);
  min-height: 100vh;
  color: #d9f99d;
  font-family: 'Nanum Myeongjo', serif;
  padding: 40px 20px 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-actions {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.back-btn {
  background: transparent;
  border: 1px solid #a3e635;
  color: #a3e635;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
}

.back-btn:hover {
  background: #a3e635;
  color: #010705;
}

.reset-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: rgba(1, 7, 5, 0.8);
  backdrop-filter: blur(4px);
  border: 1px solid #f87171;
  color: #f87171;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  z-index: 100;
}

.reset-btn:hover {
  background: #f87171;
  color: #010705;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.gallery-title {
  font-size: 3rem;
  color: #bef264;
  text-shadow: 0 0 15px rgba(190, 242, 100, 0.4);
  margin-bottom: 10px;
}
.gallery-subtitle {
  color: #a3e635;
  margin-bottom: 60px;
}

.gallery-container {
  display: flex;
  flex-direction: column;
  gap: 150px;
  width: 100%;
  max-width: 600px;
  align-items: center;
}
</style>
