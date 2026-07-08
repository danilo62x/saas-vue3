<template>
  <section class="border-y border-themed bg-card-bg surface-card">
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p class="text-center text-xs font-medium uppercase tracking-wider text-muted">{{ t('marketing.clients') }}</p>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        <span
          v-for="logo in CLIENT_LOGOS"
          :key="logo"
          class="text-xl font-bold text-gray-400 transition hover:text-heading dark:text-gray-600"
        >
          {{ logo }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CLIENT_LOGOS } from '@/data/mock'

const { t } = useI18n()
</script>
