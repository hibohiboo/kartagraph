import { Middleware } from '@reduxjs/toolkit'
import { RootState } from '..'

const localStorageMiddleware: Middleware<{}, RootState> = (store) => (next) => (
  action,
) => {
  const prevJwt = store.getState().auth.user.jwt
  next(action)
  const nextJwt = store.getState().auth.user.jwt
  if (prevJwt === nextJwt) return
  if (nextJwt) {
    localStorage.setItem('jwt', nextJwt)
    return
  }
  localStorage.removeItem('jwt')
}
export default localStorageMiddleware
