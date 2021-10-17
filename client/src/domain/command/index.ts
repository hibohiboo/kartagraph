import { commandType } from './constants'
import { Command, TextCommand } from './types'

export const isTextCommand = (command: Command): command is TextCommand =>
  command.type === commandType.Text

export const commandFactory = (command: Command) => {
  if (isTextCommand(command)) {
    return command
  }
  throw Error('知らないコマンド')
}
