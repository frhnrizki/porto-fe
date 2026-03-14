<template>
  <div>
    <!-- Page Header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
      <h1
        class="text-[2rem] sm:text-[2.4rem] lg:text-[2.2rem] font-medium tracking-tight text-gray-900 max-w-xl leading-[1.2]"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 900, type: 'keyframes', ease: [0.16, 1, 0.3, 1] } }"
      >
        <span class="text-gray-500">Designing seamless experiences</span>
        <span class="font-medium"> that elevate brands and engage users</span>
      </h1>
    </section>

    <!-- Works Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <!-- Loading Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="n in 6"
          :key="n"
          class="rounded-3xl bg-gray-100 animate-pulse aspect-[4/3]"
        ></div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <NuxtLink
          v-for="(project, index) in displayProjects"
          :key="project.id"
          :to="`/works/${project.id}`"
          class="group relative rounded-[32px] overflow-hidden aspect-[4/3] block cursor-pointer"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 700,
              delay: 80 + index * 100,
              type: 'spring',
              bounce: 0.08,
            },
          }"
        >
          <!-- Background Image -->
          <div
            v-if="project.imageUrl"
            class="absolute inset-0 bg-gray-200"
          >
            <img
              :src="project.imageUrl"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </div>

          <!-- Fallback Colored Background -->
          <div
            v-else
            class="absolute inset-0"
            :style="{ background: project.bgColor || '#1a1a1a' }"
          ></div>

          <!-- Bottom Gradient Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
          ></div>

          <!-- Card Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium text-white border border-white/30 bg-white/10 backdrop-blur-sm"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="text-white text-[1.15rem] sm:text-[1.3rem] font-semibold leading-tight">
              {{ project.title }}
            </h2>
          </div>

          <!-- Hover shine effect -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style="background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)"
          ></div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && displayProjects.length === 0"
        class="flex flex-col items-center justify-center py-32 text-gray-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-4 opacity-40">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <p class="text-lg font-medium text-gray-500">No projects yet</p>
        <p class="text-sm text-gray-400 mt-1">Check back soon for new work!</p>
      </div>
    </section>

    <!-- Footer -->
    <CtaFooter />
  </div>
</template>

<script setup lang="ts">
import CtaFooter from '~/components/sections/CtaFooter.vue'

definePageMeta({
  layout: 'portfolio',
})

interface Project {
  id: string | number
  title: string
  tags: string[]
  imageUrl: string
  link: string
  bgColor?: string
}

const $api = useApi()
const loading = ref(true)
const apiProjects = ref<Project[]>([])

const parseTags = (techStack: string | null | undefined): string[] => {
  if (!techStack) return []
  return techStack
    .split(',')
    .map((t: string) => t.trim())
    .filter((t: string) => t.length > 0)
}

const fetchProjects = async () => {
  try {
    const data = await $api<any[]>('/projects').catch(() => [])
    if (data && data.length > 0) {
      apiProjects.value = data
        .map((item: any): Project => ({
          id: item.id,
          title: item.title,
          tags: parseTags(item.tech_stack),
          imageUrl: item.image_url || '',
          link: item.project_url && item.project_url !== '#' ? item.project_url : '',
          bgColor: '#111111',
        }))
    }
  } catch (err) {
    console.error('Failed to load projects:', err)
  } finally {
    loading.value = false
  }
}

const displayProjects = computed<Project[]>(() => apiProjects.value)

onMounted(async () => {
  await fetchProjects()
})
</script>
