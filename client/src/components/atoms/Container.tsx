import React from 'react'
import { StyleSheet, View } from 'react-native'

const Container: React.FC = ({ children }) => {
  return (
    <View style={[styles.wrapper, { flexDirection: 'column' }]}>
      <View style={styles.container}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
})

export default Container
