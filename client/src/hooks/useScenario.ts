import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/hooks'
import {
  commandSelector,
  eventStatusSelector,
} from '@/store/selectors/scenario'
import { scenarioSlice } from '@/store/slices/scenario'
import { commandQueue } from '@/domain/scenario/firstScenario'
import { commandType } from '@/domain/command/constants'
import { eventStatus } from '@/domain/scenario/constants'
import { screenSlice } from '@/store/slices'
import { isLinkCommand } from '@/domain/command'
import { linksSelector, textsSelector } from '@/store/selectors/screen'

const { setCommands, nextCommand, toWait } = scenarioSlice.actions
const { addLink } = screenSlice.actions
const useScenario = () => {
  const command = useAppSelector(commandSelector)
  const status = useAppSelector(eventStatusSelector)
  const texts = useAppSelector(textsSelector)
  const links = useAppSelector(linksSelector)
  const dispatch = useDispatch()
  const readFirstScenario = React.useCallback(async () => {
    dispatch(setCommands(commandQueue))
  }, [dispatch])
  const next = async () => {
    if (status !== eventStatus.ClickWait) {
      return
    }
    dispatch(nextCommand())
  }

  useEffect(() => {
    if (status === eventStatus.Executing) {
      dispatch(nextCommand())
    }
  }, [command])

  useEffect(() => {
    if (!command) return
    if (isLinkCommand(command)) {
      dispatch(addLink(command))
    }
  }, [command])

  useEffect(() => {
    readFirstScenario()
  }, [])

  return { command, texts, links, status, next }
}

export default useScenario
