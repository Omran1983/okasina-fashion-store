// FILE: src/components/notifications/NotificationCenter.jsx
import React, { useState } from 'react';

const dummyNotifications = [
  {
    id: 1,
    type: 'WhatsApp',
    message: 'Reminder: Order #1294 will be delivered today.',
    status: 'Sent',
    timestamp: '2025-05-30 09:45'
  },
  {
    id: 2,
    type: 'Email',
    message: 'Thank you for your feedback on Order #1289!',
    status: 'Queued',
    timestamp: '2025-05-29 16:20'
  },
  {
    id: 3,
    type: 'SMS',
    message: 'Flash Sale: 10% off on Kurtis till midnight.',
    status: 'Sent',
    timestamp: '2025-05-28 13:10'
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(dummyNotifications);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📧 Notification Center</h2>

      <p className="text-sm text-gray-500 mb-4">
        This panel will soon manage your automated WhatsApp, Email, and SMS messages.
      </p>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{n.type} Notification</p>
                <p className="text-gray-700 text-sm">{n.message}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>Status: <span className="font-semibold text-purple-700">{n.status}</span></p>
                <p>{n.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
