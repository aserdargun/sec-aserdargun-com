import type { FrameworkMapping, Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { SourceLink } from '../../components/SourceLink'

const mappingLabels = { en: { direct: 'Direct', partial: 'Partial', synthesis: 'Synthesis' }, tr: { direct: 'Doğrudan', partial: 'Kısmi', synthesis: 'Sentez' } } as const

function entityTitle(mapping: FrameworkMapping, id: string, locale: Locale) {
  if (mapping.entityType === 'threat') return localize(catalog.threatsById.get(id)!.title, locale)
  if (mapping.entityType === 'control') return localize(catalog.controlsById.get(id)!.title, locale)
  return localize(catalog.trustNodesById.get(id as never)!.title, locale)
}

export function StandardsCrosswalk({ mappings, locale }: { mappings: FrameworkMapping[]; locale: Locale }) {
  return <ol className="standards-crosswalk">{mappings.map((mapping) => <li key={mapping.id}><article><header><div><p className="eyebrow">{mapping.referenceId}</p><h2>{mapping.framework}</h2><p>{mapping.version}</p></div><span className={`mapping-mark mapping-${mapping.mappingType}`}>{mappingLabels[locale][mapping.mappingType]}</span></header><dl><div><dt>{locale === 'en' ? 'SEC entities' : 'SEC varlıkları'}</dt><dd>{mapping.entityIds.map((id) => entityTitle(mapping, id, locale)).join(' · ')}</dd></div><div><dt>{locale === 'en' ? 'Rationale' : 'Gerekçe'}</dt><dd>{localize(mapping.rationale, locale)}</dd></div><div><dt>{locale === 'en' ? 'Reviewed' : 'İncelendi'}</dt><dd>{mapping.reviewedAt}</dd></div></dl><ul className="mapping-sources">{mapping.sourceIds.map((id) => <li key={id}><SourceLink source={catalog.sourcesById.get(id)!} locale={locale} /></li>)}</ul></article></li>)}</ol>
}
