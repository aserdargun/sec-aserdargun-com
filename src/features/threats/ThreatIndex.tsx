import { Link } from 'react-router-dom'
import { RecordEvidence } from '../../components/RecordEvidence'
import { assuranceNote, threatFamilyLabels } from '../../i18n/domain'
import type { Locale, Threat } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { StatusMark } from '../../components/StatusMark'

const labels = {
  en: { pre: 'Prerequisites', mech: 'Mechanism', result: 'Consequence', signal: 'Observable signals', controls: 'Controls', sources: 'Evidence basis' },
  tr: { pre: 'Ön koşullar', mech: 'Mekanizma', result: 'Sonuç', signal: 'Gözlenebilir sinyaller', controls: 'Kontroller', sources: 'Kanıt temeli' },
} as const

export function ThreatIndex({ threats, locale }: { threats: Threat[]; locale: Locale }) {
  const copy = labels[locale]
  if (!threats.length) return <p className="empty-state">{locale === 'en' ? 'No threats match these filters.' : 'Bu filtrelerle eşleşen tehdit yok.'}</p>
  return (
    <ol className="threat-index">
      {threats.map((threat) => (
        <li key={threat.id}>
          <article>
            <header><span className="threat-number">T{String(catalog.threats.findIndex((item) => item.id === threat.id) + 1).padStart(2, '0')}</span><div><p className="eyebrow">{threatFamilyLabels[locale][threat.family]}</p><h2>{localize(threat.title, locale)}</h2><p>{localize(threat.summary, locale)}</p></div></header>
            <dl>
              <div><dt>{copy.pre}</dt><dd>{localize(threat.prerequisites, locale)}</dd></div>
              <div><dt>{copy.mech}</dt><dd>{localize(threat.mechanism, locale)}</dd></div>
              <div><dt>{copy.result}</dt><dd>{localize(threat.consequence, locale)}</dd></div>
              <div><dt>{copy.signal}</dt><dd>{threat.observableSignals.map((item) => localize(item, locale)).join(' · ')}</dd></div>
            </dl>
            <div className="threat-controls"><strong>{copy.controls}</strong>{threat.controlIds.map((id) => { const control = catalog.controlsById.get(id)!; return <span key={id}><StatusMark value={control.assurance} locale={locale} /> <Link to={`/${locale}/controls?control=${id}#control-detail`}>{localize(control.title, locale)}</Link></span> })}</div>
            <p className="assurance-note">{assuranceNote[locale]}</p>
            <RecordEvidence sourceIds={threat.sourceIds} claimIds={threat.claimIds} locale={locale} />
            <small>{copy.sources}: {threat.sourceIds.map((id) => catalog.sourcesById.get(id)?.publisher).join(' · ')} / {threat.reviewedAt}</small>
          </article>
        </li>
      ))}
    </ol>
  )
}
