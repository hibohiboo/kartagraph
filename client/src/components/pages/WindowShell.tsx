import { Background, BootScreen } from '@/containers/background'
import React from 'react'
import '../../styles/index.scss'
import * as Applications from '../../containers/applications'
const WindowShell: React.FC = ({ children }) => {
  return (
    <div className="App">
      {false ? <BootScreen dir={-1} /> : null}
      <div className="appwrap">
        <Background />
        <div className="desktop">
          {Object.keys(Applications).map((key, idx) => {
            const WinApp = Applications[key as keyof typeof Applications]
            return <WinApp key={idx} />
          })}
        </div>
      </div>
    </div>
  )
}
export default WindowShell
