import React, { ReactElement } from 'react'

interface Base {
  header: ReactElement
  footer: ReactElement
  content: ReactElement
}
const headerHeight = 50
const footerHeight = 80
const css: Record<string, React.CSSProperties> = {
  body: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // font
    backgroundColor: 'black',
    color: '#eee',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif;",
    // fontSmooth: 'antialiased', Mac のみなので使わない。
    // -moz-osx-font-smoothing: grayscale;'
  },
  header: {
    backgroundColor: 'red',
    height: `${headerHeight}px`,
    width: '100%',
    border: 'none',
  },
  container: {
    backgroundColor: 'yellow',
    width: '100%',
    position: 'relative',
    height: `calc(100vh - ${headerHeight + footerHeight}px)`,
    flexGrow: 1,
    border: 'none',
    margin: 0,
    padding: 0,
  },
  footer: {
    backgroundColor: 'blue',
    height: `${footerHeight}px`,
    width: '100%',
    // display: 'flex',
    // justifyContent: 'space-around',
  },
} as const

const Base: React.FC<Base> = (props) => (
  <div style={css.body}>
    <div style={css.header}>{props.header}</div>
    <main style={css.container}>{props.content}</main>
    <footer style={css.footer}>{props.footer}</footer>
  </div>
)

export default Base
