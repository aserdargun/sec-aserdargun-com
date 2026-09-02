import type { Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import type { ThreatFilters } from './threat-state'

export function ThreatToolbar({ locale, filters, onNodeChange, onClear }: { locale: Locale; filters: ThreatFilters; onNodeChange: (value: string) => void; onClear: () => void }) {
  return (
    <div className="filter-toolbar">
      <label>
        <span>{locale === 'en' ? 'Trust node' : 'Güven düğümü'}</span>
        <select aria-label={locale === 'en' ? 'Trust node' : 'Güven düğümü'} value={filters.node ?? ''} onChange={(event) => onNodeChange(event.target.value)}>
          <option value="">{locale === 'en' ? 'All nodes' : 'Tüm düğümler'}</option>
          {catalog.trustNodes.map((node) => <option key={node.id} value={node.id}>{String(node.order).padStart(2, '0')} {localize(node.title, locale)}</option>)}
        </select>
      </label>
      <button type="button" onClick={onClear}>{locale === 'en' ? 'Clear filters' : 'Filtreleri temizle'}</button>
    </div>
  )
}
