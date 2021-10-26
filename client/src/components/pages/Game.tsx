import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../templates/Base'
import Footer from '../molecules/Footer'
import { defaultBgColor } from '@/constants/cssConst'
import useScenario from '@/hooks/useScenario'
import {
  isIconTextCommand,
  isSelectWaitCommand,
  isTextCommand,
} from '@/domain/command'
import Loading from '../atoms/Loading'
import TextViewer from '../organisms/game/TextViewer'
import LinksViewer from '../organisms/game/LinksViewer'
import { eventStatus } from '@/domain/scenario/constants'
import IconTextViewer from '../organisms/game/IconTextViewer'

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

const Game: React.FC = () => {
  const {
    command,
    links,
    texts,
    status,
    next,
    linkClickHandler,
  } = useScenario()
  if (!command || status === eventStatus.Executing) {
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
  if (isIconTextCommand(command)) {
    return (
      <Base
        header={<Header />}
        footer={<Footer />}
        content={<IconTextViewer command={command} next={next} />}
      />
    )
  }
  if (isSelectWaitCommand(command)) {
    return (
      <Base
        header={<Header />}
        footer={<Footer />}
        content={
          <LinksViewer
            links={links}
            texts={texts}
            linkClickHandler={linkClickHandler}
          />
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
          <div>
            <div>
              <h3>コマンド</h3>
              {JSON.stringify(command)}
            </div>
            <div>
              <h3>リンク</h3>
              {JSON.stringify(links)}
            </div>
            <div>
              <h3>ステータス</h3>
              {JSON.stringify(status)}
            </div>
          </div>
        </div>
      }
    />
  )
}
export default Game
