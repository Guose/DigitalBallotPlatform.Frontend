import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SessionManager } from './services/UserTracking/SessionManager'
import { UserProvider } from './context/UserContext'
import store from './redux/store'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <BrowserRouter basename={baseUrl}>
    <Provider store={store}>
      <UserProvider>
        <SessionManager>
          <App />
        </SessionManager>
      </UserProvider>
    </Provider>  
  </BrowserRouter> 
  )

serviceWorkerRegistration.unregister()
reportWebVitals()
