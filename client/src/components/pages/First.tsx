import React from 'react'
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import Base from '../templates/Base'
import { defaultBgColor } from '@/constants/cssConst'
import { DefaultDiv } from '../atoms/DefaultDiv'
import CharacterForm from '../organisms/CharacterForm'
import { useDispatch } from 'react-redux'
import { createTag } from '@/domain/tag'
import { charactersSlice } from '@/store/slices/characters'
const { addNewCharacter } = charactersSlice.actions

const centerStyle = {
  backgroundColor: defaultBgColor,
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const FirstNumber: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)
  const nextPage = () => navigate(`/first/${id + 1}`)
  switch (id) {
    case 1:
      return (
        <div style={centerStyle} onClick={nextPage}>
          ようこそカルタグラフへ。 <br />
          まずは最初のキャラクターを作成しましょう。
          <br />
          タップで進みます
        </div>
      )
    case 2:
      return (
        <div style={centerStyle}>
          <CharacterForm
            saveCharacter={(name) => {
              dispatch(
                addNewCharacter({
                  name,
                  tags: [
                    createTag({ name: '最初のキャラクター', visible: false }),
                  ],
                }),
              )
              navigate('/scenario/firstScenario')
            }}
          />
        </div>
      )
    default:
      return <div style={centerStyle}>ここは見れないはず</div>
  }
}

const First: React.FC = () => {
  return (
    <Base
      header={<DefaultDiv />}
      footer={<DefaultDiv />}
      content={
        <div style={centerStyle}>
          <Routes>
            <Route path="/" element={<Navigate to="1" />} />
            <Route path=":id" element={<FirstNumber />} />
          </Routes>
        </div>
      }
    />
  )
}
export default First
