<template>
  <footer class="border-t border-themed bg-card-bg surface-card">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
        <div class="max-w-sm">
          <RouterLink to="/" class="flex items-center gap-2.5">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white">
              N
            </span>
            <span class="text-lg font-bold text-heading">{{ t('brand') }}</span>
          </RouterLink>
          <p class="mt-4 text-sm text-muted">{{ t('marketing.footer.tagline') }}</p>

          <form class="mt-6" @submit.prevent="subscribe">
            <p class="text-sm font-semibold text-heading">{{ t('marketing.footer.newsletterTitle') }}</p>
            <p class="mt-1 text-xs text-muted">{{ t('marketing.footer.newsletterDesc') }}</p>
            <div class="mt-3 flex gap-2">
              <input
                v-model="email"
                type="email"
                :placeholder="t('marketing.footer.newsletterPlaceholder')"
                class="focus-ring h-10 flex-1 rounded-lg border border-themed bg-transparent px-3 text-sm text-body placeholder:text-muted"
              />
              <button
                type="submit"
                class="flex h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
              >
                {{ t('marketing.footer.newsletterCta') }}
              </button>
            </div>
          </form>
        </div>

        <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div v-for="col in COLUMNS" :key="col.titleKey">
            <h4 class="text-sm font-semibold text-heading">{{ t(col.titleKey) }}</h4>
            <ul class="mt-4 space-y-2.5">
              <li v-for="l in col.links" :key="l.key">
                <RouterLink :to="l.to" class="text-sm text-muted transition hover:text-brand-600 dark:hover:text-brand-400">
                  {{ t(l.key) }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-themed pt-6 sm:flex-row">
        <p class="text-xs text-muted">{{ t('marketing.footer.rights') }}</p>
        <div class="flex items-center gap-3">
          <a
            v-for="icon in ['github', 'slack', 'globe']"
            :key="icon"
            href="#"
            :aria-label="icon"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-themed text-muted transition hover:text-brand-500"
          >
            <IconBase :name="icon" :size="16" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase.vue'

const COLUMNS: { titleKey: string; links: { key: string; to: string }[] }[] = [
  {
    titleKey: 'marketing.footer.product',
    links: [
      { key: 'marketing.footer.features', to: '/recursos' },
      { key: 'marketing.footer.pricing', to: '/precos' },
      { key: 'marketing.footer.integrations', to: '/recursos' },
      { key: 'marketing.footer.changelog', to: '/recursos' },
    ],
  },
  {
    titleKey: 'marketing.footer.company',
    links: [
      { key: 'marketing.footer.about', to: '/sobre' },
      { key: 'marketing.footer.careers', to: '/sobre' },
      { key: 'marketing.footer.blog', to: '/sobre' },
      { key: 'marketing.footer.contact', to: '/contato' },
    ],
  },
  {
    titleKey: 'marketing.footer.resources',
    links: [
      { key: 'marketing.footer.docs', to: '/recursos' },
      { key: 'marketing.footer.help', to: '/contato' },
      { key: 'marketing.footer.status', to: '/recursos' },
      { key: 'marketing.footer.api', to: '/recursos' },
    ],
  },
  {
    titleKey: 'marketing.footer.legal',
    links: [
      { key: 'marketing.footer.privacy', to: '/sobre' },
      { key: 'marketing.footer.terms', to: '/sobre' },
      { key: 'marketing.footer.security', to: '/sobre' },
    ],
  },
]

const { t } = useI18n()
const ui = useUiStore()
const email = ref('')

function subscribe() {
  if (!email.value.trim()) return
  ui.notifySuccess(t('marketing.footer.newsletterSuccess'))
  email.value = ''
}
</script>
