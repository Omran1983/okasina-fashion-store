// FILE: src/components/OrderForm.jsx

import React, { useState, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { CartContext } from './CartContext';
import OrderSummary from './OrderSummary';
import { useNavigate } from 'react-router-dom';

export default function OrderForm({ onClose, onSuccess }) {
  const { cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const { error } = await supabase.from('orders').insert([
      {
        ...formData,
        products: cartItems,
        total,
      },
    ]);

    if (error) {
      setError('Order submission failed. Please try again.');
    } else {
      clearCart();
      onSuccess?.(); // optional callback if defined
      navigate('/thank-you');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            {['name', 'email', 'phone', 'address'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
            ))}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Review Order
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <OrderSummary
            formData={formData}
            cartItems={cartItems}
            onBack={handleBack}
            onConfirm={handleSubmit}
            loading={loading}
            error={error}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
