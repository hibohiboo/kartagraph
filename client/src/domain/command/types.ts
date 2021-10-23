import { CommandType } from './constants'

export interface Command {
  name: string
  type: CommandType
}

export interface TextCommand extends Command {
  value: string
}

type EventId = string
type EventDeckId = string
type ScenarioId = string
export interface LinkCommand extends Command {
  label: string
  nextEvent: EventId
  nextEventDeck?: EventDeckId
  nextScenario: ScenarioId
}
export interface SelectWaitCommand extends Command {}
