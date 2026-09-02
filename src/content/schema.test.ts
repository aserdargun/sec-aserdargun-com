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
    invalid.controls[0].reviewedAt = '2026-09-03'

    expect(() => parseCatalog(invalid)).toThrow(/after snapshot cutoff/i)
  })
})
