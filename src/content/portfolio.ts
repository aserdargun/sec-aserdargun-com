import { z } from 'zod'
import { LocaleTextSchema } from './schema'
import { latestSnapshot } from './catalog'
import portfolioLock from './portfolio.lock.json'

// Public identities come from the canonical manifest in the sibling aserdargun-com
// repo (data/living-system.json), projected into the committed
// ./portfolio.lock.json. Refresh it with `npm run sync:portfolio`; the tests in
// ./portfolio.sync.test.ts fail if this module and the lock disagree.
//
// `reviewedAt` used to be a date literal that had to be hand-bumped in lockstep
// with the newest content snapshot, so any edit broke the build for a reason the
// source did not show. It is now projected from the manifest, and the
// `date <= latestSnapshot.cutoffDate` refinement below is the single place where
// the coupling is enforced: when upstream verification moves past the cutoff, the
// correct action is a new snapshot, not a string edit.
const portfolioLockSchema = z.object({
  source: z.literal('aserdargun-com/data/living-system.json'),
  reviewedAt: z.iso.date(),
  applications: z.array(z.object({ code: z.string(), address: z.url({ protocol: /^https$/ }) })),
}).parse(portfolioLock)

function portfolioAddress(code: string): string {
  const application = portfolioLockSchema.applications.find((entry) => entry.code === code)
  if (!application) {
    throw new Error(`Application code "${code}" is not in src/content/portfolio.lock.json. Run \`npm run sync:portfolio\`.`)
  }
  return application.address
}

// Editorial learning relationships, not deployed integrations or security findings.
export const portfolio = z.object({
  reviewedAt: z.iso.date().refine((date) => date <= latestSnapshot.cutoffDate, 'Portfolio review exceeds the research cutoff'),
  sourceUrl: z.url(),
  title: LocaleTextSchema,
  summary: LocaleTextSchema,
  boundary: LocaleTextSchema,
  relationships: z.array(z.object({
    code: z.enum(['HNS', 'CTX', 'EVL', 'LCL', 'CLD']),
    url: z.url({ protocol: /^https$/ }),
    purpose: LocaleTextSchema,
  })),
}).parse({
  reviewedAt: portfolioLockSchema.reviewedAt,
  sourceUrl: 'https://aserdargun.com/journey/',
  title: { en: 'Security in the learning system', tr: 'Öğrenme sisteminde güvenlik' },
  summary: {
    en: 'HNS examines how agent systems are built. SEC examines the evidence needed to trust a bounded action. Context and evaluation inform that review before local or cloud deployment choices.',
    tr: 'HNS, ajan sistemlerinin nasıl kurulduğunu inceler. SEC, sınırlandırılmış bir eyleme güvenmek için gereken kanıtı inceler. Bağlam ve değerlendirme, yerel veya bulut dağıtım tercihlerinden önce bu incelemeyi besler.',
  },
  boundary: {
    en: 'These links describe learning relationships. SEC does not connect to these applications, inspect their systems, approve deployments, or assign a portfolio trust score.',
    tr: 'Bu bağlantılar öğrenme ilişkilerini gösterir. SEC bu uygulamalara bağlanmaz, sistemlerini incelemez, dağıtım onayı vermez veya portföye güven puanı atamaz.',
  },
  relationships: [
    { code: 'HNS', url: portfolioAddress('hns'), purpose: { en: 'Bring agent architecture, tool boundaries, and delegation assumptions into a security review.', tr: 'Ajan mimarisini, araç sınırlarını ve yetki devri varsayımlarını güvenlik incelemesine taşı.' } },
    { code: 'CTX', url: portfolioAddress('ctx'), purpose: { en: 'Examine context provenance and memory boundaries alongside SEC’s data and instruction controls.', tr: 'Bağlam kökenini ve bellek sınırlarını, SEC’nin veri ve talimat kontrolleriyle birlikte incele.' } },
    { code: 'EVL', url: portfolioAddress('evl'), purpose: { en: 'Turn control requirements into evaluation questions; keep each result tied to its test and scope.', tr: 'Kontrol gereksinimlerini değerlendirme sorularına dönüştür; her sonucu testine ve kapsamına bağlı tut.' } },
    { code: 'LCL', url: portfolioAddress('lcl'), purpose: { en: 'Carry identity, filesystem isolation, credential, and recovery requirements into local deployment decisions.', tr: 'Kimlik, dosya sistemi yalıtımı, kimlik bilgisi ve kurtarma gereksinimlerini yerel dağıtım kararlarına taşı.' } },
    { code: 'CLD', url: portfolioAddress('cld'), purpose: { en: 'Carry resource authorization, service boundaries, audit, and revocation requirements into cloud decisions.', tr: 'Kaynak yetkilendirmesi, hizmet sınırları, denetim ve iptal gereksinimlerini bulut kararlarına taşı.' } },
  ],
})
