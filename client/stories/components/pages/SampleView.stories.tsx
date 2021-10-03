import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SampleView from '@/components/pages/SampleView'

export default {
  title: 'Example/SampleView',
  component: SampleView,
} as ComponentMeta<typeof SampleView>

const Template: ComponentStory<typeof SampleView> = () => <SampleView />
export const Primary = Template.bind({})
