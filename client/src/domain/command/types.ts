import { CommandType } from './constants'

export interface Command {
  type: CommandType
}

export interface TextCommand extends Command {
  value: string
}

type EventId = string
type EventDeckId = string
type ScenarioId = SVGAnimatedString
export interface SelectWaitCommand extends Command {}
export interface JumpCommand extends Command {
  nextEvent: EventId
}

export interface LinkCommand extends JumpCommand {
  label: string
  // nextEventDeck?: EventDeckId
  // nextScenario: ScenarioId
}
