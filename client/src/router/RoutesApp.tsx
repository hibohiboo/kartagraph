import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Top from '@/components/pages/Top'
import Game from '@/components/pages/Game'
import PrivacyPolicy from '@/components/pages/PrivacyPolicy'
import Agreement from '@/components/pages/Agreement'
import Loading from '@/components/atoms/Loading'
import useRouterApp from '@/hooks/useRouterApp'
import First from '@/components/pages/First'
//https://qiita.com/jonakp/items/5424bf89946269570496
import WindowShell from '@/components/pages/WindowShell'

function App() {
  const { authenticated } = useRouterApp()
  const navigate = useNavigate()

  if (authenticated === undefined) {
    return <Loading />
  }
  return (
    <Routes>
      <Route path="/" element={<WindowShell />} />
      <Route path="/scenario">
        <Route path=":id" element={<Game />} />
      </Route>
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/agreement" element={<Agreement />} />
      <Route path="/first/*" element={<First />} />
    </Routes>
  )
}

export default App
