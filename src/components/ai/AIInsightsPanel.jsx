// FILE: src/components/ai/AIInsightsPanel.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const insights = [
  "🧠 Use delivery trends to adjust marketing spend across regions.",
  "📦 Automate WhatsApp updates to improve customer satisfaction.",
  "📈 Peak shopping time is between 6–9PM — use flash offers here.",
  "🔁 Repeat buyers respond well to loyalty rewards. Offer credits.",
  "📍 Route optimization can save 25% fuel. Prioritize zone planning.",
  "📊 Consider AI-based customer segmentation for targeted offers.",
  "🛒 Abandoned carts can be recovered with a reminder SMS + 10% off.",
  "💬 Feedback with < 3 stars? Set auto-triggers for callback follow-up."
];

export default function AIInsightsPanel() {
  const [randomTip, setRandomTip] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    getRandomInsight();
  }, []);

  const getRandomInsight = () => {
    const index = Math.floor(Math.random() * insights.length);
    setRandomTip(insights[index]);
    setFeedback('');
  };

  const saveInsightToSupabase = async () => {
    const { error } = await supabase.from('ai_insights').insert([
      {
        content: randomTip,
        source: 'manual', // or 'gpt' later
        note: feedback,
      },
    ]);

    if (error) {
      alert('❌ Failed to save. Check console.');
      console.error(error);
    } else {
      alert('✅ Insight saved successfully!');
      setFeedback('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🤖 AI Insights</h2>

      <div className="bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 p-6 rounded-lg shadow">
        <p className="text-xl font-semibold text-gray-800 italic">{randomTip}</p>

        <button
          onClick={getRandomInsight}
          className="mt-4 mr-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          🔄 New Insight
        </button>

        <button
          onClick={saveInsightToSupabase}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          💾 Save Insight
        </button>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Add a note or action plan (optional)"
          className="w-full mt-4 p-2 border rounded"
        />
      </div>
    </div>
  );
}
