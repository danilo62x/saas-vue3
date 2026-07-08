<template>
  <section class="mx-auto max-w-7xl px-4 pt-16 pb-8 text-center sm:px-6 lg:px-8">
    <h1 class="mx-auto max-w-3xl text-4xl font-bold text-heading sm:text-5xl">{{ t('about.title') }}</h1>
    <p class="mx-auto mt-5 max-w-2xl text-muted">{{ t('about.subtitle') }}</p>
  </section>

  <section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="surface-card rounded-2xl border p-8 text-center">
      <h2 class="text-2xl font-bold text-heading">{{ t('about.missionTitle') }}</h2>
      <p class="mt-4 text-muted">{{ t('about.mission') }}</p>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <h2 class="text-center text-2xl font-bold text-heading sm:text-3xl">{{ t('about.valuesTitle') }}</h2>
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      <div v-for="v in VALUES" :key="v" class="surface-card rounded-2xl border p-6 text-center">
        <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15">
          <IconBase :name="VALUE_ICONS[v]" :size="24" />
        </span>
        <h3 class="mt-5 text-lg font-semibold text-heading">{{ t(`about.values.${v}.title`) }}</h3>
        <p class="mt-2 text-sm text-muted">{{ t(`about.values.${v}.desc`) }}</p>
      </div>
    </div>
  </section>

  <section class="border-y border-themed bg-card-bg surface-card">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 class="text-center text-2xl font-bold text-heading sm:text-3xl">{{ t('about.statsTitle') }}</h2>
      <div class="mt-10 grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
        <div v-for="s in MARKETING_STATS" :key="s.labelKey">
          <p class="text-3xl font-bold text-brand-500 sm:text-4xl">{{ s.value }}</p>
          <p class="mt-1 text-sm text-muted">{{ t(`marketing.stats.${s.labelKey}`) }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <h2 class="text-center text-2xl font-bold text-heading sm:text-3xl">{{ t('about.teamTitle') }}</h2>
    <div class="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
      <div v-for="m in TEAM" :key="m.name" class="surface-card flex flex-col items-center rounded-2xl border p-6 text-center">
        <Avatar :name="m.name" size="xl" />
        <p class="mt-4 text-sm font-semibold text-heading">{{ m.name }}</p>
        <p class="text-xs text-muted">{{ m.role }}</p>
      </div>
    </div>
  </section>

  <CtaSection />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/usePageTitle'
import { MARKETING_STATS } from '@/data/mock'
import Avatar from '@/components/ui/Avatar.vue'
import IconBase from '@/components/ui/IconBase.vue'
import CtaSection from '@/components/marketing/CtaSection.vue'

const VALUES = ['v1', 'v2', 'v3']
const VALUE_ICONS: Record<string, string> = { v1: 'users', v2: 'eye', v3: 'star' }
const TEAM = [
  { name: 'Ana Martins', role: 'CEO' },
  { name: 'Rafael Dias', role: 'CTO' },
  { name: 'Júlia Nunes', role: 'Head of Product' },
  { name: 'Bruno Lima', role: 'Head of Design' },
]

const { t } = useI18n()
usePageTitle(() => t('about.title'))
</script>
