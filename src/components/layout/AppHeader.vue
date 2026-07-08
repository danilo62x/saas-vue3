<template>
  <header class="surface-header sticky top-0 z-30 flex w-full border-b">
    <div class="flex flex-grow items-center justify-between gap-4 px-4 py-3 md:px-6 2xl:px-10">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
          aria-label="Toggle sidebar"
          @click="onToggleSidebar"
        >
          <IconBase name="menu" :size="20" />
        </button>

        <div class="hidden md:block">
          <div class="relative">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IconBase name="search" :size="18" />
            </span>
            <input
              type="text"
              :placeholder="t('appNav.searchPlaceholder')"
              class="h-10 w-[260px] rounded-lg border border-themed bg-gray-50 pl-10 pr-12 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900 xl:w-[360px]"
            />
            <kbd class="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-themed bg-white px-1.5 py-0.5 text-xs text-muted dark:bg-gray-900">
              ⌘ K
            </kbd>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <LanguageSwitcher />
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
          aria-label="Toggle dark mode"
          @click="ui.toggleDarkMode()"
        >
          <IconBase :name="ui.darkMode ? 'sun' : 'moon'" :size="18" />
        </button>

        <div ref="notifRef" class="relative">
          <button
            type="button"
            class="relative flex h-10 w-10 items-center justify-center rounded-full border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-label="Notifications"
            @click="notifOpen = !notifOpen"
          >
            <IconBase name="bell" :size="18" />
            <span class="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-error-400 opacity-75" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-error-500" />
            </span>
          </button>
          <div v-if="notifOpen" class="surface-card absolute right-0 mt-3 w-80 rounded-xl border shadow-theme-lg">
            <div class="flex items-center justify-between border-b border-themed px-4 py-3">
              <p class="text-sm font-semibold text-heading">{{ t('appNav.notifications') }}</p>
            </div>
            <ul class="max-h-72 divide-y divide-themed overflow-y-auto">
              <li v-for="n in NOTIFICATIONS" :key="n.id" class="flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <span class="mt-1 flex h-2 w-2 shrink-0 rounded-full" :class="n.read ? 'bg-gray-300' : 'bg-brand-500'" />
                <div class="flex-1">
                  <p class="text-sm font-medium text-heading">{{ t(`dashboard.activity.${n.titleKey}`, { name: n.name }) }}</p>
                  <p class="text-xs text-muted">{{ n.time }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div ref="dropdownRef" class="relative">
          <button type="button" class="ml-1 flex items-center gap-3" @click="dropdownOpen = !dropdownOpen">
            <span class="hidden text-right lg:block">
              <span class="block text-sm font-medium text-heading">{{ user?.name || 'Convidado' }}</span>
              <span class="block text-xs text-muted">{{ user?.role || '—' }}</span>
            </span>
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 font-semibold text-white">
              {{ initials }}
            </span>
            <IconBase name="chevron-down" :size="16" class="text-muted" />
          </button>

          <div v-if="dropdownOpen" class="surface-card absolute right-0 mt-3 w-56 rounded-xl border shadow-theme-lg">
            <div class="border-b border-themed px-4 py-3">
              <p class="text-sm font-medium text-heading">{{ user?.name || 'Convidado' }}</p>
              <p class="text-xs text-muted">{{ user?.email || '' }}</p>
            </div>
            <ul class="py-1">
              <li>
                <RouterLink
                  to="/app/configuracoes"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                  @click="dropdownOpen = false"
                >
                  <IconBase name="settings" :size="16" /> {{ t('appNav.settings') }}
                </RouterLink>
              </li>
              <li>
                <button
                  type="button"
                  class="flex w-full items-center gap-2 px-4 py-2 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                  @click="dropdownOpen = false; ui.openCookieBanner()"
                >
                  <IconBase name="cookie" :size="16" /> {{ t('cookie.title') }}
                </button>
              </li>
            </ul>
            <div class="border-t border-themed py-1">
              <button
                type="button"
                class="flex w-full items-center gap-2 px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-error-500/10"
                @click="handleLogout"
              >
                <IconBase name="logout" :size="16" /> {{ t('appNav.logout') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import IconBase from '@/components/ui/IconBase.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const NOTIFICATIONS = [
  { id: 1, titleKey: 'invited', name: 'Bruno Lima', time: 'Há 5 min', read: false },
  { id: 2, titleKey: 'paid', name: 'R$ 129,00', time: 'Há 32 min', read: false },
  { id: 3, titleKey: 'upgraded', name: 'Acme Inc.', time: 'Há 1 hora', read: false },
]

const { t } = useI18n()
const router = useRouter()
const ui = useUiStore()
const auth = useAuthStore()

const user = computed(() => auth.user)
const dropdownOpen = ref(false)
const notifOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const notifRef = ref<HTMLElement | null>(null)

const initials = computed(() => {
  if (!user.value) return '?'
  return user.value.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
})

function onClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) dropdownOpen.value = false
  if (notifRef.value && !notifRef.value.contains(e.target as Node)) notifOpen.value = false
}

function onToggleSidebar() {
  if (window.innerWidth < 1024) ui.toggleSidebarMobile()
  else ui.toggleSidebar()
}

function handleLogout() {
  auth.logout()
  router.push('/login')
  dropdownOpen.value = false
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>
