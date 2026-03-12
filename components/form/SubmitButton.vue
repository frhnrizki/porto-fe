<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="w-full relative flex items-center justify-center bg-white text-black font-medium text-[15px] py-3.5 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
  >
    <span :class="['transition-opacity duration-200', loading ? 'opacity-0' : 'opacity-100']">
      <slot>Submit</slot>
    </span>
    
    <div 
      v-if="loading" 
      class="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { type: String as () => 'button' | 'submit' | 'reset', default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
});
</script>
