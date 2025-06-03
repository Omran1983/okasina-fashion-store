// FILE: src/components/orders/OrderFilter.jsx

import React from 'react';

export default function OrderFilter({ status, setStatus }) {
  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">Filter by Status:</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
