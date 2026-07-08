<template>
  <PageHeader
    :title="t('team.title')"
    :subtitle="t('team.subtitle')"
    :crumbs="[{ label: t('appNav.dashboard'), href: '/app' }, { label: t('team.title') }]"
  >
    <template #action>
      <button
        type="button"
        class="flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
        @click="open = true"
      >
        <IconBase name="plus" :size="16" />
        {{ t('team.invite') }}
      </button>
    </template>
  </PageHeader>

  <DataTable :columns="columns" :data="members" :page-size="10" />

  <ModalBase v-model="open" :title="t('team.inviteModalTitle')">
    <div class="space-y-4">
      <div>
        <label class="mb-2 block text-sm font-medium text-heading">{{ t('team.columns.member') }}</label>
        <input
          v-model="email"
          type="email"
          :placeholder="t('team.emailPlaceholder')"
          class="focus-ring h-11 w-full rounded-lg border border-themed bg-transparent px-3.5 text-sm text-body placeholder:text-muted"
        />
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium text-heading">{{ t('team.columns.role') }}</label>
        <select
          v-model="inviteRole"
          class="focus-ring h-11 w-full rounded-lg border border-themed bg-transparent px-3.5 text-sm text-body"
        >
          <option v-for="r in ROLES" :key="r" :value="r">{{ t(`team.roles.${r}`) }}</option>
        </select>
      </div>
    </div>
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
        @click="sendInvite"
      >
        {{ t('team.sendInvite') }}
      </button>
    </template>
  </ModalBase>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ColumnDef } from '@tanstack/vue-table'
import { usePageTitle } from '@/composables/usePageTitle'
import { useTeamStore } from '@/stores/team'
import { useUiStore } from '@/stores/ui'
import { type Member, type MemberRole } from '@/data/mock'
import { formatDate } from '@/lib/format'
import PageHeader from '@/components/app/PageHeader.vue'
import DataTable from '@/components/ui/DataTable.vue'
import ModalBase from '@/components/ui/ModalBase.vue'
import Badge from '@/components/ui/Badge.vue'
import Avatar from '@/components/ui/Avatar.vue'
import IconBase from '@/components/ui/IconBase.vue'

const ROLES: MemberRole[] = ['admin', 'member', 'viewer']

const { t, locale } = useI18n()
usePageTitle(() => t('team.title'))
const teamStore = useTeamStore()
const ui = useUiStore()

const members = computed(() => teamStore.members)
const open = ref(false)
const email = ref('')
const inviteRole = ref<MemberRole>('member')

function sendInvite() {
  if (!email.value.trim()) return
  teamStore.invite(email.value.trim(), inviteRole.value)
  ui.notifySuccess(t('team.invited', { email: email.value.trim() }))
  email.value = ''
  inviteRole.value = 'member'
  open.value = false
}

const columns = computed<ColumnDef<Member, any>[]>(() => [
  {
    accessorKey: 'name',
    header: t('team.columns.member'),
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-3' }, [
        h(Avatar, { name: row.original.name, size: 'sm' }),
        h('div', {}, [
          h('p', { class: 'font-medium text-heading' }, row.original.name),
          h('p', { class: 'text-xs text-muted' }, row.original.email),
        ]),
      ]),
  },
  {
    accessorKey: 'role',
    header: t('team.columns.role'),
    cell: ({ row }) =>
      h(
        'select',
        {
          value: row.original.role,
          class: 'focus-ring rounded-lg border border-themed bg-transparent px-2.5 py-1.5 text-sm text-body',
          onChange: (e: Event) => teamStore.setRole(row.original.id, (e.target as HTMLSelectElement).value as MemberRole),
        },
        ROLES.map((r) => h('option', { key: r, value: r }, t(`team.roles.${r}`)))
      ),
  },
  {
    accessorKey: 'status',
    header: t('team.columns.status'),
    cell: ({ row }) =>
      h(
        Badge,
        { color: row.original.status === 'active' ? 'success' : 'warning', dot: true },
        () => t(`team.statuses.${row.original.status}`)
      ),
  },
  {
    accessorKey: 'joinedAt',
    header: t('team.columns.joined'),
    cell: ({ getValue }) => h('span', { class: 'text-muted' }, formatDate(getValue<string>(), locale.value)),
  },
  {
    id: 'actions',
    header: t('team.columns.actions'),
    enableSorting: false,
    cell: ({ row }) =>
      h(
        'button',
        {
          type: 'button',
          class: 'text-gray-400 transition hover:text-error-500',
          'aria-label': t('common.delete'),
          onClick: () => {
            teamStore.remove(row.original.id)
            ui.notifySuccess(t('team.removed'))
          },
        },
        h(IconBase, { name: 'trash', size: 18 })
      ),
  },
])
</script>
