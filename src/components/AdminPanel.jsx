// FILE: src/components/AdminPanel.jsx

import React, { useState } from 'react';
import ProductManagement from './product/ProductManagement';
import OrderList from './orders/OrderList';
import AnalyticsDashboard from './analytics/AnalyticsDashboard';
import FeedbackDashboard from './feedback/FeedbackDashboard';
import OrderTracking from './orders/OrderTracking';
import AIInsights from './ai/AIInsightsPanel';
import NotificationCenter from './notifications/NotificationCenter';
import OrderSummary from './orders/OrderSummary';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 mb-6">
        {[
          ['products', '🛍️ Products'],
          ['orders', '📦 Orders'],
          ['analytics', '📊 Analytics'],
          ['feedback', '💬 Feedback'],
          ['tracking', '🚚 Tracking'],
          ['ai', '🤖 AI Insights'],
          ['notifications', '📧 Notifications'],
          ['summary', '🧾 Order Summary']
        ].map(([key, label]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded shadow ${activeTab === key ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'products' && <ProductManagement />}
      {activeTab === 'orders' && <OrderList />}
      {activeTab === 'analytics' && <AnalyticsDashboard />}
      {activeTab === 'feedback' && <FeedbackDashboard />}
      {activeTab === 'tracking' && <OrderTracking />}
      {activeTab === 'ai' && <AIInsights />}
      {activeTab === 'notifications' && <NotificationCenter />}
      {activeTab === 'summary' && <OrderSummary />}
    </div>
  );
}
