import { commandType } from '@/domain/command/constants'
import { Command } from '@/domain/command/types'
import { eventStatus } from '@/domain/scenario/constants'
import { initialState, scenarioSlice } from '@/store/slices/scenario'

const { reducer, actions } = scenarioSlice
const { setCommands, nextCommand, toWait } = actions

test('should return the initial state', () => {
  expect(reducer(undefined, {} as any)).toEqual(initialState)
})
describe('setCommands', () => {
  test.each(['会話1', '会話2'])('コマンドキューが登録できること %s', (name) => {
    const payload = [{ name, type: commandType.Text }]
    expect(reducer(initialState, setCommands(payload))).toEqual({
      ...initialState,
      commandQueue: [{ name, type: commandType.Text }],
      currentCommand: 0,
      currentStatus: eventStatus.ClickWait,
    })
  })
})
describe('nextCommand', () => {
  test('次のコマンドに遷移できること', () => {
    const commandQueue = [
      { name: 'テスト1', type: commandType.Text },
      { name: 'テスト2', type: commandType.Text },
    ]
    const beforeState = {
      ...initialState,
      commandQueue,
      currentCommand: 0,
      currentStatus: eventStatus.Executing,
    }

    expect(reducer(beforeState, nextCommand())).toEqual({
      ...beforeState,
      currentCommand: 1,
      currentStatus: eventStatus.ClickWait,
    })
  })
  test('最後のコマンドは待機になること', () => {
    const commandQueue: Command[] = [
      { name: 'テスト1', type: commandType.Text },
      { name: 'テスト2', type: commandType.Text },
    ]
    const beforeState = {
      ...initialState,
      commandQueue,
      currentCommand: 1,
      currentStatus: eventStatus.Executing,
    }

    expect(reducer(beforeState, nextCommand())).toEqual({
      commandQueue: [
        { name: commandType.SelectWait, type: commandType.SelectWait },
      ],
      currentCommand: 0,
      currentStatus: eventStatus.SelectWait,
    })
  })
})

describe('toWait', () => {
  test('待ち状態になること', () => {
    const commandQueue = [
      { name: 'テスト1', type: commandType.Text },
      { name: 'テスト2', type: commandType.Text },
    ]
    const beforeState = {
      ...initialState,
      commandQueue,
      currentCommand: 1,
      currentStatus: eventStatus.Executing,
    }

    expect(reducer(beforeState, toWait())).toEqual({
      ...beforeState,
      currentStatus: eventStatus.SelectWait,
    })
  })
})
