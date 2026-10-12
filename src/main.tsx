import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AdminPage from './AdminPage'
import RuntimeBridge from './RuntimeBridge'
import { StoreProvider } from './store'
import './styles.css'
import './admin.css'

const isAdmin = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isAdmin ? <AdminPage /> : (
      <BrowserRouter>
        <StoreProvider>
          <RuntimeBridge />
          <App />
        </StoreProvider>
      </BrowserRouter>
    )}
  </React.StrictMode>,
)
