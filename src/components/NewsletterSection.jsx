import React from 'react';
import { useNotification } from './NotificationContext';

const NewsletterSection = () => {
  const { showNotification } = useNotification();
  const handleSubmit = (e) => {
    e.preventDefault();
    showNotification('Subscribed to newsletter!', 'success');
  };
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>Stay Updated with StyleHub</h3>
            <p>Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips delivered to your inbox.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="email" className="newsletter-input" placeholder="Enter your email address" required />
            <button type="submit" className="newsletter-btn">
              <i className="fas fa-paper-plane"></i>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection; 