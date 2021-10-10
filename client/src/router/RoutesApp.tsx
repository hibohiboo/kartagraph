import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '@/components/pages/About'
import Top from '@/components/pages/Top'
import Game from '@/components/pages/Game'

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Top />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}

export default App
