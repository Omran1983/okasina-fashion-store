// FILE: src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomepageLayout from './components/HomepageLayout';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';
import OrderSummary from './components/orders/OrderSummary';
import './index.css';
import { CartProvider } from './hooks/useCart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomepageLayout />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="summary" element={<OrderSummary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
