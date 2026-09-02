import type { Catalog, Locale, LocaleText, ScenarioId, Threat, Control, TrustNodeId } from './schema'

export function localize(value: LocaleText, locale: Locale): string {
  return value[locale]
}

export function getThreatsForNode(catalog: Catalog, nodeId: TrustNodeId): Threat[] {
  return catalog.threats.filter((threat) => threat.nodeIds.includes(nodeId))
}

export function getControlsForThreat(catalog: Catalog, threatId: string): Control[] {
  return catalog.controls.filter((control) => control.threatIds.includes(threatId))
}

export function getControlsForNode(catalog: Catalog, nodeId: TrustNodeId): Control[] {
  return catalog.controls.filter((control) => control.nodeIds.includes(nodeId))
}

export type ScenarioTraceStep = {
  node: Catalog['trustNodes'][number]
  threatIds: string[]
  controlIds: string[]
}

export function getScenarioTrace(catalog: Catalog, scenarioId: ScenarioId): ScenarioTraceStep[] {
  const scenario = catalog.scenariosById.get(scenarioId)
  if (!scenario) return []
  return scenario.nodeIds.map((nodeId) => ({
    node: catalog.trustNodesById.get(nodeId)!,
    threatIds: scenario.threatIds.filter((threatId) => catalog.threatsById.get(threatId)?.nodeIds.includes(nodeId)),
    controlIds: scenario.controlIds.filter((controlId) => catalog.controlsById.get(controlId)?.nodeIds.includes(nodeId)),
  }))
}
