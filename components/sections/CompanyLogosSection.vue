<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
    <h3 class="text-center text-[22px] lg:text-[36px] font-medium text-gray-900 mb-12 tracking-tight">Featured Background Company</h3>
    
    <!-- Marquee Container with Gradient Edges -->
    <div class="relative overflow-hidden" @mouseenter="hovered = true" @mouseleave="hovered = false">
      <!-- Left Gradient Fade -->
      <div class="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <!-- Right Gradient Fade -->
      <div class="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <!-- Scrolling Track -->
      <div ref="trackRef" class="flex items-center gap-12 lg:gap-[100px] whitespace-nowrap will-change-transform">
        <div v-for="company in companies" :key="company.name + '-a'" class="flex-shrink-0 flex items-center justify-center">
          <img :src="company.logoUrl" :alt="company.name" class="h-14 lg:h-[94px] w-auto object-contain pointer-events-none select-none" />
        </div>
        <!-- Duplicate for seamless loop -->
        <div v-for="company in companies" :key="company.name + '-b'" class="flex-shrink-0 flex items-center justify-center">
          <img :src="company.logoUrl" :alt="company.name" class="h-14 lg:h-[94px] w-auto object-contain pointer-events-none select-none" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  companies: Array<{
    name: string
    logoUrl: string
  }>
}>()

const trackRef = ref<HTMLElement | null>(null)
const hovered = ref(false)

const normalSpeed = 1.2
const hoverSpeed = 0.3
let currentSpeed = normalSpeed
let offset = 0
let rafId = 0

const animate = () => {
  // Smoothly interpolate speed
  const targetSpeed = hovered.value ? hoverSpeed : normalSpeed
  currentSpeed += (targetSpeed - currentSpeed) * 0.05

  offset += currentSpeed
  if (trackRef.value) {
    const halfWidth = trackRef.value.scrollWidth / 2
    if (offset >= halfWidth) offset -= halfWidth
    trackRef.value.style.transform = `translateX(-${offset}px)`
  }
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})
</script>
