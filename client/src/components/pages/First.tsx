import React from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import Base from '../templates/Base'
import Footer from '../molecules/Footer'
import { defaultBgColor } from '@/constants/cssConst'
import { DefaultDiv } from '../atoms/DefaultDiv'

const FirstNumber: React.FC = ({ children }) => {
  const param = useParams()
  const message = param.id === '1' ? 'ようこそ' : 'どうも'
  return <div>{message}</div>
}
const First: React.FC = ({ children }) => {
  return (
    <Base
      header={<DefaultDiv />}
      footer={<DefaultDiv />}
      content={
        <div
          style={{
            backgroundColor: defaultBgColor,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Routes>
            <Route path="/" />
            <Route path=":id" element={<FirstNumber />} />
          </Routes>
        </div>
      }
    />
  )
}
export default First
