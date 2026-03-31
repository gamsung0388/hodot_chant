<template>
<div class="sutra-bg">
    <button class="back-btn" @click="goHome">← 홈으로</button>
    <div class="fireflies-layer">
        <div 
          v-for="n in 20" 
          :key="n" 
          class="firefly" 
          :class="{ caught: caughtFireflies.includes(n) }"
          :style="getFireflyStyle(n)"
          @click="catchFirefly(n)"
        ></div>
    </div>

    <div class="content">
        <h1 class="main-title" style="text-align: center;">洪狐道經</h1>
        <h1 class="sub-title" style="text-align: center;">[홍호도경]</h1>
        <div
            v-for="(line, index) in sutraLines"
            :key="index"
            class="sutra-block"
            :style="{ animationDelay: `${index * 0.6}s` }"
        >
            <p class="kor">{{ line.kor }}</p>
            <p class="han">{{ line.han }}</p>
            <p v-if="line.bun" class="bun">{{ line.bun }}</p>
        </div>
    </div>
    <AudioPlayer />
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AudioPlayer from './AudioPlayer.vue'
import { useGalleryStore } from '../stores/gallery.js'

const router = useRouter()
const galleryStore = useGalleryStore()
const goHome = () => router.push('/')

const sutraLines = [
    {
        kor: "나는 이와 같이 호돋의 가르침을 직접 들었노라.",
        han: "如是我聞",
        bun: "여시아문"
    },
    {
        kor: "어느 때에 홍호돋이 세상에 나타나니",
        han: "一時洪狐道出於世間",
        bun: "일시 홍호돋 출어세간",
    },
    {
        kor: "그 모습이 부드럽고 밝아",
        han: "其相柔和光明",
        bun: "기상 유화 광명",
    },
    {
        kor: "중생이 이를 보고 잠시 번뇌를 멈추더라.",
        han: "衆生見之暫息煩惱",
        bun: "중생 견지 잠식번뇌",
    },
    {
        kor: "형상은 곧 귀여움이요, 귀여움이 곧 형상이니라.",
        han: "色卽是萌萌卽是色",
        bun: "색즉시맹 맹즉시색",
    },
    {
        kor: "어디에도 집착하지 말고 귀여움을 일으킬지니",
        han: "應無所住而生其萌",
        bun: "응무소주 이생기맹",
    },
    {
        kor: "그 마음이 곧 청정함이니라.",
        han: "其心卽是淸淨",
        bun: "기심 즉시청정",
    },
    {
        kor: "모든 것은 덧없으되 웃음과 빛과 같아",
        han: "一切有爲法如笑如光",
        bun: "일체유위법 여소여광",
    },
    {
        kor: "홍호돋의 미소는 모든 중생의 마음을 밝히느니라.",
        han: "洪狐道之笑照破衆心",
        bun: "홍호돋 지소 조파중심",
    },
    {
        kor: "어떤 이가 물어 이르되",
        han: "有人問曰",
        bun: "유인 문왈",
    },
    {
        kor: "어찌하여 이처럼 사랑스러운가",
        han: "何故如是可愛",
        bun: "하고 여시 가애",
    },
    {
        kor: "답하되",
        han: "答曰",
        bun: "답왈",
    },
    {
        kor: "본래 꾸밈이 없고 자연스러움이니",
        han: "本來無飾自然",
        bun: "본래 무식 자연",
    },
    {
        kor: "이것이 귀여움의 근원이니라.",
        han: "是爲萌之本源",
        bun: "시위 맹지본원",
    },
    {
        kor: "악을 짓지 말고 선을 행하며 마음을 맑게 하라",
        han: "諸惡莫作衆善奉行自淨其意",
        bun: "제악막작 중선봉행 자정기의",
    },
    {
        kor: "홍호돋을 보고 기쁨을 일으키는 것 또한",
        han: "見洪狐道而生歡喜",
        bun: "견홍호돋 이생환희",
    },
    {
        kor: "또한 선행이니라.",
        han: "亦是善行",
        bun: "역시선행",
    },
    {
        kor: "스스로를 등불로 삼고 법을 등불로 삼되",
        han: "自燈明法燈明",
        bun: "자등명 법등명",
    },
    {
        kor: "그 귀여움을 거울 삼아",
        han: "以其萌爲鏡",
        bun: "이기맹 위경",
    },
    {
        kor: "자신의 마음을 비출지니라.",
        han: "觀自其心",
        bun: "관자기심",
    },
    {
        kor: "홍호돋을 보는 자는",
        han: "見洪狐道者",
        bun: "견홍호돋자",
    },
    {
        kor: "잠시 번뇌를 떠나 작은 평안을 얻나니",
        han: "暫離煩惱得小安樂",
        bun: "잠리번뇌 득소안락",
    },
    {
        kor: "이는 꿈과 환상과 거품과 그림자와 같으되",
        han: "如夢幻泡影",
        bun: "여몽환포영",
    },
    {
        kor: "한 생각의 기쁨은 또한 마음을 밝히느니라.",
        han: "一念之喜亦能明心",
        bun: "일념지희 역능명심",
    },
    {
        kor: "그러므로 마땅히 알지니",
        han: "是故當知",
        bun: "시고 당지",
    },
    {
        kor: "홍호돋을 찬탄하는 자는",
        han: "讚歎洪狐道者",
        bun: "찬탄홍호돋자",
    },
    {
        kor: "이미 기쁨의 길에 들어선 것이요",
        han: "已入歡喜之道",
        bun: "이입환희지도",
    },
    {
        kor: "그 귀여움을 함께 나누는 자는",
        han: "與衆分享其萌者",
        bun: "여중분향기맹자",
    },
    {
        kor: "널리 선한 인연을 쌓는 것이니라.",
        han: "廣積善緣",
        bun: "광적선연",
    },
    {
        kor: "나무 가애보살 마하살",
        han: "南無可愛菩薩摩訶薩",
        bun: "나무 가애보살 마하살",
    },
]

