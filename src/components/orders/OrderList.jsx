// FILE: src/components/orders/OrderList.jsx

import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error) setOrders(data);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = [order.name, order.email].some(field =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate = dateFilter ? order.created_at.startsWith(dateFilter) : true;
    return matchesSearch && matchesDate;
  });

  const downloadCSV = () => {
    const header = ['Name', 'Phone', 'Email', 'Address', 'Total', 'Date'];
    const rows = filteredOrders.map(order => [
      `"${order.name}"`,
      `"${order.phone}"`,
      `"${order.email}"`,
      `"${order.address}"`,
      `"Rs ${order.total.toFixed(2)}"`,
      `"${new Date(order.created_at).toLocaleString()}"`
    ]);
    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `orders-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📦 Orders</h2>
        <button
          onClick={downloadCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          ⬇️ Download CSV
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">No matching orders found.</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{order.name}</td>
                  <td className="p-2 border">{order.phone}</td>
                  <td className="p-2 border">{order.email}</td>
                  <td className="p-2 border">{order.address}</td>
                  <td className="p-2 border">Rs {order.total.toFixed(2)}</td>
                  <td className="p-2 border">{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
