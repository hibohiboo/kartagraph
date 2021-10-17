export const eventStatus = {
  Wait: '入力待ち',
  Loading: '読込中',
  Executing: '実行中',
} as const
export type EventStatus = typeof eventStatus[keyof typeof eventStatus]
