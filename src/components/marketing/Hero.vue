<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 -z-10">
      <div class="absolute -top-40 left-1/2 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
    </div>

    <div class="mx-auto max-w-7xl px-4 pt-16 pb-12 text-center sm:px-6 lg:px-8 lg:pt-24">
      <span class="inline-flex items-center gap-2 rounded-full border border-themed bg-card-bg px-3 py-1 text-xs font-medium text-brand-600 surface-card dark:text-brand-400">
        <IconBase name="zap" :size="14" />
        {{ t('marketing.hero.badge') }}
      </span>

      <h1 class="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight text-heading sm:text-5xl lg:text-title-md">
        {{ t('marketing.hero.title') }}
      </h1>
      <p class="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">{{ t('marketing.hero.subtitle') }}</p>

      <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <RouterLink
          to="/registro"
          class="flex h-12 items-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-medium text-white shadow-theme-md transition hover:bg-brand-600"
        >
          {{ t('marketing.hero.ctaPrimary') }}
          <IconBase name="arrow-right" :size="16" />
        </RouterLink>
        <RouterLink
          to="/recursos"
          class="flex h-12 items-center gap-2 rounded-lg border border-themed px-6 text-sm font-medium text-body transition hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <IconBase name="activity" :size="16" />
          {{ t('marketing.hero.ctaSecondary') }}
        </RouterLink>
      </div>
      <p class="mt-4 text-xs text-muted">{{ t('marketing.hero.noCard') }}</p>

      <div class="relative mx-auto mt-14 max-w-5xl">
        <div class="surface-card overflow-hidden rounded-2xl border shadow-theme-xl">
          <div class="flex items-center gap-1.5 border-b border-themed px-4 py-3">
            <span class="h-3 w-3 rounded-full bg-error-400" />
            <span class="h-3 w-3 rounded-full bg-warning-400" />
            <span class="h-3 w-3 rounded-full bg-success-400" />
            <span class="ml-3 text-xs text-muted">app.nimbus.io/dashboard</span>
          </div>
          <div class="grid grid-cols-1 gap-4 p-5 sm:grid-cols-4">
            <div v-for="k in KPIS" :key="k.label" class="rounded-xl border border-themed p-4 text-left">
              <p class="text-xs text-muted">{{ k.label }}</p>
              <p class="mt-1 text-xl font-bold" :class="k.accent">{{ k.value }}</p>
            </div>
            <div class="col-span-1 flex h-40 items-end gap-2 rounded-xl border border-themed p-4 sm:col-span-4">
              <span
                v-for="(h, i) in BARS"
                :key="i"
                class="flex-1 rounded-t bg-brand-500/70"
                :style="{ height: `${h}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import IconBase from '@/components/ui/IconBase.vue'

const { t } = useI18n()

const KPIS = [
  { label: 'MRR', value: 'R$ 48.250', accent: 'text-brand-500' },
  { label: 'Usuários', value: '2.840', accent: 'text-success-600' },
  { label: 'Churn', value: '1,8%', accent: 'text-warning-600' },
  { label: 'Conversão', value: '4,6%', accent: 'text-blue-light-500' },
]

const BARS = [40, 65, 50, 80, 70, 95, 85, 100, 90, 75, 88, 110]
</script>
