import { useAppSelector } from '@/store/hooks'
import {
  ApplicationWindowSize,
  ApplicatioonResizeAction,
} from '@/store/reducers/apps'
import { laysSelector } from '@/store/selectors/global'
import { ApplicationAction } from '@/utils/apps'
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
      action: ApplicationAction
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
                  borderTopLeftRadius: y.br % 2 === 0 ? 4 : 0,
                  borderTopRightRadius: y.br % 3 === 0 ? 4 : 0,
                  borderBottomRightRadius: y.br % 5 === 0 ? 4 : 0,
                  borderBottomLeftRadius: y.br % 7 === 0 ? 4 : 0,
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
