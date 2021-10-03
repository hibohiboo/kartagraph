import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

class ReactNativeApp extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>Hello, world!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: 'bold' },
})

AppRegistry.registerComponent('App', () => ReactNativeApp)
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('react-root'),
})

// ReactDOM.render(
//   <Router basename={'cartagraph'}>
//     <React.StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </React.StrictMode>
//   </Router>,
//   document.getElementById('root'),
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
