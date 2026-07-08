<template>
  <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    <h2 class="text-center text-3xl font-bold text-heading sm:text-4xl">{{ t('marketing.testimonialsTitle') }}</h2>

    <div class="mt-14 grid gap-6 md:grid-cols-3">
      <figure v-for="item in TESTIMONIALS" :key="item.id" class="surface-card flex flex-col rounded-2xl border p-6">
        <div class="flex gap-1 text-warning-400">
          <IconBase v-for="i in 5" :key="i" name="star" :size="16" class="fill-current" />
        </div>
        <blockquote class="mt-4 flex-1 text-sm text-body">"{{ t(`testimonials.items.${item.quoteKey}`) }}"</blockquote>
        <figcaption class="mt-5 flex items-center gap-3">
          <Avatar :name="item.name" size="sm" />
          <div>
            <p class="text-sm font-semibold text-heading">{{ item.name }}</p>
            <p class="text-xs text-muted">{{ item.role }}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { TESTIMONIALS } from '@/data/mock'
import Avatar from '@/components/ui/Avatar.vue'
import IconBase from '@/components/ui/IconBase.vue'

const { t } = useI18n()
</script>
