import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    // Marketing site (navbar + footer)
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/marketing/LandingView.vue'),
      meta: { layout: 'marketing' },
    },
    {
      path: '/recursos',
      name: 'features',
      component: () => import('@/views/marketing/FeaturesView.vue'),
      meta: { layout: 'marketing' },
    },
    {
      path: '/precos',
      name: 'pricing',
      component: () => import('@/views/marketing/PricingView.vue'),
      meta: { layout: 'marketing' },
    },
    {
      path: '/sobre',
      name: 'about',
      component: () => import('@/views/marketing/AboutView.vue'),
      meta: { layout: 'marketing' },
    },
    {
      path: '/contato',
      name: 'contact',
      component: () => import('@/views/marketing/ContactView.vue'),
      meta: { layout: 'marketing' },
    },

    // Auth (blank layout)
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/marketing/LoginView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/registro',
      name: 'register',
      component: () => import('@/views/marketing/RegisterView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/esqueci-senha',
      name: 'forgot-password',
      component: () => import('@/views/marketing/ForgotPasswordView.vue'),
      meta: { layout: 'blank' },
    },

    // Onboarding (guarded, blank layout)
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('@/views/app/OnboardingView.vue'),
      meta: { layout: 'blank', requiresAuth: true },
    },

    // App (guarded, sidebar layout)
    {
      path: '/app',
      name: 'dashboard',
      component: () => import('@/views/app/DashboardView.vue'),
      meta: { layout: 'app', requiresAuth: true },
    },
    {
      path: '/app/projetos',
      name: 'projects',
      component: () => import('@/views/app/ProjectsView.vue'),
      meta: { layout: 'app', requiresAuth: true },
    },
    {
      path: '/app/equipe',
      name: 'team',
      component: () => import('@/views/app/TeamView.vue'),
      meta: { layout: 'app', requiresAuth: true },
    },
    {
      path: '/app/cobranca',
      name: 'billing',
      component: () => import('@/views/app/BillingView.vue'),
      meta: { layout: 'app', requiresAuth: true },
    },
    {
      path: '/app/configuracoes',
      name: 'settings',
      component: () => import('@/views/app/SettingsView.vue'),
      meta: { layout: 'app', requiresAuth: true },
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/app/NotFoundView.vue'),
      meta: { layout: 'blank' },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
