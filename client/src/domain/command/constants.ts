export const commandType = {
  Text: 'テキスト',
} as const
export type CommandType = typeof commandType[keyof typeof commandType]
