<template>
  <section class="border-y border-themed bg-card-bg surface-card">
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold text-heading sm:text-4xl">{{ t('marketing.how.title') }}</h2>
        <p class="mt-4 text-muted">{{ t('marketing.how.subtitle') }}</p>
      </div>

      <div class="mt-14 grid gap-8 md:grid-cols-3">
        <div v-for="(s, i) in STEPS" :key="s" class="relative text-center">
          <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-xl font-bold text-white shadow-theme-md">
            {{ i + 1 }}
          </span>
          <h3 class="mt-5 text-lg font-semibold text-heading">{{ t(`marketing.how.steps.${s}.title`) }}</h3>
          <p class="mt-2 text-sm text-muted">{{ t(`marketing.how.steps.${s}.desc`) }}</p>
          <span
            v-if="i < STEPS.length - 1"
            class="absolute top-7 left-[calc(50%+3rem)] hidden h-0.5 w-[calc(100%-6rem)] bg-gradient-to-r from-brand-300 to-transparent md:block"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const STEPS = ['s1', 's2', 's3']
const { t } = useI18n()
</script>
