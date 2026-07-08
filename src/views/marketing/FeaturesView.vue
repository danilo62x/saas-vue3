<template>
  <section class="mx-auto max-w-7xl px-4 pt-16 pb-8 text-center sm:px-6 lg:px-8">
    <h1 class="mx-auto max-w-3xl text-4xl font-bold text-heading sm:text-5xl">{{ t('featuresPage.title') }}</h1>
    <p class="mx-auto mt-5 max-w-2xl text-muted">{{ t('featuresPage.subtitle') }}</p>
  </section>

  <div class="mx-auto max-w-7xl space-y-20 px-4 py-12 sm:px-6 lg:px-8">
    <section
      v-for="(s, i) in SECTIONS"
      :key="s.key"
      class="grid items-center gap-10 lg:grid-cols-2"
      :class="i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''"
    >
      <div>
        <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15">
          <IconBase :name="s.icon" :size="24" />
        </span>
        <h2 class="mt-5 text-2xl font-bold text-heading sm:text-3xl">{{ t(`featuresPage.sections.${s.key}.title`) }}</h2>
        <p class="mt-3 text-muted">{{ t(`featuresPage.sections.${s.key}.desc`) }}</p>
        <ul class="mt-6 space-y-3">
          <li
            v-for="p in (tm(`featuresPage.sections.${s.key}.points`) as unknown as string[])"
            :key="p"
            class="flex items-center gap-2.5 text-sm text-body"
          >
            <IconBase name="check-circle" :size="18" class="text-success-500" />
            {{ p }}
          </li>
        </ul>
      </div>
      <div class="surface-card flex h-64 items-center justify-center rounded-2xl border">
        <IconBase :name="s.icon" :size="72" class="text-brand-500/30" />
      </div>
    </section>
  </div>

  <CtaSection />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/usePageTitle'
import IconBase from '@/components/ui/IconBase.vue'
import CtaSection from '@/components/marketing/CtaSection.vue'

const SECTIONS: { key: string; icon: string }[] = [
  { key: 'analytics', icon: 'chart' },
  { key: 'collaboration', icon: 'users' },
  { key: 'automation', icon: 'zap' },
  { key: 'security', icon: 'shield-check' },
]

const { t, tm } = useI18n()
usePageTitle(() => t('featuresPage.title'))
</script>
