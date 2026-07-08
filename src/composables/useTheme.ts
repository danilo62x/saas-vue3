import { watch } from 'vue'
import { useUiStore } from '@/stores/ui'

export function useTheme() {
  const ui = useUiStore()

  function init() {
    ui.applyTheme()
    document.title = 'SaaS — Painel & Site'
  }

  watch(
    () => ui.darkMode,
    () => ui.applyTheme()
  )

  return { init }
}
