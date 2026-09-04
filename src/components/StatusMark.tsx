import type { AssuranceLevel, EvidenceKind, Locale } from '../content/schema'
import { statusLabels } from '../i18n/domain'

export function StatusMark({ value, locale }: { value: AssuranceLevel | EvidenceKind; locale: Locale }) {
  return <span className={`status-mark status-${value}`}>{statusLabels[locale][value]}</span>
}
