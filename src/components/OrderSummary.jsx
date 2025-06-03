// FILE: src/components/OrderSummary.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function OrderSummary() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧾 Order Summary</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded p-4 mb-6">
            <p className="text-sm text-gray-500">🕓 {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Total:</strong> Rs {order.total.toFixed(2)}</p>
            <p className="mt-2 font-semibold">Items:</p>
            <ul className="list-disc list-inside text-sm text-gray-800">
              {order.items.map((item, idx) => (
                <li key={idx}>{item.name} — Rs {item.price}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
