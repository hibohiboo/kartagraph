import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CharacterForm from '@/components/organisms/CharacterForm'

const mockSave = jest.fn((name) => {})

describe('App', () => {
  beforeEach(() => {
    render(<CharacterForm saveCharacter={mockSave} />)
  })

  it('should display required error when value is invalid', async () => {
    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(mockSave).not.toBeCalled()
  })

  it('should not display error when value is valid', async () => {
    fireEvent.input(screen.getByLabelText('キャラクター名'), {
      target: {
        value: 'キャラ名',
      },
    })

    fireEvent.submit(screen.getByRole('button'))

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0))
    expect(mockSave).toBeCalledWith('キャラ名')
    expect(
      screen.getByLabelText<HTMLInputElement>('キャラクター名').value,
    ).toBe('')
  })
})
