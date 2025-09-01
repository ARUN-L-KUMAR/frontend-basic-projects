import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    image: '/testimonial1.jpg',
    name: 'Sarah Johnson',
    role: 'Fashion Enthusiast',
    quote: 'Amazing quality and fast delivery! I\'m completely satisfied with my purchase.'
  },
  {
    image: '/testimonial2.jpg',
    name: 'Mike Chen',
    role: 'Style Blogger',
    quote: 'Exceptional service and beautiful products. StyleHub has become my go-to store!'
  },
  {
    image: '/testimonial3.jpg',
    name: 'Priya Singh',
    role: 'Designer',
    quote: 'The best online shopping experience I\'ve ever had. Highly recommended!'
  },
];

const AUTO_SLIDE_INTERVAL = 6000;

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(() => {
        setCurrent(c => (c + 1) % testimonials.length);
      }, AUTO_SLIDE_INTERVAL);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, paused]);

  const goTo = idx => setCurrent(idx);
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  return (
    <section className="testimonials-section py-16 bg-gray-50" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container mx-auto px-4">
        <h2 className="section-title text-2xl font-bold mb-10 text-center">What Our Customers Say</h2>
        <div className="relative max-w-2xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`testimonial-card absolute left-0 right-0 transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <div className="testimonial-content bg-white rounded-xl shadow p-8 flex flex-col items-center">
                <div className="stars text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                <p className="text-lg italic text-gray-700 mb-4 text-center">"{t.quote}"</p>
                <div className="testimonial-author flex items-center gap-4 mt-4">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200" />
                  <div className="author-info">
                    <h4 className="font-semibold text-gray-800">{t.name}</h4>
                    <span className="text-xs text-gray-500">{t.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Controls */}
          <button
            className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-indigo-600 rounded-full p-2 shadow z-20"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-indigo-600 rounded-full p-2 shadow z-20"
            onClick={next}
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          {/* Indicators */}
          <div className="testimonial-indicators absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2 z-20 mt-6">
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                className={`indicator w-3 h-3 rounded-full border-2 ${idx === current ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-indigo-400'} cursor-pointer transition`}
                onClick={() => goTo(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 