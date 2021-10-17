import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import localStorageMiddleware from './middleware/localStorageMiddleware'
import { authSlice, charactersSlice } from './slices'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    characters: charactersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
