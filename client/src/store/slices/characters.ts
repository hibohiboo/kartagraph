import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character } from '@/domain/character/types'
import { initCharacters } from '@/domain/character/persistence/characters'
import { Tag } from '@/domain/tag/types'

export interface CharactersState {
  characters: Character[]
}

const initialState: CharactersState = {
  characters: initCharacters(),
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addNewCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload)
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      state.characters[0].tags.push(action.payload)
    },
  },
})
