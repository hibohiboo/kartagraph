import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Top from '@/components/pages/Top'
import Game from '@/components/pages/Game'
import PrivacyPolicy from '@/components/pages/PrivacyPolicy'
import Agreement from '@/components/pages/Agreement'
import { useAppSelector } from '@/store/hooks'
import { isUserAuthenticatedSelector } from '@/store/selectors/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from '@/store/slices/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/domain/firebase'
import Loading from '@/components/atoms/Loading'

function App() {
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
  if (authenticated === undefined) {
    return <Loading />
  }
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/game" element={<Game />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/agreement" element={<Agreement />} />
    </Routes>
  )
}

export default App
