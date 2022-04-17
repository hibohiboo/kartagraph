import { defaultBody } from '@/constants/cssConst'
import React from 'react'

import { Link } from 'react-router-dom'
import TopBase from '../templates/TopBase'
import { charactersSelector } from '@/store/selectors/characters'
import { useAppSelector } from '@/store/hooks'

const css: Record<string, React.CSSProperties> = {
  body: defaultBody,
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

const Top: React.FC = () => {
  const characters = useAppSelector(charactersSelector)
  const pagePath = characters.length === 0 ? '/first/1' : '/scenario/first'
  return (
    <TopBase
      content={
        <div style={css.body}>
          <div>
            <span style={css.subtitle}>電脳ゲームブック.</span>
            <Link style={css.mainTitle} to={pagePath}>
              カルタグラフ
            </Link>
            {/* <span style={css.subtitle}>君だけの旅路</span> */}
          </div>
        </div>
      }
    />
  )
}
export default Top
