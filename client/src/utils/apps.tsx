export const gene_name = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase()
interface App {
  name: string
  icon: string
  type: string
  action: string
}

const installed = JSON.parse(localStorage.getItem('installed') ?? '[]') as App[]

const defaultApps = [
  {
    name: 'Start',
    icon: 'home',
    type: 'action',
    action: 'STARTMENU',
  },
  {
    name: 'Notepad',
    icon: 'notepad',
    type: 'app',
    action: 'NOTEPAD',
  },
] as const

const apps = [
  ...defaultApps,
  ...installed.map((item) => ({ ...item, action: gene_name() })),
]

export default apps
export const allApps = apps.filter((app) => {
  return app.type == 'app'
})
