import { defaultLink } from '@/constants/cssConst'
import React, { ReactElement } from 'react'

import { Link } from 'react-router-dom'

const css: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    ...defaultLink,
    border: 'solid #fff 1px',
    boxSizing: 'border-box',
    width: '80px',
    height: '50px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
} as const
const Footer: React.FC = () => (
  <div style={css.wrapper}>
    <Link style={css.button} to="/about">
      メイン
    </Link>

    <Link style={css.button} to="/game">
      設定
    </Link>
  </div>
)

export default Footer
