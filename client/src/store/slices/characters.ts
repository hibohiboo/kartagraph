import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character } from '@/domain/character/types'

export interface CharactersState {
  characters: Character[]
}

const initialState: CharactersState = {
  characters: [],
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addNewCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload)
    },
  },
})
