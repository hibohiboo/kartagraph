import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Command } from '@/domain/command/types'
import { eventStatus, EventStatus } from '@/domain/scenario/constants'

export interface ScenarioState {
  commandQueue: Command[]
  currentCommand: number | undefined
  currentStatus: EventStatus
}

export const initialState: ScenarioState = {
  commandQueue: [],
  currentCommand: undefined,
  currentStatus: eventStatus.Wait,
}

export const scenarioSlice = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    setCommands: (state, action: PayloadAction<Command[]>) => {
      state.commandQueue = action.payload
      state.currentCommand = 0
      state.currentStatus = eventStatus.Wait
    },
    nextCommand: (state) => {
      if (state.currentCommand == null) {
        throw Error('currentCommandがundefined')
      }
      state.currentStatus = eventStatus.Executing
      if (state.currentCommand === state.commandQueue.length - 1) {
        state.currentCommand = 0
        return
      }
      state.currentCommand++
    },
    toWait: (state) => {
      state.currentStatus = eventStatus.Wait
    },
  },
})
