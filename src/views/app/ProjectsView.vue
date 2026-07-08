<template>
  <PageHeader
    :title="t('projects.title')"
    :subtitle="t('projects.subtitle')"
    :crumbs="[{ label: t('appNav.dashboard'), href: '/app' }, { label: t('projects.title') }]"
  >
    <template #action>
      <button
        type="button"
        class="flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
        @click="open = true"
      >
        <IconBase name="plus" :size="16" />
        {{ t('projects.new') }}
      </button>
    </template>
  </PageHeader>

  <EmptyState
    v-if="projects.length === 0"
    icon="folder"
    :title="t('projects.empty')"
    :description="t('projects.emptyDesc')"
  >
    <template #action>
      <button
        type="button"
        class="flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
        @click="open = true"
      >
        <IconBase name="plus" :size="16" />
        {{ t('projects.new') }}
      </button>
    </template>
  </EmptyState>

  <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="p in projects" :key="p.id" class="surface-card group rounded-2xl border p-5">
      <div class="flex items-start justify-between">
        <span class="flex h-11 w-11 items-center justify-center rounded-xl text-white" :style="{ backgroundColor: p.color }">
          <IconBase name="folder" :size="20" />
        </span>
        <button
          type="button"
          class="text-gray-400 opacity-0 transition hover:text-error-500 group-hover:opacity-100"
          :aria-label="t('common.delete')"
          @click="onRemove(p.id)"
        >
          <IconBase name="trash" :size="18" />
        </button>
      </div>
      <h3 class="mt-4 text-base font-semibold text-heading">{{ p.name }}</h3>
      <div class="mt-2">
        <Badge :color="STATUS_COLOR[p.status]" dot>{{ t(`projects.statuses.${p.status}`) }}</Badge>
      </div>

      <div class="mt-4">
        <div class="flex items-center justify-between text-xs text-muted">
          <span>{{ p.progress }}%</span>
          <span>{{ t('projects.members', { count: p.members }, p.members) }}</span>
        </div>
        <div class="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div class="h-full rounded-full bg-brand-500" :style="{ width: `${p.progress}%` }" />
        </div>
      </div>

      <p class="mt-4 text-xs text-muted">{{ t('projects.updated') }}: {{ formatDate(p.updatedAt, locale) }}</p>
    </div>
  </div>

  <ModalBase v-model="open" :title="t('projects.newModalTitle')">
    <label class="mb-2 block text-sm font-medium text-heading">{{ t('projects.namePlaceholder') }}</label>
    <input
      ref="nameInput"
      v-model="name"
      :placeholder="t('projects.namePlaceholder')"
      class="focus-ring h-11 w-full rounded-lg border border-themed bg-transparent px-3.5 text-sm text-body placeholder:text-muted"
      @keydown.enter="create"
    />
    <template #footer="{ close }">
      <button
        type="button"
        class="rounded-lg border border-themed px-4 py-2 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
        @click="close"
      >
        {{ t('common.cancel') }}
      </button>
      <button
        type="button"
        class="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        @click="create"
      >
        {{ t('projects.create') }}
      </button>
    </template>
  </ModalBase>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/usePageTitle'
import { useProjectsStore } from '@/stores/projects'
import { useUiStore } from '@/stores/ui'
import { formatDate } from '@/lib/format'
import PageHeader from '@/components/app/PageHeader.vue'
import ModalBase from '@/components/ui/ModalBase.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import IconBase from '@/components/ui/IconBase.vue'

const STATUS_COLOR = { active: 'success', paused: 'warning', archived: 'gray' } as const

const { t, locale } = useI18n()
usePageTitle(() => t('projects.title'))
const projectsStore = useProjectsStore()
const ui = useUiStore()

const projects = computed(() => projectsStore.projects)
const open = ref(false)
const name = ref('')

function create() {
  if (!name.value.trim()) return
  projectsStore.addProject(name.value.trim())
  ui.notifySuccess(t('projects.created'))
  name.value = ''
  open.value = false
}

function onRemove(id: number) {
  projectsStore.removeProject(id)
  ui.notifySuccess(t('projects.removed'))
}
</script>
