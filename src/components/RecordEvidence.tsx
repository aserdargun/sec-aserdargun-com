import type { Locale } from '../content/schema'
import { catalog } from '../content/catalog'
import { localize } from '../content/selectors'
import { SourceLink } from './SourceLink'
import { StatusMark } from './StatusMark'

export function RecordEvidence({ sourceIds, claimIds = [], locale }: { sourceIds: string[]; claimIds?: string[]; locale: Locale }) {
  return (
    <details className="record-evidence">
      <summary>{locale === 'en' ? 'Sources and evidence' : 'Kaynaklar ve kanıt'}</summary>
      {claimIds.length > 0 && <ul className="claim-evidence">{claimIds.map((id) => {
        const claim = catalog.claimsById.get(id)!
        return <li key={id}><StatusMark value={claim.kind} locale={locale} /><p>{localize(claim.text, locale)}</p><p>{localize(claim.confidence, locale)}</p><ul>{claim.sourceIds.map((sourceId) => <li key={sourceId}><SourceLink source={catalog.sourcesById.get(sourceId)!} locale={locale} /></li>)}</ul><small>{locale === 'en' ? 'Reviewed' : 'İncelendi'}: {claim.reviewedAt}</small></li>
      })}</ul>}
      <ul className="record-sources">{sourceIds.map((id) => <li key={id}><SourceLink source={catalog.sourcesById.get(id)!} locale={locale} /></li>)}</ul>
    </details>
  )
}
