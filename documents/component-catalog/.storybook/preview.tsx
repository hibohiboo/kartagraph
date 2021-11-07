import React from 'react'
import { MemoryRouter } from 'react-router'
import { addDecorator } from '@storybook/react'
import { Parameters } from '@storybook/addons'

addDecorator((storyFn) => <MemoryRouter>{storyFn()}</MemoryRouter>)

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
