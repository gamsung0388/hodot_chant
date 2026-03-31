<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useGalleryStore } from './stores/gallery.js'

const galleryStore = useGalleryStore()

const getImageUrl = (i) => {
  switch(i) {
    case 1: return new URL('./assets/image/hodot1.png', import.meta.url).href
    case 2: return new URL('./assets/image/hodot2.png', import.meta.url).href
    case 3: return new URL('./assets/image/hodot3.png', import.meta.url).href
    case 4: return new URL('./assets/image/hodot4.png', import.meta.url).href
    default: return ''
  }
}

const currentUnlockImageSrc = computed(() => {
  if (galleryStore.newlyUnlockedIndex === -1) return ''
  return getImageUrl(galleryStore.newlyUnlockedIndex + 1)
})
</script>

<template>
  <router-view />

  <transition name="fade">
    <div v-if="galleryStore.showModal" class="global-modal-overlay" @click="galleryStore.closeModal">
      <div class="global-modal-content" @click.stop>
        <h2 class="unlock-title">🎉 새로운 업적 달성!</h2>
        <p class="unlock-desc">호돋 갤러리의 {{ galleryStore.newlyUnlockedIndex + 1 }}번째 만다라가 해금되었습니다.</p>
        
        <div class="unlocked-img-wrapper">
          <img :src="currentUnlockImageSrc" class="unlocked-img" alt="해금 이미지" />
          <div class="unlocked-glare"></div>
        </div>
        
        <button class="unlock-close-btn" @click="galleryStore.closeModal">닫기</button>
      </div>
    </div>
  </transition>
</template>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}

.global-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(1, 7, 5, 0.85);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.global-modal-content {
  background: #0d1a15;
  border: 2px solid #bef264;
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 0 50px rgba(190, 242, 100, 0.3);
  max-width: 90%;
  animation: modalPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.unlock-title {
  color: #bef264;
  font-family: 'Nanum Myeongjo', serif;
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(190, 242, 100, 0.5);
}

.unlock-desc {
  color: #a3e635;
  margin-bottom: 25px;
}

.unlocked-img-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(163, 230, 53, 0.4);
  margin-bottom: 20px;
}

.unlocked-img {
  display: block;
  max-width: 300px;
  max-height: 50vh;
  object-fit: contain;
}

.unlocked-glare {
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(to bottom right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
  transform: rotate(45deg);
  animation: glare 2s ease-in-out infinite alternate;
  pointer-events: none;
}

.unlock-close-btn {
  background: transparent;
  border: 1px solid #bef264;
  color: #bef264;
  padding: 10px 40px;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  display: block;
  margin: 0 auto;
}

.unlock-close-btn:hover {
  background: #bef264;
  color: #0d1a15;
}

@keyframes modalPop {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes glare {
  0% { transform: translateX(-50%) rotate(45deg); }
  100% { transform: translateX(50%) rotate(45deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
