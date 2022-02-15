import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'
const stateSelector = (state: RootState) => state.desktop
export const deskAppsSelector = createSelector(stateSelector, (c) => {
  const arr = { ...c }
  const tmpApps = [...arr.apps]

  if (arr.sort == 'name') {
    tmpApps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
  } else if (arr.sort == 'size') {
    tmpApps.sort((a, b) => {
      const anm = a.name,
        bnm = b.name

      return anm[bnm.charCodeAt(0) % anm.length] >
        bnm[anm.charCodeAt(0) % bnm.length]
        ? 1
        : -1
    })
  } else if (arr.sort == 'date') {
    tmpApps.sort((a, b) => {
      const anm = a.name,
        bnm = b.name
      const anml = anm.length,
        bnml = bnm.length

      return anm[(bnml * 13) % anm.length] > bnm[(anml * 17) % bnm.length]
        ? 1
        : -1
    })
  }

  arr.apps = tmpApps
  return arr
})
