import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './Pages/LandingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LandingPage/>

  </StrictMode>,
)
