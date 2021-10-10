import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Base from '@/components/templates/Base'

export default {
  component: Base,
  title: 'Tutorial/Templates/Base',
} as ComponentMeta<typeof Base>

const Template: ComponentStory<typeof Base> = (args) => <Base {...args} />

export const Default = Template.bind({})
Default.args = {
  header: <div>header</div>,
  content: <div>content</div>,
  footer: <div>footer</div>,
}
