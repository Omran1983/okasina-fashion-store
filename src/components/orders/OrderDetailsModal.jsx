// FILE: src/components/order/OrderDetailsModal.jsx

import React from 'react';

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

        <div className="mb-4">
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Total:</strong> Rs {parseFloat(order.total).toFixed(2)}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <ul className="divide-y divide-gray-200">
            {order.products?.map((item, index) => (
              <li key={index} className="py-2">
                <div className="flex justify-between">
                  <span>{item.name} ({item.size})</span>
                  <span>Rs {parseFloat(item.price).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
