import { Link } from 'react-router-dom'
import { RecordEvidence } from '../../components/RecordEvidence'
import { assuranceNote } from '../../i18n/domain'
import type { Locale, Scenario } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { getScenarioTrace, localize } from '../../content/selectors'
import { StatusMark } from '../../components/StatusMark'

const labels = {
  en: { boundary: 'System boundary', authority: 'Authority chain', credential: 'Credential constraints', actors: 'Actors', tools: 'Tools', data: 'Data', actions: 'Actions', humans: 'Human decisions', proof: 'Expected evidence', threats: 'Threats in this path', controls: 'Controls in this path', experiment: 'Verification experiment' },
  tr: { boundary: 'Sistem sınırı', authority: 'Yetki zinciri', credential: 'Kimlik bilgisi kısıtları', actors: 'Aktörler', tools: 'Araçlar', data: 'Veri', actions: 'Eylemler', humans: 'İnsan kararları', proof: 'Beklenen kanıt', threats: 'Bu yoldaki tehditler', controls: 'Bu yoldaki kontroller', experiment: 'Doğrulama deneyi' },
} as const

function TextList({ values, locale }: { values: Scenario['actors']; locale: Locale }) {
  return <ul>{values.map((item, index) => <li key={index}>{localize(item, locale)}</li>)}</ul>
}

export function ScenarioTrace({ scenario, locale }: { scenario: Scenario; locale: Locale }) {
  const copy = labels[locale]
  const trace = getScenarioTrace(catalog, scenario.id)
  return (
    <article className="scenario-trace">
      <header><p className="eyebrow">{scenario.id}</p><h2>{localize(scenario.title, locale)}</h2><p>{localize(scenario.narrative, locale)}</p></header>
      <div className="scenario-core">
        <section><h3>{copy.boundary}</h3><p>{localize(scenario.systemBoundary, locale)}</p></section>
        <section><h3>{copy.authority}</h3><p>{localize(scenario.authorityChain, locale)}</p></section>
        <section><h3>{copy.credential}</h3><p>{localize(scenario.credentialConstraints, locale)}</p></section>
      </div>
      <ol className="scenario-path" aria-label={locale === 'en' ? 'Scenario trust path' : 'Senaryo güven zinciri'}>{trace.map((step) => <li key={step.node.id}><span>{String(step.node.order).padStart(2, '0')}</span><strong><Link to={`/${locale}/trust-path?node=${step.node.id}`}>{localize(step.node.title, locale)}</Link></strong><small>{step.controlIds.length} {locale === 'en' ? 'controls' : 'kontrol'} / {step.threatIds.length} {locale === 'en' ? 'threats' : 'tehdit'}</small></li>)}</ol>
      <div className="scenario-fields">
        <section><h3>{copy.actors}</h3><TextList values={scenario.actors} locale={locale} /></section>
        <section><h3>{copy.tools}</h3><TextList values={scenario.tools} locale={locale} /></section>
        <section><h3>{copy.data}</h3><TextList values={scenario.data} locale={locale} /></section>
        <section><h3>{copy.actions}</h3><TextList values={scenario.actions} locale={locale} /></section>
        <section role="region" aria-label={copy.humans}><h3>{copy.humans}</h3><TextList values={scenario.humanDecisions} locale={locale} /></section>
        <section><h3>{copy.proof}</h3><TextList values={scenario.expectedEvidence} locale={locale} /></section>
      </div>
      <section className="scenario-mappings"><h3>{copy.threats}</h3><ul>{scenario.threatIds.map((id) => <li key={id}><Link to={`/${locale}/threats?family=${catalog.threatsById.get(id)!.family}`}>{localize(catalog.threatsById.get(id)!.title, locale)}</Link></li>)}</ul></section>
      <section className="scenario-mappings"><h3>{copy.controls}</h3><p className="assurance-note">{assuranceNote[locale]}</p><ul>{scenario.controlIds.map((id) => { const control = catalog.controlsById.get(id)!; return <li key={id}><StatusMark value={control.assurance} locale={locale} /> <Link to={`/${locale}/controls?control=${id}#control-detail`}>{localize(control.title, locale)}</Link></li> })}</ul></section>
      <section className="experiment-block"><p className="eyebrow">{copy.experiment}</p><p>{localize(scenario.experiment, locale)}</p></section>
      <section className="scenario-mappings"><RecordEvidence sourceIds={scenario.sourceIds} locale={locale} /><small>{locale === 'en' ? 'Reviewed' : 'İncelendi'}: {scenario.reviewedAt}</small></section>
    </article>
  )
}
