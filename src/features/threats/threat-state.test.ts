import { describe, expect, it } from 'vitest'
import { readThreatFilters } from './threat-state'

describe('threat filter URLs', () => {
  it('ignores invalid filters so the displayed selection agrees with results', () => {
    expect(readThreatFilters(new URLSearchParams('node=bogus&family=bogus'))).toEqual({ node: null, family: null })
  })
  it('retains valid combined filters', () => {
    expect(readThreatFilters(new URLSearchParams('node=identity&family=identity-credential-abuse'))).toEqual({ node: 'identity', family: 'identity-credential-abuse' })
  })
})
