import { Character } from '../types'

const CHARACTERS_KEY = 'characters'
export const initCharacters = () => {
  const charactersJSON = localStorage.getItem(CHARACTERS_KEY)
  if (charactersJSON) {
    return JSON.parse(charactersJSON)
  }
  return []
}
export const persistCharacters = (nextCharacters: Character[]) => {
  if (nextCharacters) {
    localStorage.setItem('characters', JSON.stringify(nextCharacters))
    return
  }
  localStorage.removeItem('characters')
}
