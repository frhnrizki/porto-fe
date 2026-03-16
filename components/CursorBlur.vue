<template>
  <div ref="cursorEl" class="cursor-ring"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorEl = ref(null)

let mouseX = 0
let mouseY = 0
let currentX = 0
let currentY = 0
let currentScale = 1
let targetScale = 1
let rafId = null

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function onMouseEnterInteractive() {
  targetScale = 1.5
}

function onMouseLeaveInteractive() {
  targetScale = 1
}

function animate() {
  currentX += (mouseX - currentX) * 0.12
  currentY += (mouseY - currentY) * 0.12
  currentScale += (targetScale - currentScale) * 0.12

  if (cursorEl.value) {
    cursorEl.value.style.transform = `translate3d(${currentX - 20}px, ${currentY - 20}px, 0) scale(${currentScale})`
  }

  rafId = requestAnimationFrame(animate)
}

function bindInteractiveElements() {
  const elements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
  elements.forEach((el) => {
    el.addEventListener('mouseenter', onMouseEnterInteractive)
    el.addEventListener('mouseleave', onMouseLeaveInteractive)
  })
}

let observer = null

onMounted(() => {
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    bindInteractiveElements()

    observer = new MutationObserver(() => {
      bindInteractiveElements()
    })
    observer.observe(document.body, { childList: true, subtree: true })
  } else {
    if (cursorEl.value) cursorEl.value.style.display = 'none'
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  mix-blend-mode: difference;
  transition: width 0.3s ease, height 0.3s ease, border-width 0.3s ease;
}
</style>
