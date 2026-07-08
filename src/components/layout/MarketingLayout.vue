<template>
  <div class="flex min-h-screen flex-col" :style="{ backgroundColor: 'var(--tx-body-bg)' }">
    <MarketingNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <MarketingFooter />
    <ToastStack />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import MarketingNavbar from './MarketingNavbar.vue'
import MarketingFooter from './MarketingFooter.vue'
import ToastStack from '@/components/ui/ToastStack.vue'
import CookieBanner from '@/components/ui/CookieBanner.vue'
</script>
