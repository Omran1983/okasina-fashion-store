// FILE: src/components/dashboard/AnalyticsDashboard.jsx

import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function AnalyticsDashboard() {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*');
    if (!error && data) {
      setOrders(data);
      calculateAnalytics(data);
    }
  };

  const calculateAnalytics = (orders) => {
    const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    setTotalRevenue(revenue);

    const customerMap = {};
    orders.forEach((order) => {
      const key = `${order.name}-${order.phone}`;
      if (!customerMap[key]) customerMap[key] = 0;
      customerMap[key] += order.total;
    });

    const top = Object.entries(customerMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, total]) => {
        const [name, phone] = key.split('-');
        return { name, phone, total };
      });

    setTopCustomers(top);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-800">Rs {totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold text-green-800">{orders.length}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Top Customer</h3>
          <p className="text-md text-yellow-800">
            {topCustomers[0]?.name} ({topCustomers[0]?.phone})<br />
            Rs {topCustomers[0]?.total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h4 className="text-lg font-bold mb-2">👥 Top 5 Customers by Revenue</h4>
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((cust, index) => (
              <tr key={index}>
                <td className="p-2 border">{cust.name}</td>
                <td className="p-2 border">{cust.phone}</td>
                <td className="p-2 border">Rs {cust.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
