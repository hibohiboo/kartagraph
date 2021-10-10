import React from 'react'

import { Link } from 'react-router-dom'

const Top: React.FC = ({ children }) => (
  <div>
    <div>
      <span>hellow</span>
      <Link to="/about">about</Link>
      <Link to="/game">game</Link>
    </div>
  </div>
)

export default Top
