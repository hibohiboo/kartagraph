import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../templates/Base'
import Footer from '../molecules/Footer'
import { defaultBgColor } from '@/constants/cssConst'

const Header: React.FC<{}> = () => (
  <div
    style={{
      backgroundColor: defaultBgColor,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '20px',
    }}
  >
    現在のシナリオ
  </div>
)

const Game: React.FC = ({ children }) => (
  <Base
    header={<Header />}
    footer={<Footer />}
    content={
      <div
        style={{
          backgroundColor: defaultBgColor,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        準備はよいですか？
      </div>
    }
  />
)

export default Game
