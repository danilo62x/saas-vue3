import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
  company?: string
  onboarded: boolean
}

/** Suggested demo account shown on the login screen. Any email/password works. */
export const DEMO_CREDENTIALS = { email: 'admin@saas.com', password: 'demo123' }

export const useAuthStore = defineStore(
  'saas-auth',
  () => {
    const user = ref<User | null>(null)

    const isAuthenticated = computed(() => user.value !== null)

    // Mock auth: any non-empty email/password logs in.
    async function login(email: string, password: string): Promise<boolean> {
      await new Promise((r) => setTimeout(r, 500))
      if (!email || !password) return false
      const isDemo = email === DEMO_CREDENTIALS.email
      const raw = email.split('@')[0].replace(/[._-]/g, ' ') || 'Usuário'
      const name = isDemo ? 'Ana Martins' : raw.charAt(0).toUpperCase() + raw.slice(1)
      user.value = {
        id: 1,
        name,
        email,
        role: 'Administrador',
        company: 'Acme Inc.',
        onboarded: isDemo,
      }
      return true
    }

    async function register(name: string, email: string, password: string): Promise<boolean> {
      await new Promise((r) => setTimeout(r, 500))
      if (!name || !email || !password) return false
      user.value = { id: 1, name, email, role: 'Administrador', company: '', onboarded: false }
      return true
    }

    function logout() {
      user.value = null
    }

    function updateProfile(patch: Partial<User>) {
      if (!user.value) return
      user.value = { ...user.value, ...patch }
    }

    function completeOnboarding() {
      if (!user.value) return
      user.value = { ...user.value, onboarded: true }
    }

    return {
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile,
      completeOnboarding,
    }
  },
  {
    persist: {
      key: 'saas-auth',
      pick: ['user'],
    },
  }
)
