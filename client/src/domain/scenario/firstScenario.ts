import { commandType } from '../command/constants'
import { Scenario, ScenarioEvent } from './types'

const commandQueue = [
  {
    name: 'テスト1',
    type: commandType.Text,
    value: `酒場の娘

「$??Character1$さんですね。
    まずは、Fランクからのスタートになります」`,
  },
  {
    name: 'ジャンプ',
    type: commandType.Jump,
    nextEvent: 'second',
  },
]

const second = [
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
    nextEvent: '張り紙',
  },
  {
    name: 'テスト4',
    type: commandType.Link,
    label: `娘と話す`,
    nextEvent: '娘と話す',
  },
]

const 張り紙 = [
  {
    name: 'テスト3',
    type: commandType.LinkCaption,
    value: `気になる張り紙は今はない。

`,
  },
  {
    name: 'テスト4',
    type: commandType.Link,
    label: `戻る`,
    nextEvent: 'second',
  },
]

const events = {
  first: { name: 'first', commands: commandQueue },
  second: { name: 'second', commands: second },
  張り紙: { name: '張り紙', commands: 張り紙 },
  娘と話す: { name: '娘と話す', commands: 張り紙 },
}
export const scenario: Scenario = {
  events,
  name: 'はじめのシナリオ',
  excludeTags: [],
  requireTags: [],
  description: '最初のシナリオ',
  firstEventId: 'first',
}
