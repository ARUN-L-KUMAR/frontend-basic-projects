import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <i className="fas fa-shopping-bag"></i>
            <span>StyleHub</span>
          </div>
          <p>Your premium destination for modern fashion and lifestyle products.</p>
          <div className="social-links">
            <a href="https://linkedin.com/in/arun-l-kumar" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/arun-l-kumar" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="mailto:arunkumar582004@gmail.com"><i className="fas fa-envelope"></i></a>
            <a href="tel:+918778929845"><i className="fas fa-phone"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Size Guide</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p><i className="fas fa-phone"></i> +91-8778929845</p>
            <p><i className="fas fa-envelope"></i> arunkumar582004@gmail.com</p>
            <p><i className="fab fa-linkedin"></i> <a href="https://linkedin.com/in/arun-l-kumar" target="_blank" rel="noopener noreferrer">Arun L Kumar</a></p>
            <p><i className="fab fa-github"></i> <a href="https://github.com/arun-l-kumar" target="_blank" rel="noopener noreferrer">arun-l-kumar</a></p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 StyleHub. All rights reserved. | Developed by <a href="https://linkedin.com/in/arun-l-kumar" target="_blank" rel="noopener noreferrer">Arun L Kumar</a> | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
      </div>
    </div>
  </footer>
);

export default Footer; 