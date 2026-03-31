import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGalleryStore = defineStore('gallery', () => {
  const stored = localStorage.getItem('hodot_gallery')
  const unlocked = ref(stored ? JSON.parse(stored) : [false, false, false, false])
  
  const hints = [
    "운세를 5번 보면...",
    "경전을 끝까지 읽어 깨달음을 얻으면...",
    "경전 뒤를 맴도는 3개의 빛무리를 손으로 거두면...",
    "메인 화면의 거대한 '洪狐道經' 글귀를 5번 연속으로 절실히 두드리면..."
  ]

  const showModal = ref(false)
  const newlyUnlockedIndex = ref(-1)

  const unlockImage = (index) => {
    if (unlocked.value[index]) return
    
    unlocked.value[index] = true
    localStorage.setItem('hodot_gallery', JSON.stringify(unlocked.value))
    
    newlyUnlockedIndex.value = index
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    newlyUnlockedIndex.value = -1
  }

  const resetGallery = () => {
    unlocked.value = [false, false, false, false]
    localStorage.removeItem('hodot_gallery')
  }

  return { unlocked, hints, unlockImage, showModal, newlyUnlockedIndex, closeModal, resetGallery }
})
