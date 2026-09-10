import { RecordEvidence } from '../../components/RecordEvidence'
import type { Claim, Locale } from '../../content/schema'
import { localize } from '../../content/selectors'
import { StatusMark } from '../../components/StatusMark'

export function SignalRail({ claims, locale }: { claims: Claim[]; locale: Locale }) {
  return (
    <ol className="signal-rail">
      {claims.map((claim) => (
        <li key={claim.id}>
          <StatusMark value={claim.kind} locale={locale} />
          <div><p>{localize(claim.text, locale)}</p><RecordEvidence sourceIds={claim.sourceIds} locale={locale} /><p className="claim-confidence">{localize(claim.confidence, locale)}</p></div>
          <small>{locale === 'en' ? 'Reviewed' : 'İncelendi'} {claim.reviewedAt}</small>
        </li>
      ))}
    </ol>
  )
}
