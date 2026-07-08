<template>
  <div>
    <div class="flex items-center justify-between text-sm">
      <span class="text-body">{{ label }}</span>
      <span class="text-muted">{{ used }} / {{ unlimited ? '∞' : limit }}</span>
    </div>
    <div class="mt-2 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
      <div class="h-full rounded-full" :class="danger ? 'bg-warning-500' : 'bg-brand-500'" :style="{ width: `${pct}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    used: number
    limit: number
    /** Highlight the bar in warning color once usage reaches 80%. */
    withDanger?: boolean
  }>(),
  { withDanger: true }
)

const unlimited = computed(() => props.limit === -1)
const pct = computed(() => (unlimited.value ? 8 : Math.min(100, Math.round((props.used / props.limit) * 100))))
const danger = computed(() => props.withDanger && !unlimited.value && pct.value >= 80)
</script>
