import { TrustNodeIdSchema, type TrustNodeId } from '../../content/schema'

export type ThreatFilters = { node: TrustNodeId | null; family: string | null }

export function readThreatFilters(searchParams: URLSearchParams): ThreatFilters {
  const node = TrustNodeIdSchema.safeParse(searchParams.get('node'))
  return {
    node: node.success ? node.data : null,
    family: searchParams.get('family'),
  }
}
