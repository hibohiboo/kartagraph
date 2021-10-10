import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth'
import { auth } from '@/domain/firebase'

export interface AuthState {
  // displayName?: string | null
  // email?: string | null
  uid?: string
  authenticated?: boolean
  error?: SerializedError
}

const initialState: AuthState = {
  // displayName: undefined,
  // email: undefined,
  uid: undefined,
  authenticated: undefined,
  error: undefined,
}

interface PayLoad {
  // displayName?: string | null
  // email?: string | null
  uid?: string
}

export const login = createAsyncThunk<AuthState, PayLoad>(
  'login',
  async (req, thunkAPI) => {
    try {
      if (req.uid == null) {
        const response = await signInAnonymously(auth)
        const uid = response.user?.uid
        // const displayName = response.user?.displayName
        // const email = response.user?.email
        return { uid } as PayLoad
      } else {
        // const displayName = req.displayName
        // const email = req.email
        // return { displayName, email } as PayLoad
        const uid = req.uid
        return { uid } as PayLoad
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    await auth.signOut()
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      // state.displayName = action.payload.displayName
      // state.email = action.payload.email
      state.uid = action.payload.uid
      state.authenticated = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.authenticated = false
      state.uid = initialState.uid
      // state.displayName = initialState.displayName
      // state.email = initialState.email
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error
    })
  },
})
