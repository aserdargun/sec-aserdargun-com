import { catalog } from '../src/content/catalog'

const latestSnapshot = [...catalog.snapshots].sort((a, b) => b.cutoffDate.localeCompare(a.cutoffDate))[0]

console.log(
  `SEC catalog valid: ${catalog.trustNodes.length} trust nodes, ${catalog.threats.length} threats, ${catalog.controls.length} controls, ${catalog.scenarios.length} scenarios; cutoff ${latestSnapshot.cutoffDate}.`,
)
