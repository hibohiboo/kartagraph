import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Command, LinkCommand, TextCommand } from '@/domain/command/types'
import { eventStatus, EventStatus } from '@/domain/scenario/constants'
import { commandToStatus } from '@/domain/command'

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
