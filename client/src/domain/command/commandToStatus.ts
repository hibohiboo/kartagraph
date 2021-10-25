import { isCaptionCommand, isLinkCommand, isTextCommand } from '.'
import { eventStatus } from '../scenario/constants'
import { Command } from './types'

export const commandToStatus = (command: Command) => {
  if (isTextCommand(command)) {
    return eventStatus.ClickWait
  }
  if (isLinkCommand(command) || isCaptionCommand(command)) {
    return eventStatus.Executing
  }

  throw new Error('unknown command')
}
