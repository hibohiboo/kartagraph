import React from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Test from './Test'
import Top from './Top'

function App() {
  return (
    <Routes>
      <Route path="/about" element={<Test />} />
      <Route path="/" element={<Top />} />
    </Routes>
  )
}

export default App
