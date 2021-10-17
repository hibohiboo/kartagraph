import { commandType } from '../command/constants'

export const commandQueue = [
  {
    name: 'テスト1',
    type: commandType.Text,
    value: '名前を告げると、酒場の娘はさらさらと宿帳に記入する。',
  },
  {
    name: 'テスト2',
    type: commandType.Text,
    value: `「$??Character1$さんですね。
    まずは、Fランクからのスタートになります」`,
  },
  {
    name: 'テスト3',
    type: commandType.Text,
    value: `「」`,
  },
]
