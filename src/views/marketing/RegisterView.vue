<template>
  <AuthShell :title="t('auth.registerTitle')" :subtitle="t('auth.registerSubtitle')">
    <form class="space-y-5" @submit="onSubmit">
      <FormField name="name" :label="t('auth.name')" placeholder="Ana Martins" />
      <FormField name="email" type="email" :label="t('auth.email')" placeholder="seu@email.com" />
      <FormField name="password" type="password" :label="t('auth.password')" placeholder="••••••••" />
      <FormField name="confirm" type="password" :label="t('auth.confirmPassword')" placeholder="••••••••" />
      <FormField name="agree" as="checkbox" :label="t('auth.agree')" />
      <button
        type="submit"
        :disabled="isSubmitting"
        class="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring disabled:opacity-60"
      >
        {{ isSubmitting ? t('auth.registering') : t('auth.registerCta') }}
      </button>
    </form>

    <template #footer>
      {{ t('auth.hasAccount') }}
      <RouterLink to="/login" class="font-medium text-brand-500 hover:text-brand-600">{{ t('auth.loginCta') }}</RouterLink>
    </template>
  </AuthShell>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { usePageTitle } from '@/composables/usePageTitle'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import FormField from '@/components/ui/FormField.vue'
import AuthShell from '@/components/marketing/AuthShell.vue'

const { t } = useI18n()
usePageTitle(() => t('auth.registerTitle'))
const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()

const schema = toTypedSchema(
  yup.object({
    name: yup.string().required(t('auth.errors.name')),
    email: yup.string().email(t('auth.errors.email')).required(t('auth.errors.email')),
    password: yup.string().min(6, t('auth.errors.password')).required(t('auth.errors.password')),
    confirm: yup
      .string()
      .oneOf([yup.ref('password')], t('auth.errors.confirm'))
      .required(t('auth.errors.confirm')),
    agree: yup.boolean().oneOf([true], t('auth.errors.agree')),
  })
)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: { name: '', email: '', password: '', confirm: '', agree: false },
})

const onSubmit = handleSubmit(async (values) => {
  const ok = await auth.register(values.name, values.email, values.password)
  if (ok) {
    ui.notifySuccess(t('auth.registerSuccess'))
    router.push('/onboarding')
  }
})
</script>
