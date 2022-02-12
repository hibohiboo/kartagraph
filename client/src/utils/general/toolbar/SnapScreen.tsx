import { useAppSelector } from '@/store/hooks'
import {
  Application,
  ApplicationWindowSize,
  ApplicatioonResizeAction,
} from '@/store/reducers/apps'
import { laysSelector } from '@/store/selectors/global'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const SnapScreen: React.FC<{
  app: string
  snap: boolean
  invert: undefined
  closeSnap: () => void
}> = (props) => {
  const dispatch = useDispatch()
  const [delay, setDelay] = useState(false)
  const lays = useAppSelector(laysSelector)

  const clickDispatch: MouseEventHandler<HTMLDivElement> = (event) => {
    const dataset = (event.target as any).dataset as {
      action: Application
      payload: ApplicationWindowSize
      dim: string
    }
    var action: ApplicatioonResizeAction = {
      type: dataset.action,
      payload: dataset.payload,
      meta: JSON.parse(dataset.dim),
    }

    if (action.meta && action.type) {
      dispatch(action)
      props.closeSnap()
    }
  }

  useEffect(() => {
    if (delay && props.snap) {
      setTimeout(() => {
        setDelay(false)
      }, 500)
    } else if (props.snap) {
      setDelay(true)
    }
  })

  return props.snap || delay ? (
    <div className="snapcont mdShad" data-dark={props.invert != null}>
      {lays.map((x) => {
        return (
          <div className="snapLay">
            {x.map((y) => (
              <div
                className="snapper"
                style={{
                  borderTopLeftRadius: (y.br % 2) * 4,
                  borderTopRightRadius: (y.br % 3) * 4,
                  borderBottomRightRadius: (y.br % 5) * 4,
                  borderBottomLeftRadius: (y.br % 7) * 4,
                }}
                onClick={clickDispatch}
                data-dim={JSON.stringify(y.dim)}
                data-action={props.app}
                data-payload="resize"
              ></div>
            ))}
          </div>
        )
      })}
    </div>
  ) : null
}
