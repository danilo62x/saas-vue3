<template>
  <ol class="flex w-full items-start">
    <li
      v-for="(s, i) in steps"
      :key="s.label"
      class="flex items-start"
      :class="i === steps.length - 1 ? '' : 'flex-1'"
    >
      <div class="flex flex-col items-center">
        <button
          type="button"
          :disabled="!clickable"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition"
          :class="[
            clickable ? 'cursor-pointer' : 'cursor-default',
            i + 1 < current
              ? 'border-brand-500 bg-brand-500 text-white'
              : i + 1 === current
                ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
                : 'border-themed bg-card-bg text-muted surface-card',
          ]"
          @click="onChange?.(i + 1)"
        >
          <IconBase v-if="i + 1 < current" name="check" :size="18" :stroke-width="2.5" />
          <template v-else>{{ i + 1 }}</template>
        </button>
        <div class="mt-2 max-w-[8rem] text-center">
          <p class="text-xs font-medium" :class="i + 1 === current || i + 1 < current ? 'text-heading' : 'text-muted'">
            {{ s.label }}
          </p>
          <p v-if="s.description" class="mt-0.5 text-[11px] text-muted">{{ s.description }}</p>
        </div>
      </div>
      <div
        v-if="i !== steps.length - 1"
        class="mt-5 h-0.5 flex-1 rounded-full transition"
        :class="i + 1 < current ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'"
      />
    </li>
  </ol>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconBase from './IconBase.vue'

export interface Step {
  label: string
  description?: string
}

const props = defineProps<{
  steps: Step[]
  /** 1-based index of the current step */
  current: number
  onChange?: (idx: number) => void
}>()

const clickable = computed(() => !!props.onChange)
</script>
