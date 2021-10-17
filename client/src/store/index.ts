import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import localStorageMiddleware from './middleware/localStorageMiddleware'
import { authSlice, charactersSlice, scenarioSlice } from './slices'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    characters: charactersSlice.reducer,
    scenario: scenarioSlice.reducer,
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
