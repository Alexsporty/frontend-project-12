import ReactDOM from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App.jsx'
import store from './app/store.js'
import './init.jsx' // импортируем наш i18next
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
//bcdcfec33720485984824a4f3a03afd9
const rollbarConfig = {
  accessToken:
    'd0727b414dcb4f0f89d6e42027ae9825b57d5e29419584975fecca2ea54fd193c8ac8b6a5af72276d4b5a0cd04e39843',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

const app = () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'))
  root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>,
  )
}

app()
