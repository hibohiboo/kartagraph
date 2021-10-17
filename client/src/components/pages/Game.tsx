import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../templates/Base'
import Footer from '../molecules/Footer'
import { defaultBgColor } from '@/constants/cssConst'
import useScenario from '@/hooks/useScenario'
import { isTextCommand } from '@/domain/command'
import Loading from '../atoms/Loading'

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
  console.log('command', command)
  if (isTextCommand(command)) {
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
              whiteSpace: 'pre-wrap',
            }}
            onClick={next}
          >
            {command.value}
          </div>
        }
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
