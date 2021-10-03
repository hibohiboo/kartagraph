import * as React from 'react'
import { render, screen } from '@testing-library/react'
import Top from '../src/Top'
import { MemoryRouter } from 'react-router-dom'

test('renders save to reload', () => {
  // https://zenn.dev/tatsurom/articles/9a0341cd3a357a3c55db
  render(<Top />, { wrapper: MemoryRouter })
  const linkElement = screen.getByText(/save to reload/i)
  expect(linkElement).toBeInTheDocument()
})
