import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ParagraphHistory } from '@/domain/paragraph/types'
import { Tag } from '@/domain/user/types'

interface State {
  tags: Tag[]
  histories: ParagraphHistory[]
  moveCount: number
  faceUrl: string | null
}

const USER_DATA_TAGS = 'cartagraph-gamebook-tags'
const tags = localStorage.getItem(USER_DATA_TAGS)
const PARAGRAPH_HISTORY = 'cartagraph-gamebook-paragraph-history'
const paragraphHistory = localStorage.getItem(PARAGRAPH_HISTORY)
const MOVE_COUNT = 'cartagraph-move-count'
const moveCount = localStorage.getItem(MOVE_COUNT)
const FACE_URL = 'cartagraph-url-face'
const faceUrl = localStorage.getItem(FACE_URL)

const initialState: State = {
  tags: tags ? JSON.parse(tags) : [],
  histories: paragraphHistory ? JSON.parse(paragraphHistory) : [],
  moveCount: moveCount ? Number(moveCount) : 0,
  faceUrl,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addTags(state, action: PayloadAction<Tag[]>) {
      state.tags.push(...action.payload.filter((x) => !!x))
      localStorage.setItem(USER_DATA_TAGS, JSON.stringify(state.tags))
    },
    removeTags(state, action: PayloadAction<Tag[]>) {
      state.tags = state.tags.filter((tag) => !action.payload.includes(tag))
      localStorage.setItem(USER_DATA_TAGS, JSON.stringify(state.tags))
    },
    moveParagraph(state, action: PayloadAction<ParagraphHistory>) {
      state.histories.push(action.payload)
      state.moveCount++
      localStorage.setItem(PARAGRAPH_HISTORY, JSON.stringify(state.histories))
      localStorage.setItem(MOVE_COUNT, JSON.stringify(state.moveCount))
    },
    resetParagraphHistory(state) {
      state.histories = []
      localStorage.setItem(PARAGRAPH_HISTORY, JSON.stringify(state.histories))
    },
    setFace(state, action: PayloadAction<string | null>) {
      state.faceUrl = action.payload
      if (!state.faceUrl) {
        localStorage.removeItem(FACE_URL)
        return
      }
      localStorage.setItem(FACE_URL, state.faceUrl)
    },
  },
  extraReducers: (builder) => {},
})
