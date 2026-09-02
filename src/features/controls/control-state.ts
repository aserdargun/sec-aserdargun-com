import { AssuranceLevelSchema, ControlTypeSchema, TrustNodeIdSchema, type AssuranceLevel, type ControlType, type TrustNodeId } from '../../content/schema'

export type ControlFilters = { node: TrustNodeId | null; type: ControlType | null; assurance: AssuranceLevel | null }

export function readControlFilters(searchParams: URLSearchParams): ControlFilters {
  const node = TrustNodeIdSchema.safeParse(searchParams.get('node'))
  const type = ControlTypeSchema.safeParse(searchParams.get('controlType'))
  const assurance = AssuranceLevelSchema.safeParse(searchParams.get('assurance'))
  return { node: node.success ? node.data : null, type: type.success ? type.data : null, assurance: assurance.success ? assurance.data : null }
}
