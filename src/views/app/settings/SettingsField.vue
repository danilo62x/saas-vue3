<template>
  <div>
    <label class="mb-2 block text-sm font-medium text-heading">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      class="focus-ring h-11 w-full rounded-lg border border-themed bg-transparent px-3.5 text-sm text-body disabled:opacity-50"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    modelValue: string
    type?: string
    disabled?: boolean
  }>(),
  { type: 'text', disabled: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>
