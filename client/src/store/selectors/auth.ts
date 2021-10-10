import { createSelector } from 'reselect'
import { RootState } from '../index'
import { AuthState } from '../slices/auth'

export const authSelector: (state: RootState) => AuthState = (
  state: RootState,
) => state.auth

export const uidSelector = createSelector(authSelector, (auth) => {
  return auth.uid
})

// export const emailSelector = createSelector(authSelector, (auth) => {
//   return auth.email
// })

export const isUserAuthenticatedSelector = createSelector(
  authSelector,
  (auth) => {
    return auth.authenticated
  },
)

export const errorSelector = createSelector(authSelector, (auth) => {
  return auth.error
})
