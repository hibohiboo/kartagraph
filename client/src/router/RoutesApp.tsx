import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Top from '@/components/pages/Top'
import Game from '@/components/pages/Game'
import PrivacyPolicy from '@/components/pages/PrivacyPolicy'
import Agreement from '@/components/pages/Agreement'
import Loading from '@/components/atoms/Loading'
import useRouterApp from '@/hooks/useRouterApp'

function App() {
  const { authenticated } = useRouterApp()

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
