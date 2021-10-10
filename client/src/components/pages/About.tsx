import React from 'react'

import { Link } from 'react-router-dom'

const About: React.FC = ({ children }) => (
  <div>
    <div>
      <span>about</span>
      <Link to="/">top</Link>
    </div>
  </div>
)

export default About
