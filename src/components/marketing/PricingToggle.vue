<template>
  <div class="flex items-center justify-center gap-4">
    <span class="text-sm font-medium" :class="cycle === 'monthly' ? 'text-heading' : 'text-muted'">
      {{ t('pricingPage.monthly') }}
    </span>
    <button
      type="button"
      role="switch"
      :aria-checked="cycle === 'yearly'"
      class="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition"
      :class="cycle === 'yearly' ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-700'"
      @click="emit('update:cycle', cycle === 'monthly' ? 'yearly' : 'monthly')"
    >
      <span
        class="inline-block h-5 w-5 transform rounded-full bg-white shadow-theme-xs transition"
        :class="cycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'"
      />
    </button>
    <span class="flex items-center gap-2 text-sm font-medium" :class="cycle === 'yearly' ? 'text-heading' : 'text-muted'">
      {{ t('pricingPage.yearly') }}
      <span class="rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500">
        {{ t('pricingPage.save') }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BillingCycle } from '@/data/mock'

defineProps<{ cycle: BillingCycle }>()
const emit = defineEmits<{ (e: 'update:cycle', value: BillingCycle): void }>()

const { t } = useI18n()
</script>
