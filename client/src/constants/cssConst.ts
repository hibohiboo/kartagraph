import type { CSSProperties } from 'react'

export const defaultBgColor = 'black'
export const defaultLink: CSSProperties = {
  textDecoration: 'none',
  color: '#fff',
} as const
export const defaultBody: CSSProperties = {
  height: '100%',
  width: '100%',
  margin: 0,
  padding: 0,
  border: 'none',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // font
  backgroundColor: defaultBgColor,
  color: '#eee',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif;",
  // fontSmooth: 'antialiased', Mac のみなので使わない。
  // -moz-osx-font-smoothing: grayscale;'
} as const
