import type { AssuranceLevel, ControlType, EvidenceKind, Locale } from '../content/schema'

export const controlTypeLabels: Record<Locale, Record<ControlType, string>> = {
  en: { prevent: 'Prevent', detect: 'Detect', contain: 'Contain', recover: 'Recover' },
  tr: { prevent: 'Önle', detect: 'Algıla', contain: 'Sınırla', recover: 'Kurtar' },
}

export const statusLabels: Record<Locale, Record<AssuranceLevel | EvidenceKind, string>> = {
  en: { declared: 'Declared', enforced: 'Enforced', observed: 'Observed', proven: 'Proven', evidence: 'Evidence', synthesis: 'Synthesis', 'watch-signal': 'Watch signal' },
  tr: { declared: 'Beyan', enforced: 'Uygulandı', observed: 'Gözlendi', proven: 'Kanıtlandı', evidence: 'Kanıt', synthesis: 'Sentez', 'watch-signal': 'İzleme sinyali' },
}
