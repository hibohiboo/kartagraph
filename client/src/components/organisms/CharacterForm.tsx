import React from 'react'
import type { SaveCharacter } from '@/domain/character'
import { useForm } from 'react-hook-form'

export default function CharacterForm({
  saveCharacter,
}: {
  saveCharacter: SaveCharacter
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const onSubmit = async (data: { name: string }) => {
    console.log('data', data)
    saveCharacter(data.name)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">キャラクター名</label>
      <input
        id="name"
        {...register('name', {
          required: 'required',
        })}
        type="text"
      />
      {errors.name && <span role="alert">{errors.name.message}</span>}
      <button type="submit">登録</button>
    </form>
  )
}
