import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import { myFetch } from '@/domain/http/fetch'
import {
  deleteParagraph,
  getParagraph,
  upsertParagraph,
} from '@/domain/paragraph/repository'
import { ParagraphDbData } from '@/domain/paragraph/types'
import { Tag } from '@/domain/user/types'
import { userSlice } from './user'
import type { RootState } from '..'

interface State {
  status: 'Loading' | 'Loaded' | 'Undefined' | 'Error'
  paragraph?: ParagraphDbData
}

const initialState: State = {
  status: 'Loading',
  paragraph: undefined,
}

interface PayLoad {
  id: string
}

const uploadHistories = createAsyncThunk<void, undefined, { state: RootState }>(
  'uploadHistories',
  async (req, thunkAPI) => {
    if (import.meta.env.DEV) {
      return
    }
    if (thunkAPI.getState().user.moveCount % 3 === 0) {
      const state = thunkAPI.getState()

      await myFetch(
        `/v1/api/logs/paragraph-move/${format(new Date(), 'yyyy/MM/dd')}/${
          state.auth.uid
        }`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: state.auth.uid,
            histories: state.user.histories,
          }),
        },
      )
      thunkAPI.dispatch(userSlice.actions.resetParagraphHistory())
    }
  },
)

const uploadParagraph = createAsyncThunk<
  void,
  ParagraphDbData,
  { state: RootState }
>('uploadParagraph', async (req, thunkAPI) => {
  if (import.meta.env.DEV) {
    return
  }

  const state = thunkAPI.getState()
  if (!req) {
    return
  }
  await myFetch(`/v1/api/paragraphs/${state.auth.uid}/${req.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
})

export const getParagraphAction = createAsyncThunk<
  ParagraphDbData | undefined,
  PayLoad,
  { state: RootState }
>('getParagraph', async (req, thunkAPI) => {
  try {
    const response: ParagraphDbData | undefined = await getParagraph(req.id)
    if (!response) {
      return response
    }
    if (response.removeTags) {
      await thunkAPI.dispatch(userSlice.actions.removeTags(response.removeTags))
    }
    if (response.addTags) {
      await thunkAPI.dispatch(userSlice.actions.addTags(response.addTags))
    }

    await thunkAPI.dispatch(
      userSlice.actions.moveParagraph({
        ...response,
        text: undefined,
        timestamp: new Date().getTime(),
      }),
    )

    thunkAPI.dispatch(uploadHistories())

    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({})
  }
})
interface CreateParagraphActionArgs {
  id: string
  title: string
  text: string
  addTags: Tag[]
  removeTags: Tag[]
  links: { to: string; label: string }[]
  exLinks: ParagraphDbData['exLinks']
}
export const createParagraphAction = createAsyncThunk<
  ParagraphDbData,
  CreateParagraphActionArgs,
  { state: RootState } // dispatch(uploadParagraph の型を通すために必要
>('createParagraph', async (req, thunkAPI) => {
  const { auth } = thunkAPI.getState() as RootState
  if (!auth.uid) throw Error('uid is empty')
  const paragraph = { ...req, uid: auth.uid, createdAt: undefined }
  const response = await upsertParagraph(req.id, paragraph, auth.uid)
  thunkAPI.dispatch(uploadParagraph(response))
  return response
})

export const updateParagraphAction = createAsyncThunk<
  ParagraphDbData,
  CreateParagraphActionArgs,
  { state: RootState } // dispatch(uploadParagraph の型を通すために必要
>('updateParagraph', async (req, thunkAPI) => {
  const { auth, gamebook } = thunkAPI.getState() as RootState
  if (!auth.uid) throw Error('uid is empty')
  if (!gamebook.paragraph) throw Error('createdAt is empty')
  const paragraph = {
    ...req,
    uid: auth.uid,
    createdAt: gamebook.paragraph.createdAt,
    updatedAt: gamebook.paragraph.updatedAt,
  }
  const response = await upsertParagraph(req.id, paragraph, auth.uid)
  thunkAPI.dispatch(uploadParagraph(response))
  return response
})

export const deleteParagraphAction = createAsyncThunk<void, { id: string }>(
  'deleteParagraph',
  async (req, thunkAPI) => {
    const { auth, gamebook } = thunkAPI.getState() as RootState
    if (!auth.uid) throw Error('uid is empty')
    if (!gamebook.paragraph) throw Error('createdAt is empty')
    await deleteParagraph(req.id)
  },
)

export const gamebookSlice = createSlice({
  name: 'gamebook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getParagraphAction.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(getParagraphAction.fulfilled, (state, action) => {
      state.paragraph = action.payload
      state.status = action.payload ? 'Loaded' : 'Undefined'
    })
    builder.addCase(getParagraphAction.rejected, (state) => {
      state.status = 'Error'
      state.paragraph = undefined
    })
    builder.addCase(createParagraphAction.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(createParagraphAction.fulfilled, (state, action) => {
      state.paragraph = action.payload
      state.status = 'Loaded'
    })
    builder.addCase(createParagraphAction.rejected, (state) => {
      state.status = 'Error'
      state.paragraph = undefined
    })
    builder.addCase(updateParagraphAction.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(updateParagraphAction.fulfilled, (state, action) => {
      state.paragraph = action.payload
      state.status = 'Loaded'
    })
    builder.addCase(updateParagraphAction.rejected, (state) => {
      state.status = 'Error'
      state.paragraph = undefined
    })
    builder.addCase(deleteParagraphAction.pending, (state) => {
      state.status = 'Loading'
    })
    builder.addCase(deleteParagraphAction.fulfilled, (state) => {
      state.paragraph = undefined
      state.status = 'Undefined'
    })
    builder.addCase(deleteParagraphAction.rejected, (state) => {
      state.status = 'Error'
      state.paragraph = undefined
    })
  },
})
