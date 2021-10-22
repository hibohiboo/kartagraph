import { isTextCommand } from '.'
import { eventStatus } from '../scenario/constants'
import { Command } from './types'

export const commandToStatus = (command: Command) => {
  if (isTextCommand(command)) {
    return eventStatus.ClickWait
  }
  throw new Error('unknown command')
}
