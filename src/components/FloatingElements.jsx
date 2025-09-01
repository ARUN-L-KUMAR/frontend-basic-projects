import React from 'react';

const icons = [
  'fa-star', 'fa-heart', 'fa-shopping-cart', 'fa-gem', 'fa-crown', 'fa-gift'
];

const FloatingElements = () => (
  <div className="pointer-events-none fixed left-4 top-1/4 z-0 space-y-4 hidden md:block">
    {icons.map((icon, idx) => (
      <div key={icon} className="text-indigo-200 text-2xl opacity-70" style={{ animationDelay: `${idx}s` }}><i className={`fas ${icon}`}></i></div>
    ))}
  </div>
);

export default FloatingElements; 