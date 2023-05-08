import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './src/app/store'

import App from './src/App'

import "./src/styles/main.scss"

const appContaienr = document.getElementById('root')
const root = createRoot(appContaienr)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
)