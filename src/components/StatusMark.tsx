import type { AssuranceLevel, EvidenceKind, Locale } from '../content/schema'
import { assuranceNote, statusLabels } from '../i18n/domain'

export function StatusMark({ value, locale }: { value: AssuranceLevel | EvidenceKind; locale: Locale }) {
  const isAssurance = ['declared', 'enforced', 'observed', 'proven'].includes(value)
  return <span title={isAssurance ? assuranceNote[locale] : undefined} className={`status-mark status-${value}`}>
    {isAssurance && <span>{locale === 'en' ? 'Target: ' : 'Hedef: '}</span>}{statusLabels[locale][value]}
  </span>
}
