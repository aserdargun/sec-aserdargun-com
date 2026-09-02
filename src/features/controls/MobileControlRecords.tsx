import type { Control, Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { StatusMark } from '../../components/StatusMark'

export function MobileControlRecords({ controls, locale }: { controls: Control[]; locale: Locale }) {
  return <ol className="mobile-control-records">{controls.map((control) => <li key={control.id}><h2>{localize(control.title, locale)}</h2><dl><div><dt>{locale === 'en' ? 'Node' : 'Düğüm'}</dt><dd>{control.nodeIds.map((id) => localize(catalog.trustNodesById.get(id)!.title, locale)).join(' · ')}</dd></div><div><dt>{locale === 'en' ? 'Type' : 'Tür'}</dt><dd>{control.type}</dd></div><div><dt>{locale === 'en' ? 'Assurance' : 'Güvence'}</dt><dd><StatusMark value={control.assurance} locale={locale} /></dd></div><div><dt>{locale === 'en' ? 'Evidence' : 'Kanıt'}</dt><dd>{localize(control.requiredEvidence[0], locale)}</dd></div><div><dt>{locale === 'en' ? 'Reviewed' : 'İncelendi'}</dt><dd>{control.reviewedAt}</dd></div></dl></li>)}</ol>
}
