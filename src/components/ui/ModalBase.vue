<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[80] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
        @click.self="close"
        @keydown.esc="close"
      >
        <div
          class="surface-card relative w-full overflow-hidden rounded-2xl border shadow-theme-xl"
          :class="sizeClass"
        >
          <header
            v-if="title || $slots.header"
            class="flex items-center justify-between border-b border-themed px-5 py-4"
          >
            <div>
              <h3 v-if="title" class="text-base font-semibold text-heading">{{ title }}</h3>
              <p v-if="subtitle" class="mt-0.5 text-xs text-muted">{{ subtitle }}</p>
              <slot name="header" />
            </div>
            <button
              v-if="closable"
              type="button"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Fechar"
              @click="close"
            >
              <IconBase name="x" :size="20" />
            </button>
          </header>

          <div class="px-5 py-5">
            <slot />
          </div>

          <footer
            v-if="$slots.footer"
            class="flex items-center justify-end gap-2 border-t border-themed px-5 py-3"
          >
            <slot name="footer" :close="close" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import IconBase from './IconBase.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    subtitle?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    closable?: boolean
  }>(),
  {
    size: 'md',
    closable: true,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'close'): void
}>()

const sizeClass = computed(() => {
  const map = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl', xl: 'max-w-4xl' }
  return map[props.size]
})

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) close()
}

watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  }
)

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease;
}
.modal-enter-from > div {
  transform: scale(0.96);
}
.modal-leave-to > div {
  transform: scale(0.98);
}
</style>
