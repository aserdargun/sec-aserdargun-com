import { describe, expect, it } from 'vitest'
import { rawCatalog } from './catalog'
import { parseCatalog, trustNodeIds } from './schema'

describe('SEC catalog schema', () => {
  it('requires the exact model-to-incident trust path order', () => {
    const catalog = parseCatalog(rawCatalog)

    expect(catalog.trustNodes.map((node) => node.id)).toEqual([
      'model',
      'agent',
      'identity',
      'credential',
      'authorization',
      'tool',
      'sandbox',
      'data',
      'action',
      'audit',
      'incident',
    ])
    expect(trustNodeIds).toHaveLength(11)
  })

  it('rejects an evidence claim with no source', () => {
    const invalid = structuredClone(rawCatalog)
    invalid.claims[0].sourceIds = []

    expect(() => parseCatalog(invalid)).toThrow(/evidence claim.*source/i)
  })

  it('rejects a dangling control reference from a threat', () => {
    const invalid = structuredClone(rawCatalog)
    invalid.threats[0].controlIds.push('missing-control')

    expect(() => parseCatalog(invalid)).toThrow(/missing-control/)
  })

  it('rejects a review date later than the current snapshot cutoff', () => {
    const invalid = structuredClone(rawCatalog)
    invalid.controls[0].reviewedAt = '2026-09-05'

    expect(() => parseCatalog(invalid)).toThrow(/after snapshot cutoff/i)
  })
})

describe('catalog evidence integrity', () => {
  it.each(['2026-02-30', '2026-13-01', 'not-a-date'])('rejects impossible review date %s', (date) => {
    const invalid = structuredClone(rawCatalog)
    invalid.controls[0].reviewedAt = date
    expect(() => parseCatalog(invalid)).toThrow()
  })

  it.each(['javascript:alert(1)', 'data:text/html,test', 'http://example.com'])('rejects non-HTTPS source %s', (url) => {
    const invalid = structuredClone(rawCatalog)
    invalid.sources[0].url = url
    expect(() => parseCatalog(invalid)).toThrow()
  })

  it('rejects an unknown claim subject', () => {
    const invalid = structuredClone(rawCatalog)
    invalid.claims[0].subjectIds.push('missing-subject')
    expect(() => parseCatalog(invalid)).toThrow(/missing-subject/)
  })

  it('rejects a source checked after the snapshot cutoff', () => {
    const invalid = structuredClone(rawCatalog)
    invalid.sources[0].checkedAt = '2026-09-05'
    expect(() => parseCatalog(invalid)).toThrow(/checked date is after snapshot cutoff/)
  })

  it('rejects a source checked before publication', () => {
    const invalid = structuredClone(rawCatalog)
    invalid.sources[0].publishedAt = '2026-09-05'
    expect(() => parseCatalog(invalid)).toThrow(/checked before publication/)
  })
})
