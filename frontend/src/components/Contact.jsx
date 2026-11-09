import { useState } from 'react';
import { Mail, Phone, MapPin, Download, Send } from 'lucide-react';
import { contact } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const initialForm = { name: '', email: '', subject: '', message: '', website: '' };
const apiUrl = import.meta.env.VITE_CONTACT_API_URL;

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!apiUrl) {
      setStatus({
        type: 'error',
        message: 'The enquiry service is not configured yet. Please contact me by email instead.',
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your enquiry…' });
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          website: form.website,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || 'We could not send your enquiry. Please try again.');
      }
      setForm(initialForm);
      setStatus({ type: 'success', message: 'Thanks for reaching out. Your enquiry has been submitted successfully.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please email me directly.',
      });
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-label">Contact</div>
        <h2 className="section-title">Let's Work Together</h2>
        <div className="contact-card">
          <div className="contact-title">Have a project in mind?</div>
          <p className="contact-sub">
            Share a little about your project, infrastructure challenge, or opportunity. I’ll get back to you by email.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <label>
                Your name
                <input name="name" value={form.name} onChange={handleChange} autoComplete="name" maxLength={80} required />
              </label>
              <label>
                Email address
                <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" maxLength={254} required />
              </label>
            </div>
            <label>
              Subject
              <input name="subject" value={form.subject} onChange={handleChange} maxLength={120} required />
            </label>
            <label>
              Message
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} minLength={20} maxLength={4000} required />
            </label>
            <label className="contact-honeypot" aria-hidden="true">
              Leave this field empty
              <input name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
            </label>
            <button className="btn-primary contact-submit" type="submit" disabled={status.type === 'loading'}>
              <Send size={16} /> {status.type === 'loading' ? 'Sending…' : 'Send enquiry'}
            </button>
            {status.message && (
              <p className={`contact-form-status ${status.type}`} role="status" aria-live="polite">
                {status.message}
              </p>
            )}
          </form>

          <div className="contact-divider"><span>Or connect directly</span></div>
          <div className="contact-primary-btns">
            <a href={`mailto:${contact.email}`} className="btn-outline">
              <Mail size={16} /> Email me
            </a>
            <a href={contact.resume} download className="btn-outline">
              <Download size={16} /> Download Resume
            </a>
          </div>

          <div className="contact-links">
            <a href={`tel:${contact.phone.replace(/\\s+/g, '')}`} className="contact-link">
              <Phone size={16} /> {contact.phone}
            </a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="contact-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.67-1.618-.915-2.214-.242-.592-.482-.511-.662-.511-.17 0-.365-.003-.56-.003-.196 0-.515.074-.784.372-.27.299-1.03 1.008-1.03 2.458 0 1.45 1.054 2.848 1.202 3.048.148.199 2.073 3.165 5.022 4.441.701.303 1.248.484 1.674.62.705.223 1.345.191 1.851.115.565-.084 1.758-.718 2.007-1.411.248-.693.248-1.288.173-1.411-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="contact-link">
              <LinkedinIcon size={16} /> LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" className="contact-link">
              <GithubIcon size={16} /> GitHub
            </a>
            <span className="contact-link" style={{ cursor: 'default' }}>
              <MapPin size={16} /> {contact.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
