import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { CSSProperties, MouseEventHandler, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as FaIcons from '@fortawesome/free-solid-svg-icons'
import * as FaRegIcons from '@fortawesome/free-regular-svg-icons'
import * as AllIcons from './icons'

export const Icon: React.FC<{
  ui?: true
  src?: string
  ext?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  pr?: true
  className?: string
  click?: string
  payload?: string
  menu?: string
  flip?: boolean
  invert?: 'true'
  rounded?: 'true'
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  color?: CSSProperties['color']
  margin?: CSSProperties['margin']
  reg?: true
  fafa?: keyof typeof FaIcons
  regFafa?: keyof typeof FaRegIcons
  icon?: keyof typeof AllIcons
  msi?: string
  open?: string
  active?: string
}> = (props) => {
  const dispatch = useDispatch()
  let src = `/img/icon/${props.ui != null ? 'ui/' : ''}${props.src}.png`
  if (props.src && (props.ext != null || props.src.includes('http'))) {
    src = props.src
  }

  const prtclk =
    props.src && (props.onClick != null || props.pr != null) ? 'prtclk' : ''

  const clickDispatch: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement
    const action = {
      type: target.dataset.action,
      payload: target.dataset.payload,
    }

    if (action.type) {
      dispatch(action)
    }
  }

  if (props.fafa != null) {
    return (
      <div
        className={`uicon prtclk ${props.className || ''}`}
        onClick={props.onClick || (props.click && clickDispatch) || undefined}
        data-action={props.click}
        data-payload={props.payload}
        data-menu={props.menu}
      >
        <FontAwesomeIcon
          data-flip={props.flip != null}
          data-invert={props.invert ?? 'false'}
          data-rounded={props.rounded ?? 'false'}
          style={{
            width: props.width,
            height: props.height || props.width,
            color: props.color,
            margin: props.margin,
          }}
          icon={
            (props.reg == null
              ? FaIcons[props.fafa]
              : FaRegIcons[props.regFafa!]) as any
          }
        />
      </div>
    )
  } else if (props.icon != null) {
    var CustomIcon = AllIcons[props.icon]
    return (
      <div
        className={`uicon prtclk ${props.className || ''}`}
        onClick={props.onClick || (props.click && clickDispatch) || undefined}
        data-action={props.click}
        data-payload={props.payload}
        data-menu={props.menu}
      >
        <CustomIcon
          data-flip={props.flip != null}
          data-invert={props.invert ?? 'false'}
          data-rounded={props.rounded ?? 'false'}
          style={{
            width: props.width,
            height: props.height || props.width,
            fill: props.color || undefined,
            margin: props.margin || undefined,
          }}
        />
      </div>
    )
  } else if (props.msi != null) {
    return (
      <div
        className={`uicon prtclk ${props.className || ''}`}
        onClick={props.onClick || (props.click && clickDispatch) || undefined}
        data-action={props.click}
        data-payload={props.payload}
        data-menu={props.menu}
      >
        <i
          className={'ms-Icon ms-Icon--' + props.msi}
          style={{
            fontSize: props.width || '16px',
            margin: props.margin || undefined,
          }}
          aria-hidden="true"
          data-flip={props.flip != null}
          data-invert={!!props.invert}
        ></i>
      </div>
    )
  } else {
    return (
      <div
        className={`uicon ${props.className || ''} ${prtclk}`}
        data-open={props.open}
        data-action={props.click}
        data-active={props.active}
        data-payload={props.payload}
        onClick={props.onClick || (props.pr && clickDispatch) || undefined}
        data-menu={props.menu}
        data-pr={props.pr}
      >
        <img
          width={props.width}
          height={props.height}
          data-action={props.click}
          data-payload={props.payload}
          data-click={props.click != null}
          onClick={props.click != null ? clickDispatch : undefined}
          data-flip={props.flip != null}
          data-invert={props.invert != null ? 'true' : 'false'}
          data-rounded={props.rounded != null ? 'true' : 'false'}
          src={src}
          style={{
            margin: props.margin || undefined,
          }}
          alt=""
        />
      </div>
    )
  }
}
