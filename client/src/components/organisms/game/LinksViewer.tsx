import { defaultBgColor } from '@/constants/cssConst'
import { replaceText } from '@/domain/command/text'
import { LinkCommand, TextCommand } from '@/domain/command/types'
import React from 'react'

const TextViewer: React.FC<{ texts: TextCommand[]; links: LinkCommand[] }> = ({
  texts,
  links,
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
  >
    <div>{texts.map((command) => replaceText(command.value))}</div>
    {links.map((command) => (
      <div>{command.label}</div>
    ))}
  </div>
)
export default TextViewer
