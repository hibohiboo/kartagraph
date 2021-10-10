import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '@/components/pages/About'
import Top from '@/components/pages/Top'
import Game from '@/components/pages/Game'
import PrivacyPolicy from '@/components/pages/PrivacyPolicy'
import Agreement from '@/components/pages/Agreement'

function App() {
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
