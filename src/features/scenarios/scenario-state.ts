import { ScenarioIdSchema, type ScenarioId } from '../../content/schema'

export function readScenarioId(value: string | null): ScenarioId {
  const parsed = ScenarioIdSchema.safeParse(value)
  return parsed.success ? parsed.data : 'coding-agent'
}
