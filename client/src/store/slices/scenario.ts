import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Command } from '@/domain/command/types'
import { eventStatus, EventStatus } from '@/domain/scenario/constants'
import { commandToStatus } from '@/domain/command'
import { commandType } from '@/domain/command/constants'
import { Scenario, ScenarioEvent } from '@/domain/scenario/types'

export interface ScenarioState {
  commandQueue: Command[]
  currentCommand: number | undefined
  events: Record<string, ScenarioEvent>
  currentStatus: EventStatus
}

export const initialState: ScenarioState = {
  commandQueue: [],
  currentCommand: undefined,
  currentStatus: eventStatus.SelectWait,
  events: {},
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
    setScenario: (state, action: PayloadAction<Scenario>) => {
      const { events, firstEventId } = action.payload
      state.events = events
      state.commandQueue = events[firstEventId].commands
      state.currentCommand = 0
      state.currentStatus = commandToStatus(state.commandQueue[0])
    },
    nextCommand: (state) => {
      if (state.currentCommand == null) {
        throw Error('currentCommandがundefined')
      }
      if (state.currentCommand === state.commandQueue.length - 1) {
        state.commandQueue = [{ type: commandType.SelectWait }]
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
    jump: (state, action: PayloadAction<string>) => {
      state.commandQueue = state.events[action.payload].commands
      state.currentCommand = 0
      state.currentStatus = commandToStatus(state.commandQueue[0])
    },
  },
})
