import { defaultBgColor, defaultLink } from '@/constants/cssConst'
import React, { ReactElement } from 'react'

import { Link } from 'react-router-dom'
import { DefaultDiv } from '../atoms/DefaultDiv'
import Base from '../templates/Base'

const TopBase: React.FC<{ content: ReactElement }> = ({ content }) => (
  <Base
    header={<DefaultDiv />}
    content={content}
    footer={
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: defaultBgColor,
          fontSize: '0.7rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '5px',
          boxSizing: 'border-box',
        }}
      >
        <div>© hibohiboo. All rights.</div>
        <div>
          <Link style={defaultLink} to="/">
            TOP
          </Link>{' '}
          <Link style={defaultLink} to="/privacy">
            プライバシーポリシー
          </Link>{' '}
          <Link style={defaultLink} to="/agreement">
            利用規約
          </Link>
        </div>
      </div>
    }
  />
)

export default TopBase
