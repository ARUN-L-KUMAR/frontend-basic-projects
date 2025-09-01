import React, { useState } from 'react';
import './index.css';
import PartnersSection from './components/PartnersSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import QuickViewModal from './components/QuickViewModal';
import FloatingActions from './components/FloatingActions';
import Header from './components/Header';
import ProductsSection from './components/ProductsSection';
import FilterSection from './components/FilterSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import ProductShowcase3D from './components/ProductShowcase3D';
import FloatingElements from './components/FloatingElements';
import { useNotification } from './components/NotificationContext';

function App() {
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');
  const [productsToShow, setProductsToShow] = useState(4); // adjust to 8 if you have more products
  const { showNotification } = useNotification();
  const handleContactSubmit = e => {
    e.preventDefault();
    showNotification('Message sent! We will get back to you soon.', 'success');
  };
  return (
    <>
      <FloatingElements />
      {/* Header Section */}
      <Header onCartClick={() => setCartSidebarOpen(true)} />
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <div className="hero-slider">
            <div className="hero-slide active" style={{backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&q=80')"}}>
              <div className="hero-content">
                <span className="hero-badge">New Collection 2025</span>
                <h1>Discover Your Style</h1>
                <p>Premium quality clothing and accessories for the modern lifestyle</p>
                <div className="hero-buttons">
                  <button className="cta-btn primary" id="shopNowBtn">Shop Now</button>
                  <button className="cta-btn secondary" id="viewCollectionBtn">View Collection</button>
                </div>
              </div>
            </div>
            <div className="hero-slide" style={{backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&h=1080&fit=crop&q=80')"}}>
              <div className="hero-content">
                <span className="hero-badge">Limited Edition</span>
                <h1>Exclusive Fashion</h1>
                <p>Handpicked designer pieces for the discerning customer</p>
                <div className="hero-buttons">
                  <button className="cta-btn primary" id="exploreBtn">Explore</button>
                  <button className="cta-btn secondary" id="learnMoreBtn">Learn More</button>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-controls">
            <button className="hero-nav prev"><i className="fas fa-chevron-left"></i></button>
            <button className="hero-nav next"><i className="fas fa-chevron-right"></i></button>
          </div>
          <div className="hero-indicators">
            <span className="indicator active"></span>
            <span className="indicator"></span>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-users"></i></div>
              <div className="stat-number" data-target="50000">0</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-tshirt"></i></div>
              <div className="stat-number" data-target="10000">0</div>
              <div className="stat-label">Products Sold</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-star"></i></div>
              <div className="stat-number" data-target="4.9">0</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-shipping-fast"></i></div>
              <div className="stat-number" data-target="24">0</div>
              <div className="stat-label">Hour Delivery</div>
            </div>
          </div>
        </div>
      </section>
      {/* Category Filter */}
      <FilterSection filter={filter} setFilter={setFilter} view={view} setView={setView} />
      {/* Products Section */}
      <ProductsSection onQuickView={setQuickViewProduct} filter={filter} view={view} productsToShow={productsToShow} setProductsToShow={setProductsToShow} />
      {/* 3D Product Showcase */}
      <ProductShowcase3D />
      {/* Interactive Features Section */}
      <section className="interactive-features">
        <div className="container">
          <h2 className="section-title">Interactive Features</h2>
          <div className="features-grid">
            <div className="feature-card interactive-card">
              <div className="card-icon">
                <i className="fas fa-vr-cardboard"></i>
              </div>
              <h3>Virtual Try-On</h3>
              <p>See how products look on you with AR technology</p>
              <button className="feature-btn">Try Now</button>
            </div>
            <div className="feature-card interactive-card">
              <div className="card-icon">
                <i className="fas fa-cube"></i>
              </div>
              <h3>3D Product View</h3>
              <p>Rotate and zoom to examine every detail</p>
              <button className="feature-btn">Explore</button>
            </div>
            <div className="feature-card interactive-card">
              <div className="card-icon">
                <i className="fas fa-palette"></i>
              </div>
              <h3>Color Customizer</h3>
              <p>Customize colors and materials in real-time</p>
              <button className="feature-btn">Customize</button>
            </div>
            <div className="feature-card interactive-card">
              <div className="card-icon">
                <i className="fas fa-ruler"></i>
              </div>
              <h3>Size Guide</h3>
              <p>Interactive size calculator for perfect fit</p>
              <button className="feature-btn">Calculate</button>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About StyleHub</h2>
              <p className="about-description">
                Welcome to StyleHub, your premium destination for modern fashion and lifestyle products. 
                We curate the finest collection of clothing, shoes, and accessories to help you express 
                your unique style with confidence.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-award"></i>
                  </div>
                  <h4>Premium Quality</h4>
                  <p>Handpicked products from trusted brands worldwide</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                  <h4>Fast Delivery</h4>
                  <p>Express shipping with 24-hour delivery guarantee</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <h4>24/7 Support</h4>
                  <p>Round-the-clock customer service assistance</p>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="floating-card">
                <div className="card-3d">
                  <div className="card-front">
                    <i className="fas fa-shopping-bag"></i>
                    <h3>StyleHub</h3>
                  </div>
                  <div className="card-back">
                    <p>Premium Fashion Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over $50</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-undo-alt"></i>
              </div>
              <h3>Easy Returns</h3>
              <p>30-day return policy with no questions asked</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Payment</h3>
              <p>100% secure payment with SSL encryption</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Quality Guarantee</h3>
              <p>Premium quality products with warranty</p>
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSection />
      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="section-title">Get In Touch</h2>
              <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>+91-8778929845</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>arunkumar582004@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fab fa-linkedin"></i>
                  </div>
                  <div className="contact-text">
                    <h4>LinkedIn</h4>
                    <p><a href="https://linkedin.com/in/arun-l-kumar" target="_blank" rel="noopener noreferrer">Arun L Kumar</a></p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fab fa-github"></i>
                  </div>
                  <div className="contact-text">
                    <h4>GitHub</h4>
                    <p><a href="https://github.com/arun-l-kumar" target="_blank" rel="noopener noreferrer">arun-l-kumar</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-container">
              <form className="contact-form" id="contactForm" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <input type="text" name="name" placeholder="Your Name" required />
                  <i className="fas fa-user"></i>
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Your Email" required />
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="form-group">
                  <input type="tel" name="phone" placeholder="Your Phone" />
                  <i className="fas fa-phone"></i>
                </div>
                <div className="form-group">
                  <select name="subject" required>
                    <option value="">Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                  <i className="fas fa-tag"></i>
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                  <i className="fas fa-comment"></i>
                </div>
                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <FAQSection />
      <PartnersSection />
      <NewsletterSection />
      <Footer />
      <CartSidebar open={cartSidebarOpen} onClose={() => setCartSidebarOpen(false)} />
      <QuickViewModal open={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
      <FloatingActions />
      {/* Main Content: All sections from enhanced-index.html will be migrated here, preserving class names and structure. */}
      {/* ... (continue with header, hero, stats, filter, products, etc.) ... */}
    </>
  );
}

export default App;
