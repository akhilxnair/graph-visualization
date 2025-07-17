// Import Modules
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import Styles
import './index.css'


// Import Components
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
