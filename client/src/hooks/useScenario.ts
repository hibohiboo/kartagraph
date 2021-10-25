import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/hooks'
import {
  commandSelector,
  eventStatusSelector,
} from '@/store/selectors/scenario'
import { scenarioSlice } from '@/store/slices/scenario'
import { scenario } from '@/domain/scenario/firstScenario'
import { commandType } from '@/domain/command/constants'
import { eventStatus } from '@/domain/scenario/constants'
import { screenSlice } from '@/store/slices'
import { isCaptionCommand, isLinkCommand } from '@/domain/command'
import { linksSelector, textsSelector } from '@/store/selectors/screen'

const { setScenario, nextCommand, toWait, jump } = scenarioSlice.actions
const { addLink, setText, resetLinks, resetTexts } = screenSlice.actions

const useScenario = () => {
  const command = useAppSelector(commandSelector)
  const status = useAppSelector(eventStatusSelector)
  const texts = useAppSelector(textsSelector)
  const links = useAppSelector(linksSelector)
  const dispatch = useDispatch()

  const readFirstScenario = React.useCallback(async () => {
    dispatch(setScenario(scenario))
  }, [dispatch])
  const next = async () => {
    if (status !== eventStatus.ClickWait) {
      return
    }
    dispatch(nextCommand())
  }
  const linkClickHandler = async (id: string) => {
    dispatch(jump(id))
    dispatch(resetLinks())
    dispatch(resetTexts())
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
      return
    }
    if (isCaptionCommand(command)) {
      dispatch(setText(command))
      return
    }
  }, [command])

  useEffect(() => {
    readFirstScenario()
  }, [])

  return { command, texts, links, status, next, linkClickHandler }
}

export default useScenario
