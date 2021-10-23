export const commandType = {
  Text: 'テキスト',
  Link: 'リンク',
  SelectWait: '選択待ち',
} as const
export type CommandType = typeof commandType[keyof typeof commandType]
