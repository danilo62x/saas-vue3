<template>
  <Hero />
  <LogosStrip />
  <FeaturesGrid />
  <HowItWorks />
  <StatsBand />
  <Testimonials />

  <section class="border-t border-themed bg-card-bg surface-card">
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold text-heading sm:text-4xl">{{ t('marketing.pricingPreview.title') }}</h2>
        <p class="mt-4 text-muted">{{ t('marketing.pricingPreview.subtitle') }}</p>
      </div>
      <div class="mt-8">
        <PricingToggle :cycle="cycle" @update:cycle="cycle = $event" />
      </div>
      <div class="mt-10">
        <PricingTable :cycle="cycle" />
      </div>
      <div class="mt-10 text-center">
        <RouterLink to="/precos" class="text-sm font-medium text-brand-500 hover:text-brand-600">
          {{ t('marketing.pricingPreview.viewFull') }} →
        </RouterLink>
      </div>
    </div>
  </section>

  <FaqSection :title="t('marketing.faqTitle')" prefix="marketing.faq" :count="4" />
  <CtaSection />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/usePageTitle'
import { type BillingCycle } from '@/data/mock'
import Hero from '@/components/marketing/Hero.vue'
import LogosStrip from '@/components/marketing/LogosStrip.vue'
import FeaturesGrid from '@/components/marketing/FeaturesGrid.vue'
import HowItWorks from '@/components/marketing/HowItWorks.vue'
import StatsBand from '@/components/marketing/StatsBand.vue'
import Testimonials from '@/components/marketing/Testimonials.vue'
import PricingToggle from '@/components/marketing/PricingToggle.vue'
import PricingTable from '@/components/marketing/PricingTable.vue'
import FaqSection from '@/components/marketing/FaqSection.vue'
import CtaSection from '@/components/marketing/CtaSection.vue'

const { t } = useI18n()
usePageTitle()
const cycle = ref<BillingCycle>('monthly')
</script>
