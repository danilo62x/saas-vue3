<template>
  <PageHeader
    :title="t('settings.title')"
    :subtitle="t('settings.subtitle')"
    :crumbs="[{ label: t('appNav.dashboard'), href: '/app' }, { label: t('settings.title') }]"
  />
  <div class="surface-card rounded-2xl border p-5 md:p-6">
    <Tabs v-model="tab" :tabs="tabItems">
      <template #tab-0><ProfileTab /></template>
      <template #tab-1><AccountTab /></template>
      <template #tab-2><NotificationsTab /></template>
      <template #tab-3><ApiKeysTab /></template>
      <template #tab-4><IntegrationsTab /></template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/usePageTitle'
import Tabs, { type TabItem } from '@/components/ui/Tabs.vue'
import PageHeader from '@/components/app/PageHeader.vue'
import ProfileTab from './settings/ProfileTab.vue'
import AccountTab from './settings/AccountTab.vue'
import NotificationsTab from './settings/NotificationsTab.vue'
import ApiKeysTab from './settings/ApiKeysTab.vue'
import IntegrationsTab from './settings/IntegrationsTab.vue'

const { t } = useI18n()
usePageTitle(() => t('settings.title'))
const tab = ref(0)

const tabItems = computed<TabItem[]>(() => [
  { label: t('settings.tabs.profile'), icon: 'user' },
  { label: t('settings.tabs.account'), icon: 'lock' },
  { label: t('settings.tabs.notifications'), icon: 'bell' },
  { label: t('settings.tabs.apiKeys'), icon: 'key' },
  { label: t('settings.tabs.integrations'), icon: 'layers' },
])
</script>
