<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isMenuOpen = ref(false)
const route = useRoute()

// Close menu when route changes
watch(() => route.path, () => {
  isMenuOpen.value = false
})

// Prevent scroll when menu is open
watch(isMenuOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
      <nav class="max-w-[1536px] w-full mx-auto px-4 lg:px-12 xl:px-10 h-24 flex items-center justify-between">
        <NuxtLink to="/" class="text-lg lg:text-[20px] tracking-tight text-gray-900 font-normal"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 1200, type: 'keyframes', ease: [0.16, 1, 0.3, 1] } }"
        >
          Farhan Rizki
        </NuxtLink>
        <div class="flex items-center gap-4">
          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center space-x-8"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 1200, type: 'keyframes', ease: [0.16, 1, 0.3, 1], delay: 100 } }"
          >
            <NuxtLink to="/works" class="text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors" active-class="text-gray-900 font-medium">Work</NuxtLink>
            <NuxtLink to="/about" class="text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors" active-class="text-gray-900 font-medium">About</NuxtLink>
            <NuxtLink to="/contact" class="text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors" active-class="text-gray-900 font-medium">Contact</NuxtLink>
            <NuxtLink to="/login" class="px-5 py-2 rounded-full text-[13px] font-medium bg-gray-50 border border-gray-100 text-gray-700 hover:bg-gray-100 transition-colors ml-4 shadow-sm">
              Admin Login
            </NuxtLink>
          </div>

          <!-- Mobile Hamburger -->
          <button 
            @click="isMenuOpen = !isMenuOpen" 
            class="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-900 z-[60] focus:outline-none"
          >
            <div class="relative w-6 h-5">
              <span 
                class="absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out" 
                :class="isMenuOpen ? 'rotate-45 top-2' : 'top-0'"
              ></span>
              <span 
                class="absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out top-2"
                :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
              ></span>
              <span 
                class="absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out" 
                :class="isMenuOpen ? '-rotate-45 top-2' : 'top-4'"
              ></span>
            </div>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Overlay -->
      <Transition 
        enter-active-class="transition duration-500 ease-[0.16,1,0.3,1]"
        enter-from-class="opacity-0 -translate-y-full"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-400 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-full"
      >
        <div v-if="isMenuOpen" class="fixed inset-0 z-[50] md:hidden">
          <!-- Backdrop -->
          <div @click="isMenuOpen = false" class="absolute inset-0 bg-black/5 backdrop-blur-[2px]"></div>
          
          <!-- Menu Content -->
          <div class="relative bg-white shadow-2xl pb-12 border-b border-gray-100 flex flex-col h-fit">
            <!-- Menu Spacer for Header -->
            <div class="h-24 shrink-0 px-4 flex items-center">
               <span class="text-lg tracking-tight text-gray-900 font-normal">Farhan Rizki</span>
            </div>

            <!-- Menu Links -->
            <div class="px-4 sm:px-6 py-4 flex flex-col space-y-7">
              <NuxtLink @click="isMenuOpen = false" to="/works" class="text-[18px] font-normal text-gray-900 hover:text-gray-500 transition-colors">Work</NuxtLink>
              <NuxtLink @click="isMenuOpen = false" to="/about" class="text-[18px] font-normal text-gray-900 hover:text-gray-500 transition-colors">About</NuxtLink>
              <NuxtLink @click="isMenuOpen = false" to="/contact" class="text-[18px] font-normal text-gray-900 hover:text-gray-500 transition-colors">Contact</NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </header>
    <main class="pt-24">
      <slot />
    </main>
  </div>
</template>
