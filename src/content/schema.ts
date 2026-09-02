import { z } from 'zod'

export const LocaleSchema = z.enum(['en', 'tr'])
export type Locale = z.infer<typeof LocaleSchema>

export const LocaleTextSchema = z.object({
  en: z.string().trim().min(1),
  tr: z.string().trim().min(1),
})
export type LocaleText = z.infer<typeof LocaleTextSchema>

const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
const IdSchema = z.string().regex(/^[a-z0-9-]+$/)

export const trustNodeIds = [
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
] as const

export const TrustNodeIdSchema = z.enum(trustNodeIds)
export type TrustNodeId = z.infer<typeof TrustNodeIdSchema>

export const AssuranceLevelSchema = z.enum(['declared', 'enforced', 'observed', 'proven'])
export type AssuranceLevel = z.infer<typeof AssuranceLevelSchema>

export const EvidenceKindSchema = z.enum(['evidence', 'synthesis', 'watch-signal'])
export type EvidenceKind = z.infer<typeof EvidenceKindSchema>

export const ControlTypeSchema = z.enum(['prevent', 'detect', 'contain', 'recover'])
export type ControlType = z.infer<typeof ControlTypeSchema>

const SourceSchema = z.object({
  id: IdSchema,
  title: z.string().trim().min(1),
  publisher: z.string().trim().min(1),
  url: z.string().url(),
  publishedAt: DateSchema.nullable(),
  checkedAt: DateSchema,
  kind: z.enum(['official-publication', 'official-documentation', 'official-framework', 'official-regulation']),
  access: z.enum(['available', 'unavailable', 'superseded']),
  summary: LocaleTextSchema,
})
export type Source = z.infer<typeof SourceSchema>

const ClaimSchema = z.object({
  id: IdSchema,
  kind: EvidenceKindSchema,
  text: LocaleTextSchema,
  sourceIds: z.array(IdSchema),
  subjectIds: z.array(IdSchema),
  reviewedAt: DateSchema,
  confidence: LocaleTextSchema,
})
export type Claim = z.infer<typeof ClaimSchema>

const TrustNodeSchema = z.object({
  id: TrustNodeIdSchema,
  order: z.number().int().min(1).max(11),
  title: LocaleTextSchema,
  purpose: LocaleTextSchema,
  boundary: LocaleTextSchema,
  actors: z.array(LocaleTextSchema).min(1),
  assets: z.array(LocaleTextSchema).min(1),
  assumptions: z.array(LocaleTextSchema).min(1),
  requiredEvidence: z.array(LocaleTextSchema).min(1),
  threatIds: z.array(IdSchema),
  controlIds: z.array(IdSchema),
  sourceIds: z.array(IdSchema).min(1),
  reviewedAt: DateSchema,
})
export type TrustNode = z.infer<typeof TrustNodeSchema>

const ThreatSchema = z.object({
  id: IdSchema,
  family: z.enum([
    'instruction-goal-integrity',
    'identity-credential-abuse',
    'authorization-delegation-abuse',
    'tool-action-misuse',
    'data-context-memory',
    'runtime-sandbox-execution',
    'agentic-supply-chain',
    'audit-accountability',
    'human-agent-trust',
    'containment-recovery',
  ]),
  title: LocaleTextSchema,
  summary: LocaleTextSchema,
  prerequisites: LocaleTextSchema,
  mechanism: LocaleTextSchema,
  consequence: LocaleTextSchema,
  observableSignals: z.array(LocaleTextSchema).min(1),
  nodeIds: z.array(TrustNodeIdSchema).min(1),
  controlIds: z.array(IdSchema).min(1),
  claimIds: z.array(IdSchema).min(1),
  sourceIds: z.array(IdSchema).min(1),
  reviewedAt: DateSchema,
})
export type Threat = z.infer<typeof ThreatSchema>

const ControlSchema = z.object({
  id: IdSchema,
  title: LocaleTextSchema,
  objective: LocaleTextSchema,
  type: ControlTypeSchema,
  assurance: AssuranceLevelSchema,
  nodeIds: z.array(TrustNodeIdSchema).min(1),
  threatIds: z.array(IdSchema).min(1),
  implementation: LocaleTextSchema,
  tradeoffs: LocaleTextSchema,
  requiredEvidence: z.array(LocaleTextSchema).min(1),
  claimIds: z.array(IdSchema).min(1),
  sourceIds: z.array(IdSchema).min(1),
  reviewedAt: DateSchema,
})
export type Control = z.infer<typeof ControlSchema>

