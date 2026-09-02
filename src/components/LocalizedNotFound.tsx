import { Link } from 'react-router-dom'
import type { Locale } from '../content/schema'
import { routePath } from '../i18n/locale'
import { shellCopy } from '../i18n/copy'

export function LocalizedNotFound({ locale }: { locale: Locale }) {
  const copy = shellCopy[locale]
  return (
    <section className="not-found">
      <p className="eyebrow">404 / SEC</p>
      <h1>{copy.notFound}</h1>
      <Link to={routePath(locale, 'brief')}>{copy.backToBrief}</Link>
    </section>
  )
}
