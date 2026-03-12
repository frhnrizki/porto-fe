<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
    <h3 class="text-center text-[22px] lg:text-[36px] font-medium text-gray-900 mb-12 tracking-tight">Featured Background Company</h3>
    <div class="flex flex-wrap justify-center items-center gap-12 lg:gap-[100px]">
      <div v-for="company in companies" :key="company.name" class="flex items-center justify-center">
        <img :src="company.logoUrl" :alt="company.name" class="h-14 lg:h-[94px] w-auto object-contain transition-transform hover:scale-105 duration-300 pointer-events-none select-none" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  companies: Array<{
    name: string
    logoUrl: string
  }>
}>()
</script>
