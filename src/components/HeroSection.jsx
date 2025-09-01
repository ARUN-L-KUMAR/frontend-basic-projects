import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&q=80',
    badge: 'New Collection 2025',
    title: 'Discover Your Style',
    desc: 'Premium quality clothing and accessories for the modern lifestyle',
    buttons: [
      { label: 'Shop Now', style: 'bg-indigo-600 text-white', id: 'shopNowBtn' },
      { label: 'View Collection', style: 'bg-white text-indigo-600', id: 'viewCollectionBtn' },
    ],
  },
  {
    bg: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&h=1080&fit=crop&q=80',
    badge: 'Limited Edition',
    title: 'Exclusive Fashion',
    desc: 'Handpicked designer pieces for the discerning customer',
    buttons: [
      { label: 'Explore', style: 'bg-indigo-600 text-white', id: 'exploreBtn' },
      { label: 'Learn More', style: 'bg-white text-indigo-600', id: 'learnMoreBtn' },
    ],
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(() => {
        setCurrent(c => (c + 1) % slides.length);
      }, AUTO_SLIDE_INTERVAL);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, paused]);

  const goTo = idx => setCurrent(idx);
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent(c => (c + 1) % slides.length);

  return (
    <section
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundImage: `url(${slide.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="flex flex-col justify-center items-start h-full bg-black/40 px-8 md:px-24">
              <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full mb-4 text-xs font-semibold tracking-wider shadow">{slide.badge}</span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
              <p className="mb-6 text-lg md:text-xl font-medium drop-shadow-lg">{slide.desc}</p>
              <div className="flex space-x-4">
                {slide.buttons.map(btn => (
                  <button key={btn.id} className={`px-6 py-2 rounded-full font-semibold shadow ${btn.style}`}>{btn.label}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Controls */}
        <button
          className="hero-nav prev absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-indigo-600 rounded-full p-2 shadow z-20"
          onClick={prev}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="hero-nav next absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-indigo-600 rounded-full p-2 shadow z-20"
          onClick={next}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        {/* Indicators */}
        <div className="hero-indicators absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`indicator w-3 h-3 rounded-full border-2 ${idx === current ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-indigo-400'} cursor-pointer transition`}
              onClick={() => goTo(idx)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 