<template>
  <PageHeader
    :title="t('billing.title')"
    :subtitle="t('billing.subtitle')"
    :crumbs="[{ label: t('appNav.dashboard'), href: '/app' }, { label: t('billing.title') }]"
  />

  <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
    <div class="surface-card rounded-2xl border p-6 lg:col-span-2">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p class="text-sm text-muted">{{ t('billing.currentPlan') }}</p>
          <div class="mt-1 flex items-center gap-2">
            <h2 class="text-2xl font-bold text-heading">{{ t(`plans.${plan.nameKey}`) }}</h2>
            <Badge v-if="subscription.canceled" color="error">{{ t('billing.canceled') }}</Badge>
          </div>
          <p class="mt-1 text-sm text-muted">
            {{ plan.id === 'enterprise' ? t('pricingPage.custom') : `${formatCurrency(price, locale)} ${t('pricingPage.perMonth')}` }}
          </p>
          <p v-if="!subscription.canceled" class="mt-2 text-xs text-muted">{{ t('billing.renews') }}</p>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="flex h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
            @click="openChange"
          >
            {{ t('billing.changePlan') }}
          </button>
        </div>
      </div>

      <div
        v-if="subscription.canceled"
        class="mt-5 flex flex-col gap-3 rounded-xl bg-error-50 p-4 dark:bg-error-500/10 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-sm text-error-600 dark:text-error-500">{{ t('billing.canceledNotice') }}</p>
        <button
          type="button"
          class="flex h-9 items-center justify-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600"
          @click="onResume"
        >
          {{ t('billing.resume') }}
        </button>
      </div>
      <div v-else class="mt-5">
        <button type="button" class="text-sm font-medium text-error-500 hover:text-error-600" @click="cancelOpen = true">
          {{ t('billing.cancel') }}
        </button>
      </div>
    </div>

    <div class="surface-card rounded-2xl border p-6">
      <p class="text-sm font-semibold text-heading">{{ t('billing.paymentTitle') }}</p>
      <div class="mt-4 rounded-xl border border-themed p-4">
        <div class="flex items-center gap-3">
          <span class="flex h-10 w-14 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15">
            <IconBase name="credit-card" :size="20" />
          </span>
          <div>
            <p class="text-sm font-medium text-heading">{{ PAYMENT_METHOD.brand }} •••• {{ PAYMENT_METHOD.last4 }}</p>
            <p class="text-xs text-muted">{{ t('billing.expires', { month: PAYMENT_METHOD.expMonth, year: PAYMENT_METHOD.expYear }) }}</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="mt-4 flex h-10 w-full items-center justify-center rounded-lg border border-themed text-sm font-medium text-body transition hover:bg-gray-50 dark:hover:bg-gray-800"
        @click="ui.notifySuccess(t('billing.cardUpdated'))"
      >
        {{ t('billing.updateCard') }}
      </button>
    </div>
  </div>

  <div class="mt-5 surface-card rounded-2xl border p-6">
    <p class="text-sm font-semibold text-heading">{{ t('billing.usageTitle') }}</p>
    <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <UsageBar :label="t('dashboard.usage.projects')" :used="projects.length" :limit="plan.limits.projects" :with-danger="false" />
      <UsageBar :label="t('dashboard.usage.members')" :used="members.length" :limit="plan.limits.members" :with-danger="false" />
      <UsageBar
        :label="t('dashboard.usage.storage')"
        :used="plan.limits.storageGb === -1 ? 120 : Math.round(plan.limits.storageGb * 0.42)"
        :limit="plan.limits.storageGb"
        :with-danger="false"
      />
      <UsageBar
        :label="t('dashboard.usage.api')"
        :used="plan.limits.apiCallsK === -1 ? 340 : Math.round(plan.limits.apiCallsK * 0.63)"
        :limit="plan.limits.apiCallsK"
        :with-danger="false"
      />
    </div>
  </div>

  <div class="mt-5">
    <h3 class="mb-3 text-base font-semibold text-heading">{{ t('billing.invoicesTitle') }}</h3>
    <DataTable :columns="columns" :data="INVOICES" :page-size="10" :searchable="false" />
  </div>

  <ModalBase v-model="changeOpen" :title="t('billing.changePlanModalTitle')" size="xl">
    <div class="mb-6">
      <PricingToggle :cycle="modalCycle" @update:cycle="modalCycle = $event" />
    </div>
    <PricingTable :cycle="modalCycle" highlight-current @select="selectPlan" />
  </ModalBase>

  <ModalBase v-model="cancelOpen" :title="t('billing.cancelConfirmTitle')" size="sm">
    <p class="text-sm text-muted">{{ t('billing.cancelConfirmDesc') }}</p>
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
        class="rounded-lg bg-error-500 px-4 py-2 text-sm font-medium text-white hover:bg-error-600"
        @click="onCancel"
      >
        {{ t('billing.cancel') }}
      </button>
    </template>
  </ModalBase>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ColumnDef } from '@tanstack/vue-table'
