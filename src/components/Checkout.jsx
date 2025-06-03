import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { supabase } from '../supabaseClient';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('orders').insert([
      {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        items: JSON.stringify(cart),  // ✅ Properly serialized for Supabase
        total
      }
    ]);

    if (error) {
      alert('Something went wrong while placing your order.');
      console.error(error);
    } else {
      clearCart();
      navigate('/thank-you');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📝 Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email Address"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          placeholder="Delivery Address"
          className="w-full p-2 border rounded"
        />
        <div className="font-semibold text-purple-700">
          Total: Rs {total.toFixed(2)}
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
