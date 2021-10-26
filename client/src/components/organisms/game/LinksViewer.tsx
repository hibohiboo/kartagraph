import { defaultBgColor } from '@/constants/cssConst'
import { replaceText } from '@/domain/command/text'
import { LinkCommand, TextCommand } from '@/domain/command/types'
import React from 'react'

const LinksViewer: React.FC<{
  texts: TextCommand[]
  links: LinkCommand[]
  linkClickHandler: (id: string) => void
}> = ({ texts, links, linkClickHandler }) => (
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
      <div>{texts.map((command) => replaceText(command.label))}</div>
      <div className="buttons">
        {links.map((command, i) => (
          <button
            key={`${command.type}${i}`}
            className="button"
            onClick={() => linkClickHandler(command.nextEvent)}
          >
            {command.label}
          </button>
        ))}
      </div>
    </div>
  </div>
)
export default LinksViewer