export const ScenarioIdSchema = z.enum(['coding-agent', 'remote-mcp', 'enterprise-research', 'local-autonomous'])
export type ScenarioId = z.infer<typeof ScenarioIdSchema>

const ScenarioSchema = z.object({
  id: ScenarioIdSchema,
  title: LocaleTextSchema,
  narrative: LocaleTextSchema,
  actors: z.array(LocaleTextSchema).min(1),
  systemBoundary: LocaleTextSchema,
  authorityChain: LocaleTextSchema,
  credentialConstraints: LocaleTextSchema,
  tools: z.array(LocaleTextSchema).min(1),
  data: z.array(LocaleTextSchema).min(1),
  actions: z.array(LocaleTextSchema).min(1),
  humanDecisions: z.array(LocaleTextSchema).min(1),
  expectedEvidence: z.array(LocaleTextSchema).min(1),
  experiment: LocaleTextSchema,
  nodeIds: z.array(TrustNodeIdSchema).min(1),
  threatIds: z.array(IdSchema).min(1),
  controlIds: z.array(IdSchema).min(1),
  sourceIds: z.array(IdSchema).min(1),
  reviewedAt: DateSchema,
})
export type Scenario = z.infer<typeof ScenarioSchema>

const FrameworkMappingSchema = z.object({
  id: IdSchema,
  framework: z.string().trim().min(1),
  version: z.string().trim().min(1),
  referenceId: z.string().trim().min(1),
  entityType: z.enum(['threat', 'control', 'trust-node']),
  entityIds: z.array(IdSchema).min(1),
  mappingType: z.enum(['direct', 'partial', 'synthesis']),
  rationale: LocaleTextSchema,
  sourceIds: z.array(IdSchema).min(1),
  reviewedAt: DateSchema,
})
export type FrameworkMapping = z.infer<typeof FrameworkMappingSchema>

const ResearchSnapshotSchema = z.object({
  id: IdSchema,
  cutoffDate: DateSchema,
  headline: LocaleTextSchema,
  summary: LocaleTextSchema,
  mostImportantClaimId: IdSchema,
  watchSignalClaimIds: z.array(IdSchema),
  correctionNotes: z.array(LocaleTextSchema),
})
export type ResearchSnapshot = z.infer<typeof ResearchSnapshotSchema>

