import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../templates/Base'
import Footer from '../molecules/Footer'
import { defaultBgColor } from '@/constants/cssConst'
import useScenario from '@/hooks/useScenario'
import { isTextCommand } from '@/domain/command'
import Loading from '../atoms/Loading'
import TextViewer from '../organisms/game/TextViewer'

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

const Game: React.FC = ({ children }) => {
  const { command, next } = useScenario()
  if (!command) {
    return <Loading />
  }
  if (isTextCommand(command)) {
    return (
      <Base
        header={<Header />}
        footer={<Footer />}
        content={<TextViewer command={command} next={next} />}
      />
    )
  }
  return (
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
}
export default Game
