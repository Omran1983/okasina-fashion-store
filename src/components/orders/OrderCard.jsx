// FILE: src/components/orders/OrderCard.jsx

import React from 'react';
import { supabase } from '../../supabaseClient';

export default function OrderCard({ order, refreshOrders }) {
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await supabase.from('orders').update({ status: newStatus }).eq('id', order.id);
    refreshOrders();
  };

  return (
    <div className="border p-4 rounded shadow bg-white">
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-bold">{order.name}</h2>
          <p className="text-sm text-gray-600">{order.email} | {order.phone}</p>
          <p className="text-sm text-gray-500">{order.address}</p>
        </div>
        <select
          value={order.status}
          onChange={handleStatusChange}
          className="bg-gray-200 rounded px-2 py-1 text-sm"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mt-3">
        <h4 className="font-semibold">Products:</h4>
        <ul className="list-disc list-inside text-sm">
          {order.products.map((p, i) => (
            <li key={i}>{p.name} - Rs {p.price.toFixed(2)}</li>
          ))}
        </ul>
      </div>
      <div className="text-right mt-2 font-bold">Total: Rs {order.total.toFixed(2)}</div>
    </div>
  );
}
