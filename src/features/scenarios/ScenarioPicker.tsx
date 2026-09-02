import type { Locale, ScenarioId } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'

export function ScenarioPicker({ locale, selected, onSelect }: { locale: Locale; selected: ScenarioId; onSelect: (id: ScenarioId) => void }) {
  return (
    <div className="scenario-picker" role="group" aria-label={locale === 'en' ? 'Select scenario' : 'Senaryo seç'}>
      {catalog.scenarios.map((scenario, index) => <button key={scenario.id} type="button" aria-pressed={scenario.id === selected} onClick={() => onSelect(scenario.id)}><span>{String(index + 1).padStart(2, '0')}</span>{localize(scenario.title, locale)}</button>)}
    </div>
  )
}