const getFireflyStyle = (n) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 8 + Math.random() * 8; 
  return {
    left: `${randomX}%`,
    top: `${randomY}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };
}

const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    galleryStore.unlockImage(1)
  }
}

const firefliesCaughtCount = ref(0)
const caughtFireflies = ref([])

const catchFirefly = (n) => {
  if (caughtFireflies.value.includes(n)) return
  caughtFireflies.value.push(n)
  firefliesCaughtCount.value++
  
  if (firefliesCaughtCount.value === 3) {
    galleryStore.unlockImage(2)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
body {
  margin: 0;
  background-color: #010705;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700&display=swap');

.sutra-bg {
  min-height: 100vh;
  background: radial-gradient(circle at top, #061f14 0%, #010705 100%);
  color: #d9f99d; 
  font-family: 'Nanum Myeongjo', serif;
  padding: 40px 0 80px 0; 
  overflow-x: hidden;
  position: relative;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  border: 1px solid #a3e635;
  color: #a3e635;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  z-index: 20;
}
.back-btn:hover {
  background: #a3e635;
  color: #010705;
}

.main-title {
  color: #bef264;
  text-shadow: 0 0 15px rgba(190, 242, 100, 0.4);
  margin-bottom: 10px;
}
.sub-title {
  color: #a3e635;
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 50px;
  font-weight: 400;
}

.sutra-block {
  text-align: center;
  margin-bottom: 40px;
  opacity: 0; 
  animation: floatFade 2s ease-out forwards;
}

.kor { margin: 5px 0; font-size: 1.1rem; color: #d9f99d; }
.han { 
  margin: 5px 0; 
  font-size: 1.8rem; 
  font-weight: 700; 
  color: #ecfccb; 
  text-shadow: 0 0 10px rgba(236, 252, 203, 0.2);
}
.bun { margin: 5px 0; font-size: 0.9rem; color: #84cc16; }

.fireflies-layer {
  position: fixed; 
  top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 0;
}
.content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  background: rgba(1, 7, 5, 0.75);
  backdrop-filter: blur(4px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.6);
}

.firefly {
  position: absolute;
  width: 14px; height: 14px;
  background-color: #a3e635;
  border-radius: 50%;
  box-shadow: 0 0 15px 5px rgba(163, 230, 53, 0.4);
  opacity: 0;
  animation: drift ease-in-out infinite alternate;
  cursor: pointer;
  pointer-events: auto;
  transition: width 0.2s, height 0.2s, background-color 0.2s, opacity 0.5s;
}

.firefly:hover {
  width: 20px; height: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.6);
}

.firefly.caught {
  opacity: 0 !important;
  pointer-events: none;
}

@keyframes drift {
  0% { transform: translateY(0); opacity: 0; }
  30% { opacity: 0.8; }
  70% { opacity: 0.5; }
  100% { transform: translateY(-80px); opacity: 0; }
}

@keyframes floatFade {
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>
