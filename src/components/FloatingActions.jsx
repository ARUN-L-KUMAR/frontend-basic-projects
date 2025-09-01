import React, { useRef, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const fabOptions = [
  { icon: 'fas fa-bolt', tooltip: 'Quick Order' },
  { icon: 'fas fa-ruler', tooltip: 'Size Guide' },
  { icon: 'fas fa-question', tooltip: 'Help' },
  { icon: 'fas fa-share-alt', tooltip: 'Share' },
];

const FloatingActions = () => {
  const [fabOpen, setFabOpen] = useState(false);
  const { showNotification } = useNotification();
  const fabRef = useRef();

  useEffect(() => {
    const handleClick = e => {
      if (fabRef.current && !fabRef.current.contains(e.target)) setFabOpen(false);
    };
    if (fabOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [fabOpen]);

  const handleOptionClick = tooltip => {
    showNotification(`${tooltip} feature coming soon!`, 'info');
    setFabOpen(false);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Button Menu */}
      <div className="floating-actions fixed bottom-8 right-8 z-40" ref={fabRef}>
        <div className={`fab-container relative ${fabOpen ? 'active' : ''}`}>
          <button
            className="fab main-fab bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform"
            style={{ transform: fabOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
            onClick={() => setFabOpen(f => !f)}
            aria-label="Main actions"
          >
            <i className={`fas ${fabOpen ? 'fa-times' : 'fa-plus'}`}></i>
          </button>
          <div className={`fab-options absolute bottom-16 right-0 flex flex-col items-end space-y-3 transition-all ${fabOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            style={{ minWidth: 48 }}
          >
            {fabOptions.map(opt => (
              <button
                key={opt.tooltip}
                className="fab option-fab bg-white text-indigo-600 w-12 h-12 rounded-full shadow flex items-center justify-center text-xl relative group"
                onClick={() => handleOptionClick(opt.tooltip)}
                aria-label={opt.tooltip}
                data-tooltip={opt.tooltip}
              >
                <i className={opt.icon}></i>
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition">
                  {opt.tooltip}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Back to Top Button */}
      <button className="back-to-top fixed bottom-8 left-8 z-40 bg-white text-indigo-600 w-12 h-12 rounded-full shadow flex items-center justify-center text-xl hover:bg-indigo-50" onClick={handleBackToTop}>
        <i className="fas fa-arrow-up"></i>
      </button>
      {/* Live Chat Button */}
      <button className="live-chat-btn fixed bottom-28 left-8 z-40 bg-indigo-600 text-white w-12 h-12 rounded-full shadow flex items-center justify-center text-xl hover:bg-indigo-700">
        <i className="fas fa-comments"></i>
        <span className="chat-notification absolute top-1 right-1 bg-pink-500 text-white text-xs rounded-full px-1.5">1</span>
      </button>
    </>
  );
};

export default FloatingActions; 