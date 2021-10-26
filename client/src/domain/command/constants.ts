export const commandType = {
  Text: 'テキスト',
  LinkCaption: 'リンク見出し ',
  Link: 'リンク',
  SelectWait: '選択待ち',
  Jump: 'ジャンプ',
  GetTag: 'タグ取得',
  IconText: 'アイコン付きテキスト',
} as const
export type CommandType = typeof commandType[keyof typeof commandType]

export const iconType = {
  tag: 'fontawesome/tag',
} as const
export type IconType = typeof iconType[keyof typeof iconType]
