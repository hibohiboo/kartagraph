import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Command } from '@/domain/command/types'
import { eventStatus, EventStatus } from '@/domain/scenario/constants'
import { commandToStatus } from '@/domain/command'
import { commandType } from '@/domain/command/constants'

export interface ScenarioState {
  commandQueue: Command[]
  currentCommand: number | undefined
  currentStatus: EventStatus
}

export const initialState: ScenarioState = {
  commandQueue: [],
  currentCommand: undefined,
  currentStatus: eventStatus.SelectWait,
}

export const scenarioSlice = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    setCommands: (state, action: PayloadAction<Command[]>) => {
      state.commandQueue = action.payload
      state.currentCommand = 0
      state.currentStatus = commandToStatus(state.commandQueue[0])
    },
    nextCommand: (state) => {
      if (state.currentCommand == null) {
        throw Error('currentCommandがundefined')
      }
      if (state.currentCommand === state.commandQueue.length - 1) {
        state.commandQueue = [
          { name: commandType.SelectWait, type: commandType.SelectWait },
        ]
        state.currentCommand = 0
        state.currentStatus = eventStatus.SelectWait
        return
      }
      state.currentCommand++
      state.currentStatus = commandToStatus(
        state.commandQueue[state.currentCommand],
      )
    },
    toWait: (state) => {
      state.currentStatus = eventStatus.SelectWait
    },
  },
})
