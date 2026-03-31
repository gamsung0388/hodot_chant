<template>
  <div class="home">
    <h1 class="title" @click="handleTitleClick" style="cursor: pointer; user-select: none;">洪狐道經</h1>
    <p class="subtitle">호돋의 가르침을 기록한 경전</p>

    <div class="button-group">
      <button 
        class="fortune-btn" 
        :class="{ shaking: isShaking }"
        @click="drawFortune"
      >
        <div class="cylinder-top"></div>
        <div class="cylinder-body">운세<br>뽑기</div>
      </button>

      <button class="enter" @click="goSutra">
        경전 입장
      </button>

      <button class="gallery-btn" @click="goGallery">
        호돋 갤러리
      </button>
    </div>

    <div v-if="showFortuneModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>오늘의 운세</h2>
        <p class="fortune-text">{{ currentFortune }}</p>
        <button class="close-btn" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGalleryStore } from '../stores/gallery.js'

const router = useRouter()
const galleryStore = useGalleryStore()

const titleClickCount = ref(0)
const handleTitleClick = () => {
  titleClickCount.value++
  if (titleClickCount.value === 5) {
    galleryStore.unlockImage(3)
  }
}

const goSutra = () => {
  router.push('/sutra')
}

const goGallery = () => {
  router.push('/gallery')
}

const showFortuneModal = ref(false)
const isShaking = ref(false)
const currentFortune = ref('')
const fortuneCount = ref(0)

const fortuneList = [
  '눈을 감고 마음속의 귀여운 호돋을 찾아보세요...',
  '경고: 오늘은 스트레스가 높으니 호돋 사진을 3번 보시길 권장합니다.',
  '대길(大吉): 오늘 귀여운 흐더디가 방송을 킵니다.',
  '소길(小吉): 오후 3시에 호돋 클립을 아무거나 하나 시청하세요. 귀엽습니다.',
  '중길(中吉): 호돋의 귀여움을 주변에 전파하면 평화가 찾아옵니다.',
  '평길(平吉): 눈을 감고 심호흡 하세요. 당신은 이미 충분히 귀엽습니다.'
]

const drawFortune = () => {
  if (isShaking.value) return
  isShaking.value = true
  
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * fortuneList.length)
    currentFortune.value = fortuneList[randomIndex]
    showFortuneModal.value = true
    isShaking.value = false

    fortuneCount.value++
    if (fortuneCount.value === 5) {
      setTimeout(() => galleryStore.unlockImage(0), 100)
    }
  }, 800)
}

const closeModal = () => {
  showFortuneModal.value = false
}
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #111;
  color: #f5e6c8;
}

.title {
  font-size: 48px;
  letter-spacing: 10px;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 16px;
  opacity: 0.7;
  margin-bottom: 40px;
}

/* 하단 버튼들 배치 */
.button-group {
  display: flex;
  align-items: flex-end;
  gap: 30px;
}

/* 운세통 (대나무통/스탠드 형태) 모양 CSS */
.fortune-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: transform 0.2s;
  padding: 0;
  outline: none;
}
.fortune-btn:hover {
  animation: hoverWiggle 1.5s infinite ease-in-out;
}
.fortune-btn.shaking {
  animation: clickShake 0.4s infinite alternate;
}

.cylinder-top {
  width: 40px;
  height: 15px;
  background: #a67c52;
  border-radius: 50%;
  border: 2px solid #8B5A2B;
  position: relative;
  z-index: 2;
  margin-bottom: -7px;
}

.cylinder-body {
  width: 50px;
  height: 90px;
  background: linear-gradient(to right, #cd9a5b, #eac786, #cd9a5b);
  border: 2px solid #8B5A2B;
  border-radius: 5px 5px 15px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3e2723;
  font-weight: 900;
  font-size: 14px;
  box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3), 3px 5px 10px rgba(0,0,0,0.5);
}

/* 흔들림 애니메이션 들 */
@keyframes hoverWiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}

@keyframes clickShake {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-3px, -2px) rotate(-10deg); }
  50% { transform: translate(3px, 2px) rotate(10deg); }
  75% { transform: translate(-3px, 2px) rotate(-10deg); }
  100% { transform: translate(3px, -2px) rotate(10deg); }
}

/* 기존 버튼 공통 스타일 */
.enter, .gallery-btn {
  height: 50px;
  padding: 0 30px;
  background: #c9a96e;
  border: none;
  border-radius: 5px;
  color: #111;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
.enter:hover, .gallery-btn:hover {
  background: #e0c48f;
  transform: translateY(-2px);
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: fadeIn 0.3s ease-out;
}
.modal-content {
  background: #fdf5e6;
  width: 90%;
  max-width: 400px;
  padding: 40px 30px;
  border-radius: 12px;
  border: 3px solid #c9a96e;
  text-align: center;
  color: #333;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.modal-content h2 {
  margin-top: 0;
  color: #8B5A2B;
  font-family: serif;
  margin-bottom: 25px;
}
.fortune-text {
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: 500;
  margin-bottom: 30px;
  word-break: keep-all;
}
.close-btn {
  padding: 8px 20px;
  background: #8B5A2B;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
}
.close-btn:hover {
  background: #6d4622;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>