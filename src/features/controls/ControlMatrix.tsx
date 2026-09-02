import type { Control, Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { StatusMark } from '../../components/StatusMark'

const headings = {
  en: ['Node', 'Threat', 'Control', 'Type', 'Assurance', 'Required evidence', 'Reviewed'],
  tr: ['Düğüm', 'Tehdit', 'Kontrol', 'Tür', 'Güvence', 'Gerekli kanıt', 'İncelendi'],
} as const

export function ControlMatrix({ controls, locale }: { controls: Control[]; locale: Locale }) {
  return (
    <div className="table-scroll">
      <table className="control-matrix">
        <thead><tr>{headings[locale].map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
        <tbody>{controls.map((control) => {
          const node = catalog.trustNodesById.get(control.nodeIds[0])!
          const threat = catalog.threatsById.get(control.threatIds[0])!
          return <tr key={control.id}>
            <td><span className="node-order">{String(node.order).padStart(2, '0')}</span> {localize(node.title, locale)}</td>
            <td>{localize(threat.title, locale)}</td>
            <th scope="row"><span>{localize(control.title, locale)}</span><small>{localize(control.objective, locale)}</small></th>
            <td>{control.type}</td>
            <td><StatusMark value={control.assurance} locale={locale} /></td>
            <td>{localize(control.requiredEvidence[0], locale)}</td>
            <td>{control.reviewedAt}</td>
          </tr>
        })}</tbody>
      </table>
    </div>
  )
}
