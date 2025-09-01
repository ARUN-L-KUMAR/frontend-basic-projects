import React from 'react';

const LoadingScreen = () => (
  <div className="hidden fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
    <div className="mb-4 text-indigo-600 text-3xl"><i className="fas fa-shopping-bag"></i></div>
    <div className="flex space-x-2 mb-2">
      <div className="w-4 h-4 rounded-full bg-indigo-400 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce delay-150"></div>
      <div className="w-4 h-4 rounded-full bg-indigo-600 animate-bounce delay-300"></div>
    </div>
    <div className="text-gray-700 font-medium">Loading StyleHub...</div>
  </div>
);

export default LoadingScreen; 