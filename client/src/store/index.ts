import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import localStorageMiddleware from './middleware/localStorageMiddleware'
import appReducer from './reducers/apps'
import deskReducer from './reducers/desktop'
import globalReducer from './reducers/globals'
import {
  authSlice,
  charactersSlice,
  scenarioSlice,
  screenSlice,
} from './slices'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    characters: charactersSlice.reducer,
    scenario: scenarioSlice.reducer,
    screen: screenSlice.reducer,
    apps: appReducer,
    global: globalReducer,
    desktop: deskReducer,
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
