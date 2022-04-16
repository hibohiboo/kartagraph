import React from 'react'
import ReactDOM from 'react-dom'
import App from './router/RoutesApp'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import { sendToGoogleAnalytics } from './domain/firebase'

ReactDOM.render(
  <Router basename={'cartagraph'}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('react-root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// 開発環境ではログに。本番環境ではグーグル アナリティクスに出力。
const isDevevelopServe = import.meta.env.MODE === 'development' // import.meta.env.DEV

const reportTo = isDevevelopServe ? console.log : sendToGoogleAnalytics

reportWebVitals(reportTo)
