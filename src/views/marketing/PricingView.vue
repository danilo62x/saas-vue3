<template>
  <section class="mx-auto max-w-7xl px-4 pt-16 pb-8 text-center sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold text-heading sm:text-5xl">{{ t('pricingPage.title') }}</h1>
    <p class="mx-auto mt-5 max-w-2xl text-muted">{{ t('pricingPage.subtitle') }}</p>
    <div class="mt-8">
      <PricingToggle :cycle="cycle" @update:cycle="cycle = $event" />
    </div>
  </section>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <PricingTable :cycle="cycle" />
  </div>

  <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    <h2 class="text-center text-2xl font-bold text-heading sm:text-3xl">{{ t('pricingPage.compareTitle') }}</h2>
    <div class="surface-card mt-10 overflow-x-auto rounded-2xl border">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-themed">
            <th class="px-5 py-4 font-medium text-muted"></th>
            <th v-for="p in PLANS" :key="p.id" class="px-5 py-4 text-center font-semibold text-heading">
              {{ t(`plans.${p.nameKey}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.labelKey" class="border-b border-themed last:border-0">
            <td class="px-5 py-3 font-medium text-body">{{ t(`pricingPage.compare.${row.labelKey}`) }}</td>
            <td v-for="p in PLANS" :key="p.id" class="px-5 py-3 text-center text-muted">
              {{ row.get(p.limits[limitKey(row.labelKey)]) }}
            </td>
          </tr>
          <tr v-for="row in boolRows" :key="row.labelKey" class="border-b border-themed last:border-0">
            <td class="px-5 py-3 font-medium text-body">{{ t(`pricingPage.compare.${row.labelKey}`) }}</td>
            <td v-for="p in PLANS" :key="p.id" class="px-5 py-3 text-center">
              <IconBase
                v-if="row.ids.includes(p.id)"
                name="check"
                :size="18"
                :stroke-width="2.5"
                class="mx-auto text-success-500"
              />
              <IconBase v-else name="minus" :size="16" class="mx-auto text-gray-300 dark:text-gray-600" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <FaqSection :title="t('pricingPage.faqTitle')" prefix="pricingPage.faq" :count="3" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/usePageTitle'
import { PLANS, type BillingCycle, type Plan } from '@/data/mock'
import PricingToggle from '@/components/marketing/PricingToggle.vue'
import PricingTable from '@/components/marketing/PricingTable.vue'
import FaqSection from '@/components/marketing/FaqSection.vue'
import IconBase from '@/components/ui/IconBase.vue'

type Row = { labelKey: string; get: (limit: number) => string }

const { t } = useI18n()
usePageTitle(() => t('pricingPage.title'))
const cycle = ref<BillingCycle>('monthly')

const limitFmt = (limit: number) => (limit === -1 ? t('pricingPage.compare.unlimited') : String(limit))

const rows = computed<Row[]>(() => [
  { labelKey: 'projects', get: (l) => limitFmt(l) },
  { labelKey: 'members', get: (l) => limitFmt(l) },
  { labelKey: 'storage', get: (l) => (l === -1 ? t('pricingPage.compare.unlimited') : `${l} GB`) },
  { labelKey: 'api', get: (l) => (l === -1 ? t('pricingPage.compare.unlimited') : `${l}k`) },
])

const boolRows: { labelKey: string; ids: string[] }[] = [
  { labelKey: 'analytics', ids: ['pro', 'business', 'enterprise'] },
  { labelKey: 'sso', ids: ['business', 'enterprise'] },
]

function limitKey(labelKey: string): keyof Plan['limits'] {
  if (labelKey === 'storage') return 'storageGb'
  if (labelKey === 'api') return 'apiCallsK'
  return labelKey as 'projects' | 'members'
}
</script>
