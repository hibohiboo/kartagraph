import { defaultBgColor, defaultColor } from '@/constants/cssConst'
import React, { CSSProperties } from 'react'

const Loading: React.FC = () => (
  <div
    style={{
      backgroundColor: defaultBgColor,
      color: defaultColor,
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    Loading...
  </div>
)

export default Loading
