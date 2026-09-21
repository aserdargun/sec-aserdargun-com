import { portfolio } from '../content/portfolio'
import type { Locale } from '../content/schema'
import { localize } from '../content/selectors'

export function PortfolioContext({ locale }: { locale: Locale }) {
  return (
    <section className="portfolio-context" aria-labelledby="portfolio-context-title">
      <p className="eyebrow">aserdargun.com / {locale === 'en' ? 'LEARNING SYSTEM' : 'ÖĞRENME SİSTEMİ'}</p>
      <h2 id="portfolio-context-title">{localize(portfolio.title, locale)}</h2>
      <p>{localize(portfolio.summary, locale)}</p>
      <ul>{portfolio.relationships.map((item) => (
        <li key={item.code}>
          <a href={item.url}>{item.code}<span aria-hidden="true"> ↗</span></a>
          <p>{localize(item.purpose, locale)}</p>
        </li>
      ))}</ul>
      <p className="portfolio-boundary">{localize(portfolio.boundary, locale)}</p>
      <a className="portfolio-journey" href={locale === 'tr' ? 'https://aserdargun.com/tr/journey/' : portfolio.sourceUrl}>
        {locale === 'en' ? 'Explore the learning system' : 'Öğrenme sistemini keşfet'} ↗
      </a>
    </section>
  )
}
