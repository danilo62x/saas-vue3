<template>
  <aside
    :style="{ width: widthStyle }"
    class="surface-sidebar fixed left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden border-r px-4 transition-[transform,width] duration-300 lg:static lg:translate-x-0"
    :class="ui.sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex items-center pt-7 pb-6" :class="ui.sidebarCollapsed ? 'justify-center' : 'justify-between'">
      <RouterLink to="/app" class="flex items-center gap-2.5">
        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white shadow-theme-sm">
          <span class="font-bold">N</span>
        </span>
        <span v-if="!ui.sidebarCollapsed" data-brand-text class="text-lg font-semibold">
          {{ t('brand') }}
        </span>
      </RouterLink>
      <button
        v-if="!ui.sidebarCollapsed"
        type="button"
        class="is-sidebar-inactive hidden h-8 w-8 items-center justify-center rounded-lg border border-themed lg:flex"
        :title="t('appNav.collapse')"
        @click="ui.toggleSidebar()"
      >
        <IconBase name="chevron-right" :size="14" class="rotate-180" />
      </button>
    </div>

    <div class="flex flex-col gap-5 overflow-y-auto no-scrollbar pb-4">
      <nav v-for="section in SECTIONS" :key="section.titleKey">
        <h3 v-if="!ui.sidebarCollapsed" class="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider">
          {{ t(section.titleKey) }}
        </h3>
        <ul class="flex flex-col gap-1">
          <li v-for="item in section.items" :key="item.to">
            <RouterLink
              :to="item.to"
              :class="navLinkClass(isActive(item))"
              :title="ui.sidebarCollapsed ? t(item.labelKey) : undefined"
              @click="ui.toggleSidebarMobile(false)"
            >
              <IconBase :name="item.icon" :size="20" />
              <span v-if="!ui.sidebarCollapsed" class="flex-1">{{ t(item.labelKey) }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="mt-auto space-y-3 border-t border-themed py-4">
      <div v-if="!ui.sidebarCollapsed" class="rounded-xl bg-brand-50 p-4 dark:bg-brand-500/10">
        <p class="text-xs font-medium text-muted">{{ t('plans.current') }}</p>
        <p class="mt-0.5 text-sm font-semibold text-heading">{{ t(`plans.${plan.nameKey}`) }}</p>
        <RouterLink
          to="/app/cobranca"
          class="mt-3 flex h-9 w-full items-center justify-center rounded-lg bg-brand-500 text-xs font-medium text-white transition hover:bg-brand-600"
        >
          {{ t('appNav.upgrade') }}
        </RouterLink>
      </div>
      <button
        type="button"
        :class="navLinkClass(false)"
        :title="ui.sidebarCollapsed ? t('appNav.logout') : undefined"
        @click="handleLogout"
      >
        <IconBase name="logout" :size="20" />
        <span v-if="!ui.sidebarCollapsed">{{ t('appNav.logout') }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { useSubscriptionStore } from '@/stores/subscription'
import { getPlan } from '@/data/mock'
import IconBase from '@/components/ui/IconBase.vue'

interface NavItem {
  to: string
  labelKey: string
  icon: string
  end?: boolean
}

const SECTIONS: { titleKey: string; items: NavItem[] }[] = [
  {
    titleKey: 'appNav.main',
    items: [{ to: '/app', labelKey: 'appNav.dashboard', icon: 'dashboard', end: true }],
  },
  {
    titleKey: 'appNav.workspace',
    items: [
      { to: '/app/projetos', labelKey: 'appNav.projects', icon: 'folder' },
      { to: '/app/equipe', labelKey: 'appNav.team', icon: 'users' },
    ],
  },
  {
    titleKey: 'appNav.account',
    items: [
      { to: '/app/cobranca', labelKey: 'appNav.billing', icon: 'credit-card' },
      { to: '/app/configuracoes', labelKey: 'appNav.settings', icon: 'settings' },
    ],
  },
]

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const ui = useUiStore()
const auth = useAuthStore()
const subscription = useSubscriptionStore()

const plan = computed(() => getPlan(subscription.planId))
const widthStyle = computed(() => (ui.sidebarCollapsed ? '90px' : '280px'))

function isActive(item: NavItem) {
  return item.end ? route.path === item.to : route.path === item.to || route.path.startsWith(item.to + '/')
}

function navLinkClass(active: boolean) {
  return [
    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    ui.sidebarCollapsed ? 'justify-center' : '',
    active ? 'is-sidebar-active' : 'is-sidebar-inactive',
  ]
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>
