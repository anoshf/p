import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { applyTheme, resolveInitialTheme } from './lib/theme'

import './styles/global.css'
import './styles/layout.css'
import './styles/sections.css'
import './styles/contact.css'

// Paint the theme before React's first render so there is no flash of the
// fallback palette. resolveInitialTheme honours showThemeSwitcher: when the
// switcher is off it returns defaultTheme and ignores stored preferences.
applyTheme(resolveInitialTheme())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
