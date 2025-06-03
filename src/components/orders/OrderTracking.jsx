// FILE: src/components/orders/OrderTracking.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setOrders(data);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) fetchOrders();
    else console.error(error);
  };

  const statuses = ['Pending', 'Out for Delivery', 'Delivered'];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🚚 Order Tracking</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 shadow rounded">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>{order.name}</strong> • {order.phone}</p>
                  <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                  <p className="text-sm">Status: <span className="font-semibold text-blue-700">{order.status || 'Pending'}</span></p>
                </div>
                <select
                  className="border p-2 rounded"
                  value={order.status || 'Pending'}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
