<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-[60px] xl:gap-[130px] mb-20 items-start justify-between">
      <div class="lg:w-[320px] shrink-0 pl-2 lg:pl-0">
        <h2 class="text-[22px] font-medium text-gray-500 tracking-tight">Services</h2>
      </div>
      <div class="flex-1 max-w-[850px] pr-2 lg:pr-10">
        <p class="text-[28px] lg:text-[42px] text-gray-900 leading-[1.15] font-medium tracking-tight">
          <span class="text-gray-500">Design solutions that elevate brands and create seamless user experiences.</span> 
          I help bring ideas to life with strategy and creativity
        </p>
      </div>
    </div>

    <!-- Purple Gallery Card -->
    <div class="rounded-[1.8rem] bg-[#111111] p-[8px] shadow-2xl relative overflow-hidden group flex flex-col gap-[6px]">
      
      <!-- Top Title Bar -->
      <div class="bg-[#A435F0] rounded-[1.5rem] px-4 py-4 grid relative overflow-hidden">
        <div class="col-start-1 row-start-1 flex justify-between items-center transition-all duration-500 group-hover:-translate-y-4 group-hover:opacity-0 relative z-10 w-full">
          <h3 class="text-xl md:text-[22px] font-medium text-white tracking-tight">UI/UX Design</h3>
          <div class="bg-white rounded-[0.6rem] p-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A435F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-figma"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>
          </div>
        </div>
        <div class="col-start-1 row-start-1 flex justify-between items-center transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 relative z-10 w-full">
          <h3 class="text-xl md:text-[22px] font-medium text-white tracking-tight">Start a Project</h3>
          <div class="bg-white rounded-[0.6rem] p-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A435F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="bg-[#A435F0] group-hover:bg-[#3B1F60] transition-colors duration-500 rounded-[1.5rem] p-4 flex flex-col flex-1">
        <!-- Card Description -->
        <p class="text-[13px] md:text-[15px] font-normal text-white group-hover:text-white/40 transition-colors duration-500 leading-relaxed mb-6 lg:max-w-[95%]">
          Designing user-centered experiences that are both functional and visually engaging. From concept to final prototype, I focus on intuitive interfaces that drive engagement and enhance usability
        </p>

        <!-- Gallery Grid - always 3 columns -->
        <div class="grid grid-cols-3 gap-2 md:gap-4 relative z-10 mb-6 flex-1 bg-transparent group-hover:brightness-[0.4] transition-all duration-500">
          <img src="/pageweb/laptop.jpg" alt="Workspace 1" class="rounded-[1rem] md:rounded-[1.5rem] w-full h-[120px] sm:h-[180px] md:h-[400px] object-cover shadow-sm group-hover:-translate-y-1 transition-transform duration-500 delay-100" />
          <div class="bg-[#2B2B2B] rounded-[1rem] md:rounded-[1.5rem] w-full h-[120px] sm:h-[180px] md:h-[400px] overflow-hidden shadow-sm group-hover:-translate-y-1 transition-transform duration-500 delay-200">
             <img src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=600&auto=format&fit=crop" alt="Workspace 2" class="w-full h-full object-cover opacity-80" />
          </div>
          <img src="/pageweb/presentasi.jpeg" alt="Workspace 3" class="rounded-[1rem] md:rounded-[1.5rem] w-full h-[120px] sm:h-[180px] md:h-[400px] object-cover shadow-sm group-hover:-translate-y-1 transition-transform duration-500 delay-300" />
        </div>

        <!-- Pill Tags -->
        <div class="flex flex-wrap gap-2 px-2 pb-2">
          <span class="px-4 py-1.5 rounded-full border border-white/30 group-hover:border-white/10 text-white group-hover:text-white/30 transition-colors duration-500 text-[13px] font-medium tracking-wide">prototyping</span>
          <span class="px-4 py-1.5 rounded-full border border-white/30 group-hover:border-white/10 text-white group-hover:text-white/30 transition-colors duration-500 text-[13px] font-medium tracking-wide">Web & app design</span>
          <span class="px-4 py-1.5 rounded-full border border-white/30 group-hover:border-white/10 text-white group-hover:text-white/30 transition-colors duration-500 text-[13px] font-medium tracking-wide">Design system</span>
          <span class="px-4 py-1.5 rounded-full border border-white/30 group-hover:border-white/10 text-white group-hover:text-white/30 transition-colors duration-500 text-[13px] font-medium tracking-wide">+more</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Static text structure per the image
</script>
