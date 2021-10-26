import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LinkCommand, TextCommand } from '@/domain/command/types'

export interface ScreenState {
  texts: TextCommand[]
  links: LinkCommand[]
}

export const initialState: ScreenState = {
  texts: [],
  links: [],
}

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    resetTexts: (state) => {
      state.texts = []
    },
    resetLinks: (state) => {
      state.links = []
    },
    setText: (state, { payload }: PayloadAction<TextCommand>) => {
      state.texts = [payload]
    },
    addText: (state, { payload }: PayloadAction<TextCommand>) => {
      state.texts.push(payload)
    },
    addLink: (state, { payload }: PayloadAction<LinkCommand>) => {
      state.links.push(payload)
    },
  },
})
