<template>
  <div 
    class="frame-wrapper" 
    :class="{ visible: isVisible, locked: !isUnlocked }"
    :data-index="index"
  >
    <template v-if="isUnlocked">
      <img :src="imageSrc" :alt="`호돋 ${index}`" class="frame-img" />
      <div class="frame-caption">Hodot {{ index }}</div>
    </template>
    
    <template v-else>
      <div class="locked-placeholder">
        <span class="locked-icon">🔒</span>
        
        <div v-if="!showHint" class="hint-container">
          <p class="hint-title">???</p>
          <button class="hint-btn" @click="showHint = true">힌트 보기</button>
        </div>
        
        <p v-else class="hint-text">힌트: {{ hintText }}</p>
      </div>
      <div class="frame-caption" style="color:#666; text-shadow:none;">???</div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  index: { type: Number, required: true },
  isUnlocked: { type: Boolean, required: true },
  hintText: { type: String, required: true },
  imageSrc: { type: String, required: true },
  isVisible: { type: Boolean, required: true }
})

const showHint = ref(false)
</script>

<style scoped>
.frame-wrapper {
  opacity: 0.1;
  transform: translateY(100px) scale(0.95);
  filter: grayscale(80%) brightness(30%);
  transition: all 1s ease-out;
  
  padding: 15px;
  background: #111;
  border: 2px solid #2d3748;
  border-radius: 8px;
  position: relative;
}

.frame-wrapper.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: grayscale(0%) brightness(100%);
  border-color: #a3e635;
}

.frame-wrapper:hover {
  transform: scale(1.02);
  box-shadow: 0 0 25px 5px rgba(163, 230, 53, 0.5);
  border-color: #bef264;
  transition: all 0.3s ease-out;
}

.frame-wrapper.locked:hover {
  border-color: #2d3748;
  box-shadow: none;
  transform: none;
}

.frame-img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.frame-caption {
  text-align: center;
  margin-top: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #ecfccb;
  text-shadow: 0 0 5px rgba(236, 252, 203, 0.5);
}

.locked-placeholder {
  width: 400px;
  max-width: 100%;
  height: 500px;
  background: #010705;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed #2d3748;
}

.locked-icon {
  font-size: 4rem;
  margin-bottom: 30px;
}

.hint-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.hint-title {
  color: #666;
  font-size: 1.2rem;
  margin: 0;
}

.hint-btn {
  background: transparent;
  border: 1px solid #a3e635;
  color: #a3e635;
  padding: 6px 12px;
  font-size: 0.9rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hint-btn:hover {
  background: #a3e635;
  color: #010705;
}

.hint-text {
  color: #a3e635;
  font-size: 1rem;
  text-align: center;
  padding: 0 30px;
  opacity: 0.8;
  line-height: 1.6;
  word-break: keep-all;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 0.8; transform: translateY(0); }
}
</style>
