import React from 'react'

import { Link } from 'react-router-dom'
const css = {
  body: {
    height: '100vh',
    width: '100vw',
    margin: 0,
    paddint: 0,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // font
    backgroundColor: 'black',
    color: '#eee',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif;",
    // fontSmooth: 'antialiased', Mac のみなので使わない。
    // -moz-osx-font-smoothing: grayscale;'
  },
  mainTitle: {
    color: '#eee',
    fontSize: '3rem',

    boxSizing: 'border-box',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',

    textDecoration: 'none',
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
} as const

const Top: React.FC = ({ children }) => (
  <div style={css.body}>
    <div>
      <span style={css.subtitle}>電脳ゲームブック</span>
      <Link style={css.mainTitle} to="/game">
        カルタグラフ
      </Link>
      <span style={css.subtitle}>君だけの旅路</span>
    </div>
  </div>
)

export default Top
