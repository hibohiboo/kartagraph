import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { CharactersState } from '../slices/characters'

const stateSelector: (state: RootState) => CharactersState = (
  state: RootState,
) => state.characters
export const charactersSelector = createSelector(stateSelector, (c) => {
  return c.characters
})
