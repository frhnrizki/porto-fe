<template>
  <div>
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-20 text-start">
      <h1 class="text-[32px] md:text-[32px] font-medium tracking-tight leading-tight">
        <span class="text-[#999999]">Ready to create something amazing?</span>
        <span class="text-[#111111] block md:inline-block md:ml-2">let's talk!</span>
      </h1>
    </section>

    <!-- Cards Section -->
    <section class="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <div class="flex flex-col lg:flex-row gap-6 items-stretch justify-center">
        <!-- Left: Form Card -->
        <div class="flex-[1.4] bg-[#0E0E0E] rounded-[32px] p-10 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <form @submit.prevent="handleSubmit" class="space-y-6 relative z-10 w-full">
            <div>
              <label class="block text-[15px] font-medium text-white mb-3">Name</label>
              <input 
                v-model="form.name" 
                type="text" 
                required
                placeholder="Jane Smith"
                class="w-full bg-[#1C1C1C] border-none rounded-2xl px-6 py-4 text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-[16px]"
              />
            </div>

            <div>
              <label class="block text-[15px] font-medium text-white mb-3">Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                required
                placeholder="yourname@gmail.com"
                class="w-full bg-[#1C1C1C] border-none rounded-2xl px-6 py-4 text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-[16px]"
              />
            </div>

            <div>
              <label class="block text-[15px] font-medium text-white mb-3">Your Message</label>
              <textarea 
                v-model="form.message" 
                required
                rows="5"
                placeholder="Enter your message"
                class="w-full bg-[#1C1C1C] border-none rounded-2xl px-6 py-5 text-white placeholder-[#555555] focus:outline-none focus:ring-1 focus:ring-white/20 transition-all resize-none text-[16px]"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-white text-black text-[16px] font-semibold py-4 rounded-[18px] hover:bg-gray-100 transition-all duration-300 shadow-lg active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {{ loading ? 'Submitting...' : 'Submit' }}
            </button>
          </form>

          <!-- Subtle Glow -->
          <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/5 blur-[120px] pointer-events-none"></div>
        </div>

        <!-- Right: Info Card -->
        <div class="flex-1 bg-[#F5F5F5] rounded-[32px] p-10 md:p-12 flex flex-col justify-between relative group shadow-sm">
          <div class="space-y-10">
            <!-- Portrait -->
            <div class="w-24 h-24 rounded-[28px] overflow-hidden shadow-md border-2 border-white">
              <img src="/pageweb/siluet.png" alt="Farhan Rizki" class="w-full h-full object-cover" />
            </div>

            <div class="space-y-4">
              <h2 class="text-[32px] md:text-[40px] font-medium leading-[1.15] tracking-tight text-[#888888]">
                Learn more about me <span class="text-[#111111] font-bold">through my resume</span> below.
              </h2>
            </div>
          </div>

          <div class="mt-12 w-full space-y-4">
            <a 
              href="#" 
              class="w-full bg-white py-4.5 rounded-[18px] text-[16px] font-semibold text-[#111111] shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all flex items-center justify-center border border-gray-100/50"
            >
              Resume
            </a>
            <a 
              href="#" 
              class="w-full bg-[#111111] py-4.5 rounded-[18px] text-[16px] font-semibold text-white shadow-lg hover:bg-black transition-all flex items-center justify-center"
            >
              Portofolio PDF
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Feedback Overlay -->
    <Transition name="fade">
      <div v-if="success" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div class="bg-white rounded-[40px] p-12 text-center max-w-sm w-full shadow-2xl relative overflow-hidden">
          <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Message Received!</h3>
          <p class="text-gray-500 mb-8 leading-relaxed">Thank you for reaching out. I'll get back to you as soon as possible!</p>
          <button @click="success = false" class="w-full bg-gray-900 text-white font-semibold py-4 rounded-2xl hover:bg-gray-800 transition-all">
            Close
          </button>
        </div>
      </div>
    </Transition>
    
    <CtaFooter />
  </div>

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import CtaFooter from '~/components/sections/CtaFooter.vue'

definePageMeta({
  layout: 'portfolio'
})

const $api = useApi()
const loading = ref(false)
const success = ref(false)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await $api('/contacts', {
      method: 'POST',
      body: form
    })
    success.value = true
    // Reset form
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (err: any) {
    alert(err.message || 'Failed to send message. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

input::placeholder, textarea::placeholder {
  color: #555;
  font-weight: 300;
}
</style>
