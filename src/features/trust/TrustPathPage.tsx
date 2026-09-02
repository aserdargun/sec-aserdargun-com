import { useSearchParams } from 'react-router-dom'
import type { Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { getControlsForNode, getThreatsForNode } from '../../content/selectors'
import { TrustPath } from './TrustPath'
import { TrustNodeDetail } from './TrustNodeDetail'
import { readTrustNode } from './trust-state'

export function TrustPathPage({ locale }: { locale: Locale }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedId = readTrustNode(searchParams.get('node'))
  const node = catalog.trustNodesById.get(selectedId)!
  const title = locale === 'en' ? 'The chain of evidence behind every agent action' : 'Her agent eyleminin arkasındaki kanıt zinciri'

  return (
    <section className="trust-page">
      <header className="page-intro">
        <p className="eyebrow">SEC / 02 / TRUST PATH</p>
        <h1>{title}</h1>
        <p>{locale === 'en' ? 'Select a boundary to inspect its actors, assets, threats, controls, and proof obligations.' : 'Aktörleri, varlıkları, tehditleri, kontrolleri ve kanıt yükümlülüklerini incelemek için bir sınır seçin.'}</p>
      </header>
      <div className="trust-workbench">
        <TrustPath
          nodes={catalog.trustNodes}
          locale={locale}
          selectedId={selectedId}
          onSelect={(id) => setSearchParams({ node: id })}
        />
        <TrustNodeDetail
          node={node}
          threats={getThreatsForNode(catalog, selectedId)}
          controls={getControlsForNode(catalog, selectedId)}
          locale={locale}
        />
      </div>
    </section>
  )
}
