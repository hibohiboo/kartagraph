import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '@/components/atoms/Container'

export default {
  title: 'Example/Container',
  component: Container,
} as ComponentMeta<typeof Container>

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args}>
    <Text style={{ color: '#fff' }}>test</Text>
  </Container>
)
export const Primary = Template.bind({})
