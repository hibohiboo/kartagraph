import { Application, ApplicationWindowSize } from '@/store/reducers/apps'
import React, { MouseEventHandler, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Icon } from '../icon/Icon'
import { SnapScreen } from './SnapScreen'

export const ToolBar: React.FC<{
  app: string
  icon: string
  name: string
  size: ApplicationWindowSize
  float?: undefined
  invert?: undefined
  noinvert?: undefined
  bg?: undefined
}> = (props) => {
  const dispatch = useDispatch()
  const [snap, setSnap] = useState(false)

  const openSnap = () => {
    setSnap(true)
  }

  const closeSnap = () => {
    setSnap(false)
  }

  const toolClick: MouseEventHandler<HTMLDivElement> = () => {
    dispatch({
      type: props.app,
      payload: 'front',
    })
  }

  let posP = [0, 0],
    dimP = [0, 0],
    posM = [0, 0],
    wnapp = {} as HTMLElement | null,
    op = 0,
    vec = [0, 0]

  const toolDrag: MouseEventHandler<HTMLDivElement> = (e) => {
    e = e || window.event
    e.preventDefault()
    posM = [e.clientY, e.clientX]
    if (!e.target) return
    const target = e.target as HTMLElement & {
      dataset: { op: string; vec: string }
    }
    op = Number(target.dataset.op)

    if (op == 0) {
      wnapp = target.parentElement && target.parentElement.parentElement
    } else {
      vec = target.dataset.vec.split(',').map((s) => Number(s))
      wnapp =
        target.parentElement &&
        target.parentElement.parentElement &&
        target.parentElement.parentElement.parentElement
    }

    if (wnapp) {
      wnapp.classList.add('notrans')
      wnapp.classList.add('z9900')
      posP = [wnapp.offsetTop, wnapp.offsetLeft]
      dimP = [
        parseFloat(getComputedStyle(wnapp).height.replaceAll('px', '')),
        parseFloat(getComputedStyle(wnapp).width.replaceAll('px', '')),
      ]
    }

    document.onmouseup = closeDrag
    document.onmousemove = eleDrag
  }

  const setPos = (pos0: number, pos1: number) => {
    if (!wnapp) return
    wnapp.style.top = pos0 + 'px'
    wnapp.style.left = pos1 + 'px'
  }

  const setDim = (dim0: number, dim1: number) => {
    if (!wnapp) return
    wnapp.style.height = dim0 + 'px'
    wnapp.style.width = dim1 + 'px'
  }

  const eleDrag = (e: MouseEvent) => {
    e = e || window.event
    e.preventDefault()

    var pos0 = posP[0] + e.clientY - posM[0],
      pos1 = posP[1] + e.clientX - posM[1],
      dim0 = dimP[0] + vec[0] * (e.clientY - posM[0]),
      dim1 = dimP[1] + vec[1] * (e.clientX - posM[1])

    if (op == 0) setPos(pos0, pos1)
    else {
      dim0 = Math.max(dim0, 320)
      dim1 = Math.max(dim1, 320)
      pos0 = posP[0] + Math.min(vec[0], 0) * (dim0 - dimP[0])
      pos1 = posP[1] + Math.min(vec[1], 0) * (dim1 - dimP[1])
      setPos(pos0, pos1)
      setDim(dim0, dim1)
    }
  }

  const closeDrag = () => {
    document.onmouseup = null
    document.onmousemove = null
    if (!wnapp) return

    wnapp.classList.remove('notrans')
    wnapp.classList.remove('z9900')

    const action = {
      type: props.app,
      payload: 'resize',
      dim: {
        width: getComputedStyle(wnapp).width,
        height: getComputedStyle(wnapp).height,
        top: getComputedStyle(wnapp).top,
        left: getComputedStyle(wnapp).left,
      },
    }

    dispatch(action)
  }

  return (
    <>
      <div
        className="toolbar"
        data-float={props.float != null}
        data-noinvert={props.noinvert != null}
        style={{
          background: props.bg,
        }}
      >
        <div
          className="topInfo flex flex-grow items-center"
          data-float={props.float != null}
          onClick={toolClick}
          onMouseDown={toolDrag}
          data-op="0"
        >
          <Icon src={props.icon} width={14} />
          <div
            className="appFullName text-xss"
            data-white={props.invert != null}
          >
            {props.name}
          </div>
        </div>
        <div className="actbtns flex items-center">
          <Icon
            invert={props.invert}
            click={props.app}
            payload="mnmz"
            pr
            src="minimize"
            ui
            width={8}
          />
          <div
            className="snapbox h-full"
            data-hv={snap}
            onMouseOver={openSnap}
            onMouseLeave={closeSnap}
          >
            <Icon
              invert={props.invert}
              click={props.app}
              ui
              pr
              width={8}
              payload="mxmz"
              src={props.size == 'full' ? 'maximize' : 'maxmin'}
            />
            <SnapScreen
              invert={props.invert}
              app={props.app}
              snap={snap}
              closeSnap={closeSnap}
            />
            {/* {snap?<SnapScreen app={props.app} closeSnap={closeSnap}/>:null} */}
          </div>
          <Icon
            className="closeBtn"
            invert={props.invert}
            click={props.app}
            payload="close"
            pr
            src="close"
            ui
            width={8}
          />
        </div>
      </div>
      <div className="resizecont topone">
        <div className="flex">
          <div
            className="conrsz cursor-nw"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="-1,-1"
          ></div>
          <div
            className="edgrsz cursor-n wdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="-1,0"
          ></div>
        </div>
      </div>
      <div className="resizecont leftone">
        <div className="h-full">
          <div
            className="edgrsz cursor-w hdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="0,-1"
          ></div>
        </div>
      </div>
      <div className="resizecont rightone">
        <div className="h-full">
          <div
            className="edgrsz cursor-w hdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="0,1"
          ></div>
        </div>
      </div>
      <div className="resizecont bottomone">
        <div className="flex">
          <div
            className="conrsz cursor-ne"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="1,-1"
          ></div>
          <div
            className="edgrsz cursor-n wdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="1,0"
          ></div>
          <div
            className="conrsz cursor-nw"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="1,1"
          ></div>
        </div>
      </div>
    </>
  )
}
