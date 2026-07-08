<template>
  <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-4xl font-bold text-heading sm:text-5xl">{{ t('contact.title') }}</h1>
      <p class="mx-auto mt-5 max-w-xl text-muted">{{ t('contact.subtitle') }}</p>
    </div>

    <div class="mt-14 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
      <div class="space-y-4">
        <div v-for="i in INFO" :key="i.key" class="surface-card flex items-start gap-4 rounded-2xl border p-5">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15">
            <IconBase :name="i.icon" :size="20" />
          </span>
          <div>
            <p class="text-sm font-semibold text-heading">{{ t(`contact.info.${i.key}`) }}</p>
            <p class="mt-0.5 text-sm text-muted">{{ i.key === 'address' ? t('contact.info.addressValue') : i.value }}</p>
          </div>
        </div>
      </div>

      <div class="surface-card rounded-2xl border p-6 md:p-8">
        <form class="space-y-5" @submit="onSubmit">
          <div class="grid gap-5 sm:grid-cols-2">
            <FormField name="name" :label="t('contact.form.name')" />
            <FormField name="email" type="email" :label="t('contact.form.email')" />
          </div>
          <FormField name="subject" :label="t('contact.form.subject')" />
          <FormField name="message" as="textarea" :label="t('contact.form.message')" :rows="5" />
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {{ isSubmitting ? t('contact.form.sending') : t('contact.form.send') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { usePageTitle } from '@/composables/usePageTitle'
import { useUiStore } from '@/stores/ui'
import FormField from '@/components/ui/FormField.vue'
import IconBase from '@/components/ui/IconBase.vue'

const INFO: { key: string; icon: string; value: string }[] = [
  { key: 'email', icon: 'mail', value: 'contato@nimbus.io' },
  { key: 'phone', icon: 'phone', value: '+55 11 4000-0000' },
  { key: 'address', icon: 'map-pin', value: '' },
]

const { t } = useI18n()
usePageTitle(() => t('contact.title'))
const ui = useUiStore()

const schema = toTypedSchema(
  yup.object({
    name: yup.string().required(t('contact.form.errors.name')),
    email: yup.string().email(t('contact.form.errors.email')).required(t('contact.form.errors.email')),
    subject: yup.string().required(t('contact.form.errors.subject')),
    message: yup.string().min(10, t('contact.form.errors.message')).required(t('contact.form.errors.message')),
  })
)

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: { name: '', email: '', subject: '', message: '' },
})

const onSubmit = handleSubmit(async () => {
  await new Promise((r) => setTimeout(r, 600))
  ui.notifySuccess(t('contact.form.success'))
  resetForm()
})
</script>
