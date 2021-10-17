import React, { useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'
import { isUserAuthenticatedSelector } from '@/store/selectors/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from '@/store/slices/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/domain/firebase'

const useRouterApp = () => {
  const authenticated = useAppSelector(isUserAuthenticatedSelector)

  const dispatch = useDispatch()

  const refresh = React.useCallback(
    async (uid) => {
      const userData = {
        uid,
      }
      return dispatch(login(userData))
    },
    [dispatch],
  )
  useEffect(() => {
    const f = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          dispatch(login({}))
        }
        if (user && !authenticated) {
          return await refresh(user.uid)
        }
        if (!user && !authenticated) {
          dispatch(logout())
        }
      })
      // await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    }
    f()
  })
  console.log(authenticated)
  return { authenticated }
}

export default useRouterApp
