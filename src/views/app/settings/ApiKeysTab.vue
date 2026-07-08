<template>
  <div class="max-w-3xl space-y-5">
    <div>
      <h3 class="text-base font-semibold text-heading">{{ t('settings.apiKeys.title') }}</h3>
      <p class="mt-1 text-sm text-muted">{{ t('settings.apiKeys.desc') }}</p>
    </div>

    <div class="flex gap-2">
      <input
        v-model="name"
        :placeholder="t('settings.apiKeys.namePlaceholder')"
        class="focus-ring h-11 flex-1 rounded-lg border border-themed bg-transparent px-3.5 text-sm text-body placeholder:text-muted"
      />
      <button
        type="button"
        class="flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600"
        @click="generate"
      >
        <IconBase name="plus" :size="16" />
        {{ t('settings.apiKeys.generate') }}
      </button>
    </div>

    <div class="divide-y divide-themed rounded-2xl border border-themed">
      <div v-for="k in keys" :key="k.id" class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-500 dark:bg-brand-500/15">
            <IconBase name="key" :size="16" />
          </span>
          <div>
            <p class="text-sm font-medium text-heading">{{ k.name }}</p>
            <p class="font-mono text-xs text-muted">{{ k.prefix }}••••••••</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-xs text-muted">
            {{ t('settings.apiKeys.lastUsed') }}: {{ k.lastUsed ? formatDate(k.lastUsed, locale) : t('settings.apiKeys.never') }}
          </span>
          <button
            type="button"
            class="text-gray-400 hover:text-brand-500"
            :aria-label="t('settings.apiKeys.copy')"
            @click="ui.notifySuccess(t('settings.apiKeys.copied'))"
          >
            <IconBase name="copy" :size="16" />
          </button>
          <button
            type="button"
            class="text-sm font-medium text-error-500 hover:text-error-600"
            @click="revoke(k.id)"
          >
            {{ t('settings.apiKeys.revoke') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'
import { API_KEYS, type ApiKey } from '@/data/mock'
import { formatDate } from '@/lib/format'
import IconBase from '@/components/ui/IconBase.vue'

const { t, locale } = useI18n()
const ui = useUiStore()

const keys = ref<ApiKey[]>([...API_KEYS])
const name = ref('')

function generate() {
  const keyName = name.value.trim() || 'Untitled'
  const prefix = `sk_live_${Math.random().toString(36).slice(2, 6)}`
  keys.value = [
    { id: Date.now(), name: keyName, prefix, createdAt: new Date().toISOString().slice(0, 10), lastUsed: null },
    ...keys.value,
  ]
  name.value = ''
  ui.notifySuccess(t('settings.apiKeys.generated'))
}

function revoke(id: number) {
  keys.value = keys.value.filter((x) => x.id !== id)
  ui.notifySuccess(t('settings.apiKeys.revoked'))
}
</script>
