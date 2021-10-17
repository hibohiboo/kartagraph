import { CommandType } from './constants'

export interface Command {
  name: string
  type: CommandType
}

export interface TextCommand extends Command {
  value: string
}
