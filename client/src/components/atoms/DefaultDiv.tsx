import { defaultBgColor } from '@/constants/cssConst'
import React from 'react'

export const DefaultDiv: React.FC = () => (
  <div
    style={{
      backgroundColor: defaultBgColor,
      width: '100%',
      height: '100%',
    }}
  />
)
