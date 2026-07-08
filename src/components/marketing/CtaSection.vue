<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500 px-6 py-16 text-center">
      <div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <h2 class="relative text-3xl font-bold text-white sm:text-4xl">{{ t('marketing.cta.title') }}</h2>
      <p class="relative mx-auto mt-4 max-w-xl text-white/80">{{ t('marketing.cta.subtitle') }}</p>
      <RouterLink
        to="/registro"
        class="relative mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-brand-600 shadow-theme-md transition hover:bg-gray-50"
      >
        {{ t('marketing.cta.button') }}
        <IconBase name="arrow-right" :size="16" />
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import IconBase from '@/components/ui/IconBase.vue'

const { t } = useI18n()
</script>
