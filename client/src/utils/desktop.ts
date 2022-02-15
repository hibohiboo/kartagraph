import apps from './apps'

const storageItemTaskbar = localStorage.getItem('taskbar')
const storageItemDesktop = localStorage.getItem('desktop')
const storageItemPinned = localStorage.getItem('pinned')
const storageItemRecent = localStorage.getItem('recent')

const { taskbar, desktop, pinned, recent } = {
  taskbar: (storageItemTaskbar && JSON.parse(storageItemTaskbar)) || [
    'Notepad',
  ],
  desktop: (storageItemDesktop && JSON.parse(storageItemDesktop)) || [
    'Notepad',
  ],
  pinned: (storageItemPinned && JSON.parse(storageItemPinned)) || ['Notepad'],
  recent: (storageItemRecent && JSON.parse(storageItemRecent)) || ['Notepad'],
}
export const taskApps = apps.filter((x) => taskbar.includes(x.name))

const sortByName = (
  list: string[],
  a: { name: string },
  b: { name: string },
) => {
  return list.indexOf(a.name) > list.indexOf(b.name) ? 1 : -1
}

export const desktopApps = apps
  .filter((x) => desktop.includes(x.name))
  .sort((a, b) => sortByName(desktop, a, b))
export const pinnedApps = apps
  .filter((x) => pinned.includes(x.name))
  .sort((a, b) => sortByName(pinned, a, b))

export const recentApps = apps
  .filter((x) => recent.includes(x.name))
  .sort((a, b) => sortByName(recent, a, b))
