<template>
  <div class="bg-[#0a0a0a] min-h-screen text-white overflow-hidden pb-40 font-sans selection:bg-purple-500/30">
    <ScrollProgress />
    
    <!-- Hero Section -->
    <div class="h-screen flex flex-col items-center justify-center relative px-4">
      <div v-parallax="{ speed: 0.3 }" class="text-center z-10 flex flex-col items-center">
        <div v-reveal="{ direction: 'scale', duration: 800 }" class="w-16 h-16 bg-purple-500/20 rounded-2xl border border-purple-500/50 flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A435F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </div>
        <h1 v-reveal="{ direction: 'down', duration: 1000, delay: 200 }" class="text-5xl md:text-8xl font-bold mb-6 tracking-tight bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">Scroll Animations</h1>
        <p v-reveal="{ delay: 500 }" class="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">A lightweight, performant library using Intersection Observer and Vue Directives.</p>
      </div>
      
      <!-- Background parallax element -->
      <div v-parallax="{ speed: -0.1 }" class="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div class="w-[80vw] h-[80vw] bg-purple-600 rounded-full blur-[120px]"></div>
      </div>
    </div>

    <!-- Fade In Up Section -->
    <section class="max-w-5xl mx-auto px-6 py-32">
      <div class="mb-16">
        <h2 v-reveal class="text-4xl md:text-5xl font-bold mb-4">Fade In Up</h2>
        <p v-reveal="{ delay: 100 }" class="text-gray-400 text-lg">The standard, smooth reveal effect for content blocks.</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div v-reveal="{ delay: 0 }" class="bg-[#161616] p-10 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
          <h3 class="text-2xl font-bold mb-4 text-white">Fast Reveal</h3>
          <p class="text-gray-400 leading-relaxed">This card animates in immediately when it enters the viewport. It uses the default upward translate and opacity fade.</p>
        </div>
        <div v-reveal="{ delay: 200 }" class="bg-[#161616] p-10 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
          <h3 class="text-2xl font-bold mb-4 text-white">Delayed Reveal</h3>
          <p class="text-gray-400 leading-relaxed">This card introduces a 200ms delay to create a cascading, sequential entrance effect that feels natural.</p>
        </div>
      </div>
    </section>

    <!-- Staggered List Section -->
    <section class="max-w-5xl mx-auto px-6 py-32">
      <div class="bg-[#161616] rounded-[3rem] p-10 md:p-16 border border-white/5">
        <div class="mb-16">
          <h2 v-reveal class="text-4xl md:text-5xl font-bold mb-4">Staggered List</h2>
          <p v-reveal="{ delay: 100 }" class="text-gray-400 text-lg">Automatically apply sequential delays to child elements.</p>
        </div>

        <div v-stagger="150" class="flex flex-col gap-4">
          <div v-for="i in 5" :key="i" v-reveal="{ direction: 'left', distance: '30px' }" class="bg-[#111] p-6 rounded-2xl flex items-center gap-6 border border-white/5 hover:bg-[#1a1a1a] transition-colors">
            <div class="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">{{ i }}</div>
            <div>
              <h4 class="text-lg font-bold text-white mb-1">List Item {{ i }}</h4>
              <p class="text-sm text-gray-500">Sliding in from the left with an automated stagger delay.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scale & Directional Section -->
    <section class="max-w-5xl mx-auto px-6 py-32 text-center">
      <h2 v-reveal="{ direction: 'scale' }" class="text-4xl md:text-5xl font-bold mb-20">Directional & Scale</h2>
      
      <div class="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
        <div v-reveal="{ direction: 'left', duration: 1000 }" class="w-48 h-48 bg-blue-500/10 rounded-3xl border border-blue-500/20 flex flex-col items-center justify-center text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <span class="font-bold tracking-wide">LEFT</span>
        </div>
        
        <div v-reveal="{ direction: 'scale', duration: 800 }" class="w-56 h-56 bg-purple-500/10 rounded-full border border-purple-500/20 flex flex-col items-center justify-center text-purple-400 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3"><circle cx="12" cy="12" r="10"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
          <span class="font-bold tracking-widest">SCALE</span>
        </div>
        
        <div v-reveal="{ direction: 'right', duration: 1000 }" class="w-48 h-48 bg-green-500/10 rounded-3xl border border-green-500/20 flex flex-col items-center justify-center text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          <span class="font-bold tracking-wide">RIGHT</span>
        </div>
      </div>
    </section>

    <!-- Parallax Section -->
    <section class="min-h-screen relative flex items-center overflow-hidden py-32">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a0b2e] to-[#0a0a0a] opacity-80 pointer-events-none"></div>
      
      <div class="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col items-center">
        <h2 v-reveal class="text-5xl md:text-7xl font-bold mb-20 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Parallax Depth</h2>
        
        <div class="relative w-full h-[600px] border border-white/10 rounded-[3rem] overflow-hidden bg-[#0d0d0d] shadow-2xl">
           
           <!-- Parallax elements -->
           <div v-parallax="{ speed: 0.5 }" class="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 bg-purple-500 rounded-2xl opacity-60 blur-md mix-blend-screen"></div>
           <div v-parallax="{ speed: -0.3, direction: 'down' }" class="absolute bottom-20 right-10 md:bottom-40 md:right-40 w-48 h-48 bg-blue-500 rounded-full opacity-40 blur-lg mix-blend-screen"></div>
           <div v-parallax="{ speed: 0.15 }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-64 border-y border-white/5 -rotate-12 pointer-events-none"></div>
           <div v-parallax="{ speed: 0.25 }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full pointer-events-none"></div>
           
           <div class="absolute inset-0 flex items-center justify-center p-6">
             <div v-reveal="{ direction: 'scale' }" class="bg-black/40 backdrop-blur-xl p-10 rounded-3xl border border-white/10 text-center max-w-md shadow-2xl">
               <h3 class="text-2xl font-bold mb-4 text-white">Floating in space</h3>
               <p class="text-gray-400 leading-relaxed">Different elements moving at different relative speeds create an illusion of depth and physical space.</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Vue layout setting
definePageMeta({
  layout: false // Unset default layout so it takes full screen height natively
});

import ScrollProgress from '~/components/ui/ScrollProgress.vue';
</script>
