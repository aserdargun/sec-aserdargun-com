import { Link } from 'react-router-dom'
import { RecordEvidence } from '../../components/RecordEvidence'
import { assuranceNote } from '../../i18n/domain'
import type { Locale, TrustNode } from '../../content/schema'
import type { Control, Threat } from '../../content/schema'
import { localize } from '../../content/selectors'
import { StatusMark } from '../../components/StatusMark'

const labels = {
  en: { boundary: 'Trust boundary', actors: 'Actors', assets: 'Protected assets', assumptions: 'Assumptions', evidence: 'Required evidence', threats: 'Mapped threats', controls: 'Mapped controls' },
  tr: { boundary: 'Güven sınırı', actors: 'Aktörler', assets: 'Korunan varlıklar', assumptions: 'Varsayımlar', evidence: 'Gerekli kanıt', threats: 'Eşlenen tehditler', controls: 'Eşlenen kontroller' },
} as const

export function TrustNodeDetail({ node, threats, controls, locale }: { node: TrustNode; threats: Threat[]; controls: Control[]; locale: Locale }) {
  const copy = labels[locale]
  return (
    <article className="trust-detail" aria-labelledby={`node-${node.id}-title`}>
      <header>
        <p className="eyebrow">{String(node.order).padStart(2, '0')} / {localize(node.title, locale)}</p>
        <h2 id={`node-${node.id}-title`}>{localize(node.title, locale)}</h2>
        <p className="detail-purpose">{localize(node.purpose, locale)}</p>
      </header>
      <section className="detail-block"><h3>{copy.boundary}</h3><p>{localize(node.boundary, locale)}</p></section>
      <div className="detail-grid">
        <section className="detail-block"><h3>{copy.actors}</h3><ul>{node.actors.map((item, index) => <li key={index}>{localize(item, locale)}</li>)}</ul></section>
        <section className="detail-block"><h3>{copy.assets}</h3><ul>{node.assets.map((item, index) => <li key={index}>{localize(item, locale)}</li>)}</ul></section>
      </div>
      <section className="detail-block"><h3>{copy.assumptions}</h3><ul>{node.assumptions.map((item, index) => <li key={index}>{localize(item, locale)}</li>)}</ul></section>
      <section className="detail-block" role="region" aria-label={copy.evidence}><h3>{copy.evidence}</h3><ul>{node.requiredEvidence.map((item, index) => <li key={index}>{localize(item, locale)}</li>)}</ul></section>
      <section className="detail-block" role="region" aria-label={copy.threats}><h3>{copy.threats}</h3><ul>{threats.map((threat) => <li key={threat.id}><span className="threat-mark">T</span><Link to={`/${locale}/threats?family=${threat.family}`}>{localize(threat.title, locale)}</Link></li>)}</ul></section>
      <p className="assurance-note detail-block">{assuranceNote[locale]}</p>
      <section className="detail-block" role="region" aria-label={copy.controls}><h3>{copy.controls}</h3><ul>{controls.map((control) => <li key={control.id}><StatusMark value={control.assurance} locale={locale} /> <Link to={`/${locale}/controls?control=${control.id}#control-detail`}>{localize(control.title, locale)}</Link></li>)}</ul></section>
      <section className="detail-block"><RecordEvidence sourceIds={node.sourceIds} locale={locale} /><small>{locale === 'en' ? 'Reviewed' : 'İncelendi'}: {node.reviewedAt}</small></section>
    </article>
  )
}
