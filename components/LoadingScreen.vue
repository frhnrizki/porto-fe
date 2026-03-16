<template>
  <Transition name="loader-exit">
    <div v-if="!done" class="loader-screen">
      <!-- Brand Name (appears near 100%) -->
      <Transition name="brand-reveal">
        <h1 v-if="showBrand" class="loader-brand">
          <span class="brand-text">frhnrizki</span>
        </h1>
      </Transition>

      <!-- Percentage Counter -->
      <div class="loader-counter">{{ displayPercent }}</div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const percent = ref(0)
const showBrand = ref(false)
const done = ref(false)

const displayPercent = computed(() => Math.floor(percent.value))

onMounted(() => {
  let start = null
  const totalDuration = 2400 // ms for 0→100

  function tick(timestamp) {
    if (!start) start = timestamp
    const elapsed = timestamp - start
    const progress = Math.min(elapsed / totalDuration, 1)

    // Eased progress — starts fast, slows near end
    const eased = 1 - Math.pow(1 - progress, 3)
    percent.value = eased * 100

    // Show brand around 75%
    if (percent.value >= 70 && !showBrand.value) {
      showBrand.value = true
    }

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      percent.value = 100
      // Wait a moment at 100, then exit
      setTimeout(() => {
        done.value = true
      }, 600)
    }
  }

  requestAnimationFrame(tick)
})
</script>

<style scoped>
.loader-screen {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Counter (bottom-right) ── */
.loader-counter {
  position: absolute;
  bottom: 40px;
  right: 48px;
  font-family: 'Instrument Sans', 'Montserrat', sans-serif;
  font-size: 48px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -1px;
  font-variant-numeric: tabular-nums;
}

/* ── Brand Name ── */
.loader-brand {
  margin: 0;
  position: relative;
  overflow: hidden;
}

.brand-text {
  font-family: 'Instrument Sans', 'Montserrat', sans-serif;
  font-size: clamp(28px, 5vw, 56px);
  font-weight: 500;
  letter-spacing: -1px;
  color: rgba(255, 255, 255, 0.6);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.9) 45%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.9) 55%,
    rgba(255, 255, 255, 0.4) 100%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-text 2s ease-in-out infinite;
}

@keyframes shimmer-text {
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
}

/* ── Brand Reveal Transition ── */
.brand-reveal-enter-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.brand-reveal-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
  filter: blur(8px);
}

.brand-reveal-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
}

/* ── Loader Exit Transition ── */
.loader-exit-leave-active {
  transition: all 0.7s cubic-bezier(0.65, 0, 0.35, 1);
}

.loader-exit-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.loader-exit-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