const RawCatalogSchema = z
  .object({
    sources: z.array(SourceSchema).min(1),
    claims: z.array(ClaimSchema).min(1),
    trustNodes: z.array(TrustNodeSchema).length(11),
    threats: z.array(ThreatSchema).min(1),
    controls: z.array(ControlSchema).min(1),
    scenarios: z.array(ScenarioSchema).length(4),
    frameworkMappings: z.array(FrameworkMappingSchema).min(1),
    snapshots: z.array(ResearchSnapshotSchema).min(1),
  })
  .superRefine((value, context) => {
    const uniqueIds = (kind: string, ids: string[]) => {
      const seen = new Set<string>()
      for (const id of ids) {
        if (seen.has(id)) context.addIssue({ code: 'custom', message: `Duplicate ${kind} id: ${id}` })
        seen.add(id)
      }
      return seen
    }

    const sourceIds = uniqueIds('source', value.sources.map((item) => item.id))
    const claimIds = uniqueIds('claim', value.claims.map((item) => item.id))
    const nodeIds = uniqueIds('trust node', value.trustNodes.map((item) => item.id))
    const threatIds = uniqueIds('threat', value.threats.map((item) => item.id))
    const controlIds = uniqueIds('control', value.controls.map((item) => item.id))
    uniqueIds('scenario', value.scenarios.map((item) => item.id))
    uniqueIds('framework mapping', value.frameworkMappings.map((item) => item.id))
    uniqueIds('snapshot', value.snapshots.map((item) => item.id))

    const requireIds = (owner: string, ids: string[], known: Set<string>) => {
      for (const id of ids) {
        if (!known.has(id)) context.addIssue({ code: 'custom', message: `${owner} references unknown id: ${id}` })
      }
    }

    const actualOrder = value.trustNodes.map((node) => node.id)
    if (actualOrder.some((id, index) => id !== trustNodeIds[index])) {
      context.addIssue({ code: 'custom', message: `Trust path must use exact order: ${trustNodeIds.join(' -> ')}` })
    }
    for (const [index, node] of value.trustNodes.entries()) {
      if (node.order !== index + 1) context.addIssue({ code: 'custom', message: `Trust node ${node.id} has invalid order ${node.order}` })
    }

    for (const claim of value.claims) {
      if (claim.kind === 'evidence' && claim.sourceIds.length === 0) {
        context.addIssue({ code: 'custom', message: `Evidence claim ${claim.id} requires at least one source` })
      }
      requireIds(`Claim ${claim.id}`, claim.sourceIds, sourceIds)
    }

    for (const node of value.trustNodes) {
      requireIds(`Trust node ${node.id}`, node.threatIds, threatIds)
      requireIds(`Trust node ${node.id}`, node.controlIds, controlIds)
      requireIds(`Trust node ${node.id}`, node.sourceIds, sourceIds)
    }

    for (const threat of value.threats) {
      requireIds(`Threat ${threat.id}`, threat.nodeIds, nodeIds)
      requireIds(`Threat ${threat.id}`, threat.controlIds, controlIds)
      requireIds(`Threat ${threat.id}`, threat.claimIds, claimIds)
      requireIds(`Threat ${threat.id}`, threat.sourceIds, sourceIds)
    }

    for (const control of value.controls) {
      requireIds(`Control ${control.id}`, control.nodeIds, nodeIds)
      requireIds(`Control ${control.id}`, control.threatIds, threatIds)
      requireIds(`Control ${control.id}`, control.claimIds, claimIds)
      requireIds(`Control ${control.id}`, control.sourceIds, sourceIds)
    }

    for (const scenario of value.scenarios) {
      requireIds(`Scenario ${scenario.id}`, scenario.nodeIds, nodeIds)
      requireIds(`Scenario ${scenario.id}`, scenario.threatIds, threatIds)
      requireIds(`Scenario ${scenario.id}`, scenario.controlIds, controlIds)
      requireIds(`Scenario ${scenario.id}`, scenario.sourceIds, sourceIds)
      const scenarioOrder = scenario.nodeIds.map((id) => trustNodeIds.indexOf(id))
      if (scenarioOrder.some((order, index) => index > 0 && order <= scenarioOrder[index - 1])) {
        context.addIssue({ code: 'custom', message: `Scenario ${scenario.id} nodes are not in trust-path order` })
      }
    }

    for (const mapping of value.frameworkMappings) {
      const known = mapping.entityType === 'threat' ? threatIds : mapping.entityType === 'control' ? controlIds : nodeIds
      requireIds(`Framework mapping ${mapping.id}`, mapping.entityIds, known)
      requireIds(`Framework mapping ${mapping.id}`, mapping.sourceIds, sourceIds)
    }

    for (const snapshot of value.snapshots) {
      requireIds(`Snapshot ${snapshot.id}`, [snapshot.mostImportantClaimId, ...snapshot.watchSignalClaimIds], claimIds)
    }

    const cutoff = value.snapshots.reduce((latest, snapshot) => (snapshot.cutoffDate > latest ? snapshot.cutoffDate : latest), '')
    const reviewedRecords = [...value.claims, ...value.trustNodes, ...value.threats, ...value.controls, ...value.scenarios, ...value.frameworkMappings]
    for (const record of reviewedRecords) {
      if (record.reviewedAt > cutoff) context.addIssue({ code: 'custom', message: `${record.id} review date is after snapshot cutoff ${cutoff}` })
    }
  })

export type RawCatalog = z.input<typeof RawCatalogSchema>

export type Catalog = z.output<typeof RawCatalogSchema> & {
  sourcesById: Map<string, Source>
  claimsById: Map<string, Claim>
  trustNodesById: Map<TrustNodeId, TrustNode>
  threatsById: Map<string, Threat>
  controlsById: Map<string, Control>
  scenariosById: Map<ScenarioId, Scenario>
}

export function parseCatalog(input: unknown): Catalog {
  const value = RawCatalogSchema.parse(input)
  return {
    ...value,
    sourcesById: new Map(value.sources.map((item) => [item.id, item])),
    claimsById: new Map(value.claims.map((item) => [item.id, item])),
    trustNodesById: new Map(value.trustNodes.map((item) => [item.id, item])),
    threatsById: new Map(value.threats.map((item) => [item.id, item])),
    controlsById: new Map(value.controls.map((item) => [item.id, item])),
    scenariosById: new Map(value.scenarios.map((item) => [item.id, item])),
  }
}
