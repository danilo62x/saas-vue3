const LOCALE_MAP: Record<string, { locale: string; currency: string }> = {
  'pt-BR': { locale: 'pt-BR', currency: 'BRL' },
  en: { locale: 'en-US', currency: 'USD' },
  es: { locale: 'es-ES', currency: 'EUR' },
}

/** Format a currency value respecting the active i18n language. */
export function formatCurrency(value: number, lang = 'pt-BR'): string {
  const cfg = LOCALE_MAP[lang] ?? LOCALE_MAP['pt-BR']
  return new Intl.NumberFormat(cfg.locale, {
    style: 'currency',
    currency: cfg.currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

/** Compact number format, e.g. 2840 -> 2.8k */
export function formatCompact(value: number, lang = 'pt-BR'): string {
  const cfg = LOCALE_MAP[lang] ?? LOCALE_MAP['pt-BR']
  return new Intl.NumberFormat(cfg.locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

/** Locale-aware date format. */
export function formatDate(iso: string, lang = 'pt-BR'): string {
  const cfg = LOCALE_MAP[lang] ?? LOCALE_MAP['pt-BR']
  return new Intl.DateTimeFormat(cfg.locale, { dateStyle: 'medium' }).format(new Date(iso))
}

/** Relative time from an ISO timestamp (rough, mock-friendly). */
export function fromNow(iso: string, lang = 'pt-BR'): string {
  const cfg = LOCALE_MAP[lang] ?? LOCALE_MAP['pt-BR']
  const rtf = new Intl.RelativeTimeFormat(cfg.locale, { numeric: 'auto' })
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diff / 60000)
  if (Math.abs(mins) < 60) return rtf.format(-mins, 'minute')
  const hours = Math.round(mins / 60)
  if (Math.abs(hours) < 24) return rtf.format(-hours, 'hour')
  const days = Math.round(hours / 24)
  return rtf.format(-days, 'day')
}
