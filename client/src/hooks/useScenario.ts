import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/hooks'
import {
  commandSelector,
  eventStatusSelector,
} from '@/store/selectors/scenario'
import { scenario } from '@/domain/scenario/firstScenario'
import { eventStatus } from '@/domain/scenario/constants'
import { screenSlice, scenarioSlice } from '@/store/slices'
import { linksSelector, textsSelector } from '@/store/selectors/screen'
import { useEffectCommand } from './scenario'

const { setScenario, nextCommand, jump } = scenarioSlice.actions
const { resetLinks, resetTexts } = screenSlice.actions
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

  useEffectCommand(command, dispatch)
  useEffect(() => {
    readFirstScenario()
  }, [])

  return { command, texts, links, status, next, linkClickHandler }
}

export default useScenario
