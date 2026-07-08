<template>
  <div class="max-w-3xl space-y-5">
    <div>
      <h3 class="text-base font-semibold text-heading">{{ t('settings.integrations.title') }}</h3>
      <p class="mt-1 text-sm text-muted">{{ t('settings.integrations.desc') }}</p>
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      <div v-for="app in apps" :key="app.id" class="surface-card flex items-center justify-between gap-4 rounded-2xl border p-4">
        <div class="flex items-center gap-3">
          <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-body dark:bg-gray-800">
            <IconBase :name="app.icon" :size="20" />
          </span>
          <div>
            <p class="text-sm font-medium text-heading">{{ app.name }}</p>
            <p class="text-xs text-muted">{{ t(`settings.integrations.apps.${app.descKey}`) }}</p>
          </div>
        </div>
        <button
          type="button"
          class="h-9 shrink-0 rounded-lg px-3 text-sm font-medium transition"
          :class="
            app.connected
              ? 'border border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'
              : 'bg-brand-500 text-white hover:bg-brand-600'
          "
          @click="toggle(app)"
        >
          {{ app.connected ? t('settings.integrations.disconnect') : t('settings.integrations.connect') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'
import { INTEGRATIONS, type Integration } from '@/data/mock'
import IconBase from '@/components/ui/IconBase.vue'

const { t } = useI18n()
const ui = useUiStore()

const apps = ref<Integration[]>(INTEGRATIONS.map((a) => ({ ...a })))

function toggle(app: Integration) {
  const wasConnected = app.connected
  apps.value = apps.value.map((a) => (a.id === app.id ? { ...a, connected: !a.connected } : a))
  ui.notifySuccess(
    wasConnected
      ? t('settings.integrations.disconnectedMsg', { name: app.name })
      : t('settings.integrations.connectedMsg', { name: app.name })
  )
}
</script>
