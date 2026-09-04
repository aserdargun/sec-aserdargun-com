import { useSearchParams } from 'react-router-dom'
import type { Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { ThreatIndex } from './ThreatIndex'
import { ThreatToolbar } from './ThreatToolbar'
import { readThreatFilters } from './threat-state'
import { shellCopy } from '../../i18n/copy'

export function ThreatsPage({ locale }: { locale: Locale }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = readThreatFilters(searchParams)
  const threats = catalog.threats.filter((threat) => (!filters.node || threat.nodeIds.includes(filters.node)) && (!filters.family || threat.family === filters.family))
  function setNode(value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('node', value)
    else next.delete('node')
    setSearchParams(next)
  }
  return (
    <section className="threats-page">
      <header className="page-intro"><p className="eyebrow">{shellCopy[locale].sectionEyebrows.threats}</p><h1>{locale === 'en' ? 'Threats, located at the boundary they exploit' : 'İstismar ettikleri sınıra yerleştirilmiş tehditler'}</h1><p>{locale === 'en' ? 'Each family records prerequisites, mechanism, consequence, observable signals, and mapped controls.' : 'Her aile ön koşulları, mekanizmayı, sonucu, gözlenebilir sinyalleri ve eşlenen kontrolleri kaydeder.'}</p></header>
      <ThreatToolbar locale={locale} filters={filters} onNodeChange={setNode} onClear={() => setSearchParams({})} />
      <p className="result-count">{threats.length} / {catalog.threats.length} {locale === 'en' ? 'threat families' : 'tehdit ailesi'}</p>
      <ThreatIndex threats={threats} locale={locale} />
    </section>
  )
}
