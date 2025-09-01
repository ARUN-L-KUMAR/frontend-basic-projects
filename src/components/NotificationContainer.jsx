import React from 'react';

const notifications = [
  { id: 1, message: 'Welcome to StyleHub!', type: 'success' },
  { id: 2, message: 'Your cart has been updated.', type: 'info' },
];

const typeStyles = {
  success: 'bg-green-500',
  info: 'bg-blue-500',
  error: 'bg-red-500',
};

const NotificationContainer = () => (
  <div className="fixed top-4 right-4 z-50 space-y-2">
    {notifications.map(n => (
      <div key={n.id} className={`text-white px-4 py-2 rounded shadow ${typeStyles[n.type]}`}>{n.message}</div>
    ))}
  </div>
);

export default NotificationContainer; 