import { commandType } from '../constants'
import { Command, ScenarioStartLinkCommand } from '../types'

export const isScenarioStartLinkCommand = (
  command: Command,
): command is ScenarioStartLinkCommand =>
  command.type === commandType.ScenarioStartLinkCommand
