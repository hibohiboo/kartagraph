import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import React from 'react'
export const BootScreen: React.FC<{ dir: number }> = (props) => {
  // const dispatch = useDispatch();
  // const wall = useSelector((state) => state.wallpaper);
  const blackoutTIme = 1000
  const [blackout, setBlackOut] = useState(false)

  useEffect(() => {
    if (props.dir < 0) {
      setTimeout(() => {
        console.log('blackout')
        setBlackOut(true)
      }, blackoutTIme)
    }
  }, [props.dir])

  // useEffect(() => {
  //   if (props.dir < 0) {
  //     if (blackout) {
  //       if (wall.act == "restart") {
  //       setTimeout(() => {
  //         setBlackOut(false)
  //         setTimeout(() => {
  //           dispatch({ type: 'WALLBOOTED' })
  //         }, blackoutTIme)
  //       }, 500)
  //       }
  //     }
  //   }
  // }, [blackout])
  return (
    <div className="bootscreen">
      <div className={blackout ? 'hidden' : ''}>
        <div>起動中...</div>
        <div className="mt-48" id="loader">
          <svg
            className="progressRing"
            height={48}
            width={48}
            viewBox="0 0 16 16"
          >
            <circle cx="8px" cy="8px" r="7px"></circle>
          </svg>
        </div>
      </div>
    </div>
  )
}
