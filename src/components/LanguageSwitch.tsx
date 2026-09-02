import { Link, useLocation } from 'react-router-dom'
import type { Locale } from '../content/schema'

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const location = useLocation()
  const target: Locale = locale === 'en' ? 'tr' : 'en'
  const targetPath = location.pathname.replace(/^\/(en|tr)(?=\/|$)/, `/${target}`)

  return (
    <div className="language-switch" aria-label={locale === 'en' ? 'Language' : 'Dil'}>
      <span aria-current={locale === 'en' ? 'true' : undefined}>EN</span>
      <span aria-hidden="true">/</span>
      {target === 'tr' ? (
        <Link to={`${targetPath}${location.search}`}>TR</Link>
      ) : (
        <Link to={`${targetPath}${location.search}`}>EN</Link>
      )}
    </div>
  )
}
