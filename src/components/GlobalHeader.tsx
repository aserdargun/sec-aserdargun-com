import { LanguageSwitch } from './LanguageSwitch'
import { shellCopy } from '../i18n/copy'
import type { Locale } from '../content/schema'

export function GlobalHeader({ locale }: { locale: Locale }) {
  const copy = shellCopy[locale]
  return (
    <header className="global-header">
      <a className="brand" href={`/${locale}`} aria-label={`${copy.product} — ${copy.descriptor}`}>
        <span className="brand-mark">{copy.product}</span>
        <span className="brand-descriptor">{copy.descriptor}</span>
      </a>
      <LanguageSwitch locale={locale} />
    </header>
  )
}
