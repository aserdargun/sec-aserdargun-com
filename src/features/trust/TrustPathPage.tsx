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
  const title = locale === 'en' ? 'Trust is a chain of evidence.' : 'Güven bir kanıt zinciridir.'

  return (
    <section className="trust-page">
      <header className="page-intro">
        <h1>{title}</h1>
        <p>{locale === 'en' ? 'Trace delegated intent from model capability to auditable action.' : 'Devredilen niyeti model yeteneğinden denetlenebilir eyleme kadar izle.'}</p>
        <p className="review-line">{locale === 'en' ? 'Reviewed 02 Sep 2026' : 'İncelendi 02 Eyl 2026'}</p>
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
