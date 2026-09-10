import type { AssuranceLevel, ControlType, EvidenceKind, Locale } from '../content/schema'

export const controlTypeLabels: Record<Locale, Record<ControlType, string>> = {
  en: { prevent: 'Prevent', detect: 'Detect', contain: 'Contain', recover: 'Recover' },
  tr: { prevent: 'Önle', detect: 'Algıla', contain: 'Sınırla', recover: 'Kurtar' },
}

export const statusLabels: Record<Locale, Record<AssuranceLevel | EvidenceKind, string>> = {
  en: { declared: 'Declared', enforced: 'Enforced', observed: 'Observed', proven: 'Proven', evidence: 'Evidence', synthesis: 'Synthesis', 'watch-signal': 'Watch signal' },
  tr: { declared: 'Beyan', enforced: 'Uygulandı', observed: 'Gözlendi', proven: 'Kanıtlandı', evidence: 'Kanıt', synthesis: 'Sentez', 'watch-signal': 'İzleme sinyali' },
}

export const assuranceNote = {
  en: 'Assurance labels are evidence targets for implementation, not measured results. SEC has not tested these controls in your system.',
  tr: 'Güvence etiketleri uygulama için kanıt hedefleridir; ölçülmüş sonuçlar değildir. SEC bu kontrolleri sizin sisteminizde test etmemiştir.',
} as const

export const threatFamilyLabels = {
  en: {
    'instruction-goal-integrity': 'Instruction and goal integrity',
    'identity-credential-abuse': 'Identity and credential abuse',
    'authorization-delegation-abuse': 'Authorization and delegation abuse',
    'tool-action-misuse': 'Tool and action misuse',
    'data-context-memory': 'Data, context, and memory',
    'runtime-sandbox-execution': 'Runtime and sandbox execution',
    'agentic-supply-chain': 'Agent supply chain',
    'audit-accountability': 'Audit and accountability',
    'human-agent-trust': 'Human–agent trust',
    'containment-recovery': 'Containment and recovery',
  },
  tr: {
    'instruction-goal-integrity': 'Talimat ve amaç bütünlüğü',
    'identity-credential-abuse': 'Kimlik ve kimlik bilgisi istismarı',
    'authorization-delegation-abuse': 'Yetkilendirme ve yetki devri istismarı',
    'tool-action-misuse': 'Araç ve eylem kötüye kullanımı',
    'data-context-memory': 'Veri, bağlam ve bellek',
    'runtime-sandbox-execution': 'Çalışma zamanı ve yalıtılmış yürütme',
    'agentic-supply-chain': 'Ajan tedarik zinciri',
    'audit-accountability': 'Denetim ve hesap verebilirlik',
    'human-agent-trust': 'İnsan–ajan güveni',
    'containment-recovery': 'Sınırlama ve kurtarma',
  },
} as const
