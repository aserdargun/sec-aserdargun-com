import { Link, useLocation } from 'react-router-dom'
import type { Control, Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { StatusMark } from '../../components/StatusMark'
import { controlTypeLabels } from '../../i18n/domain'

export function MobileControlRecords({ controls, locale }: { controls: Control[]; locale: Locale }) {
  const location = useLocation()
  return <ol className="mobile-control-records">{controls.map((control) => { const query = new URLSearchParams(location.search); query.set('control', control.id); return <li key={control.id}><h2><Link to={`?${query}#control-detail`}>{localize(control.title, locale)}</Link></h2><p>{localize(control.objective, locale)}</p><dl><div><dt>{locale === 'en' ? 'Threats' : 'Tehditler'}</dt><dd>{control.threatIds.map((id) => localize(catalog.threatsById.get(id)!.title, locale)).join(' · ')}</dd></div><div><dt>{locale === 'en' ? 'Node' : 'Düğüm'}</dt><dd>{control.nodeIds.map((id) => localize(catalog.trustNodesById.get(id)!.title, locale)).join(' · ')}</dd></div><div><dt>{locale === 'en' ? 'Type' : 'Tür'}</dt><dd>{controlTypeLabels[locale][control.type]}</dd></div><div><dt>{locale === 'en' ? 'Assurance target' : 'Güvence hedefi'}</dt><dd><StatusMark value={control.assurance} locale={locale} /></dd></div><div><dt>{locale === 'en' ? 'Evidence' : 'Kanıt'}</dt><dd>{control.requiredEvidence.map((item, index) => <p key={index}>{localize(item, locale)}</p>)}</dd></div><div><dt>{locale === 'en' ? 'Reviewed' : 'İncelendi'}</dt><dd>{control.reviewedAt}</dd></div></dl></li> })}</ol>
}
