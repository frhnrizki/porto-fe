<template>
  <div class="min-h-screen bg-gray-50/50 pb-0">
    <!-- Banner Image Area -->
    <div v-if="project?.image_url" class="w-full relative bg-gray-100 flex justify-center items-center overflow-hidden h-[45vh] sm:h-[55vh] lg:h-[65vh]">
      <img :src="project.image_url" :alt="project.title" class="w-full h-full object-cover" />
    </div>

    <!-- White Content Container -->
    <div class="bg-white relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24" :class="{ 'rounded-t-[2.5rem] -mt-12 shadow-[0_-15px_40px_rgba(0,0,0,0.04)]': project?.image_url }">
      <div class="max-w-[1100px] mx-auto">

        <!-- Header: Title and Close Button -->
        <div class="flex items-center justify-between mb-16 lg:mb-24">
          <h1 class="text-[2rem] lg:text-[2.6rem] font-semibold text-gray-900 tracking-tight"
            v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          >
            {{ project?.title }}
          </h1>
          <NuxtLink to="/works" class="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors shadow-sm"
            v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </NuxtLink>
        </div>

        <div v-if="loading" class="animate-pulse space-y-8">
           <div class="h-4 bg-gray-100 rounded w-1/4"></div>
           <div class="h-48 bg-gray-100 rounded w-full"></div>
        </div>

        <div v-else>
          <!-- Info Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-x-16 gap-y-10 lg:gap-y-14 mb-28">

            <!-- Overview -->
            <div class="text-[18.5px] text-gray-400 font-medium pt-1">Overview</div>
            <div class="flex flex-col gap-10 lg:pr-12">
               <div>
                 <h3 class="text-gray-900 font-semibold mb-3 text-[16px]">Description</h3>
                 <p class="text-gray-600 text-[16px] leading-[1.85] whitespace-pre-line">{{ project.description }}</p>
               </div>
               <div v-if="project.process">
                 <h3 class="text-gray-900 font-semibold mb-3 text-[16px]">Process</h3>
                 <p class="text-gray-600 text-[16px] leading-[1.85] whitespace-pre-line">{{ project.process }}</p>
               </div>
               <div v-if="project.impact">
                 <h3 class="text-gray-900 font-semibold mb-3 text-[16px]">Impact</h3>
                 <p class="text-gray-600 text-[16px] leading-[1.85] whitespace-pre-line">{{ project.impact }}</p>
               </div>
            </div>

            <!-- Categories -->
            <div class="text-[18.5px] text-gray-400 font-medium self-start lg:self-center">Categories</div>
            <div class="text-[16px] text-gray-800 self-center leading-relaxed">{{ project.tech_stack || '-' }}</div>

            <!-- Date -->
            <div class="text-[18.5px] text-gray-400 font-medium self-start lg:self-center">Date</div>
            <div class="text-[16px] text-gray-800 self-center">{{ formatDate(project.project_date) }}</div>

            <!-- Client -->
            <div class="text-[18.5px] text-gray-400 font-medium self-start lg:self-center">Client</div>
            <div class="text-[16px] text-gray-800 self-center">{{ project.client || '-' }}</div>

            <!-- Live Preview Action -->
            <div class="col-span-1 lg:col-start-1 mt-4 flex">
              <a v-if="project.project_url" :href="project.project_url" target="_blank" class="inline-flex items-center justify-center gap-2 bg-[#111111] text-white px-7 py-3 rounded-[14px] text-[13.5px] font-medium hover:bg-[#9520D4] transition-all shadow-md hover:-translate-y-0.5">
                Live Preview
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <!-- Gallery Area -->
          <div v-if="project.gallery_urls && project.gallery_urls.length > 0" class="flex flex-col gap-6 lg:gap-8 mb-32">
            <!-- 2-col Grid for first two images -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div v-for="(img, idx) in project.gallery_urls.slice(0, 2)" :key="idx" class="rounded-[2rem] bg-gray-50 overflow-hidden aspect-[4/3] border border-gray-100 shadow-sm">
                <img :src="img" alt="Gallery preview" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
            </div>
            <!-- Full width for the rest -->
            <div v-for="(img, idx) in project.gallery_urls.slice(2)" :key="`full-${idx}`" class="rounded-[2rem] bg-gray-50 overflow-hidden w-full aspect-[4/3] lg:aspect-[21/9] border border-gray-100 shadow-sm">
              <img :src="img" alt="Gallery detail" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          </div>

          <!-- More Works Section -->
          <div v-if="moreWorks.length > 0" class="pt-16 border-t border-gray-100">
            <h2 class="text-[1.35rem] font-semibold text-gray-900 mb-10">More works</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <NuxtLink
                v-for="work in moreWorks"
                :key="work.id"
                :to="`/works/${work.id}`"
                class="group relative rounded-3xl overflow-hidden aspect-[4/3] block bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img v-if="work.image_url" :src="work.image_url" :alt="work.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity"></div>
                <div class="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span v-for="tag in (work.tech_stack || '').split(',').map((t: string) => t.trim()).filter(Boolean)" :key="tag" class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium text-white border border-white/20 bg-white/10 backdrop-blur-md">
                      {{ tag }}
                    </span>
                  </div>
                  <h3 class="text-white text-[1.25rem] sm:text-[1.4rem] font-semibold leading-tight">{{ work.title }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Footer -->
    <CtaFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import CtaFooter from '~/components/sections/CtaFooter.vue'
import { useApi } from '~/composables/useApi'

definePageMeta({
  layout: 'portfolio',
})

const route = useRoute()
const $api = useApi()

const loading = ref(true)
const project = ref<any>(null)
const allProjects = ref<any[]>([])

const fetchProject = async () => {
  try {
    const projectId = route.params.overview
    const data = await $api<any>(`/projects/${projectId}`)
    if (data && data.id) {
      project.value = data
    } else {
      throw new Error('Project not found')
    }
  } catch (err) {
    console.error('Failed to load project', err)

    // Provide a detailed fallback for showcase purposes if API fails/missing
    project.value = {
      title: 'Myoscope',
      description: 'Myoscope is a digital health application designed to help patients independently monitor their heart condition while also assisting doctors in verifying medical data. Patients can record their heartbeat sounds through a connected device, and the recordings are analyzed using an early prediction system. The analysis results are displayed as conditions (Normal or Myocardial Infarction) along with the doctor\'s verification status, ensuring accurate and reliable monitoring for patients.\n\nFor doctors, Myoscope provides a dedicated dashboard to manage patient data, verify recorded results, and track each patient\'s heart condition history. The application includes features such as filtering, notifications, and data management tools that accelerate the early diagnosis process while maintaining workflow efficiency. Through this approach, Myoscope connects patients and doctors within a single integrated platform to support early detection of heart problems.',
      process: 'The process began with user research to understand the workflows of both doctors and patients in heart condition monitoring. I designed a responsive web dashboard for doctors and administrators, along with a mobile UI that enables real-time health tracking for patients and doctors. The entire design was developed through wireframes, prototypes, and an integrated design system to ensure consistent visuals. Cross-team collaboration was conducted using Trello and Figma to maintain efficient handoffs, accompanied by a design-to-development audit to ensure alignment between implementation and the original design.',
      impact: 'The design improved patient data accessibility by 40%, accelerated the handoff process to developers by 25%, and enhanced doctors\' efficiency in verifying medical data by 30%. Additionally, the implementation of an integrated design system maintained 100% visual consistency across platforms and reduced design-to-development mismatches by 90%, resulting in a faster and more stable development workflow.',
      tech_stack: 'Healthcare App (AI-Based) • Heart Attack Detector Based on Phonocardiogram Signals Using Deep Learning',
      project_date: '2025-08-17',
      client: 'BRIN (Badan Riset dan Inovasi Nasional)',
      project_url: '#',
      image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop',
      gallery_urls: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop'
      ]
    }
  }
}

const fetchAllProjects = async () => {
  try {
    const data = await $api<any[]>('/projects').catch(() => [])
    if (data && data.length > 0) {
      const projectId = route.params.overview
      allProjects.value = data.filter(p => p.status === 'published' && String(p.id) !== String(projectId))
    }
  } catch (err) {
    console.error('Failed to load all projects', err)
  }
}

const moreWorks = computed(() => {
  // If no dynamic works or not enough, return fallbacks
  if (allProjects.value.length > 0) {
    return allProjects.value.slice(0, 2)
  }
  return [
    {
      id: 's1',
      title: 'FMC Dashboard Telkomsel',
      tech_stack: 'Web Dashboard',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 's3',
      title: 'TumbuhKita',
      tech_stack: 'Healthcare, Website',
      image_url: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=800&auto=format&fit=crop'
    }
  ]
})

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchProject(), fetchAllProjects()])
  loading.value = false
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch (e) {
    return dateStr
  }
}
</script>
