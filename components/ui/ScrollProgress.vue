<template>
  <div class="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[100] pointer-events-none">
    <div 
      class="h-full bg-gradient-to-r from-purple-500 to-blue-500 origin-left transition-transform duration-100 ease-out"
      :style="{ transform: `scaleX(${progress})` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);
let isTicking = false;

const calculateProgress = () => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        progress.value = scrollTop / docHeight;
      } else {
        progress.value = 0;
      }
      isTicking = false;
    });
    isTicking = true;
  }
};

onMounted(() => {
  window.addEventListener('scroll', calculateProgress, { passive: true });
  calculateProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', calculateProgress);
});
</script>
