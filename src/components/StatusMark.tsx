import type { AssuranceLevel, EvidenceKind, Locale } from '../content/schema'

const labels = {
  en: { declared: 'Declared', enforced: 'Enforced', observed: 'Observed', proven: 'Proven', evidence: 'Evidence', synthesis: 'Synthesis', 'watch-signal': 'Watch signal' },
  tr: { declared: 'Beyan', enforced: 'Uygulandı', observed: 'Gözlendi', proven: 'Kanıtlandı', evidence: 'Kanıt', synthesis: 'Sentez', 'watch-signal': 'İzleme sinyali' },
} satisfies Record<Locale, Record<AssuranceLevel | EvidenceKind, string>>

export function StatusMark({ value, locale }: { value: AssuranceLevel | EvidenceKind; locale: Locale }) {
  return <span className={`status-mark status-${value}`}>{labels[locale][value]}</span>
}
