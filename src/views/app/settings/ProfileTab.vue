<template>
  <div class="max-w-2xl space-y-5">
    <h3 class="text-base font-semibold text-heading">{{ t('settings.profile.title') }}</h3>
    <div class="grid gap-5 sm:grid-cols-2">
      <SettingsField v-model="name" :label="t('settings.profile.name')" />
      <SettingsField :model-value="user?.email ?? ''" :label="t('settings.profile.email')" disabled />
      <SettingsField v-model="company" :label="t('settings.profile.company')" />
      <SettingsField v-model="role" :label="t('settings.profile.role')" />
    </div>
    <button
      type="button"
      class="flex h-11 items-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white hover:bg-brand-600"
      @click="save"
    >
      {{ t('settings.profile.save') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import SettingsField from './SettingsField.vue'

const { t } = useI18n()
const auth = useAuthStore()
const ui = useUiStore()

const user = computed(() => auth.user)
const name = ref(user.value?.name ?? '')
const company = ref(user.value?.company ?? '')
const role = ref(user.value?.role ?? '')

function save() {
  auth.updateProfile({ name: name.value, company: company.value, role: role.value })
  ui.notifySuccess(t('settings.profile.saved'))
}
</script>
