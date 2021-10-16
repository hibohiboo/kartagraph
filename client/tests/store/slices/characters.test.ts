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
describe('addNewCharacter', () => {
  test.each(['キャラクター', 'てすと'])(
    'キャラクター名が登録できること %s',
    (name) => {
      const previousState = {
        characters: [],
      }
      const payload = {
        name,
        // tags: [createTagByName('冒険者')],
        tags: [],
      }
      expect(reducer(previousState, addNewCharacter(payload))).toEqual({
        characters: [
          {
            name,
            tags: [],
          },
        ],
      })
    },
  )
})
