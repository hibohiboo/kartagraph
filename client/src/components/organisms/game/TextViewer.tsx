import { defaultBgColor } from '@/constants/cssConst'
import { replaceText } from '@/domain/command/text'
import { TextCommand } from '@/domain/command/types'
import React from 'react'
export const textViewStyle = {
  backgroundColor: defaultBgColor,
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  whiteSpace: 'pre-wrap',
} as const
const TextViewer: React.FC<{ command: TextCommand; next: any }> = ({
  next,
  command,
}) => (
  <div style={textViewStyle} onClick={next}>
    {replaceText(command.label)}
  </div>
)
export default TextViewer
