// FILE: src/components/feedback/FeedbackForm.jsx
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', email: '', rating: '', comment: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('feedback').insert([formData]);
    setMessage(error ? 'Submission failed.' : 'Thanks for your feedback!');
    if (!error) setFormData({ name: '', email: '', rating: '', comment: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="input" required />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input" required />
      <input name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (1-5)" className="input" required />
      <textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Comment" className="input" required />
      <button type="submit" className="btn">Submit</button>
      {message && <p className="text-sm text-green-600">{message}</p>}
    </form>
  );
}

// FILE: src/components/feedback/FeedbackList.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    supabase.from('feedback').select('*').then(({ data }) => setFeedbacks(data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📣 Customer Feedback</h2>
      <ul className="space-y-3">
        {feedbacks.map(f => (
          <li key={f.id} className="bg-white p-4 rounded shadow">
            <p><strong>{f.name}</strong> ({f.email}) rated {f.rating}/5</p>
            <p className="text-sm text-gray-600">{f.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// FILE: src/components/orders/TrackOrder.jsx
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function TrackOrder() {
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);

  const handleTrack = async () => {
    const { data } = await supabase.from('orders').select('tracking_status').eq('email', email).eq('id', orderId).single();
    setStatus(data?.tracking_status || 'Order not found.');
  };

  return (
    <div className="space-y-3">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input" />
      <input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Order ID" className="input" />
      <button onClick={handleTrack} className="btn">Track</button>
      {status && <p className="text-sm">Status: {status}</p>}
    </div>
  );
}

// FILE: src/components/analytics/InsightsDashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function InsightsDashboard() {
  const [insights, setInsights] = useState({});

  useEffect(() => {
    (async () => {
      const { data: orders } = await supabase.from('orders').select('*');
      const { data: feedback } = await supabase.from('feedback').select('*');

      const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
      const avgOrder = (totalRevenue / orders.length).toFixed(2);
      const totalFeedback = feedback.length;
      const avgRating = (feedback.reduce((a, f) => a + Number(f.rating), 0) / totalFeedback).toFixed(1);

      setInsights({ totalRevenue, avgOrder, totalFeedback, avgRating });
    })();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-4 bg-white shadow rounded">💰 Total Revenue: Rs {insights.totalRevenue}</div>
      <div className="p-4 bg-white shadow rounded">📊 Avg Order Value: Rs {insights.avgOrder}</div>
      <div className="p-4 bg-white shadow rounded">🗣️ Feedback Count: {insights.totalFeedback}</div>
      <div className="p-4 bg-white shadow rounded">⭐ Avg Rating: {insights.avgRating}/5</div>
    </div>
  );
}

// FILE: src/hooks/useNotification.js
import { useEffect } from 'react';

export default function useNotification(event, handler) {
  useEffect(() => {
    const listen = (payload) => {
      if (payload?.eventType === event) {
        handler(payload);
      }
    };
    window.addEventListener('customNotification', listen);
    return () => window.removeEventListener('customNotification', listen);
  }, [event, handler]);
}

// Example: dispatch custom event from anywhere
// window.dispatchEvent(new CustomEvent('customNotification', { detail: { eventType: 'orderPlaced', data: {...} } }))
