import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { ScenarioState } from '../slices/scenario'

const stateSelector: (state: RootState) => ScenarioState = (state: RootState) =>
  state.scenario
export const commandSelector = createSelector(stateSelector, (c) => {
  if (c.currentCommand === undefined) return undefined
  return c.commandQueue[c.currentCommand]
})
export const eventStatusSelector = createSelector(stateSelector, (c) => {
  return c.currentStatus
})
