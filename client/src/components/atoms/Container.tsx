import React from 'react'
import { StyleSheet, View } from 'react-native'

const Container: React.FC = ({ children }) => {
  return (
    <View
      style={[styles.wrapper, { flexDirection: 'column' }]}
      nativeID={'cg-wrapper'}
    >
      <View style={styles.container} nativeID="cg-container">
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, height: '100vh' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
})

export default Container
