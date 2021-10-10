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
      overflow: 'auto',
      position: 'relative',
    }}
  >
    {children}
  </div>
)

export default ScrollableBox
