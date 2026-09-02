import { describe, expect, it } from 'vitest'
import { catalog } from './catalog'
import { getControlsForThreat, getScenarioTrace, getThreatsForNode, localize } from './selectors'

describe('SEC catalog selectors', () => {
  it('localizes paired content without locale drift', () => {
    expect(localize({ en: 'Authorization', tr: 'Yetkilendirme' }, 'tr')).toBe('Yetkilendirme')
  })

  it('maps identity threats to concrete controls', () => {
    const threat = getThreatsForNode(catalog, 'identity').find((item) => item.id === 'identity-privilege-abuse')

    expect(threat).toBeDefined()
    expect(getControlsForThreat(catalog, threat!.id).map((control) => control.id)).toEqual(
      expect.arrayContaining(['first-class-agent-identity', 'short-lived-credentials']),
    )
  })

  it('builds the remote MCP trace in trust-path order', () => {
    const trace = getScenarioTrace(catalog, 'remote-mcp')

    expect(trace.map((step) => step.node.id)).toEqual([
      'agent',
      'identity',
      'credential',
      'authorization',
      'tool',
      'data',
      'action',
      'audit',
      'incident',
    ])
    expect(trace.find((step) => step.node.id === 'authorization')?.controlIds).toContain('audience-restricted-tokens')
  })
})
