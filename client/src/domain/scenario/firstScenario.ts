import { commandType } from '../command/constants'

export const commandQueue = [
  {
    name: 'テスト1',
    type: commandType.Text,
    value: `酒場の娘

「$??Character1$さんですね。
    まずは、Fランクからのスタートになります」`,
  },
  {
    name: 'テスト2',
    type: commandType.LinkCaption,
    value: `これからどうしようか。

    `,
  },
  {
    name: 'テスト3',
    type: commandType.Link,
    label: `貼り紙を見る`,
  },
  {
    name: 'テスト4',
    type: commandType.Link,
    label: `娘と話す`,
  },
]
