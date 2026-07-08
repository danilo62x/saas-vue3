<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-4 text-center" :style="{ backgroundColor: 'var(--tx-body-bg)' }">
    <p class="text-7xl font-bold text-brand-500 sm:text-8xl">404</p>
    <h1 class="mt-4 text-2xl font-bold text-heading">{{ t('notFound.title') }}</h1>
    <p class="mt-2 max-w-md text-muted">{{ t('notFound.desc') }}</p>
    <div class="mt-8 flex gap-3">
      <RouterLink
        to="/"
        class="flex h-11 items-center rounded-lg border border-themed px-5 text-sm font-medium text-body transition hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        {{ t('notFound.home') }}
      </RouterLink>
      <RouterLink
        v-if="isAuth"
        to="/app"
        class="flex h-11 items-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600"
      >
        {{ t('notFound.dashboard') }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/usePageTitle'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
usePageTitle('404')
const auth = useAuthStore()
const isAuth = computed(() => auth.user !== null)
</script>
