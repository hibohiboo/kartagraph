import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CharacterForm from '@/components/organisms/CharacterForm'

export default {
  component: CharacterForm,
  title: 'Organisms/CharacterForm',
} as ComponentMeta<typeof CharacterForm>

const Template: ComponentStory<typeof CharacterForm> = (args) => (
  <CharacterForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  saveCharacter: (name: string) => {},
}
