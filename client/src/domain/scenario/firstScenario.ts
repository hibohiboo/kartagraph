import { commandType, iconType } from '../command/constants'
import { createTag } from '../tag'
import { Scenario, ScenarioEvent } from './types'

const commandQueue = [
  {
    name: 'テスト1',
    type: commandType.Text,
    label: `酒場の娘

「$??Character1$さんですね。
    まずは、Fランクからのスタートになります」`,
  },
  {
    type: commandType.IconText,
    icon: iconType.tag,
    label: '【Fランク冒険者】 のタグを獲得しました。 ',
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
    label: `これからどうしようか。

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
    label: `気になる張り紙は今はない。

`,
  },
  {
    name: 'テスト4',
    type: commandType.Link,
    label: `戻る`,
    nextEvent: 'second',
  },
]

const 娘と話す = [
  {
    name: 'テスト',
    type: commandType.LinkCaption,
    label: `酒場の娘

「$??Character1$さんの職業ってなんですか？」


`,
  },
  {
    type: commandType.Link,
    label: `戦士`,
    nextEvent: '戦士',
  },
  {
    type: commandType.Link,
    label: `魔法使い`,
    nextEvent: '魔法使い',
  },
  {
    type: commandType.Link,
    label: `盗賊`,
    nextEvent: '盗賊',
  },
  {
    type: commandType.Link,
    label: `その他`,
    nextEvent: 'その他',
  },
  {
    type: commandType.Link,
    label: `答えたくない`,
    nextEvent: '答えたくない',
  },
]

const events = {
  first: { name: 'first', commands: commandQueue },
  second: { name: 'second', commands: second },
  張り紙: { name: '張り紙', commands: 張り紙 },
  娘と話す: { name: '娘と話す', commands: 娘と話す },
  戦士: {
    name: '戦士',
    commands: [
      {
        type: commandType.GetTag,
        tag: createTag({ name: '職業@戦士' }),
      },
      {
        type: commandType.LinkCaption,
        label: `酒場の娘
    
「戦士なんですね」
`,
      },
    ],
  },
  魔法使い: { name: '魔法使い', commands: 張り紙 },
  盗賊: { name: '盗賊', commands: 張り紙 },
  その他: {
    name: 'その他',
    commands: [
      {
        name: 'テスト1',
        type: commandType.Text,
        label: `酒場の娘

「珍しい職業なんですね」`,
      },
      {
        name: 'ジャンプ',
        type: commandType.Jump,
        nextEvent: 'second',
      },
    ],
  },
  答えたくない: {
    name: '答えたくない',
    commands: [
      {
        name: 'テスト1',
        type: commandType.Text,
        label: `酒場の娘
  
「あっ、無理にとは言いませんよ」`,
      },
      {
        name: 'ジャンプ',
        type: commandType.Jump,
        nextEvent: 'second',
      },
    ],
  },
}
export const scenario: Scenario = {
  events,
  name: 'はじめのシナリオ',
  excludeTags: [],
  requireTags: [],
  description: '最初のシナリオ',
  firstEventId: 'first',
}
