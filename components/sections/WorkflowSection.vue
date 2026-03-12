<template>
  <section class="bg-[#111111] py-32 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-[130px] items-start justify-between">
        
        <!-- Left Title -->
        <div class="lg:w-[320px] shrink-0 pl-2 lg:pl-0">
          <h2 class="text-[17px] font-normal text-gray-500 tracking-tight">How it works</h2>
        </div>

        <!-- Right Content -->
        <div class="flex-1 max-w-[850px] pr-2 lg:pr-10">
          <h3 class="text-[28px] lg:text-[42px] leading-[1.15] font-medium tracking-tight mb-20 lg:mb-24">
            <span class="text-white">A clear and collaborative design workflow.</span><br />
            <span class="text-gray-500">From idea to implementation, every step is focused on user needs and visual clarity.</span>
          </h3>

          <!-- Steps (Staggered Cards) -->
          <div class="flex flex-col space-y-6 lg:space-y-8 relative">
            
            <!-- Step 1 -->
            <div class="bg-[#161616] border border-white/5 rounded-[2rem] p-8 lg:p-10 max-w-[500px] shadow-xl hover:bg-[#1A1A1A] transition-colors duration-500">
              <div class="w-[42px] h-[42px] rounded-full bg-[#222] flex items-center justify-center text-gray-400 font-medium mb-6 lg:mb-8 text-[15px]">1</div>
              <h4 class="text-xl lg:text-[22px] font-medium text-white tracking-tight mb-3 lg:mb-4">Discover</h4>
              <p class="text-[14px] lg:text-[15px] font-normal text-gray-400 leading-relaxed">We begin with understanding the goals, conducting user research, and identifying key problems. This phase lays the foundation for user-centered design decisions.</p>
            </div>

            <!-- Step 2 -->
            <div class="bg-[#161616] border border-white/5 rounded-[2rem] p-8 lg:p-10 max-w-[500px] shadow-xl hover:bg-[#1A1A1A] transition-colors duration-500 transform lg:translate-x-24">
              <div class="w-[42px] h-[42px] rounded-full bg-[#222] flex items-center justify-center text-gray-400 font-medium mb-6 lg:mb-8 text-[15px]">2</div>
              <h4 class="text-xl lg:text-[22px] font-medium text-white tracking-tight mb-3 lg:mb-4">Design</h4>
              <p class="text-[14px] lg:text-[15px] font-normal text-gray-400 leading-relaxed">I create wireframes, high-fidelity UI, and interactive prototypes using auto layout and responsive principles.</p>
            </div>

            <!-- Step 3 -->
            <div class="bg-[#161616] border border-white/5 rounded-[2rem] p-8 lg:p-10 max-w-[500px] shadow-xl hover:bg-[#1A1A1A] transition-colors duration-500 transform lg:translate-x-[12rem]">
              <div class="w-[42px] h-[42px] rounded-full bg-[#222] flex items-center justify-center text-gray-400 font-medium mb-6 lg:mb-8 text-[15px]">3</div>
              <h4 class="text-xl lg:text-[22px] font-medium text-white tracking-tight mb-3 lg:mb-4">Deliver</h4>
              <p class="text-[14px] lg:text-[15px] font-normal text-gray-400 leading-relaxed">Final assets are prepared for developer handoff, ensuring every detail is documented for seamless implementation.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>
