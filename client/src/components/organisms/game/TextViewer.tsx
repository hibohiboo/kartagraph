import { defaultBgColor } from '@/constants/cssConst'
import { replaceText } from '@/domain/command/text'
import { TextCommand } from '@/domain/command/types'
import React from 'react'

const TextViewer: React.FC<{ command: TextCommand; next: any }> = ({
  next,
  command,
}) => (
  <div
    style={{
      backgroundColor: defaultBgColor,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      whiteSpace: 'pre-wrap',
    }}
    onClick={next}
  >
    {replaceText(command.value)}
  </div>
)
export default TextViewer
