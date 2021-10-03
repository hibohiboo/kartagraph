import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ScenarioViewer from '@/components/organisms/ScenarioViewer'

export default {
  title: 'Example/ScenarioViewer',
  component: ScenarioViewer,
} as ComponentMeta<typeof ScenarioViewer>

const Template: ComponentStory<typeof ScenarioViewer> = (args) => (
  <ScenarioViewer {...args} />
)
export const Primary = Template.bind({})
