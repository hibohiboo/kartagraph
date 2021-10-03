import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '@/components/atoms/Container'
import { Link } from 'react-router-dom'

const Top: React.FC = ({ children }) => (
  <Container>
    <View>
      <Text>hellow</Text>
      <Link to="/">top</Link>
    </View>
  </Container>
)

export default Top
