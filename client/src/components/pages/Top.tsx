import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Container from '@/components/atoms/Container'
import { Link } from 'react-router-dom'

const Top: React.FC = () => (
  <Container>
    <Text>hello top</Text>
    <Link to="about">test</Link>
  </Container>
)

export default Top
