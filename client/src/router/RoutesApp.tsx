import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '@/components/pages/About'
import Top from '@/components/pages/Top'
import SampleView from '@/components/pages/SampleView'

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Top />} />
      <Route path="/sample" element={<SampleView />} />
    </Routes>
  )
}

export default App
