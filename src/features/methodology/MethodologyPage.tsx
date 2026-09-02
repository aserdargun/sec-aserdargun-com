import type { Locale } from '../../content/schema'
import { catalog } from '../../content/catalog'
import { SourceLink } from '../../components/SourceLink'

const content = {
  en: {
    title: 'How SEC separates evidence from judgment',
    intro: 'SEC is a static, versioned research instrument. It does not scan a system, store secrets, issue a compliance result, or replace a security review.',
    sections: [
      ['Evidence classes', 'Evidence records are directly supported by cited authoritative sources. Synthesis records connect multiple sources through an explicit editorial judgment. Watch signals identify an important direction that is not yet stable enough to present as settled.'],
      ['Assurance vocabulary', 'Declared means a control is documented. Enforced means a technical boundary applies it. Observed means the effect appears in operating evidence. Proven means a focused verification test demonstrates the intended result. These levels are never averaged.'],
      ['Editorial cycle', 'Every record carries a reviewed date, source IDs, and bilingual copy. A snapshot establishes the research cutoff. New evidence is appended through a reviewed change and correction notes remain visible.'],
      ['Limits', 'A mapping is not certification. A control marked proven is proven only for the stated evidence obligation, not for every implementation or threat. Unknown or unavailable evidence remains unknown.'],
    ],
  },
  tr: {
    title: 'SEC kanıtı editoryal yargıdan nasıl ayırır',
    intro: 'SEC statik, sürümlenmiş bir araştırma aracıdır. Sistem taramaz, secret saklamaz, uyum sonucu vermez veya güvenlik incelemesinin yerini almaz.',
    sections: [
      ['Kanıt sınıfları', 'Kanıt kayıtları atıf verilen yetkili kaynaklarla doğrudan desteklenir. Sentez kayıtları açık bir editoryal yargıyla birden çok kaynağı bağlar. İzleme sinyalleri henüz yerleşik kabul edilemeyecek önemli yönleri gösterir.'],
      ['Güvence sözlüğü', 'Beyan, kontrolün dokümante edildiği; uygulandı, teknik sınırın devrede olduğu; gözlendi, etkinin operasyonel kanıtta görüldüğü; kanıtlandı ise odaklı doğrulama testinin amaçlanan sonucu gösterdiği anlamına gelir. Bu seviyeler ortalamaya dönüştürülmez.'],
      ['Editoryal döngü', 'Her kayıt inceleme tarihi, kaynak kimlikleri ve iki dilli metin taşır. Snapshot araştırma kesimini belirler. Yeni kanıt incelenmiş değişiklikle eklenir ve düzeltme notları görünür kalır.'],
      ['Sınırlar', 'Eşleme sertifikasyon değildir. Kanıtlandı işaretli kontrol yalnız belirtilen kanıt yükümlülüğü için kanıtlanmıştır; her uygulama veya tehdit için değil. Bilinmeyen ya da erişilemeyen kanıt bilinmeyen kalır.'],
    ],
  },
} as const

export function MethodologyPage({ locale }: { locale: Locale }) {
  const copy = content[locale]
  return <section className="methodology-page"><header className="page-intro"><p className="eyebrow">SEC / 07 / METHODOLOGY</p><h1>{copy.title}</h1><p>{copy.intro}</p></header><div className="methodology-sections">{copy.sections.map(([title, body], index) => <section key={title}><span className="section-number">0{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div></section>)}</div><section className="source-register"><h2>{locale === 'en' ? 'Source register' : 'Kaynak kaydı'}</h2><ul>{catalog.sources.map((source) => <li key={source.id}><SourceLink source={source} locale={locale} /><small>{source.checkedAt}</small></li>)}</ul></section></section>
}
