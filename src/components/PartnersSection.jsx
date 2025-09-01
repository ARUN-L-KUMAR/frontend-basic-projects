import React from 'react';

const partners = [
  { name: 'Nike', img: '/Nike Logo.jpeg', delay: 100 },
  { name: 'Adidas', img: '/Adidas - Logo.jpeg', delay: 200 },
  { name: 'Puma', img: '/Puma - logo.jpeg', delay: 300 },
  { name: 'Zara', img: '/Zara logo.jpeg', delay: 400 },
  { name: 'H&M', img: '/H&M - logo.jpeg', delay: 500 },
  { name: "Levi's", img: "/Levi's -logo.jpeg", delay: 600 },
  { name: 'Gucci', img: '/Gucci-logo.jpeg', delay: 700 },
  { name: 'Calvin Klein', img: '/Calvin klein-logo.jpeg', delay: 800 },
];

const stats = [
  { number: 500, label: 'Partner Brands' },
  { number: 2000000, label: 'Products' },
  { number: 50, label: 'Countries' },
  { number: 15, label: 'Years Experience' },
];

const PartnersSection = () => (
  <section className="partners-section">
    <div className="container">
      <h2 className="section-title">Our Brand Partners</h2>
      <p className="partners-subtitle">Trusted by leading fashion brands worldwide</p>
      <div className="partners-slider">
        {partners.map((partner, idx) => (
          <div className="partner-logo" key={partner.name} data-aos="fade-up" data-aos-delay={partner.delay}>
            <div className="partner-card">
              <img src={partner.img} alt={partner.name} />
              <span className="partner-name">{partner.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="partners-stats">
        {stats.map((stat, idx) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-number" data-target={stat.number}>0</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection; 