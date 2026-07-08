<template>
  <div class="max-w-2xl space-y-8">
    <div class="space-y-5">
      <h3 class="text-base font-semibold text-heading">{{ t('settings.account.title') }}</h3>
      <SettingsField v-model="current" :label="t('settings.account.current')" type="password" />
      <div class="grid gap-5 sm:grid-cols-2">
        <SettingsField v-model="next" :label="t('settings.account.new')" type="password" />
        <SettingsField v-model="confirm" :label="t('settings.account.confirm')" type="password" />
      </div>
      <button
        type="button"
        class="flex h-11 items-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white hover:bg-brand-600"
        @click="update"
      >
        {{ t('settings.account.update') }}
      </button>
    </div>

    <div class="rounded-2xl border border-error-200 p-5 dark:border-error-500/30">
      <h4 class="text-sm font-semibold text-error-600 dark:text-error-500">{{ t('settings.account.dangerTitle') }}</h4>
      <p class="mt-1 text-sm text-muted">{{ t('settings.account.dangerDesc') }}</p>
      <button
        type="button"
        class="mt-4 flex h-10 items-center rounded-lg border border-error-300 px-4 text-sm font-medium text-error-600 hover:bg-error-50 dark:border-error-500/40 dark:hover:bg-error-500/10"
      >
        {{ t('settings.account.deleteAccount') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'
import SettingsField from './SettingsField.vue'

const { t } = useI18n()
const ui = useUiStore()

const current = ref('')
const next = ref('')
const confirm = ref('')

function update() {
  ui.notifySuccess(t('settings.account.updated'))
  current.value = ''
  next.value = ''
  confirm.value = ''
}
</script>
