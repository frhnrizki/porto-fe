<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="flex justify-between items-end mb-12">
      <h2 class="lg:text-[36px] font-medium tracking-tight text-gray-900"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, type: 'spring', bounce: 0.1 } }">
        Featured works
      </h2>
      <NuxtLink to="/works" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f8f9fa] hover:bg-gray-100 text-gray-900 text-[13.5px] font-medium transition-colors"
         v-motion
         :initial="{ opacity: 0, x: 20 }"
         :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800, delay: 100, type: 'spring', bounce: 0.1 } }">
        All Works
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        </svg>
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink v-for="(project, index) in projects" 
           :key="project.id" 
           :to="`/works/${project.id}`"
           class="group relative rounded-[32px] overflow-hidden bg-gray-100 aspect-[4/3] block shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
           v-motion
           :initial="{ opacity: 0, y: 50 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 + (index * 150), type: 'spring', bounce: 0.1 } }">
        <!-- Skeleton / Loading fallback -->
        <div class="absolute inset-0 bg-gray-200 animate-pulse -z-10"></div>

        <img :src="project.imageUrl" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div class="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p class="text-white/80 text-sm font-medium mb-1">{{ project.category }}</p>
          <h3 class="text-white text-2xl font-bold">{{ project.title }}</h3>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  projects: Array<{
    id: number
    title: string
    category: string
    imageUrl: string
    link: string
  }>
}>()
</script>
