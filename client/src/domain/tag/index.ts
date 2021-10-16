import { Tag } from './types'

export const createTagByName = (name: string): Tag => ({
  name,
  type: 'attribute',
  visible: true,
})
