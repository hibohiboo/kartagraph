import React, { CSSProperties } from 'react'

const ScrollableBox: React.FC<{ style?: CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      ...style,
      height: '100%',
      width: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
    }}
  >
    {children}
  </div>
)

export default ScrollableBox
