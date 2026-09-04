import { Link } from 'react-router-dom'
import type { Locale } from '../../content/schema'
import { catalog, latestSnapshot } from '../../content/catalog'
import { localize } from '../../content/selectors'
import { routePath } from '../../i18n/locale'
import { shellCopy } from '../../i18n/copy'
import { SignalRail } from './SignalRail'
import { SourceLink } from '../../components/SourceLink'

export function SecurityBriefPage({ locale }: { locale: Locale }) {
  const snapshot = latestSnapshot
  const copy = shellCopy[locale]
  const featuredIds = [snapshot.mostImportantClaimId, ...snapshot.watchSignalClaimIds, 'trust-is-evidence-chain']
  const featured = featuredIds.map((id) => catalog.claimsById.get(id)!).filter(Boolean)
  return (
    <section className="brief-page">
      <header className="brief-hero">
        <div>
          <p className="eyebrow">{copy.sectionEyebrows.brief}</p>
          <h1>{localize(snapshot.headline, locale)}</h1>
          <p className="hero-summary">{localize(snapshot.summary, locale)}</p>
          <div className="hero-actions">
            <Link className="primary-action" to={routePath(locale, 'trust-path')}>{locale === 'en' ? 'Inspect the trust path' : 'Güven zincirini incele'}</Link>
            <Link to={`${routePath(locale, 'scenarios')}?scenario=remote-mcp`}>{locale === 'en' ? 'Run a scenario trace' : 'Senaryo izini çalıştır'}</Link>
          </div>
        </div>
        <aside className="loop-rail" aria-label={locale === 'en' ? 'SEC operating loop' : 'SEC çalışma döngüsü'}>
          {(locale === 'en'
            ? ['Map', 'Constrain', 'Enforce', 'Observe', 'Prove', 'Recover']
            : ['Haritala', 'Sınırla', 'Uygula', 'Gözle', 'Kanıtla', 'Kurtar']
          ).map((label) => <span key={label}>{label}</span>)}
        </aside>
      </header>
      <div className="brief-meta">
        <span>{locale === 'en' ? 'Research cutoff' : 'Araştırma kesimi'}: {snapshot.cutoffDate}</span>
        <span>{catalog.sources.length} {locale === 'en' ? 'authoritative sources' : 'yetkili kaynak'}</span>
        <span>{catalog.threats.length} {locale === 'en' ? 'threat families' : 'tehdit ailesi'}</span>
      </div>
      <section className="brief-signals" aria-labelledby="current-signals">
        <header><p className="eyebrow">{locale === 'en' ? '01A / CURRENT SIGNALS' : '01A / GÜNCEL SİNYALLER'}</p><h2 id="current-signals">{locale === 'en' ? 'What changed, what holds, what remains open' : 'Ne değişti, ne geçerli, ne açık kaldı'}</h2></header>
        <SignalRail claims={featured} locale={locale} />
      </section>
      <section className="brief-sources" aria-labelledby="brief-sources">
        <h2 id="brief-sources">{locale === 'en' ? 'Primary sources in this cut' : 'Bu kesitteki birincil kaynaklar'}</h2>
        <ul>{catalog.sources.map((source) => <li key={source.id}><SourceLink source={source} locale={locale} /></li>)}</ul>
      </section>
    </section>
  )
}
