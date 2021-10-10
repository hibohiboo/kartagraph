import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../templates/Base'
import Footer from '../molecules/Footer'

const Header: React.FC<{}> = () => <div>header</div>

const Game: React.FC = ({ children }) => (
  <Base header={<Header />} footer={<Footer />} content={<div>main</div>} />
)

export default Game
