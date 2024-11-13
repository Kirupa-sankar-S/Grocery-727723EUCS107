import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './CartContext'; // Import the CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* Wrap the App component with CartProvider */}
      <App />  {/* Render the App component */}
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
