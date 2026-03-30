<template>
  <div class="home">
    <h1 class="title">洪狐道經</h1>
    <p class="subtitle">호돋의 가르침을 기록한 경전</p>

    <button class="enter" @click="goSutra">
      경전 입장
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goSutra = () => {
  router.push('/sutra')
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

.enter {
  padding: 12px 30px;
  background: #c9a96e;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.enter:hover {
  background: #e0c48f;
}
</style>