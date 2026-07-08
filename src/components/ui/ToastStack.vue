<template>
  <div class="pointer-events-none fixed top-4 right-4 z-[100] flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in ui.toasts"
        :key="toast.id"
        :class="[
          'pointer-events-auto flex w-80 items-start gap-3 rounded-lg border bg-white p-4 shadow-theme-md dark:bg-gray-dark',
          toastStyles[toast.type],
        ]"
      >
        <IconBase :name="toastIcons[toast.type]" :size="20" :class="toastIconColor[toast.type]" />
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-800 dark:text-white/90">
            {{ toast.message }}
          </p>
        </div>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          @click="ui.dismissToast(toast.id)"
        >
          <IconBase name="x" :size="16" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import IconBase from './IconBase.vue'

const ui = useUiStore()

const toastStyles = {
  success: 'border-success-200 dark:border-success-500/30',
  error: 'border-error-200 dark:border-error-500/30',
  warning: 'border-warning-200 dark:border-warning-500/30',
  info: 'border-blue-light-200 dark:border-blue-light-500/30',
}

const toastIcons = {
  success: 'check',
  error: 'x',
  warning: 'bell',
  info: 'bell',
}

const toastIconColor = {
  success: 'text-success-500',
  error: 'text-error-500',
  warning: 'text-warning-500',
  info: 'text-blue-light-500',
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
