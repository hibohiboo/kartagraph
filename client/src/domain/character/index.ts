import { useDispatch } from 'react-redux'
import { createTagByName } from '../tag'
import { charactersSlice } from '@/store/slices/characters'

const { addNewCharacter } = charactersSlice.actions
export const saveCharacter = (name: string) => {
  const dispatch = useDispatch()
  const payload = {
    name,
    tags: [],
  }
  dispatch(addNewCharacter(payload))
}

export type SaveCharacter = typeof saveCharacter
// createTagByName('冒険者')
// { name: '冒険者', type: 'attribute', visible: true }
