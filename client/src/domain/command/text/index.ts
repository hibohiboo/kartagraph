import { useAppSelector } from '@/store/hooks'
import { characterNameSelector } from '@/store/selectors/characters'

const replaceName = (text: string) => {
  const name = useAppSelector(characterNameSelector)

  return text.replace('$??Character1$', name)
}
export const replaceText = (text: string) => replaceName(text)
