import React from 'react'
import type { SaveCharacter } from '@/domain/character'
// @ts-ignore
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
  const onSubmit = async (data: any) => {
    console.log('data', data)
    saveCharacter(data.name)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label" htmlFor="name">
          キャラクター名
        </label>
        <div className="control">
          <input
            id="name"
            {...register('name', {
              required: 'required',
            })}
            type="text"
            className="input"
          />
          {errors.name && errors.name.type === 'required' && (
            <span role="alert">キャラクター名は必須です。</span>
          )}
        </div>
      </div>
      <div className="field">
        <button type="submit" className="button is-primary">
          登録
        </button>
      </div>
    </form>
  )
}
