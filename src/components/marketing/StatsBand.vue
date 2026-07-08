<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 gap-6 rounded-3xl bg-brand-500 p-10 text-center text-white lg:grid-cols-4">
      <div v-for="s in MARKETING_STATS" :key="s.labelKey">
        <p class="text-3xl font-bold sm:text-4xl">{{ s.value }}</p>
        <p class="mt-1 text-sm text-white/80">{{ t(`marketing.stats.${s.labelKey}`) }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { MARKETING_STATS } from '@/data/mock'

const { t } = useI18n()
</script>
