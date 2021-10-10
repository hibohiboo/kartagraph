import React, { ReactElement } from 'react'

interface Base {
  header: ReactElement
  footer: ReactElement
  content: ReactElement
}
const css = {
  body: {
    height: '100vh',
    width: '100vw',
    margin: 0,
    paddint: 0,
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
  header: { backgroundColor: 'red', height: '50px', width: '100%' },
  container: { backgroundColor: 'yellow', width: '100%', flexGrow: 1 },
  footer: {
    backgroundColor: 'blue',
    height: '80px',
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
