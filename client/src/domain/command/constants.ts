export const commandType = {
  Text: 'テキスト',
  LinkCaption: 'リンク見出し ',
  Link: 'リンク',
  SelectWait: '選択待ち',
  Jump: 'ジャンプ',
} as const
export type CommandType = typeof commandType[keyof typeof commandType]
