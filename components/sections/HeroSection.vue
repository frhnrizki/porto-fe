<template>
  <section class="max-w-[1536px] w-full mx-auto px-4 lg:px-12 xl:px-10 relative overflow-hidden">
    
    <!-- Background Silhouette Text -->
    <div class="absolute inset-0 flex justify-center items-center pointer-events-none z-0 select-none overflow-hidden">
      <span class="text-[18vw] md:text-[200px] lg:text-[180px] font-black tracking-tighter text-gray-900 leading-none opacity-[0.03] transform lg:-translate-y-20">
        JUNIORDEVELOPER
      </span>
    </div>

    <!-- === MOBILE LAYOUT (hidden on lg+) === -->
    <div class="flex flex-col lg:hidden pt-4 relative z-10">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm text-gray-500 text-[11px] font-medium mb-6 w-fit">
        <span class="w-2 h-2 rounded-full bg-[#00D053]"></span>
        {{ availability }}
      </div>

      <!-- Headline -->
      <h1 class="text-4xl font-medium text-[#111111] tracking-tight leading-[1.15] mb-6">
        {{ headline }}
      </h1>

      <!-- Bio -->
      <p class="text-gray-800 text-[13.5px] leading-[1.7] mb-6 font-regular">
        Farhan is a Junior Developer and UI/UX Designer passionate about creating clean and user-friendly interfaces. Currently learning Nuxt.js and modern web technologies, he enjoys building real projects to improve his skills and grow as a developer.
      </p>

      <!-- CTA -->
      <a :href="getEmailLink()" target="_blank" class="inline-flex items-center justify-center px-7 py-3 text-sm font-medium rounded-[14px] text-white bg-[#111111] hover:bg-[#9520D4] transition-all shadow-lg w-fit mb-8">
        Email Me
      </a>

      <!-- Profile Image (mobile) -->
      <div class="relative w-full flex justify-center mt-4">
        <div class="relative w-full max-w-[420px] flex justify-center items-end overflow-hidden">
          <img :src="photoUrl" alt="Profile Photo" class="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] relative z-0" 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut', delay: 200 } }"
          />
          <!-- Mobile Gradient Fade -->
          <div class="absolute bottom-0 left-0 right-0 h-48 backdrop-blur-[25px] bg-white/40 z-10" style="-webkit-mask-image: linear-gradient(to top, black 15%, transparent 100%); mask-image: linear-gradient(to top, black 15%, transparent 100%);"></div>
        </div>
      </div>
    </div>

    <!-- === DESKTOP LAYOUT (hidden on mobile) === -->
    <div class="hidden lg:block relative min-h-[85vh] lg:mt-10 z-10">
      <!-- Center Image (Absolute Positioned for overlapping) -->
      <div class="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-full max-w-[850px] flex justify-center items-end pointer-events-none z-0">
        <img :src="photoUrl" alt="Profile Photo" class="w-full h-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative z-0"
          v-motion
          :initial="{ opacity: 0, filter: 'blur(8px)' }"
          :enter="{ opacity: 1, filter: 'blur(0px)', transition: { duration: 1500, type: 'keyframes', ease: 'easeOut', delay: 100 } }"
        />
        <!-- Thick gradient fade -->
        <div class="absolute bottom-0 left-0 right-0 h-[350px] backdrop-blur-[40px] bg-white/40 z-10" style="-webkit-mask-image: linear-gradient(to top, black 20%, transparent 100%); mask-image: linear-gradient(to top, black 20%, transparent 100%);"></div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-2 gap-8 w-full relative z-10 pointer-events-none lg:items-end lg:pb-14" style="height: 85vh; align-items: flex-end;">
        <!-- Left: Headline -->
        <div class="max-w-xl pointer-events-auto lg:self-end">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm text-gray-500 text-xs font-medium mb-6"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 1200, type: 'keyframes', ease: [0.16, 1, 0.3, 1], delay: 100 } }"
          >
            <span class="w-2 h-2 rounded-full bg-[#00D053]"></span>
            {{ availability }}
          </div>
          <h1 class="text-[42px] font-medium text-[#111111] tracking-tight leading-[1.15]"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 1200, type: 'keyframes', ease: [0.16, 1, 0.3, 1], delay: 200 } }"
          >
            {{ headline }}
          </h1>
        </div>

        <!-- Right: Bio & CTA -->
        <div class="flex flex-col items-end text-left pointer-events-auto lg:self-end">
          <div class="max-w-[420px]">
            <p class="text-gray-800 text-[14px] leading-[1.7] mb-8 font-regular"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 1200, type: 'keyframes', ease: [0.16, 1, 0.3, 1], delay: 300 } }"
            >
              Farhan is a Junior Developer and UI/UX Designer passionate about creating clean and user-friendly interfaces. Currently learning Nuxt.js and modern web technologies, he enjoys building real projects to improve his skills and grow as a developer.
            </p>
            <a :href="getEmailLink()" target="_blank" class="inline-flex items-center justify-center px-7 py-3 text-sm font-medium border border-transparent rounded-[14px] text-white bg-[#111111] hover:bg-[#9520D4] transition-all shadow-lg hover:-translate-y-0.5 transform duration-500 ease-out mb-10"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 1200, type: 'keyframes', ease: [0.16, 1, 0.3, 1], delay: 400 } }"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getEmailLink } = useEmail()

defineProps<{
  name: string
  headline: string
  availability: string
  photoUrl: string 
}>()
</script>
