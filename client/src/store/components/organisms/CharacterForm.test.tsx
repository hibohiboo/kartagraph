import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CharacterForm from '@/components/organisms/CharacterForm'

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password })
})

describe('App', () => {
  beforeEach(() => {
    render(<CharacterForm />)
  })

  it('should display required error when value is invalid', async () => {
    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(2)
    expect(mockLogin).not.toBeCalled()
  })

  it('should display matching error when email is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test',
      },
    })

    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: 'password',
      },
    })

    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(mockLogin).not.toBeCalled()
    expect(
      screen.getByRole<HTMLInputElement>('textbox', { name: /email/i }).value,
    ).toBe('test')
    expect(screen.getByLabelText<HTMLInputElement>('password').value).toBe(
      'password',
    )
  })

  it('should display min length error when password is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@mail.com',
      },
    })

    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: 'pass',
      },
    })

    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(mockLogin).not.toBeCalled()
    expect(
      screen.getByRole<HTMLInputElement>('textbox', { name: /email/i }).value,
    ).toBe('test@mail.com')
    expect(screen.getByLabelText<HTMLInputElement>('password').value).toBe(
      'pass',
    )
  })

  it('should not display error when value is valid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@mail.com',
      },
    })

    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: 'password',
      },
    })

    fireEvent.submit(screen.getByRole('button'))

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0))
    expect(mockLogin).toBeCalledWith('test@mail.com', 'password')
    expect(
      screen.getByRole<HTMLInputElement>('textbox', { name: /email/i }).value,
    ).toBe('')
    expect(screen.getByLabelText<HTMLInputElement>('password').value).toBe('')
  })
})
