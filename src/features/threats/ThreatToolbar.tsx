import { ThreatFamilySchema, type Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { threatFamilyLabels } from '../../i18n/domain'
import type { ThreatFilters } from './threat-state'

export function ThreatToolbar({ locale, filters, onNodeChange, onFamilyChange, onClear }: { locale: Locale; filters: ThreatFilters; onNodeChange: (value: string) => void; onFamilyChange: (value: string) => void; onClear: () => void }) {
  return (
    <div className="filter-toolbar">
      <label>
        <span>{locale === 'en' ? 'Trust node' : 'Güven düğümü'}</span>
        <select aria-label={locale === 'en' ? 'Trust node' : 'Güven düğümü'} value={filters.node ?? ''} onChange={(event) => onNodeChange(event.target.value)}>
          <option value="">{locale === 'en' ? 'All nodes' : 'Tüm düğümler'}</option>
          {catalog.trustNodes.map((node) => <option key={node.id} value={node.id}>{String(node.order).padStart(2, '0')} {localize(node.title, locale)}</option>)}
        </select>
      </label>
      <label><span>{locale === 'en' ? 'Threat family' : 'Tehdit ailesi'}</span>
        <select value={filters.family ?? ''} onChange={(event) => onFamilyChange(event.target.value)}>
          <option value="">{locale === 'en' ? 'All families' : 'Tüm aileler'}</option>
          {ThreatFamilySchema.options.map((family) => <option key={family} value={family}>{threatFamilyLabels[locale][family]}</option>)}
        </select>
      </label>
      <button type="button" onClick={onClear}>{locale === 'en' ? 'Clear filters' : 'Filtreleri temizle'}</button>
    </div>
  )
}
