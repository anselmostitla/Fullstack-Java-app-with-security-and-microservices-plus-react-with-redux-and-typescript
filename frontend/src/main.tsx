import ReactDOM from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.tsx'

import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
