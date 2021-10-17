import { commandType } from '@/domain/command/constants'
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
    }

    expect(reducer(beforeState, nextCommand())).toEqual({
      ...beforeState,
      currentCommand: 1,
      currentStatus: eventStatus.Executing,
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
      currentStatus: eventStatus.Wait,
    })
  })
})
