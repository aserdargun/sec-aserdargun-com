import { TrustNodeIdSchema, type TrustNodeId } from '../../content/schema'

export function readTrustNode(value: string | null): TrustNodeId {
  const parsed = TrustNodeIdSchema.safeParse(value)
  return parsed.success ? parsed.data : 'model'
}
