import { createTagByName } from '@/domain/tag'
// import { store } from '@/store'
import { charactersSlice } from '@/store/slices/characters'

const { reducer, actions } = charactersSlice
const { addNewCharacter } = charactersSlice.actions

test('should return the initial state', () => {
  expect(reducer(undefined, {} as any)).toEqual({
    characters: [],
  })
})

test('addNewCharacter', () => {
  const previousState = {
    characters: [],
  }
  const payload = {
    name: 'キャラクター',
    tags: [createTagByName('冒険者')],
  }
  expect(reducer(previousState, addNewCharacter(payload))).toEqual({
    characters: [
      {
        name: 'キャラクター',
        tags: [{ name: '冒険者', type: 'attribute', visible: true }],
      },
    ],
  })
})
