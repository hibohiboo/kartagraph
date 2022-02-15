import { allApps, ApplicationAction, ApplicationIcon } from '@/utils/apps'
import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit'
import { Dim } from './globals'
export type ApplicationWindowSize =
  | 'full'
  | 'close'
  | 'mxmz'
  | 'togg'
  | 'mnmz'
  | 'resize'
  | 'front'
  | 'mini'
  | 'cstm'
interface ApplicationProperty {
  name: string
  icon: string
  type: string
  action: string
  size: ApplicationWindowSize
  hide: boolean
  max: null | boolean
  z: number
  dim?: Dim
}

type StateKey = ApplicationIcon | 'hz'
type State = {
  [K in StateKey]: K extends 'hz' ? number : ApplicationProperty
}

const actionParamMap = new Map<ApplicationAction, ApplicationIcon>()
const defState = allApps.reduce(
  (previousValue, currentValue) => {
    actionParamMap.set(
      currentValue.action as ApplicationAction,
      currentValue.icon as ApplicationIcon,
    )
    return {
      ...previousValue,
      [currentValue.icon]: {
        ...currentValue,
        size: 'full',
        hide: true,
        max: null,
        z: 0,
      },
    }
  },
  { hz: 2 },
) as State

const newState = (
  payload: ApplicationWindowSize,
  nowHz: number,
  nowObj: ApplicationProperty,
  dim?: Dim,
): { hz: number; obj: ApplicationProperty } => {
  console.log('pyaloayd', payload)
  if (payload === 'full') {
    return {
      hz: nowHz + 1,
      obj: {
        ...nowObj,
        size: 'full',
        hide: false,
        max: true,
        z: nowHz + 1,
      },
    }
  }
  if (payload === 'close') {
    return {
      hz: nowHz - 1,
      obj: {
        ...nowObj,
        size: 'full',
        hide: true,
        max: null,
        z: -1,
      },
    }
  }
  if (payload === 'mxmz') {
    return {
      hz: nowHz + 1,
      obj: {
        ...nowObj,
        size: nowObj.size !== 'full' ? 'full' : 'mini',
        hide: false,
        max: true,
        z: nowHz + 1,
      },
    }
  }
  if (payload === 'togg') {
    const hide = false
    const max = !nowObj.max
    const z = nowObj.max ? -1 : nowHz + 1
    const obj = {
      ...nowObj,
      hide,
      max,
      z,
    }
    if (!nowObj.max) {
      return { hz: nowHz + 1, obj }
    }
    if (nowObj.z !== nowHz) {
      return { hz: nowHz, obj }
    }
    return { hz: nowHz - 1, obj }
  }
  if (payload === 'mnmz') {
    return {
      hz: nowHz === nowObj.z ? nowHz - 1 : nowHz,
      obj: {
        ...nowObj,
        hide: false,
        max: false,
        z: -1,
      },
    }
  }
  if (payload === 'front') {
    const hz = nowHz !== nowObj.z ? nowHz + 1 : nowHz
    return {
      hz,
      obj: {
        ...nowObj,
        hide: false,
        max: true,
        z: hz,
      },
    }
  }
  if (payload === 'resize') {
    return {
      hz: nowHz !== nowObj.z ? nowHz + 1 : nowHz,
      obj: {
        ...nowObj,
        size: 'cstm',
        hide: false,
        max: true,
        z: nowHz,
        dim,
      },
    }
  }

  return {
    hz: nowHz,
    obj: nowObj,
  }
}

export type ApplicatioonResizeAction = PayloadAction<
  ApplicationWindowSize,
  ApplicationAction,
  Dim | undefined
>

const isApplicationAction = (
  action: AnyAction,
): action is ApplicatioonResizeAction => {
  return ['NOTEPAD'].includes(action.type)
}

const appReducer = createReducer(defState, (builder) => {
  builder.addMatcher(isApplicationAction, (state, action) => {
    const key = actionParamMap.get(action.type)
    if (!key) return
    const { hz, obj } = newState(
      action.payload,
      state.hz,
      state[key],
      action.meta,
    )
    state.hz = hz
    state[key] = obj
    state[key].hide = false
  })
})
export default appReducer
