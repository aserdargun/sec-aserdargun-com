import { Link, useLocation } from 'react-router-dom'
import type { Control, Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { StatusMark } from '../../components/StatusMark'
import { controlTypeLabels } from '../../i18n/domain'

const headings = {
  en: ['Node', 'Threat', 'Control', 'Type', 'Assurance target', 'Required evidence', 'Reviewed'],
  tr: ['Düğüm', 'Tehdit', 'Kontrol', 'Tür', 'Güvence hedefi', 'Gerekli kanıt', 'İncelendi'],
} as const

export function ControlMatrix({ controls, locale }: { controls: Control[]; locale: Locale }) {
  const location = useLocation()
  return (
    <div className="table-scroll" role="region" aria-label={locale === 'en' ? 'Control matrix' : 'Kontrol matrisi'} tabIndex={0}>
      <table className="control-matrix">
        <thead><tr>{headings[locale].map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
        <tbody>{controls.map((control) => {
          const query = new URLSearchParams(location.search)
          query.set('control', control.id)
          return <tr key={control.id}>
            <td>{control.nodeIds.map((id) => <div key={id}><Link to={`/${locale}/trust-path?node=${id}`}>{localize(catalog.trustNodesById.get(id)!.title, locale)}</Link></div>)}</td>
            <td>{control.threatIds.map((id) => { const threat = catalog.threatsById.get(id)!; return <div key={id}><Link to={`/${locale}/threats?family=${threat.family}`}>{localize(threat.title, locale)}</Link></div> })}</td>
            <th scope="row"><Link to={`?${query}#control-detail`}>{localize(control.title, locale)}</Link><small>{localize(control.objective, locale)}</small></th>
            <td>{controlTypeLabels[locale][control.type]}</td>
            <td><StatusMark value={control.assurance} locale={locale} /></td>
            <td>{control.requiredEvidence.map((item, index) => <p key={index}>{localize(item, locale)}</p>)}</td>
            <td>{control.reviewedAt}</td>
          </tr>
        })}</tbody>
      </table>
    </div>
  )
}
