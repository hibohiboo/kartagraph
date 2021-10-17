import { Tag } from './types'

export const createTagByName = (name: string): Tag => ({
  name,
  type: 'attribute',
  visible: true,
})
export const createTag = ({
  name,
  type = 'attribute',
  visible = true,
}: {
  name: Tag['name']
  type?: Tag['type']
  visible?: Tag['visible']
}): Tag => ({
  name,
  type,
  visible,
})
