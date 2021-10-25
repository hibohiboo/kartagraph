import { Command } from '../command/types'

export interface Scenario {
  name: string
  description: string
  // decks: EventDeck[]
  requireTags: string[]
  excludeTags: string[]
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
