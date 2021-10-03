import React from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Test from './Test'
import Top from './Top'
import { StyleSheet, Text, View } from 'react-native'

function App() {
  return (
    <Routes>
      <Route path="/about" element={<Test />} />
      <Route path="/" element={<ReactNativeApp />} />
    </Routes>
  )
}

class ReactNativeApp extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>Hello, world!</Text>
        <Link to="about">test</Link>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: 'bold' },
})

export default App
