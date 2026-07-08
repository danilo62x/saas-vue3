<template>
  <div
    class="surface-card relative flex flex-col rounded-2xl border p-6"
    :class="plan.popular ? 'border-brand-500 shadow-theme-lg ring-1 ring-brand-500' : ''"
  >
    <span
      v-if="plan.popular"
      class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white"
    >
      {{ t('plans.mostPopular') }}
    </span>

    <h3 class="text-lg font-semibold text-heading">{{ t(`plans.${plan.nameKey}`) }}</h3>
    <p class="mt-1 text-sm text-muted">{{ t(`plans.descriptions.${plan.id}`) }}</p>

    <div class="mt-5 flex items-baseline gap-1">
      <template v-if="isEnterprise">
        <span class="text-2xl font-bold text-heading">{{ t('pricingPage.custom') }}</span>
      </template>
      <template v-else>
        <span class="text-3xl font-bold text-heading">{{ formatCurrency(price, locale) }}</span>
        <span class="text-sm text-muted">{{ t('pricingPage.perMonth') }}</span>
      </template>
    </div>
    <p v-if="!isEnterprise && cycle === 'yearly' && price > 0" class="mt-1 text-xs text-muted">
      {{ t('pricingPage.billedYearly') }}
    </p>

    <button
      type="button"
      :disabled="current"
      class="mt-6 flex h-11 w-full items-center justify-center rounded-lg text-sm font-medium transition"
      :class="
        current
          ? 'cursor-default border border-themed text-muted'
          : plan.popular
            ? 'bg-brand-500 text-white hover:bg-brand-600'
            : 'border border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'
      "
      @click="emit('select', plan)"
    >
      {{ ctaLabel }}
    </button>

    <ul class="mt-6 space-y-3">
      <li v-for="fk in plan.featureKeys" :key="fk" class="flex items-start gap-2.5 text-sm text-body">
        <IconBase name="check" :size="16" :stroke-width="2.5" class="mt-0.5 text-success-500" />
        {{ t(`plans.features.${fk}`) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { type Plan, type BillingCycle } from '@/data/mock'
import { formatCurrency } from '@/lib/format'
import IconBase from '@/components/ui/IconBase.vue'

const props = defineProps<{
  plan: Plan
  cycle: BillingCycle
  current?: boolean
}>()

const emit = defineEmits<{ (e: 'select', plan: Plan): void }>()

const { t, locale } = useI18n()

const isEnterprise = computed(() => props.plan.id === 'enterprise')
const price = computed(() => (props.cycle === 'monthly' ? props.plan.priceMonthly : props.plan.priceYearly))

const ctaLabel = computed(() => {
  if (props.current) return t('plans.current')
  if (isEnterprise.value) return t('plans.contactSales')
  if (props.plan.id === 'free') return t('plans.startFree')
  return t('plans.choose')
})
</script>
