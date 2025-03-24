import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store'
import "../i18n.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <React.Suspense fallback="loading...">
      <Provider store={store}>
        <App />
      </Provider>
    </React.Suspense>
  </StrictMode>
)
