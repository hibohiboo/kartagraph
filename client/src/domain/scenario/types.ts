import { Command } from '../command/types'

export interface ScenarioInfo {
  name: string
  description: string
  requireTags: string[]
  excludeTags: string[]
}
export interface Scenario {
  id: string
  name: string
  // decks: EventDeck[]
  events: Record<string, ScenarioEvent>
  firstEventId: string
}
// export interface EventDeck {
//   name: string
//   events: ScenarioEvent[]
// }
export interface ScenarioEvent {
  name: string
  commands: Command[]
}
