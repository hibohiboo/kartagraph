import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { CharactersState } from '../slices/characters'

const stateSelector = (state: RootState) => state.characters
export const charactersSelector = createSelector(stateSelector, (c) => {
  return c.characters
})
export const characterNameSelector = createSelector(stateSelector, (c) => {
  if (c.characters.length === 0) return 'ななし'
  return c.characters[0].name
})
