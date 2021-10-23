import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { ScenarioState } from '../slices/scenario'
import { ScreenState } from '../slices/screen'

const stateSelector: (state: RootState) => ScreenState = (state: RootState) =>
  state.screen
export const textsSelector = createSelector(stateSelector, (c) => {
  return c.texts
})
export const linksSelector = createSelector(stateSelector, (c) => {
  return c.links
})
