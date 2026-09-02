import type { Locale } from '../content/schema'

export const sections = ['brief', 'trust-path', 'threats', 'controls', 'scenarios', 'standards', 'methodology'] as const
export type Section = (typeof sections)[number]

type ShellCopy = {
  product: string
  descriptor: string
  navLabel: string
  sections: Record<Section, string>
  notFound: string
  backToBrief: string
  newTab: string
  reviewed: string
  sources: string
}

export const shellCopy: Record<Locale, ShellCopy> = {
  en: {
    product: 'SEC',
    descriptor: 'AI Systems Security Observatory',
    navLabel: 'Primary navigation',
    sections: {
      brief: 'Security Brief',
      'trust-path': 'Trust path',
      threats: 'Threat map',
      controls: 'Control matrix',
      scenarios: 'Scenarios',
      standards: 'Standards',
      methodology: 'Methodology',
    },
    notFound: 'Page not found',
    backToBrief: 'Return to Security Brief',
    newTab: 'opens in a new tab',
    reviewed: 'Reviewed',
    sources: 'Sources',
  },
  tr: {
    product: 'SEC',
    descriptor: 'AI Sistemleri Güvenlik Gözlemevi',
    navLabel: 'Ana navigasyon',
    sections: {
      brief: 'Güvenlik Özeti',
      'trust-path': 'Güven zinciri',
      threats: 'Tehdit haritası',
      controls: 'Kontrol matrisi',
      scenarios: 'Senaryolar',
      standards: 'Standartlar',
      methodology: 'Metodoloji',
    },
    notFound: 'Sayfa bulunamadı',
    backToBrief: 'Güvenlik Özetine dön',
    newTab: 'yeni sekmede açılır',
    reviewed: 'İncelendi',
    sources: 'Kaynaklar',
  },
}
