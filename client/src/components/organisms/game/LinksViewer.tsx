import { defaultBgColor } from '@/constants/cssConst'
import { replaceText } from '@/domain/command/text'
import { LinkCommand, TextCommand } from '@/domain/command/types'
import React from 'react'

const LinksViewer: React.FC<{ texts: TextCommand[]; links: LinkCommand[] }> = ({
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
    <div>
      <div>{texts.map((command) => replaceText(command.value))}</div>
      <div className="buttons">
        {links.map((command, i) => (
          <button key={`${command.name}${i}`} className="button">
            {command.label}
          </button>
        ))}
      </div>
    </div>
  </div>
)
export default LinksViewer
