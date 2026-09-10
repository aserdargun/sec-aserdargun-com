import { ThreatFamilySchema, TrustNodeIdSchema, type ThreatFamily, type TrustNodeId } from '../../content/schema'

export type ThreatFilters = { node: TrustNodeId | null; family: ThreatFamily | null }

export function readThreatFilters(searchParams: URLSearchParams): ThreatFilters {
  const node = TrustNodeIdSchema.safeParse(searchParams.get('node'))
  const family = ThreatFamilySchema.safeParse(searchParams.get('family'))
  return {
    node: node.success ? node.data : null,
    family: family.success ? family.data : null,
  }
}
