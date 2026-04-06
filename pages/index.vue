<template>
  <div>
    <HeroSection 
      :name="portfolioData.hero.name"
      :headline="portfolioData.hero.headline"
      :availability="portfolioData.hero.availability"
      :photoUrl="portfolioData.hero.photoUrl"
    />
    
    <FeaturedWorksSection 
      :projects="apiProjects" 
    />
    
    <CompanyLogosSection 
      :companies="portfolioData.companies" 
    />
    
    <TestimonialsSection 
      :testimonials="apiTestimonials" 
    />
    
    <TestimonialFormSection @success="handleTestimonialSuccess" />
    
    
    <ServicesSection />
    
    <WorkflowSection />
    
    <FaqSection 
      :faqs="portfolioData.faqs" 
    />
    
    <CtaFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioData } from '~/composables/usePortfolioData'

import HeroSection from '~/components/sections/HeroSection.vue'
import FeaturedWorksSection from '~/components/sections/FeaturedWorksSection.vue'
import CompanyLogosSection from '~/components/sections/CompanyLogosSection.vue'
import TestimonialsSection from '~/components/sections/TestimonialsSection.vue'
import TestimonialFormSection from '~/components/sections/TestimonialFormSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'
import WorkflowSection from '~/components/sections/WorkflowSection.vue'
import FaqSection from '~/components/sections/FaqSection.vue'
import CtaFooter from '~/components/sections/CtaFooter.vue'

definePageMeta({
  layout: 'portfolio'
})

const portfolioData = usePortfolioData()
const $api = useApi()

interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  avatarUrl: string
}

// Dynamically fetch from backend to mix static + dynamic data smoothly
const apiProjects = ref([])
const apiTestimonials = ref<Testimonial[]>([])

const fetchProjects = async () => {
  try {
    const p = await $api<any[]>('/projects').catch(() => [])
    if (p && p.length > 0) {
      apiProjects.value = p.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.tech_stack || 'Project',
        imageUrl: item.image_url || 'https://images.unsplash.com/photo-1522542517-573e04ae3c4e?q=80&w=600&auto=format&fit=crop',
        link: item.project_url || '#'
      })) as any
    }
  } catch (err) {
    console.error('Failed to load projects', err)
  }
}

const fetchTestimonials = async () => {
  try {
    const t = await $api<any[]>('/testimonials').catch(() => [])
    if (t && t.length > 0) {
      // sort to show newest first
      apiTestimonials.value = t.sort((a, b) => b.id - a.id).map((item) => ({
        id: item.id,
        name: item.name,
        role: `Rating: ${item.rating}/5`,
        text: item.message,
        avatarUrl: `https://i.pravatar.cc/150?u=${item.id}`
      })) as any
    }
  } catch (err) {
    console.error('Failed to load testimonials', err)
  }
}

const handleTestimonialSuccess = (newTestimonial: any) => {
  if (!newTestimonial) return
  
  const formatted = {
    id: newTestimonial.id,
    name: newTestimonial.name,
    role: `Rating: ${newTestimonial.rating}/5`,
    text: newTestimonial.message,
    avatarUrl: `https://i.pravatar.cc/150?u=${newTestimonial.id}`
  }
  
  // Prepend to show immediately at the beginning
  apiTestimonials.value = [formatted, ...apiTestimonials.value]
}

onMounted(async () => {
  await Promise.all([
    fetchProjects(),
    fetchTestimonials()
  ])
})

</script>
