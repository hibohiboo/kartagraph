import { Background, BootScreen } from '@/containers/background'
import React from 'react'
import '../../styles/index.scss'
import * as Applications from '../../containers/applications'
import { DesktopApp } from '../start'
// import { useAppSelector } from '@/store/hooks'
// import { appSelector } from '@/store/selectors/apps'

const WindowShell: React.FC = ({ children }) => {
  // const apps = useAppSelector(appSelector)

  return (
    <div className="App">
      {false ? <BootScreen dir={-1} /> : null}
      <div className="appwrap">
        <Background />
        <div className="desktop">
          <DesktopApp />
          {Object.keys(Applications).map((key, idx) => {
            const WinApp = Applications[key as keyof typeof Applications]
            return <WinApp key={idx} />
          })}
          {/* {Object.keys(apps)
            .filter((x) => x != 'hz')
            .map((key) => apps[key as keyof typeof apps])
            .map((app) => {
              if (typeof app === 'number') return
              if (app.pwa) {
                var WinApp = Drafts[app.data.type]
                return <WinApp icon={app.icon} {...app.data} />
              }
            })} */}
        </div>
      </div>
    </div>
  )
}
export default WindowShell
