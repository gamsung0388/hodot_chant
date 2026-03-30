<template>
  <div class="player">
    <div class="info">
      🎵 {{ currentTrack.title }}
    </div>

    <div class="controls">
      <button @click="togglePlay">
        {{ isPlaying ? '⏸' : '▶️' }}
      </button>
      <button @click="nextTrack">⏭</button>
      <!-- 🔥 볼륨 -->
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="volume"
        @input="changeVolume"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tracks = [
  { title: '경전의 시작', src: '/hodot_chant/audio/audio1.mp3' },
  { title: '고요한 흐름', src: '/hodot_chant/audio/audio2.mp3' },
]

const currentIndex = ref(0)
const isPlaying = ref(false)
const audio = new Audio(tracks[0].src)

const currentTrack = ref(tracks[0])

// 🔥 여기 추가
onMounted(() => {
  const startBgm = () => {
    if (!isPlaying.value) {
      audio.volume = 0
      audio.play()
      isPlaying.value = true

      // fade-in
      let vol = 0
      const fade = setInterval(() => {
        vol += 0.05
        if (vol >= 0.3) {
          vol = 0.3
          clearInterval(fade)
        }
        audio.volume = vol
      }, 200)
    }

    window.removeEventListener('click', startBgm)
  }

  window.addEventListener('click', startBgm)
})

const togglePlay = () => {
  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play()
  }
  isPlaying.value = !isPlaying.value
}

const nextTrack = () => {
  currentIndex.value = (currentIndex.value + 1) % tracks.length
  currentTrack.value = tracks[currentIndex.value]

  audio.src = currentTrack.value.src
  audio.play()
  isPlaying.value = true
}

const volume = ref(0.3)

const changeVolume = () => {
  audio.volume = volume.value
}
</script>