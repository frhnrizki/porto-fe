<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-16">
      <h1 
        class="text-[2.2rem] sm:text-[3rem] lg:text-[2.6rem] font-medium tracking-tight leading-[1.1] max-w-[900px] mx-auto text-center lg:text-left lg:mx-0 mb-20"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 900, ease: [0.16, 1, 0.3, 1] } }"
      >
        <span class="text-gray-500">Farhan designs thoughtful, user-focused digital experiences—blending function </span>
        <span class="text-gray-900 font-medium">and </span>
        <span class="text-gray-900 font-bold">clarity </span>
        <span class="text-gray-500">to deliver </span>
        <span class="text-gray-900 font-medium whitespace-nowrap">real impact and engagement.</span>
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-6 lg:gap-8 items-stretch">
        <div 
          class="relative h-[550px] overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 p-5 group"
          @mouseenter="pauseScroll = true"
          @mouseleave="pauseScroll = false"
        >
          <div 
            ref="scrollContainer"
            class="space-y-3 transition-transform duration-1000 ease-linear"
            :style="{ transform: `translateY(-${scrollOffset}px)` }"
          >
            <div 
              v-for="feedback in [...testimonials, ...testimonials]" 
              :key="feedback.id + '-' + Math.random()"
              class="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm"
            >
              <div class="flex items-center gap-4 mb-6">
                <img :src="feedback.avatar_url || 'https://ui-avatars.com/api/?name=' + feedback.name" :alt="feedback.name" class="w-11 h-11 rounded-lg object-cover" />
                <div>
                  <h4 class="text-[15px] font-semibold text-gray-900 leading-tight">{{ feedback.name }}</h4>
                  <p class="text-[13px] text-gray-400 mt-1 font-medium">{{ feedback.role }}</p>
                </div>
              </div>
              <p class="text-[15px] text-gray-600 leading-[1.65] font-normal">{{ feedback.message }}</p>
            </div>
          </div>
          
          <!-- Gradient Overlays -->
          <div class="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10"></div>
        </div>

        <!-- Featured Image Card -->
        <div class="rounded-[2.5rem] overflow-hidden h-[550px]">
          <img src="/pageweb/siluet.png" alt="Featured Portrait" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <!-- Detailed About Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 border-t border-gray-100">
      <div class="grid grid-cols-1 lg:grid-cols-[430px_1fr] gap-x-16 gap-y-20 lg:gap-y-14">
        <div class="text-[16px] text-gray-500 font-medium pt-1">About Me</div>
        <div class="flex flex-col gap-8">
          <h2 class="text-[32px] sm:text-[36px] font-medium text-gray-900 leading-tight lg:max-w-4xl">
            I design intuitive and impactful user experiences that balance clarity, usability, and visual appeal.
          </h2>
          <div class="space-y-6 text-[16px] text-gray-600 leading-[1.8] lg:pr-22">
            <p>
              As a UI/UX designer, my focus is on creating clean interfaces and smooth user journeys that solve real user problems while aligning with business goals. From designing responsive dashboards and mobile apps to refining web experiences, I bring a user-centered approach to every project I work on.
            </p>
            <p>
              I've worked with teams across different industries—from startups to growing companies—helping them transform ideas into digital products that not only look good but work beautifully. I believe great design is simple, purposeful, and meaningful. Whether it's wireframing, prototyping, or refining final visuals, I strive to deliver solutions that are both functional and engaging.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[62fr_38fr] gap-8 mt-24 items-stretch">
        <div class="rounded-[2.5rem] overflow-hidden bg-gray-100 aspect-[4/3] lg:aspect-auto h-[400px] lg:h-[500px]">
           <img src="/pageweb/residence.png" class="w-full h-full object-cover" />
        </div>
        <div class="rounded-[2.5rem] overflow-hidden bg-gray-100 aspect-[3/4] lg:aspect-auto h-[400px] lg:h-[500px]">
           <img src="/pageweb/laptop.jpeg" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <!-- Work Experience Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 border-t border-gray-100">
      <h2 class="text-4xl font-medium text-gray-900 mb-12">Work experiences</h2>
      <div class="space-y-4">
        <div 
          v-for="exp in experiences" 
          :key="exp.id"
          class="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300"
        >
          <div class="text-sm font-semibold text-gray-900">{{ exp.role }}</div>
          <div class="text-sm text-gray-500 mt-1 sm:mt-0">{{ exp.company }}</div>
          <div class="text-sm text-gray-400 mt-1 sm:mt-0">{{ exp.date_range }}</div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 border-t border-gray-100">
      <h2 class="text-4xl font-medium text-gray-900 mb-12">My stacks</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="stack in stacks" 
          :key="stack.id"
          class="flex items-center gap-5 p-5 rounded-[22px] transition-all duration-300"
          :class="stack.name === 'Figma' 
            ? 'bg-[#7F3DFF] text-white shadow-[0_20px_40px_rgba(127,61,255,0.2)]' 
            : 'bg-[#F9FAFB] text-gray-900 hover:bg-gray-100'"
        >
          <div 
            class="w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center p-3 shadow-lg"
            :class="stack.name === 'Figma' ? 'bg-black' : 'bg-white border border-gray-100'"
          >
            <img v-if="stack.icon_url" :src="stack.icon_url" :alt="stack.name" class="w-full h-full object-contain" />
            <div v-else class="w-full h-full bg-gray-200 rounded-lg"></div>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-[18px] font-medium leading-tight mb-1">{{ stack.name }}</h4>
            <p class="text-[14px] font-medium leading-snug" :class="stack.name === 'Figma' ? 'text-white/80' : 'text-gray-500'">
              {{ stack.caption }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 border-t border-gray-100">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span class="text-sm font-medium text-gray-500">FAQs</span>
          <h2 class="text-4xl font-medium text-gray-500 mt-4 leading-tight">
            Answers to common questions to help you understand <span class="text-gray-900 font-bold">the process</span> and how we can work together
          </h2>
          <div class="mt-8">
            <a href="#" class="inline-flex px-8 py-3 bg-[#111111] text-white rounded-[14px] text-sm font-medium hover:bg-gray-800 transition-all shadow-md">
              Let's Talk
            </a>
          </div>
        </div>
        <div class="bg-[#F9FAFB] rounded-[40px] p-8 pt-14 relative h-fit">
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-8 py-2.5 rounded-full text-[14px] font-medium shadow-[0_10px_25px_rgba(0,0,0,0.2)] flex items-center justify-center whitespace-nowrap z-10 cursor-default">
            I'm here to help you
          </div>

          <div class="space-y-4">
            <div 
              v-for="(faq, idx) in faqs" 
              :key="idx"
              class="bg-white rounded-[24px] overflow-hidden shadow-sm transition-all duration-300 border border-transparent"
              :class="{ 'shadow-md ring-1 ring-gray-100': activeFaq === idx }"
            >
              <button 
                @click="activeFaq = activeFaq === idx ? -1 : idx"
                class="w-full flex items-center justify-between p-6 text-left"
              >
                <span class="text-[17px] font-semibold text-gray-900 leading-tight pr-6">{{ faq.question }}</span>
                <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center text-gray-400">
                  <svg v-if="activeFaq === idx" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </button>
              <div 
                v-if="activeFaq === idx"
                class="px-6 pb-6 text-[15px] text-[#717171] leading-relaxed"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <CtaFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CtaFooter from '~/components/sections/CtaFooter.vue'
import { useApi } from '~/composables/useApi'

definePageMeta({
  layout: 'portfolio',
})

const $api = useApi()

interface Testimonial {
  id: string
  name: string
  role: string
  message: string
  avatar_url: string
}

interface Experience {
  id: string
  role: string
  company: string
  date_range: string
}

interface Stack {
  id: string
  name: string
  caption: string
  icon_url: string
  category: string
}

const testimonials = ref<Testimonial[]>([])
const experiences = ref<Experience[]>([])
const stacks = ref<Stack[]>([])

const scrollOffset = ref(0)
const scrollContainer = ref<HTMLElement | null>(null)
const pauseScroll = ref(false)
let scrollInterval: any = null

const startAutoScroll = () => {
  scrollInterval = setInterval(() => {
    if (!pauseScroll.value && scrollContainer.value) {
      scrollOffset.value += 1
      if (scrollOffset.value >= scrollContainer.value.scrollHeight / 2) {
        scrollOffset.value = 0
      }
    }
  }, 30)
}

const activeFaq = ref(0)
const faqs = [
  {
    question: "Do you work with a specific timeline?",
    answer: "Every project is unique and requires a different timeline. I usually prefer a minimum of 2-4 weeks for design projects to ensure proper research, iteration, and refinement. However, I can accommodate tighter deadlines for smaller tasks or established clients."
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes, I typically include 2-3 rounds of revisions in my project proposals to ensure the final result aligns perfectly with your vision and goals."
  },
  {
    question: "Which time zone are you working in?",
    answer: "I am based in Indonesia (GMT+7), but I am accustomed to working with clients across different time zones, including North America, Europe, and Australia."
  },
  {
    question: "Can we start work with a brief or outline?",
    answer: "Absolutely! A well-defined brief or initial outline is the perfect starting point for any collaboration. It helps us align on goals and expectations from day one."
  },
  {
    question: "Do you provide after-project support?",
    answer: "Yes, I offer maintenance and update packages to ensure your digital products continue to perform optimally long after the initial launch."
  },
  {
    question: "Do you have a project minimum cost?",
    answer: "I work on projects of various scales. While I have a standard starting rate for major design engagements, I'm always open to discussing smaller consultations or specific tasks."
  }
]

const fetchData = async () => {
  try {
    const [testiData, expData, stackData] = await Promise.all([
      $api<Testimonial[]>('/testimonials').catch(() => []),
      $api<Experience[]>('/about/experiences').catch(() => []),
      $api<Stack[]>('/about/stacks').catch(() => [])
    ])
    
    // Filter approved testimonials
    testimonials.value = (testiData || []).filter((t: any) => t.status === 'approved')
    
    // Fallback if empty
    if (testimonials.value.length === 0) {
      testimonials.value = [
        { id: '1', name: 'Darhan Al Farobi', role: 'Support Lead at Google', message: 'Farhan has an incredible eye for detail. His ability to translate complex requirements into simple, beautiful interfaces is second to none.', avatar_url: '' },
        { id: '2', name: 'Rendra Kurniawansyah', role: 'CTO at Digitec', message: 'Working with Farhan was a breeze. He took ownership of the project and delivered results that exceeded our expectations.', avatar_url: '' }
      ]
    }
    
    experiences.value = expData || [
      { id: '1', role: 'UX/UI Designer Freelance', company: 'Digital Creative Agency (Self-Employed)', date_range: '2023 - Present' },
      { id: '2', role: 'UX/UI Designer', company: 'Pintek (PT. Pintek)', date_range: '2021 - 2022' },
      { id: '3', role: 'UI/UX Designer', company: 'Inovasi', date_range: '2020 - 2021' }
    ]
    
    stacks.value = stackData || [
      { id: '1', name: 'Figma', caption: 'Where my creative ideas come to life.', icon_url: '', category: 'Design' },
      { id: '2', name: 'Vue.js', caption: 'Building interactive and reactive web apps.', icon_url: '', category: 'Code' },
      { id: '3', name: 'Nuxt.js', caption: 'The power of Vue with server-side rendering.', icon_url: '', category: 'Code' },
      { id: '4', name: 'Tailwind CSS', caption: 'Rapidly building modern websites without leaving HTML.', icon_url: '', category: 'Design' },
      { id: '5', name: 'NestJS', caption: 'Structured and scalable backend architecture.', icon_url: '', category: 'Code' },
      { id: '6', name: 'Supabase', caption: 'The open source Firebase alternative.', icon_url: '', category: 'Tools' }
    ]
  } catch (err) {
    console.error('Failed to load about data', err)
  }
}

onMounted(async () => {
  await fetchData()
  startAutoScroll()
})

onUnmounted(() => {
  if (scrollInterval) clearInterval(scrollInterval)
})
</script>

<style scoped>
.ease-linear {
  transition-timing-function: linear;
}
</style>
