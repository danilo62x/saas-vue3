<template>
  <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold text-heading sm:text-4xl">{{ t('marketing.features.title') }}</h2>
      <p class="mt-4 text-muted">{{ t('marketing.features.subtitle') }}</p>
    </div>

    <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="f in FEATURES" :key="f.key" class="surface-card rounded-2xl border p-6 transition hover:shadow-theme-md">
        <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15">
          <IconBase :name="f.icon" :size="24" />
        </span>
        <h3 class="mt-5 text-lg font-semibold text-heading">{{ t(`marketing.features.items.${f.key}.title`) }}</h3>
        <p class="mt-2 text-sm text-muted">{{ t(`marketing.features.items.${f.key}.desc`) }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import IconBase from '@/components/ui/IconBase.vue'

const FEATURES: { key: string; icon: string }[] = [
  { key: 'analytics', icon: 'chart' },
  { key: 'team', icon: 'users' },
  { key: 'automation', icon: 'zap' },
  { key: 'security', icon: 'shield-check' },
  { key: 'api', icon: 'key' },
  { key: 'billing', icon: 'credit-card' },
]

const { t } = useI18n()
</script>
