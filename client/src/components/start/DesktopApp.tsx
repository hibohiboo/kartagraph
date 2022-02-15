import { useAppSelector } from '@/store/hooks'
import { deskAppsSelector } from '@/store/selectors/desktop'
import { Icon } from '@/utils/general/icon/Icon'
import { useDispatch } from 'react-redux'
import React from 'react'
export const DesktopApp: React.FC = () => {
  const deskApps = useAppSelector(deskAppsSelector)
  const dispatch = useDispatch()

  return (
    <div className="desktopCont">
      {!deskApps.hide &&
        deskApps.apps.map((app, i) => {
          return (
            <div key={i} className="dskApp">
              <Icon
                click={app.action}
                className="dskIcon prtclk"
                src={app.icon}
                payload={'full'}
                pr
                width={Math.round(deskApps.size * 36)}
                menu="app"
              />
              <div className="appName">{app.name}</div>
            </div>
          )
        })}
    </div>
  )
}
