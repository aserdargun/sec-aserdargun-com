import sources from '../../content/sources.json'
import claims from '../../content/claims.json'
import trustNodes from '../../content/trust-nodes.json'
import threats from '../../content/threats.json'
import controls from '../../content/controls.json'
import scenarios from '../../content/scenarios.json'
import frameworkMappings from '../../content/framework-mappings.json'
import snapshot from '../../content/snapshots/2026-09-02.json'
import september4Snapshot from '../../content/snapshots/2026-09-04.json'
import september21Snapshot from '../../content/snapshots/2026-09-21.json'
import october2Snapshot from '../../content/snapshots/2026-10-02.json'
import october4Snapshot from '../../content/snapshots/2026-10-04.json'
import october5Snapshot from '../../content/snapshots/2026-10-05.json'
import october7Snapshot from '../../content/snapshots/2026-10-07.json'
import september9Snapshot from '../../content/snapshots/2026-10-09.json'
import october10Snapshot from '../../content/snapshots/2026-10-10.json'
import october11Snapshot from '../../content/snapshots/2026-10-11.json'
import october12Snapshot from '../../content/snapshots/2026-10-12.json'
import october13Snapshot from '../../content/snapshots/2026-10-13.json'
import october15Snapshot from '../../content/snapshots/2026-10-15.json'
import october16Snapshot from '../../content/snapshots/2026-10-16.json'
import october17Snapshot from '../../content/snapshots/2026-10-17.json'
import october18Snapshot from '../../content/snapshots/2026-10-18.json'
import october19Snapshot from '../../content/snapshots/2026-10-19.json'
import october20Snapshot from '../../content/snapshots/2026-10-20.json'
import currentSnapshot from '../../content/snapshots/2026-10-21.json'
import october23Snapshot from '../../content/snapshots/2026-10-23.json'
import october24Snapshot from '../../content/snapshots/2026-10-24.json'
import october25Snapshot from '../../content/snapshots/2026-10-25.json'
import october27Snapshot from '../../content/snapshots/2026-10-27.json'
import { parseCatalog, type RawCatalog } from './schema'

export const rawCatalog = {
  sources,
  claims,
  trustNodes,
  threats,
  controls,
  scenarios,
  frameworkMappings,
  snapshots: [snapshot, september4Snapshot, september21Snapshot, october2Snapshot, october4Snapshot, october5Snapshot, october7Snapshot, september9Snapshot, october10Snapshot, october11Snapshot, october12Snapshot, october13Snapshot, october15Snapshot, october16Snapshot, october17Snapshot, october18Snapshot, october19Snapshot, october20Snapshot, currentSnapshot, october23Snapshot, october24Snapshot, october25Snapshot, october27Snapshot],
} as RawCatalog

export const catalog = parseCatalog(rawCatalog)
export const latestSnapshot = catalog.snapshots.reduce((latest, candidate) => (
  candidate.cutoffDate > latest.cutoffDate ? candidate : latest
))
