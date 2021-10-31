import { ScenarioInfo } from '../scenario/types'
import { Tag } from '../tag/types'
import type { CommandType, IconType } from './constants'

export interface Command {
  type: CommandType
}

export interface TextCommand extends Command {
  label: string
}
export interface IconTextCommand extends TextCommand {
  icon: IconType
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

export interface GetTagcommand extends Command {
  tag: Tag
}
export interface ScenarioStartLinkCommand extends LinkCommand {
  info: ScenarioInfo
}
