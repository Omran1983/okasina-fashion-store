// FILE: src/components/feedback/FeedbackDashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function FeedbackDashboard() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setFeedback(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💬 Customer Feedback</h2>
      {feedback.length === 0 ? (
        <p className="text-gray-500">No feedback submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {feedback.map((entry) => (
            <div key={entry.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>{entry.name}</strong> ({entry.email})</p>
                  <p className="text-sm text-gray-500">{new Date(entry.created_at).toLocaleString()}</p>
                </div>
                <div className="text-yellow-500 font-bold text-lg">
                  ⭐ {entry.rating}/5
                </div>
              </div>
              <p className="mt-2 text-gray-700 italic">"{entry.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
