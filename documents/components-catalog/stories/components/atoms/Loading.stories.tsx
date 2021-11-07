import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Loading from '@/components/atoms/Loading'

export default {
  component: Loading,
  title: 'Atoms/Loading',
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />

export const Default = Template.bind({})
