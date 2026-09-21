import { useSearchParams } from 'react-router-dom'
import type { Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { ScenarioPicker } from './ScenarioPicker'
import { ScenarioTrace } from './ScenarioTrace'
import { readScenarioId } from './scenario-state'
import { shellCopy } from '../../i18n/copy'

export function ScenariosPage({ locale }: { locale: Locale }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedId = readScenarioId(searchParams.get('scenario'))
  const scenario = catalog.scenariosById.get(selectedId)!
  return (
    <section className="scenarios-page">
      <header className="page-intro"><p className="eyebrow">{shellCopy[locale].sectionEyebrows.scenarios}</p><h1>{locale === 'en' ? 'Trace authority through an illustrative scenario' : 'Yetkiyi açıklayıcı bir senaryoda izle'}</h1><p>{locale === 'en' ? 'These four illustrative scenarios describe assumed actors, boundaries, and proposed verification experiments. SEC does not execute them or report measured outcomes.' : 'Bu dört açıklayıcı senaryo; varsayılan aktörleri, sınırları ve önerilen doğrulama deneylerini tanımlar. SEC bunları yürütmez veya ölçülmüş sonuç bildirmez.'}</p></header>
      <ScenarioPicker locale={locale} selected={selectedId} onSelect={(id) => setSearchParams({ scenario: id })} />
      <ScenarioTrace scenario={scenario} locale={locale} />
    </section>
  )
}
