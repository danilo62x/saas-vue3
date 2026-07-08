<template>
  <div class="max-w-2xl space-y-5">
    <h3 class="text-base font-semibold text-heading">{{ t('settings.notifications.title') }}</h3>
    <div class="divide-y divide-themed rounded-2xl border border-themed">
      <div v-for="key in KEYS" :key="key" class="flex items-center justify-between gap-4 p-4">
        <div>
          <p class="text-sm font-medium text-heading">{{ t(`settings.notifications.${key}`) }}</p>
          <p class="text-xs text-muted">{{ t(`settings.notifications.${key}Desc`) }}</p>
        </div>
        <SwitchToggle :model-value="prefs[key]" @update:model-value="(v) => onToggle(key, v)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'
import SwitchToggle from '@/components/ui/SwitchToggle.vue'

type PrefKey = 'email' | 'push' | 'product' | 'billing'

const { t } = useI18n()
const ui = useUiStore()

const KEYS: PrefKey[] = ['email', 'push', 'product', 'billing']
const prefs = reactive<Record<PrefKey, boolean>>({ email: true, push: false, product: true, billing: true })

function onToggle(key: PrefKey, val: boolean) {
  prefs[key] = val
  ui.notifySuccess(t('settings.notifications.saved'))
}
</script>
