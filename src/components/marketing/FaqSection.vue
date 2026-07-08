<template>
  <section class="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
    <h2 class="text-center text-3xl font-bold text-heading sm:text-4xl">{{ title }}</h2>
    <div class="mt-10 space-y-3">
      <div v-for="i in count" :key="i" class="surface-card overflow-hidden rounded-xl border">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          @click="open = open === i - 1 ? null : i - 1"
        >
          <span class="text-sm font-medium text-heading">{{ t(`${prefix}.q${i}`) }}</span>
          <IconBase
            name="chevron-down"
            :size="18"
            class="shrink-0 text-muted transition-transform"
            :class="open === i - 1 ? 'rotate-180' : ''"
          />
        </button>
        <p v-if="open === i - 1" class="px-5 pb-4 text-sm text-muted">{{ t(`${prefix}.a${i}`) }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import IconBase from '@/components/ui/IconBase.vue'

defineProps<{
  title: string
  /** i18n key prefix; expects `<prefix>.q1/a1 ...` */
  prefix: string
  count: number
}>()

const { t } = useI18n()
const open = ref<number | null>(0)
</script>
