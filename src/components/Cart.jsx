// FILE: src/components/Cart.jsx
import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Rs {item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-lg font-bold">Total: Rs {total.toFixed(2)}</div>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
