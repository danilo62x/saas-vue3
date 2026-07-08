import { watch, onUnmounted, type MaybeRefOrGetter, toValue } from 'vue'

const BASE = 'SaaS — Painel & Site'

/** Sets the document title to "<title> · <base>" while the component is mounted. */
export function usePageTitle(title?: MaybeRefOrGetter<string | undefined>) {
  watch(
    () => toValue(title),
    (val) => {
      document.title = val ? `${val} · ${BASE}` : BASE
    },
    { immediate: true }
  )

  onUnmounted(() => {
    document.title = BASE
  })
}
