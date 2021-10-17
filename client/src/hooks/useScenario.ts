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

const { setCommands, nextCommand, toWait } = scenarioSlice.actions
const useScenario = () => {
  const command = useAppSelector(commandSelector)
  const status = useAppSelector(eventStatusSelector)
  const dispatch = useDispatch()
  const readFirstScenario = React.useCallback(async () => {
    dispatch(setCommands(commandQueue))
  }, [dispatch])
  const next = React.useCallback(async () => {
    dispatch(nextCommand())
    console.log('test', command)
  }, [dispatch])

  useEffect(() => {
    if (command?.type === commandType.Text) {
      dispatch(toWait())
    }
  }, [command])

  useEffect(() => {
    readFirstScenario()
  }, [])

  return { command, next }
}

export default useScenario
