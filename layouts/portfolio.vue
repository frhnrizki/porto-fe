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
      </nav>
    </header>
    <main class="pt-24">
      <slot />
    </main>
  </div>
</template>
