import { Link } from 'react-router-dom'
import type { Control, Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { RecordEvidence } from '../../components/RecordEvidence'
import { StatusMark } from '../../components/StatusMark'
import { assuranceNote, controlTypeLabels } from '../../i18n/domain'

export function ControlDetail({ control, locale }: { control: Control; locale: Locale }) {
  return <article className="control-detail" aria-labelledby="control-detail-title" tabIndex={-1} id="control-detail">
    <p className="eyebrow">{locale === 'en' ? 'Control record' : 'Kontrol kaydı'} / {control.id}</p>
    <h2 id="control-detail-title">{localize(control.title, locale)}</h2>
    <p>{localize(control.objective, locale)}</p>
    <p>{controlTypeLabels[locale][control.type]} · <StatusMark value={control.assurance} locale={locale} /></p>
    <p className="assurance-note">{assuranceNote[locale]}</p>
    <div className="control-detail-grid">
      <section><h3>{locale === 'en' ? 'Implementation' : 'Uygulama'}</h3><p>{localize(control.implementation, locale)}</p></section>
      <section><h3>{locale === 'en' ? 'Tradeoffs' : 'Ödünleşimler'}</h3><p>{localize(control.tradeoffs, locale)}</p></section>
      <section><h3>{locale === 'en' ? 'Required evidence' : 'Gerekli kanıt'}</h3><ul>{control.requiredEvidence.map((item, index) => <li key={index}>{localize(item, locale)}</li>)}</ul></section>
      <section><h3>{locale === 'en' ? 'Trust nodes' : 'Güven düğümleri'}</h3><ul>{control.nodeIds.map((id) => <li key={id}><Link to={`/${locale}/trust-path?node=${id}`}>{localize(catalog.trustNodesById.get(id)!.title, locale)}</Link></li>)}</ul></section>
      <section><h3>{locale === 'en' ? 'Mapped threats' : 'Eşlenen tehditler'}</h3><ul>{control.threatIds.map((id) => { const threat = catalog.threatsById.get(id)!; return <li key={id}><Link to={`/${locale}/threats?family=${threat.family}`}>{localize(threat.title, locale)}</Link></li> })}</ul></section>
    </div>
    <RecordEvidence sourceIds={control.sourceIds} claimIds={control.claimIds} locale={locale} />
    <small>{locale === 'en' ? 'Reviewed' : 'İncelendi'}: {control.reviewedAt}</small>
  </article>
}
