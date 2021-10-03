import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '@/components/atoms/Container'
import { Link } from 'react-router-dom'

const About: React.FC = ({ children }) => (
  <Container>
    <View>
      <Text style={styles.text}>hellow</Text>
    </View>
  </Container>
)

const styles = StyleSheet.create({
  text: { color: '#eee' },
})

export default About
