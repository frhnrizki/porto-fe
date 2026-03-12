<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="id" class="text-[13px] font-medium text-white mb-2">{{ label }}</label>
    <div class="relative w-full">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full bg-[#1e1e1e] border rounded-xl px-4 py-3 text-[15px] text-white transition-all placeholder:text-white/20 focus:outline-none focus:ring-1',
          error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' : 'border-transparent focus:border-white/20 focus:ring-white/10 focus:bg-[#252525]',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : undefined"
      />
    </div>
    <span v-if="error" :id="`${id}-error`" class="text-xs text-red-500 mt-1 pl-1" role="alert">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
});

defineEmits(['update:modelValue']);
</script>
