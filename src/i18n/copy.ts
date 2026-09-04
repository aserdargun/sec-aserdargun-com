import type { Locale } from '../content/schema'

export const sections = ['brief', 'trust-path', 'threats', 'controls', 'scenarios', 'standards', 'methodology'] as const
export type Section = (typeof sections)[number]

type ShellCopy = {
  product: string
  descriptor: string
  pageTitle: string
  metaDescription: string
  navLabel: string
  sections: Record<Section, string>
  sectionEyebrows: Record<Section, string>
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
    pageTitle: 'AI Systems Security',
    metaDescription: 'A source-backed observatory for AI systems security, delegated authority, controls, and evidence.',
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
    sectionEyebrows: {
      brief: 'SEC / 01 / SECURITY BRIEF',
      'trust-path': 'SEC / 02 / TRUST PATH',
      threats: 'SEC / 03 / THREAT MAP',
      controls: 'SEC / 04 / CONTROL MATRIX',
      scenarios: 'SEC / 05 / SCENARIOS',
      standards: 'SEC / 06 / STANDARDS CROSSWALK',
      methodology: 'SEC / 07 / METHODOLOGY',
    },
    notFound: 'Page not found',
    backToBrief: 'Return to Security Brief',
    newTab: 'opens in a new tab',
    reviewed: 'Reviewed',
    sources: 'Sources',
  },
  tr: {
    product: 'SEC',
    descriptor: 'Yapay Zekâ Sistemleri Güvenlik Gözlemevi',
    pageTitle: 'Yapay Zekâ Sistemleri Güvenliği',
    metaDescription: 'Yapay zekâ sistemlerinin güvenliği, devredilen yetki, kontroller ve kanıtlar için kaynak destekli gözlemevi.',
    navLabel: 'Ana gezinme',
    sections: {
      brief: 'Güvenlik Özeti',
      'trust-path': 'Güven zinciri',
      threats: 'Tehdit haritası',
      controls: 'Kontrol matrisi',
      scenarios: 'Senaryolar',
      standards: 'Standartlar',
      methodology: 'Metodoloji',
    },
    sectionEyebrows: {
      brief: 'SEC / 01 / GÜVENLİK ÖZETİ',
      'trust-path': 'SEC / 02 / GÜVEN ZİNCİRİ',
      threats: 'SEC / 03 / TEHDİT HARİTASI',
      controls: 'SEC / 04 / KONTROL MATRİSİ',
      scenarios: 'SEC / 05 / SENARYOLAR',
      standards: 'SEC / 06 / STANDART EŞLEMESİ',
      methodology: 'SEC / 07 / METODOLOJİ',
    },
    notFound: 'Sayfa bulunamadı',
    backToBrief: 'Güvenlik Özetine dön',
    newTab: 'yeni sekmede açılır',
    reviewed: 'İncelendi',
    sources: 'Kaynaklar',
  },
}
