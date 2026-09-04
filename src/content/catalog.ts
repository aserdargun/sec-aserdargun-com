import sources from '../../content/sources.json'
import claims from '../../content/claims.json'
import trustNodes from '../../content/trust-nodes.json'
import threats from '../../content/threats.json'
import controls from '../../content/controls.json'
import scenarios from '../../content/scenarios.json'
import frameworkMappings from '../../content/framework-mappings.json'
import snapshot from '../../content/snapshots/2026-09-02.json'
import currentSnapshot from '../../content/snapshots/2026-09-04.json'
import { parseCatalog, type RawCatalog } from './schema'

export const rawCatalog = {
  sources,
  claims,
  trustNodes,
  threats,
  controls,
  scenarios,
  frameworkMappings,
  snapshots: [snapshot, currentSnapshot],
} as RawCatalog

export const catalog = parseCatalog(rawCatalog)
export const latestSnapshot = catalog.snapshots.reduce((latest, candidate) => (
  candidate.cutoffDate > latest.cutoffDate ? candidate : latest
))
