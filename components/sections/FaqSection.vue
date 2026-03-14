<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
    <div class="flex flex-col lg:flex-row gap-16 lg:gap-[100px] items-start justify-between">
      
      <!-- Left Column: Title & CTA -->
      <div class="lg:w-[480px] shrink-0">
        <div class="border-t border-gray-200 pt-4 mb-6">
          <h2 class="text-[17px] font-normal text-gray-500 tracking-tight">FAQs</h2>
        </div>
        <h3 class="text-[32px] md:text-[42px] leading-[1.15] tracking-tight mb-8">
          <span class="text-gray-500 font-medium">Answers to common questions to help you understand</span>
          <span class="text-[#111] font-medium"> the process and how we can work together</span>
        </h3>
        <a href="mailto:farhanrizki475@gmail.com" class="inline-flex px-8 py-3.5 bg-[#111111] text-white rounded-[14px] text-[15px] font-medium hover:bg-[#9520D4] transition-colors shadow-lg">
          Email Me
        </a>
      </div>

      <!-- Right Column: Accordion Container -->
      <div class="flex-1 w-full max-w-[650px] relative">
        
        <!-- Floating Badge -->
        <div class="absolute left-1/2 -translate-x-1/2 -top-5 z-20">
          <div class="bg-[#111111] text-white text-[13px] font-medium px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/5">
            I'm here to help you
          </div>
        </div>

        <!-- Grey Container -->
        <div class="bg-[#F8F8F8] rounded-[2rem] p-4 pt-12 md:p-6 md:pt-14 relative z-10 flex flex-col gap-3">
          
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-[1rem] p-5 md:p-6 shadow-sm border border-gray-100 transition-all duration-300">
            <button @click="toggle(index)" class="w-full flex justify-between items-center text-left focus:outline-none group">
              <h4 class="text-[15px] md:text-[17px] font-medium text-gray-900 pr-8 transition-colors group-hover:text-black">
                {{ faq.question }}
              </h4>
              
              <!-- Subtle Plus/Close Icon -->
              <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 transform transition-transform duration-300 group-hover:text-gray-600" :class="{ 'rotate-45': activeIndex === index }">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14"/><path d="M5 12h14"/>
                </svg>
              </span>
            </button>
            
            <div 
              class="overflow-hidden transition-all duration-300 ease-in-out" 
              :class="activeIndex === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'"
            >
              <p class="text-[14px] md:text-[15px] text-gray-500 leading-relaxed font-normal">
                {{ faq.answer }}
              </p>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  faqs: Array<{
    question: string
    answer: string
  }>
}>()

const activeIndex = ref<number | null>(0)

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>
