<template>
  <div class="min-h-screen px-4 py-10" :style="{ backgroundColor: 'var(--tx-body-bg)' }">
    <div class="mx-auto max-w-2xl">
      <div class="mb-8 flex items-center justify-between">
        <span class="flex items-center gap-2.5">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 font-bold text-white">N</span>
          <span class="text-lg font-semibold text-heading">{{ t('brand') }}</span>
        </span>
        <button type="button" class="text-sm font-medium text-muted hover:text-body" @click="skip">
          {{ t('onboarding.skip') }}
        </button>
      </div>

      <div class="mb-2 text-center text-xs font-medium text-muted">{{ t('onboarding.step', { current, total }) }}</div>
      <div class="mb-10">
        <Steps :steps="steps" :current="current" />
      </div>

      <div class="surface-card rounded-2xl border p-6 md:p-8">
        <div v-if="current === 1" class="space-y-5">
          <div>
            <h2 class="text-lg font-semibold text-heading">{{ t('onboarding.profile.title') }}</h2>
            <p class="mt-1 text-sm text-muted">{{ t('onboarding.profile.desc') }}</p>
          </div>
          <Field v-model="name" :label="t('onboarding.profile.name')" />
          <Field v-model="role" :label="t('onboarding.profile.role')" />
        </div>

        <div v-else-if="current === 2" class="space-y-5">
          <div>
            <h2 class="text-lg font-semibold text-heading">{{ t('onboarding.workspace.title') }}</h2>
            <p class="mt-1 text-sm text-muted">{{ t('onboarding.workspace.desc') }}</p>
          </div>
          <Field v-model="workspace" :label="t('onboarding.workspace.name')" />
          <div>
            <label class="mb-2 block text-sm font-medium text-heading">{{ t('onboarding.workspace.size') }}</label>
            <select
              v-model="size"
              class="focus-ring h-11 w-full rounded-lg border border-themed bg-transparent px-3.5 text-sm text-body"
            >
              <option v-for="s in SIZES" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>

        <div v-else-if="current === 3" class="space-y-5">
          <div>
            <h2 class="text-lg font-semibold text-heading">{{ t('onboarding.teamStep.title') }}</h2>
            <p class="mt-1 text-sm text-muted">{{ t('onboarding.teamStep.desc') }}</p>
          </div>
          <div class="flex gap-2">
            <input
              v-model="emailInput"
              type="email"
              :placeholder="t('onboarding.teamStep.placeholder')"
              class="focus-ring h-11 flex-1 rounded-lg border border-themed bg-transparent px-3.5 text-sm text-body placeholder:text-muted"
              @keydown.enter.prevent="addEmail"
            />
            <button
              type="button"
              class="flex h-11 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="addEmail"
            >
              {{ t('onboarding.teamStep.add') }}
            </button>
          </div>
          <ul class="space-y-2">
            <li
              v-for="e in emails"
              :key="e"
              class="flex items-center justify-between rounded-lg border border-themed px-3.5 py-2 text-sm text-body"
            >
              <span class="flex items-center gap-2">
                <IconBase name="mail" :size="16" class="text-muted" />
                {{ e }}
              </span>
              <button type="button" class="text-gray-400 hover:text-error-500" @click="emails = emails.filter((x) => x !== e)">
                <IconBase name="x" :size="16" />
              </button>
            </li>
          </ul>
        </div>

        <div v-else-if="current === 4" class="space-y-5">
          <div>
            <h2 class="text-lg font-semibold text-heading">{{ t('onboarding.plan.title') }}</h2>
            <p class="mt-1 text-sm text-muted">{{ t('onboarding.plan.desc') }}</p>
          </div>
          <div class="space-y-3">
            <button
              v-for="p in selectablePlans"
              :key="p.id"
              type="button"
              class="flex w-full items-center justify-between rounded-xl border p-4 text-left transition"
              :class="
                selectedPlan === p.id
                  ? 'border-brand-500 ring-1 ring-brand-500'
                  : 'border-themed hover:bg-gray-50 dark:hover:bg-gray-800'
              "
              @click="selectedPlan = p.id"
            >
              <div>
                <p class="text-sm font-semibold text-heading">{{ t(`plans.${p.nameKey}`) }}</p>
                <p class="text-xs text-muted">{{ t(`plans.descriptions.${p.id}`) }}</p>
              </div>
              <span class="text-sm font-bold text-heading">
                {{ formatCurrency(p.priceMonthly, locale) }}
                <span class="text-xs font-normal text-muted">{{ t('pricingPage.perMonth') }}</span>
              </span>
            </button>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-between">
          <button
            type="button"
            :disabled="current === 1"
            class="flex h-11 items-center rounded-lg border border-themed px-5 text-sm font-medium text-body transition hover:bg-gray-50 disabled:opacity-40 dark:hover:bg-gray-800"
            @click="back"
          >
            {{ t('onboarding.back') }}
          </button>
          <button
            type="button"
            class="flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-medium text-white transition hover:bg-brand-600"
            @click="next"
          >
            {{ current === total ? t('onboarding.finish') : t('onboarding.next') }}
            <IconBase name="arrow-right" :size="16" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/usePageTitle'
import { useAuthStore } from '@/stores/auth'
import { useProjectsStore } from '@/stores/projects'
import { useTeamStore } from '@/stores/team'
import { useSubscriptionStore } from '@/stores/subscription'
import { useUiStore } from '@/stores/ui'
import { PLANS, type PlanId } from '@/data/mock'
import { formatCurrency } from '@/lib/format'
import Steps from '@/components/ui/Steps.vue'
import IconBase from '@/components/ui/IconBase.vue'
import Field from './settings/SettingsField.vue'

const SIZES = ['1-10', '11-50', '51-200', '200+']

const { t, locale } = useI18n()
usePageTitle(() => t('onboarding.title'))
const router = useRouter()

const auth = useAuthStore()
const projectsStore = useProjectsStore()
const teamStore = useTeamStore()
const subscription = useSubscriptionStore()
const ui = useUiStore()

const steps = computed(() => [
  { label: t('onboarding.steps.profile') },
  { label: t('onboarding.steps.workspace') },
  { label: t('onboarding.steps.team') },
  { label: t('onboarding.steps.plan') },
])
const total = computed(() => steps.value.length)

const current = ref(1)
const name = ref(auth.user?.name ?? '')
const role = ref('')
const workspace = ref(auth.user?.company ?? '')
const size = ref('1-10')
const emails = ref<string[]>([])
const emailInput = ref('')
const selectedPlan = ref<PlanId>('pro')

const selectablePlans = computed(() => PLANS.filter((p) => p.id !== 'enterprise'))

function addEmail() {
  const e = emailInput.value.trim()
  if (e && !emails.value.includes(e)) {
    emails.value = [...emails.value, e]
    emailInput.value = ''
  }
}

function finish() {
  auth.updateProfile({ name: name.value, role: role.value || auth.user?.role || '' })
  if (workspace.value.trim()) projectsStore.setWorkspace(workspace.value.trim())
  emails.value.forEach((e) => teamStore.invite(e, 'member'))
  subscription.setPlan(selectedPlan.value)
  auth.completeOnboarding()
  ui.notifySuccess(t('onboarding.finished'))
  router.push('/app')
}

function next() {
  if (current.value < total.value) current.value += 1
  else finish()
}

function back() {
  if (current.value > 1) current.value -= 1
}

function skip() {
  auth.completeOnboarding()
  router.push('/app')
}
</script>
