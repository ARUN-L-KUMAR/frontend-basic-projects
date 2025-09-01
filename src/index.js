import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartWishlistProvider } from './components/CartWishlistContext';
import { NotificationProvider } from './components/NotificationContext';
import { ThemeProvider } from './components/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <NotificationProvider>
        <CartWishlistProvider>
          <App />
        </CartWishlistProvider>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
