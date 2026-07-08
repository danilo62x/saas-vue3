<template>
  <PageHeader :title="t('dashboard.title')" :subtitle="t('dashboard.welcome', { name: user?.name ?? '' })" />

  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
    <StatsCard
      :title="t('dashboard.kpis.mrr')"
      :value="formatCurrency(KPIS.mrr, lang)"
      icon="dollar"
      accent="brand"
      trend="up"
      :trend-value="`${KPIS.mrrTrend}%`"
    />
    <StatsCard
      :title="t('dashboard.kpis.activeUsers')"
      :value="formatCompact(KPIS.activeUsers, lang)"
      icon="users"
      accent="success"
      trend="up"
      :trend-value="`${KPIS.activeUsersTrend}%`"
    />
    <StatsCard
      :title="t('dashboard.kpis.churn')"
      :value="`${KPIS.churn}%`"
      icon="trending-down"
      accent="warning"
      trend="down"
      :trend-value="`${Math.abs(KPIS.churnTrend)}%`"
    />
    <StatsCard
      :title="t('dashboard.kpis.conversion')"
      :value="`${KPIS.conversion}%`"
      icon="activity"
      accent="info"
      trend="up"
      :trend-value="`${KPIS.conversionTrend}%`"
    />
  </div>

  <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
    <div class="surface-card rounded-2xl border p-5 xl:col-span-2">
      <h3 class="text-base font-semibold text-heading">{{ t('dashboard.revenueTitle') }}</h3>
      <div class="mt-4">
        <ApexChart
          type="area"
          :height="300"
          :series="[
            { name: t('dashboard.revenueLegend.revenue'), data: REVENUE_SERIES.revenue },
            { name: t('dashboard.revenueLegend.expenses'), data: REVENUE_SERIES.expenses },
          ]"
          :options="revenueOptions"
        />
      </div>
    </div>

    <div class="surface-card rounded-2xl border p-5">
      <h3 class="text-base font-semibold text-heading">{{ t('dashboard.distributionTitle') }}</h3>
      <div class="mt-4">
        <ApexChart type="donut" :height="300" :series="PLAN_DISTRIBUTION.data" :options="donutOptions" />
      </div>
    </div>
  </div>

  <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
    <div class="surface-card rounded-2xl border p-5 xl:col-span-2">
      <h3 class="text-base font-semibold text-heading">{{ t('dashboard.signupsTitle') }}</h3>
      <div class="mt-4">
        <ApexChart
          type="bar"
          :height="280"
          :series="[{ name: t('dashboard.signupsTitle'), data: SIGNUPS_SERIES.data }]"
          :options="signupsOptions"
        />
      </div>
    </div>

    <div class="surface-card rounded-2xl border p-5">
      <h3 class="text-base font-semibold text-heading">{{ t('dashboard.usageTitle') }}</h3>
      <div class="mt-5 space-y-5">
        <UsageBar :label="t('dashboard.usage.projects')" :used="projects.length" :limit="plan.limits.projects" />
        <UsageBar :label="t('dashboard.usage.members')" :used="members.length" :limit="plan.limits.members" />
        <UsageBar
          :label="t('dashboard.usage.storage')"
          :used="plan.limits.storageGb === -1 ? 120 : Math.round(plan.limits.storageGb * 0.42)"
          :limit="plan.limits.storageGb"
        />
        <UsageBar
          :label="t('dashboard.usage.api')"
          :used="plan.limits.apiCallsK === -1 ? 340 : Math.round(plan.limits.apiCallsK * 0.63)"
          :limit="plan.limits.apiCallsK"
        />
      </div>
    </div>
  </div>

  <div class="mt-5 surface-card rounded-2xl border p-5">
    <h3 class="text-base font-semibold text-heading">{{ t('dashboard.activityTitle') }}</h3>
    <ul class="mt-4 divide-y divide-themed">
      <li v-for="a in ACTIVITY" :key="a.id" class="flex items-center gap-3 py-3">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/15">
          <IconBase :name="a.icon" :size="16" />
        </span>
        <p class="flex-1 text-sm text-body">{{ t(`dashboard.activity.${a.typeKey}`, { name: a.name }) }}</p>
        <span class="text-xs text-muted">{{ fromNow(a.time, lang) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ApexOptions } from 'apexcharts'
import { usePageTitle } from '@/composables/usePageTitle'
import { useAuthStore } from '@/stores/auth'
import { useSubscriptionStore } from '@/stores/subscription'
import { useProjectsStore } from '@/stores/projects'
import { useTeamStore } from '@/stores/team'
import { KPIS, REVENUE_SERIES, SIGNUPS_SERIES, PLAN_DISTRIBUTION, ACTIVITY, getPlan } from '@/data/mock'
import { formatCurrency, formatCompact, fromNow } from '@/lib/format'
import PageHeader from '@/components/app/PageHeader.vue'
import StatsCard from '@/components/ui/StatsCard.vue'
import ApexChart from '@/components/ui/ApexChart.vue'
import IconBase from '@/components/ui/IconBase.vue'
import UsageBar from '@/components/app/UsageBar.vue'

const { t, locale } = useI18n()
usePageTitle(() => t('dashboard.title'))

const auth = useAuthStore()
const subscription = useSubscriptionStore()
const projectsStore = useProjectsStore()
const teamStore = useTeamStore()

const user = computed(() => auth.user)
const plan = computed(() => getPlan(subscription.planId))
const projects = computed(() => projectsStore.projects)
const members = computed(() => teamStore.members)
const lang = computed(() => locale.value)

const revenueOptions = computed<ApexOptions>(() => ({
  chart: { stacked: false },
  xaxis: { categories: REVENUE_SERIES.categories },
  yaxis: { labels: { formatter: (v: number) => formatCompact(v, lang.value) } },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
  legend: { show: true, position: 'top' },
  colors: ['#465fff', '#12b76a'],
}))

const signupsOptions: ApexOptions = {
  chart: { type: 'bar' },
  plotOptions: { bar: { columnWidth: '45%', borderRadius: 4 } },
  xaxis: { categories: SIGNUPS_SERIES.categories },
  colors: ['#465fff'],
}

const donutOptions: ApexOptions = {
  labels: PLAN_DISTRIBUTION.labels,
  legend: { position: 'bottom' },
  colors: ['#98a2b3', '#465fff', '#12b76a', '#f79009'],
  plotOptions: { pie: { donut: { size: '68%' } } },
}
</script>
