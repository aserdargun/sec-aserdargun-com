import type { Locale, Source } from '../content/schema'
import { shellCopy } from '../i18n/copy'

export function SourceLink({ source, locale }: { source: Source; locale: Locale }) {
  return (
    <a href={source.url} target="_blank" rel="noreferrer">
      {source.publisher}: {source.title}
      <span className="sr-only"> ({shellCopy[locale].newTab})</span>
    </a>
  )
}
