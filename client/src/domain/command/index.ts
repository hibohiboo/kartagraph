import { commandType } from './constants'
import { Command, LinkCommand, SelectWaitCommand, TextCommand } from './types'
export * from './commandToStatus'

export const isTextCommand = (command: Command): command is TextCommand =>
  command.type === commandType.Text
export const isLinkCommand = (command: Command): command is LinkCommand =>
  command.type === commandType.Link
export const isSelectWaitCommand = (
  command: Command,
): command is SelectWaitCommand => command.type === commandType.SelectWait

export const commandFactory = (command: Command) => {
  if (isTextCommand(command)) {
    return command
  }
  throw Error('知らないコマンド')
}
