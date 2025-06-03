// FILE: src/components/OrderSuccess.jsx

import React from 'react';

export default function OrderSuccess({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Order Placed Successfully!</h2>
        <p className="text-gray-700 mb-4">
          Thank you for your order. We have received it and will process it shortly.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
