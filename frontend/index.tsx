import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import { BrowserRouter } from 'react-router-dom'

import App from './src/App'
import "scss/main.scss"

const appContaienr = document.getElementById('root')
const root = createRoot(appContaienr)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
)