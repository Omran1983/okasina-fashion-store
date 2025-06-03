// FILE: src/components/orders/OrderSummary.jsx

import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '../../supabaseClient';

export default function OrderSummary() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const summaryRef = useRef();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const downloadPDF = async () => {
    const input = summaryRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`orders-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📊 Order Summary</h2>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          ⬇️ Download PDF
        </button>
      </div>

      <div ref={summaryRef} className="overflow-x-auto">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{order.name}</td>
                <td className="py-2 px-4 border">{order.email}</td>
                <td className="py-2 px-4 border">{order.phone}</td>
                <td className="py-2 px-4 border">Rs {order.total?.toFixed(2)}</td>
                <td className="py-2 px-4 border">{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
