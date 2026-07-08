<template>
  <AuthShell :title="t('auth.forgotTitle')" :subtitle="t('auth.forgotSubtitle')">
    <form class="space-y-5" @submit="onSubmit">
      <FormField name="email" type="email" :label="t('auth.email')" placeholder="seu@email.com" />
      <button
        type="submit"
        :disabled="isSubmitting"
        class="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring disabled:opacity-60"
      >
        {{ isSubmitting ? t('auth.sending') : t('auth.forgotCta') }}
      </button>
    </form>

    <template #footer>
      <RouterLink to="/login" class="font-medium text-brand-500 hover:text-brand-600">{{ t('auth.backToLogin') }}</RouterLink>
    </template>
  </AuthShell>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { usePageTitle } from '@/composables/usePageTitle'
import { useUiStore } from '@/stores/ui'
import FormField from '@/components/ui/FormField.vue'
import AuthShell from '@/components/marketing/AuthShell.vue'

const { t } = useI18n()
usePageTitle(() => t('auth.forgotTitle'))
const ui = useUiStore()

const schema = toTypedSchema(
  yup.object({
    email: yup.string().email(t('auth.errors.email')).required(t('auth.errors.email')),
  })
)

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: { email: '' },
})

const onSubmit = handleSubmit(async () => {
  await new Promise((r) => setTimeout(r, 600))
  ui.notifySuccess(t('auth.forgotSuccess'))
  resetForm()
})
</script>
