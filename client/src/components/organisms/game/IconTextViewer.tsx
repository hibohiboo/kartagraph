import { defaultBgColor } from '@/constants/cssConst'
import { replaceText } from '@/domain/command/text'
import { IconTextCommand, TextCommand } from '@/domain/command/types'
import React from 'react'
import { textViewStyle } from './TextViewer'
import { FaTag } from 'react-icons/fa'
import { iconType } from '@/domain/command/constants'

const TextViewer: React.FC<{ command: IconTextCommand; next: any }> = ({
  next,
  command,
}) => (
  <div style={textViewStyle} onClick={next}>
    {command.icon === iconType.tag ? <FaTag /> : <></>}
    {replaceText(command.label)}
  </div>
)
export default TextViewer
