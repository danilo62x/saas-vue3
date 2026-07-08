<template>
  <!-- Checkbox variant -->
  <label v-if="as === 'checkbox'" class="flex cursor-pointer items-center gap-2 text-sm text-body">
    <input
      type="checkbox"
      :checked="checked"
      class="h-4 w-4 rounded border-themed accent-brand-500"
      @change="handleChange(($event.target as HTMLInputElement).checked)"
      @blur="handleBlur"
    />
    {{ label }}
  </label>

  <!-- Field with label/error wrapper -->
  <div v-else class="space-y-1.5">
    <label v-if="label" :for="id" class="block text-sm font-medium text-heading">{{ label }}</label>

    <select
      v-if="as === 'select'"
      :id="id"
      :value="value"
      :class="controlClass"
      @change="handleChange(($event.target as HTMLSelectElement).value)"
      @blur="handleBlur"
    >
      <slot />
    </select>

    <textarea
      v-else-if="as === 'textarea'"
      :id="id"
      :value="value as string"
      :rows="rows"
      :placeholder="placeholder"
      :class="controlClass"
      @input="handleChange(($event.target as HTMLTextAreaElement).value)"
      @blur="handleBlur"
    />

    <input
      v-else
      :id="id"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :class="controlClass"
      @input="handleChange(($event.target as HTMLInputElement).value)"
      @blur="handleBlur"
    />

    <p v-if="hasError" class="text-xs text-error-500">{{ errorMessage }}</p>
    <p v-else-if="hint" class="text-xs text-muted">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    name: string
    label?: string
    as?: 'input' | 'textarea' | 'select' | 'checkbox'
    type?: string
    placeholder?: string
    hint?: string
    rows?: number
  }>(),
  { as: 'input', type: 'text', rows: 4 }
)

const id = `f-${props.name}`

const isCheckbox = props.as === 'checkbox'
const { value, checked, errorMessage, handleChange, handleBlur, meta } = useField(
  () => props.name,
  undefined,
  isCheckbox ? { type: 'checkbox', checkedValue: true, uncheckedValue: false } : {}
)

const hasError = computed(() => Boolean(meta.touched && errorMessage.value))

const controlClass = computed(
  () =>
    `focus-ring w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-sm text-body placeholder:text-muted disabled:opacity-50 ${
      hasError.value ? 'border-error-500' : 'border-themed'
    }`
)
</script>
