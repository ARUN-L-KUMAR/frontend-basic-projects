import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unused items in original packaging. Simply contact our customer service team to initiate a return.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days, while express shipping delivers within 24 hours for orders placed before 2 PM.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship worldwide! International shipping typically takes 7-14 business days depending on your location.'
  },
  {
    question: 'Are your payment methods secure?',
    answer: 'Absolutely! We use SSL encryption and accept all major credit cards, PayPal, and other secure payment methods.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in your account dashboard.'
  },
  {
    question: 'What if I need help with sizing?',
    answer: 'Check our detailed size guide on each product page, or contact our customer service team for personalized sizing assistance.'
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = idx => setOpenIdx(openIdx === idx ? null : idx);
  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <div className="faq-item" key={idx}>
              <div className="faq-question" onClick={() => toggle(idx)} style={{cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <h4>{faq.question}</h4>
                <i className={`fas fa-chevron-${openIdx === idx ? 'up' : 'down'}`}></i>
              </div>
              <div className={`faq-answer transition-all duration-300 overflow-hidden ${openIdx === idx ? 'max-h-40 py-2' : 'max-h-0 py-0'}`.trim()}>
                {openIdx === idx && <p>{faq.answer}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 