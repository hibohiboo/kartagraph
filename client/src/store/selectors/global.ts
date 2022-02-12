import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'
const stateSelector = (state: RootState) => state.global
export const laysSelector = createSelector(stateSelector, (c) => {
  return c.lays
})
