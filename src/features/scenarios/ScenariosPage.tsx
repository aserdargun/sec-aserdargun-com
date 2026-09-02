import { useSearchParams } from 'react-router-dom'
import type { Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { ScenarioPicker } from './ScenarioPicker'
import { ScenarioTrace } from './ScenarioTrace'
import { readScenarioId } from './scenario-state'

export function ScenariosPage({ locale }: { locale: Locale }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedId = readScenarioId(searchParams.get('scenario'))
  const scenario = catalog.scenariosById.get(selectedId)!
  return (
    <section className="scenarios-page">
      <header className="page-intro"><p className="eyebrow">SEC / 05 / SCENARIOS</p><h1>{locale === 'en' ? 'Trace authority through a real operating context' : 'Yetkiyi gerçek bir çalışma bağlamında izle'}</h1><p>{locale === 'en' ? 'Scenario traces turn abstract controls into actors, credentials, decisions, actions, evidence, and recovery tests.' : 'Senaryo izleri soyut kontrolleri aktörlere, kimlik bilgilerine, kararlara, eylemlere, kanıta ve kurtarma testlerine dönüştürür.'}</p></header>
      <ScenarioPicker locale={locale} selected={selectedId} onSelect={(id) => setSearchParams({ scenario: id })} />
      <ScenarioTrace scenario={scenario} locale={locale} />
    </section>
  )
}
