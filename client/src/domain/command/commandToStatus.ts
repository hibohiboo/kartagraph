import {
  isCaptionCommand,
  isGetTagCommand,
  isIconTextCommand,
  isJumpCommand,
  isLinkCommand,
  isTextCommand,
} from '.'
import { eventStatus } from '../scenario/constants'
import { Command } from './types'

export const commandToStatus = (command: Command) => {
  if (isTextCommand(command) || isIconTextCommand(command)) {
    return eventStatus.ClickWait
  }
  if (
    isLinkCommand(command) ||
    isCaptionCommand(command) ||
    isJumpCommand(command) ||
    isGetTagCommand(command)
  ) {
    return eventStatus.Executing
  }

  throw new Error('unknown command')
}