import { usePageTitle } from '@/composables/usePageTitle'
import { useSubscriptionStore } from '@/stores/subscription'
import { useProjectsStore } from '@/stores/projects'
import { useTeamStore } from '@/stores/team'
import { useUiStore } from '@/stores/ui'
import { getPlan, INVOICES, PAYMENT_METHOD, type Invoice, type BillingCycle, type Plan } from '@/data/mock'
import { formatCurrency, formatDate } from '@/lib/format'
import PageHeader from '@/components/app/PageHeader.vue'
import DataTable from '@/components/ui/DataTable.vue'
import ModalBase from '@/components/ui/ModalBase.vue'
import Badge from '@/components/ui/Badge.vue'
import IconBase from '@/components/ui/IconBase.vue'
import UsageBar from '@/components/app/UsageBar.vue'
import PricingToggle from '@/components/marketing/PricingToggle.vue'
import PricingTable from '@/components/marketing/PricingTable.vue'

const INV_COLOR = { paid: 'success', pending: 'warning', failed: 'error' } as const

const { t, locale } = useI18n()
usePageTitle(() => t('billing.title'))

const subscription = useSubscriptionStore()
const projectsStore = useProjectsStore()
const teamStore = useTeamStore()
const ui = useUiStore()

const plan = computed(() => getPlan(subscription.planId))
const projects = computed(() => projectsStore.projects)
const members = computed(() => teamStore.members)
const price = computed(() => (subscription.cycle === 'monthly' ? plan.value.priceMonthly : plan.value.priceYearly))

const changeOpen = ref(false)
const cancelOpen = ref(false)
const modalCycle = ref<BillingCycle>(subscription.cycle)

function openChange() {
  modalCycle.value = subscription.cycle
  changeOpen.value = true
}

function selectPlan(p: Plan) {
  subscription.setPlan(p.id)
  subscription.setCycle(modalCycle.value)
  ui.notifySuccess(t('billing.planChanged', { plan: t(`plans.${p.nameKey}`) }))
  changeOpen.value = false
}

function onResume() {
  subscription.resume()
  ui.notifySuccess(t('billing.resumed'))
}

function onCancel() {
  subscription.cancel()
  ui.notifySuccess(t('billing.canceled'))
  cancelOpen.value = false
}

const columns = computed<ColumnDef<Invoice, any>[]>(() => [
  {
    accessorKey: 'id',
    header: t('billing.invoiceColumns.id'),
    cell: ({ getValue }) => h('span', { class: 'font-medium text-heading' }, getValue<string>()),
  },
  {
    accessorKey: 'date',
    header: t('billing.invoiceColumns.date'),
    cell: ({ getValue }) => formatDate(getValue<string>(), locale.value),
  },
  { accessorKey: 'plan', header: t('billing.invoiceColumns.plan') },
  {
    accessorKey: 'amount',
    header: t('billing.invoiceColumns.amount'),
    cell: ({ getValue }) => formatCurrency(getValue<number>(), locale.value),
  },
  {
    accessorKey: 'status',
    header: t('billing.invoiceColumns.status'),
    cell: ({ getValue }) => {
      const s = getValue<Invoice['status']>()
      return h(Badge, { color: INV_COLOR[s] }, () => t(`billing.invoiceStatus.${s}`))
    },
  },
  {
    id: 'actions',
    header: t('billing.invoiceColumns.actions'),
    enableSorting: false,
    cell: () =>
      h(
        'button',
        {
          type: 'button',
          class: 'inline-flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-600',
          onClick: () => ui.notifySuccess(t('billing.downloadStarted')),
        },
        [h(IconBase, { name: 'download', size: 16 }), t('common.download')]
      ),
  },
])
</script>
