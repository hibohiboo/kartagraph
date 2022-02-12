import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'
const stateSelector = (state: RootState) => state.apps
export const notepadSelector = createSelector(stateSelector, (c) => {
  return c.notepad
})
export const appSelector = createSelector(stateSelector, (c) => {
  return c
})
