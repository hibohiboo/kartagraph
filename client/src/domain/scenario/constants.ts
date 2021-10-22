export const eventStatus = {
  SelectWait: '選択肢待ち',
  Loading: '読込中',
  Executing: '実行中',
  ClickWait: 'クリック待ち',
} as const
export type EventStatus = typeof eventStatus[keyof typeof eventStatus]
