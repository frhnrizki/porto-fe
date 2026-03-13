<template>
  <footer class="bg-[#111111] text-white pt-24 pb-8 px-8 md:px-16 mt-12 w-full flex flex-col justify-between min-h-[600px]">

    <!-- Top Section (Split) -->
    <div class="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-16 md:gap-0 mt-8">

      <!-- Left: Heading & Button -->
      <div class="flex flex-col items-start max-w-2xl">
        <h2 class="text-5xl md:text-[3.8rem] font-medium leading-[1.05] tracking-tight mb-12">
          <span class="text-gray-400">Let's design</span><br/>
          <span class="text-gray-400">something </span><span class="text-white">great</span><br/>
          <span class="text-white">together.</span>
        </h2>

        <a href="mailto:farhanrizki475@gmail.com" class="inline-flex items-center justify-center px-6 py-3.5 text-[15px] font-medium rounded-[14px] text-black bg-white hover:bg-gray-100 transition-colors shadow-sm">
          Let's Collaborate
        </a>
      </div>

      <!-- Right: Links -->
      <div class="flex gap-20 md:gap-24 md:pt-4">
        <div class="flex flex-col gap-6">
          <NuxtLink to="/" class="text-white hover:text-gray-300 transition-colors text-[15px] font-medium">Home</NuxtLink>
          <NuxtLink to="/works" class="text-white hover:text-gray-300 transition-colors text-[15px] font-medium">Works</NuxtLink>
          <NuxtLink to="/about" class="text-white hover:text-gray-300 transition-colors text-[15px] font-medium">About</NuxtLink>
          <NuxtLink to="/contact" class="text-white hover:text-gray-300 transition-colors text-[15px] font-medium" active-class="text-white underline underline-offset-8">Contact</NuxtLink>
        </div>
        <div class="flex flex-col gap-6">
          <a href="#" class="text-white hover:text-gray-300 transition-colors text-[15px] font-medium">LinkedIn</a>
          <a href="#" class="text-white hover:text-gray-300 transition-colors text-[15px] font-medium">Instagram</a>
        </div>
      </div>

    </div>

    <!-- Middle Section: Email -->
    <div class="max-w-7xl mx-auto w-full flex justify-center items-center mt-32 mb-16">
      <a href="mailto:farhanrizki475@gmail.com" class="text-gray-300 hover:text-white transition-colors text-[20px] md:text-[24px] tracking-tight">
        farhanrizki475@gmail.com
      </a>
    </div>

    <!-- Bottom Section: Copyright -->
    <div class="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4 md:gap-0">
      <p class="text-gray-500 text-[14px]">© 2025 All right reserved</p>
      <p class="text-gray-500 text-[14px]">Created by <span class="text-white font-medium">Farhan Rizki</span></p>
    </div>

  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>
