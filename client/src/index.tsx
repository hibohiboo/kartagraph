import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './router/RoutesApp'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

// ReactDOM.render(
//   <Router basename={'cartagraph'}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Router>,
//   document.getElementById('react-root'),
// )

class ReactNativeApp extends React.Component {
  render() {
    return (
      <Router basename={'cartagraph'}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    )
  }
}

AppRegistry.registerComponent('App', () => ReactNativeApp)
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('react-root'),
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
