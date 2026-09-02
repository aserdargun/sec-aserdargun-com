import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import { App } from './app/App'
import './styles/tokens.css'
import './styles/global.css'
import './styles/shell.css'
import './styles/trust.css'
import './styles/matrix.css'
import './styles/responsive.css'

const root = document.getElementById('root')

if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
