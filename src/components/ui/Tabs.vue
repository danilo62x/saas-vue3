<template>
  <div>
    <div class="flex gap-1 overflow-x-auto border-b border-themed no-scrollbar" role="tablist">
      <button
        v-for="(t, i) in tabs"
        :key="t.label"
        type="button"
        role="tab"
        :aria-selected="modelValue === i"
        class="-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition"
        :class="
          modelValue === i
            ? 'border-brand-500 text-brand-600 dark:text-brand-400'
            : 'border-transparent text-muted hover:border-gray-300 hover:text-body dark:hover:border-gray-700'
        "
        @click="emit('update:modelValue', i)"
      >
        <IconBase v-if="t.icon" :name="t.icon" :size="16" />
        {{ t.label }}
      </button>
    </div>
    <div class="pt-5 text-sm text-body" role="tabpanel">
      <slot :name="`tab-${modelValue}`">
        <component :is="tabs[modelValue]?.content" v-if="isComponent" />
        <template v-else>{{ tabs[modelValue]?.content }}</template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import IconBase from './IconBase.vue'

export interface TabItem {
  label: string
  icon?: string
  content?: string | Component
}

const props = defineProps<{
  tabs: TabItem[]
  modelValue: number
}>()

const emit = defineEmits<{ (e: 'update:modelValue', idx: number): void }>()

const isComponent = computed(() => {
  const c = props.tabs[props.modelValue]?.content
  return typeof c === 'object' || typeof c === 'function'
})
</script>
