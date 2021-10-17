import { persistCharacters } from '@/domain/character/persistence/characters'
import { Middleware } from '@reduxjs/toolkit'

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const prevCharacters = store.getState().characters
  next(action)
  const nextCharacters = store.getState().characters
  if (JSON.stringify(prevCharacters) !== JSON.stringify(nextCharacters)) {
    persistCharacters(nextCharacters)
  }
}
export default localStorageMiddleware
