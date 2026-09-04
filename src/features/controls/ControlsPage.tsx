import { useSearchParams } from 'react-router-dom'
import type { Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { ControlMatrix } from './ControlMatrix'
import { MobileControlRecords } from './MobileControlRecords'
import { readControlFilters } from './control-state'
import { shellCopy } from '../../i18n/copy'
import { controlTypeLabels, statusLabels } from '../../i18n/domain'

export function ControlsPage({ locale }: { locale: Locale }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = readControlFilters(searchParams)
  const controls = catalog.controls.filter((control) => (!filters.node || control.nodeIds.includes(filters.node)) && (!filters.type || control.type === filters.type) && (!filters.assurance || control.assurance === filters.assurance))
  function update(key: string, value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }
  return (
    <section className="controls-page">
      <header className="page-intro"><p className="eyebrow">{shellCopy[locale].sectionEyebrows.controls}</p><h1>{locale === 'en' ? 'Controls are claims with proof obligations' : 'Kontroller, kanıt yükümlülüğü taşıyan iddialardır'}</h1><p>{locale === 'en' ? 'Assurance is stated per control—declared, enforced, observed, or proven—never collapsed into one score.' : 'Güvence her kontrol için beyan, uygulandı, gözlendi veya kanıtlandı olarak belirtilir; tek skora indirgenmez.'}</p></header>
      <div className="filter-toolbar control-filters">
        <label><span>{locale === 'en' ? 'Trust node' : 'Güven düğümü'}</span><select value={filters.node ?? ''} onChange={(event) => update('node', event.target.value)}><option value="">{locale === 'en' ? 'All nodes' : 'Tüm düğümler'}</option>{catalog.trustNodes.map((node) => <option key={node.id} value={node.id}>{localize(node.title, locale)}</option>)}</select></label>
        <label><span>{locale === 'en' ? 'Control type' : 'Kontrol türü'}</span><select value={filters.type ?? ''} onChange={(event) => update('controlType', event.target.value)}><option value="">{locale === 'en' ? 'All types' : 'Tüm türler'}</option>{(['prevent', 'detect', 'contain', 'recover'] as const).map((value) => <option key={value} value={value}>{controlTypeLabels[locale][value]}</option>)}</select></label>
        <label><span>{locale === 'en' ? 'Assurance' : 'Güvence'}</span><select value={filters.assurance ?? ''} onChange={(event) => update('assurance', event.target.value)}><option value="">{locale === 'en' ? 'All levels' : 'Tüm seviyeler'}</option>{(['declared', 'enforced', 'observed', 'proven'] as const).map((value) => <option key={value} value={value}>{statusLabels[locale][value]}</option>)}</select></label>
        <button type="button" onClick={() => setSearchParams({})}>{locale === 'en' ? 'Clear filters' : 'Filtreleri temizle'}</button>
      </div>
      <p className="result-count">{controls.length} / {catalog.controls.length} {locale === 'en' ? 'controls' : 'kontrol'}</p>
      {controls.length ? <><ControlMatrix controls={controls} locale={locale} /><MobileControlRecords controls={controls} locale={locale} /></> : <p className="empty-state">{locale === 'en' ? 'No controls match these filters.' : 'Bu filtrelerle eşleşen kontrol yok.'}</p>}
    </section>
  )
}
