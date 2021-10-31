import { Command } from '@/domain/command/types'
import { Dispatch, useEffect } from 'react'
import {
  isCaptionCommand,
  isGetTagCommand,
  isJumpCommand,
  isLinkCommand,
} from '@/domain/command'
import { screenSlice, charactersSlice, scenarioSlice } from '@/store/slices'
const { jump } = scenarioSlice.actions
const { addLink, setText } = screenSlice.actions
const { addTag } = charactersSlice.actions
export const useEffectCommand = (
  command: Command | undefined,
  dispatch: Dispatch<any>,
) => {
  useEffect(() => {
    if (!command) return
    if (isLinkCommand(command)) {
      dispatch(addLink(command))
      return
    }
    if (isCaptionCommand(command)) {
      dispatch(setText(command))
      return
    }
    if (isJumpCommand(command)) {
      dispatch(jump(command.nextEvent))
      return
    }
    if (isGetTagCommand(command)) {
      dispatch(addTag(command.tag))
      return
    }
  }, [command])
}
