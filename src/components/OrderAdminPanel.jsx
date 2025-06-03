// File: src/components/OrderAdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function OrderAdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error) setOrders(data);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📦 Customer Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Order from {order.name}</h2>
                <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</span>
              </div>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Total:</strong> Rs {parseFloat(order.total).toFixed(2)}</p>
              <p><strong>Items:</strong></p>
              <ul className="list-disc ml-5">
                {order.products && JSON.parse(order.products).map((item, i) => (
                  <li key={i}>{item.name} × {item.quantity} (Rs {parseFloat(item.price).toFixed(2)})</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
