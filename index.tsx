import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This is your main App component
import { CartProvider } from './context/CartContext'; // This links to the file we created in Step 1

// This part connects your React code to the <div id="root"> in your index.html
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    {/* We wrap <App /> with <CartProvider>. 
      Now, any button inside App can talk to the Cart! 
    */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);