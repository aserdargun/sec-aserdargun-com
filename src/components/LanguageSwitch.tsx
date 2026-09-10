import { Link, useLocation } from 'react-router-dom'
import type { Locale } from '../content/schema'

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const location = useLocation()
  const target: Locale = locale === 'en' ? 'tr' : 'en'
  const targetPath = /^\/(en|tr)(?=\/|$)/.test(location.pathname)
    ? location.pathname.replace(/^\/(en|tr)(?=\/|$)/, `/${target}`)
    : `/${target}`

  return (
    <div className="language-switch" aria-label={locale === 'en' ? 'Language' : 'Dil'}>
      <span aria-current="true">{locale.toUpperCase()}</span>
      <span aria-hidden="true">/</span>
      <Link to={`${targetPath}${location.search}${location.hash}`}>{target.toUpperCase()}</Link>
    </div>
  )
}
