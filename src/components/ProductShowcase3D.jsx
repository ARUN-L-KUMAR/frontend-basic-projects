import React, { useRef } from 'react';

const showcaseItems = [
  {
    faces: [
      { side: 'front', img: '/shirt1.jpg', alt: 'Shirt Front' },
      { side: 'back', img: '/shirt2.webp', alt: 'Shirt Back' },
      { side: 'left', img: '/shirt1.jpg', alt: 'Shirt Left Side', style: { filter: 'hue-rotate(15deg)' } },
      { side: 'right', img: '/shirt2.webp', alt: 'Shirt Right Side', style: { filter: 'hue-rotate(-15deg)' } },
      { side: 'top', img: '/shirt1.jpg', alt: 'Shirt Top View', style: { filter: 'brightness(1.2) contrast(0.8)' } },
      { side: 'bottom', img: '/shirt2.webp', alt: 'Shirt Bottom View', style: { filter: 'brightness(0.8) contrast(1.2)' } },
    ],
    info: {
      title: 'Premium Cotton Shirt',
      desc: 'High-quality cotton shirt with premium finish and comfortable fit',
    },
  },
  {
    faces: [
      { side: 'front', img: '/T-shirt.jpg', alt: 'T-Shirt Front' },
      { side: 'back', img: '/s-half-sleeve-printed.webp', alt: 'T-Shirt Back' },
      { side: 'left', img: '/T-shirt.jpg', alt: 'T-Shirt Left Side', style: { filter: 'hue-rotate(10deg)' } },
      { side: 'right', img: '/s-half-sleeve-printed.webp', alt: 'T-Shirt Right Side', style: { filter: 'hue-rotate(-10deg)' } },
      { side: 'top', img: '/T-shirt.jpg', alt: 'T-Shirt Top View', style: { filter: 'brightness(1.1) contrast(0.9)' } },
      { side: 'bottom', img: '/s-half-sleeve-printed.webp', alt: 'T-Shirt Bottom View', style: { filter: 'brightness(0.9) contrast(1.1)' } },
    ],
    info: {
      title: 'Designer Graphic T-Shirt',
      desc: 'Trendy graphic design with premium quality fabric and comfortable fit for everyday wear',
    },
  },
];

const ProductShowcase3D = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, idx) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 30;
    const rotateX = ((y / rect.height) - 0.5) * -30;
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };
  const handleMouseLeave = (idx) => {
    const card = cardRefs.current[idx];
    if (card) card.style.transform = '';
  };

  return (
    <section className="product-showcase-3d py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-2xl font-bold mb-4 text-center">3D Product Experience</h2>
        <p className="text-center opacity-90 mb-10">Interact with our products in stunning 3D - hover to explore all angles</p>
        <div className="showcase-grid grid grid-cols-1 md:grid-cols-2 gap-10">
          {showcaseItems.map((item, idx) => (
            <div className="showcase-item flex flex-col md:flex-row items-center gap-8" key={idx}>
              <div
                className="product-3d-container w-64 h-64 mx-auto md:mx-0 perspective"
                style={{ perspective: 1000 }}
              >
                <div
                  className="product-3d-model w-full h-full relative"
                  ref={el => cardRefs.current[idx] = el}
                  onMouseMove={e => handleMouseMove(e, idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  style={{ transition: 'transform 0.3s cubic-bezier(.25,.8,.25,1)' }}
                >
                  {item.faces.map(face => (
                    <div
                      key={face.side}
                      className={`product-3d-face ${face.side} absolute w-full h-full`}
                      style={face.style}
                    >
                      <img src={face.img} alt={face.alt} className="w-full h-full object-cover rounded-xl shadow" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-3d-info text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">{item.info.title}</h3>
                <p className="text-gray-600">{item.info.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase3D; 