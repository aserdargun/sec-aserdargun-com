import type { Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { StandardsCrosswalk } from './StandardsCrosswalk'

export function StandardsPage({ locale }: { locale: Locale }) {
  return <section className="standards-page"><header className="page-intro"><p className="eyebrow">SEC / 06 / STANDARDS CROSSWALK</p><h1>{locale === 'en' ? 'Framework correspondence without false equivalence' : 'Yanlış eşdeğerlik kurmadan framework karşılıkları'}</h1><p>{locale === 'en' ? 'This crosswalk is a research aid, not compliance advice. Direct, partial, and synthesis mappings state how strongly each relationship is supported.' : 'Bu eşleme bir araştırma yardımcısıdır, uyum tavsiyesi değildir. Doğrudan, kısmi ve sentez eşlemeleri her ilişkinin ne ölçüde desteklendiğini belirtir.'}</p></header><StandardsCrosswalk mappings={catalog.frameworkMappings} locale={locale} /></section>
}
