import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Contextdata from './context/Contextdata.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const clientId=import.meta.env.VITE_CLIENT_ID
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer 
      position="top-center"
      autoClose={5000}
      theme="dark"
    />
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
      <Contextdata>
          <App />
    </Contextdata>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,  
)
