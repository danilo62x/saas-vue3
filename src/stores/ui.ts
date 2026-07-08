import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
}

let toastId = 0

export const useUiStore = defineStore(
  'saas-ui',
  () => {
    const darkMode = ref(false)
    const sidebarCollapsed = ref(false)
    const sidebarMobileOpen = ref(false)
    const toasts = ref<Toast[]>([])
    const cookiesAccepted = ref(false)
    const showCookieBanner = ref(false)

    function toggleDarkMode() {
      darkMode.value = !darkMode.value
      applyTheme()
    }

    function setDarkMode(val: boolean) {
      darkMode.value = val
      applyTheme()
    }

    function applyTheme() {
      const root = document.documentElement
      if (darkMode.value) root.classList.add('dark')
      else root.classList.remove('dark')
    }

    function toggleSidebar() {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    function toggleSidebarMobile(val?: boolean) {
      sidebarMobileOpen.value = val !== undefined ? val : !sidebarMobileOpen.value
    }

    function notify(message: string, type: ToastType = 'info', duration = 4000) {
      const id = ++toastId
      toasts.value.push({ id, message, type, duration })
      setTimeout(() => dismissToast(id), duration)
    }

    function notifySuccess(message: string) {
      notify(message, 'success')
    }
    function notifyError(message: string) {
      notify(message, 'error')
    }
    function notifyWarning(message: string) {
      notify(message, 'warning')
    }

    function dismissToast(id: number) {
      const idx = toasts.value.findIndex((t) => t.id === id)
      if (idx !== -1) toasts.value.splice(idx, 1)
    }

    function acceptCookies() {
      cookiesAccepted.value = true
      showCookieBanner.value = false
    }
    function declineCookies() {
      cookiesAccepted.value = false
      showCookieBanner.value = false
    }
    function openCookieBanner() {
      showCookieBanner.value = true
    }
    function closeCookieBanner() {
      showCookieBanner.value = false
    }

    return {
      darkMode,
      sidebarCollapsed,
      sidebarMobileOpen,
      toasts,
      cookiesAccepted,
      showCookieBanner,
      toggleDarkMode,
      setDarkMode,
      applyTheme,
      toggleSidebar,
      toggleSidebarMobile,
      notify,
      notifySuccess,
      notifyError,
      notifyWarning,
      dismissToast,
      acceptCookies,
      declineCookies,
      openCookieBanner,
      closeCookieBanner,
    }
  },
  {
    persist: {
      key: 'saas-ui',
      pick: ['darkMode', 'sidebarCollapsed', 'cookiesAccepted'],
    },
  }
)
