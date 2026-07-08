<template>
  <MarketingLayout v-if="route.meta.layout === 'marketing'">
    <RouterView />
  </MarketingLayout>
  <AppLayout v-else-if="route.meta.layout === 'app'">
    <RouterView />
  </AppLayout>
  <template v-else>
    <RouterView />
    <ToastStack />
    <CookieBanner />
  </template>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import MarketingLayout from '@/components/layout/MarketingLayout.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import ToastStack from '@/components/ui/ToastStack.vue'
import CookieBanner from '@/components/ui/CookieBanner.vue'

const route = useRoute()
const { init } = useTheme()

onMounted(() => {
  init()
})
</script>
