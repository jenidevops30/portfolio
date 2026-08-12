import { useState, useRef } from 'react';

// EmailJS sends real emails — set your credentials in .env (see .env.example)
// Free tier: 200 emails/month — https://emailjs.com

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('IDLE'); // IDLE | SENDING | SUCCESS | ERROR

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SENDING');

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // If env vars not configured yet, open email client as reliable fallback
    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body    = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.open(`mailto:pjeni3095@gmail.com?subject=${subject}&body=${body}`, '_blank');
      setStatus('SUCCESS');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('IDLE'), 5000);
      return;
    }

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setStatus('SUCCESS');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('IDLE'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 6000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modern-form-container">
      <form ref={formRef} onSubmit={handleSubmit} className="modern-contact-form">
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
            ✅ Message sent! I&apos;ll get back to you soon.
          </div>
        )}
        {status === 'ERROR' && (
          <div className="form-status error">
            ❌ Failed to send. Email me directly at{' '}
            <a href="mailto:pjeni3095@gmail.com" style={{ color: 'var(--accent)' }}>
              pjeni3095@gmail.com
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
