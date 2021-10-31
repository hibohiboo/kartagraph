import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  LinkCommand,
  ScenarioStartLinkCommand,
  TextCommand,
} from '@/domain/command/types'

export interface ScreenState {
  texts: TextCommand[]
  links: LinkCommand[]
  scenalioLinks: ScenarioStartLinkCommand[]
}

export const initialState: ScreenState = {
  texts: [],
  links: [],
  scenalioLinks: [],
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
      state.scenalioLinks = []
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
    addScenarioLink: (
      state,
      { payload }: PayloadAction<ScenarioStartLinkCommand>,
    ) => {
      state.scenalioLinks.push(payload)
    },
  },
})
