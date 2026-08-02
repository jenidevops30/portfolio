import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('SENDING');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('SUCCESS');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('IDLE'), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modern-form-container">
      <form onSubmit={handleSubmit} className="modern-contact-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can I help you?"
            rows="5"
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className={`submit-btn ${status === 'SENDING' ? 'loading' : ''}`}
          disabled={status === 'SENDING'}
        >
          {status === 'SENDING' ? 'Sending...' : 'Send Message'}
          <span className="btn-glow"></span>
        </button>

        {status === 'SUCCESS' && (
          <div className="form-status success">
            Message sent successfully! I'll get back to you soon.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
