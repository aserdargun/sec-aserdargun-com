/// <reference types="vite/client" />
import { describe, expect, it } from 'vitest'
import { latestSnapshot } from './catalog'
import { portfolio } from './portfolio'
import portfolioSource from './portfolio?raw'
import lock from './portfolio.lock.json'

// The canonical manifest lives in the sibling aserdargun-com repo
// (data/living-system.json). ./portfolio.lock.json is a committed projection of
// the fields src/content/portfolio.ts mirrors; refresh it with
// `npm run sync:portfolio`. CI has no network access, so this lock is the
// contract these assertions run against.
interface LockedApplication {
  code: string
  address: string
}

const locked = lock.applications as LockedApplication[]
const lockedByCode = new Map(locked.map((application) => [application.code, application]))

describe('SEC portfolio against the canonical portfolio lock', () => {
  it('stamps the lock with its canonical source', () => {
    expect(lock.source).toBe('aserdargun-com/data/living-system.json')
    expect(lock.reviewedAtSource).toBe('max(lastVerified) across the referenced codes')
  })

  it('derives every relationship url from the canonical manifest address', () => {
    expect(portfolio.relationships.map(({ code }) => code)).toEqual(['HNS', 'CTX', 'EVL', 'LCL', 'CLD'])
    for (const relationship of portfolio.relationships) {
      expect(
        relationship.url,
        `${relationship.code} url must equal the canonical manifest address`,
      ).toBe(lockedByCode.get(relationship.code.toLowerCase())?.address)
    }
  })

  it('keeps the lock free of anything but code and address', () => {
    for (const application of locked) {
      expect(Object.keys(application)).toEqual(['code', 'address'])
    }
  })

  it('derives reviewedAt from the lock instead of hand-maintaining a date literal', () => {
    expect(portfolio.reviewedAt).toBe(lock.reviewedAt)
  })

  it('keeps the review date no later than the active snapshot cutoff', () => {
    expect(portfolio.reviewedAt <= latestSnapshot.cutoffDate).toBe(true)
  })

  it('carries no bare reviewedAt date literal in the source', () => {
    // The footgun this replaces: a hand-bumped string that breaks the build when
    // the snapshot is not bumped with it, with no visible coupling.
    expect(portfolioSource).not.toMatch(/reviewedAt:\s*['"]\d{4}-\d{2}-\d{2}['"]/)
  })
})
