import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { icon: 'fas fa-users', number: 50000, label: 'Happy Customers' },
  { icon: 'fas fa-tshirt', number: 10000, label: 'Products Sold' },
  { icon: 'fas fa-star', number: 4.9, label: 'Rating', decimal: true },
  { icon: 'fas fa-shipping-fast', number: 24, label: 'Hour Delivery' },
];

const formatNumber = (n, decimal) => decimal ? n.toFixed(1) : n.toLocaleString();

const StatsSection = () => {
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const durations = [1200, 1200, 1200, 1200];
    stats.forEach((stat, idx) => {
      const start = 0;
      const end = stat.number;
      const decimal = !!stat.decimal;
      const step = decimal ? 0.1 : Math.ceil(end / 60);
      let current = start;
      const interval = setInterval(() => {
        current += step;
        if ((decimal && current >= end) || (!decimal && current >= end)) {
          current = end;
          clearInterval(interval);
        }
        setCounts(c => {
          const copy = [...c];
          copy[idx] = current;
          return copy;
        });
      }, durations[idx] / 60);
    });
  }, [visible]);

  return (
    <section className="py-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl text-indigo-600 mb-2"><i className={stat.icon}></i></div>
              <div className="text-2xl font-bold text-gray-800">
                {visible ? formatNumber(counts[idx], !!stat.decimal) : (stat.decimal ? '0.0' : '0')}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 