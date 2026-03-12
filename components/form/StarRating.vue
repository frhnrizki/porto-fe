<template>
  <div class="flex flex-col gap-1.5 w-full">
    <span class="text-[13px] font-medium text-white mb-2" :id="`${id}-label`">Rating</span>
    <div 
      class="flex items-center gap-1.5"
      role="radiogroup"
      :aria-labelledby="`${id}-label`"
      :aria-invalid="!!error"
    >
      <button
        v-for="star in 5"
        :key="star"
        type="button"
        @click="setRating(star)"
        @keydown.left.prevent="setRating(Math.max(1, modelValue - 1))"
        @keydown.right.prevent="setRating(Math.min(5, modelValue + 1))"
        :class="[
          'p-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-md hover:scale-110 active:scale-95',
          disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
        ]"
        :aria-checked="modelValue === star"
        :aria-label="`Rate ${star} out of 5 stars`"
        role="radio"
        :tabindex="modelValue === star || (modelValue === 0 && star === 1) ? 0 : -1"
        :disabled="disabled"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          :fill="star <= Math.max(hoverValue, modelValue) ? '#EAB308' : 'none'"
          :stroke="star <= Math.max(hoverValue, modelValue) ? '#EAB308' : '#52525B'"
          stroke-width="1.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          class="transition-colors duration-200"
          @mouseenter="!disabled && (hoverValue = star)"
          @mouseleave="!disabled && (hoverValue = 0)"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </button>
    </div>
    <span v-if="error" :id="`${id}-error`" class="text-xs text-red-500 mt-1 pl-1" role="alert">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: Number, default: 0 },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

const hoverValue = ref(0);

const setRating = (val: number) => {
  if (props.disabled) return;
  emit('update:modelValue', val);
};
</script>
