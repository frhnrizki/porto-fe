<template>
  <section class="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-labelledby="testimonial-form-heading">
    <div class="max-w-[600px] mx-auto w-full group">
      
      <!-- Section Intro -->
      <div class="text-center mb-12">
        <h2 id="testimonial-form-heading" class="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
          Ready to create something amazing? <span class="text-gray-800 text-[36px] font-medium">Let's talk!</span>
        </h2>
        <p class="text-gray-500 text-[15px]">Leave a review or share your experience working with me.</p>
      </div>

      <!-- Form Card -->
      <div class="bg-[#111111] rounded-2xl p-6 md:p-8 md:px-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-2 border border-white/5 relative z-10">
        
        <form @submit.prevent="handleSubmit" novalidate class="flex flex-col gap-6 w-full">
          
          <InputField
            id="testimonial-name"
            label="Name"
            type="text"
            v-model="formData.name"
            placeholder="Jane Smith"
            :error="errors.name"
            :disabled="loading"
          />

          <InputField
            id="testimonial-email"
             label="Email"
            type="email"
            v-model="formData.email"
            placeholder="yourname@gmail.com"
            :error="errors.email"
            :disabled="loading"
          />

          <TextareaField
            id="testimonial-message"
            label="Your Message"
            v-model="formData.message"
            placeholder="Enter your message"
            :error="errors.message"
            :disabled="loading"
            :rows="5"
          />

          <div class="pb-2">
             <StarRating 
               id="testimonial-rating" 
               v-model="formData.rating" 
               :error="errors.rating"
               :disabled="loading"
             />
          </div>

          <!-- Success Message -->
          <div v-if="success" class="flex p-4 mb-2 text-sm text-green-400 rounded-xl bg-green-500/10" role="alert">
            <svg class="flex-shrink-0 inline w-5 h-5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <div>
              <span class="font-medium">Success!</span> Thank you for your testimonial.
            </div>
          </div>

          <!-- Global Error Toast inside form -->
           <div v-if="apiError" class="flex p-4 mb-2 text-sm text-red-500 rounded-xl bg-red-500/10" role="alert">
            <svg class="flex-shrink-0 inline w-5 h-5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
            <div>
              <span class="font-medium">Error:</span> {{ apiError }}
            </div>
          </div>

          <SubmitButton
            type="submit"
            :loading="loading"
          >
            Submit Testimonial
          </SubmitButton>
        </form>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import InputField from '~/components/form/InputField.vue';
import TextareaField from '~/components/form/TextareaField.vue';
import StarRating from '~/components/form/StarRating.vue';
import SubmitButton from '~/components/form/SubmitButton.vue';
import { useSubmitTestimonial } from '~/composables/useSubmitTestimonial';

// Define emits
const emit = defineEmits(['success']);

// Internal form state
const formData = reactive({
  name: '',
  email: '',
  rating: 0,
  message: ''
});

// Validation errors
const errors = reactive({
  name: '',
  email: '',
  rating: '',
  message: ''
});

const { submit, loading, error: apiError, success } = useSubmitTestimonial();

const validateForm = () => {
  let isValid = true;
  
  // reset
  errors.name = '';
  errors.email = '';
  errors.rating = '';
  errors.message = '';

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim() || !emailRegex.test(formData.email)) {
    errors.email = 'Valid email format is required';
    isValid = false;
  }

  if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
    isValid = false;
  }

  if (formData.rating === 0) {
    errors.rating = 'Rating is required';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  await submit({ ...formData });

  if (success.value) {
    emit('success');
    // Reset form on success
    formData.name = '';
    formData.email = '';
    formData.rating = 0;
    formData.message = '';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      success.value = false;
    }, 5000);
  }
};
</script>
