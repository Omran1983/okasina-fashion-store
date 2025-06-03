// FILE: src/components/analytics/AnalyticsDashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

export default function AnalyticsDashboard() {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*');

    if (!error) {
      setOrders(data);

      const totalSales = data.reduce((sum, order) => sum + Number(order.total), 0);
      const totalOrders = data.length;
      const uniqueEmails = new Set(data.map(order => order.email)).size;

      setSummary({ totalSales, totalOrders, totalCustomers: uniqueEmails });
    }
  };

  // Generate sales trend by day
  const salesByDate = orders.reduce((acc, order) => {
    const date = new Date(order.created_at).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.sales += Number(order.total);
    } else {
      acc.push({ date, sales: Number(order.total) });
    }
    return acc;
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-purple-700 text-xl font-bold">Rs {summary.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-purple-700 text-xl font-bold">{summary.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Customers</h3>
          <p className="text-purple-700 text-xl font-bold">{summary.totalCustomers}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Sales Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesByDate}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
