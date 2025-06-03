// FILE: src/components/ThankYou.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div className="text-center mt-20 p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Thank You!</h2>
      <p className="mb-6 text-gray-700">Your order has been placed successfully. We'll contact you shortly.</p>
      <Link
        to="/"
        className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Return to Shop
      </Link>
    </div>
  );
}
