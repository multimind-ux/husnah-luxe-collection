import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { QuickViewProvider } from './components/QuickView'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <QuickViewProvider>
            <App />
          </QuickViewProvider>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
