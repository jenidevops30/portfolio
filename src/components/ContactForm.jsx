import { useState, useRef } from 'react';
import { Send, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'AWS Cloud Architecture',
    budgetUrgency: 'Standard Timeline (2-4 weeks)',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('IDLE'); // IDLE | SENDING | SUCCESS | ERROR

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Corporate email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project or inquiry';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('SENDING');

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // If EmailJS env vars not configured yet, use mailto fallback
    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.projectType} from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Corporate Email: ${formData.email}\n` +
        `Project Type: ${formData.projectType}\n` +
        `Timeline / Budget: ${formData.budgetUrgency}\n\n` +
        `Message:\n${formData.message}`
      );
      window.open(`mailto:pjeni3095@gmail.com?subject=${subject}&body=${body}`, '_blank');
      setStatus('SUCCESS');
      setFormData({
        name: '',
        email: '',
        projectType: 'AWS Cloud Architecture',
        budgetUrgency: 'Standard Timeline (2-4 weeks)',
        message: ''
      });
      setTimeout(() => setStatus('IDLE'), 6000);
      return;
    }

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setStatus('SUCCESS');
      setFormData({
        name: '',
        email: '',
        projectType: 'AWS Cloud Architecture',
        budgetUrgency: 'Standard Timeline (2-4 weeks)',
        message: ''
      });
      setTimeout(() => setStatus('IDLE'), 6000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 7000);
    }
  };

  return (
    <div className="contact-card-wrapper">
      <form ref={formRef} onSubmit={handleSubmit} className="contact-form-layout" noValidate>
        {/* Name Field */}
        <div className="form-group-item">
          <label htmlFor="contact-name">Full Name *</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Alex Morgan"
            className={errors.name ? 'input-error' : ''}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
          {errors.name && (
            <div id="name-error" className="field-error-msg" role="alert">
              <AlertCircle size={14} />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Corporate Email Field */}
        <div className="form-group-item">
          <label htmlFor="contact-email">Corporate Email Address *</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="alex@company.com"
            className={errors.email ? 'input-error' : ''}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email && (
            <div id="email-error" className="field-error-msg" role="alert">
              <AlertCircle size={14} />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* 2-Column: Project Type Dropdown & Timeline/Budget */}
        <div className="form-grid-2col">
          <div className="form-group-item">
            <label htmlFor="contact-project-type">Project Type</label>
            <select
              id="contact-project-type"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="AWS Cloud Architecture">AWS Cloud Architecture &amp; Migration</option>
              <option value="DevOps & CI/CD Pipelines">DevOps &amp; CI/CD Pipeline Automation</option>
              <option value="Kubernetes / Docker Orchestration">Kubernetes &amp; Container Platforms</option>
              <option value="FinOps & Cost Optimization">FinOps &amp; Cloud Cost Optimization</option>
              <option value="Full-Time / Contract Consulting">Contract / Full-Time Consulting</option>
            </select>
          </div>

          <div className="form-group-item">
            <label htmlFor="contact-budget-urgency">Budget / Urgency</label>
            <select
              id="contact-budget-urgency"
              name="budgetUrgency"
              value={formData.budgetUrgency}
              onChange={handleChange}
            >
              <option value="Immediate / Critical (1-2 weeks)">Immediate / Critical (1-2 weeks)</option>
              <option value="Standard Timeline (2-4 weeks)">Standard Timeline (2-4 weeks)</option>
              <option value="Planning Phase (1-2 months)">Planning Phase (1-2 months)</option>
              <option value="Advisory / Consultation">Advisory / Consultation</option>
            </select>
          </div>
        </div>

        {/* Message Field */}
        <div className="form-group-item">
          <label htmlFor="contact-message">Message / Project Scope *</label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your infrastructure goals, existing cloud stack, or project requirements..."
            className={errors.message ? 'input-error' : ''}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            rows="5"
            required
          />
          {errors.message && (
            <div id="message-error" className="field-error-msg" role="alert">
              <AlertCircle size={14} />
              <span>{errors.message}</span>
            </div>
          )}
        </div>

        {/* Primary CTA Button */}
        <button
          type="submit"
          className="btn btn-primary btn-contact-submit"
          disabled={status === 'SENDING'}
          id="contact-submit-button"
        >
          {status === 'SENDING' ? (
            <>
              <Loader2 size={18} className="spin-animation" />
              <span>Transmitting Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send size={16} />
            </>
          )}
        </button>

        {/* Feedback Alerts */}
        {status === 'SUCCESS' && (
          <div className="form-feedback-alert success" role="status">
            <CheckCircle2 size={18} />
            <span>Thank you! Your message has been dispatched. Jeni will respond within 24 hours.</span>
          </div>
        )}

        {status === 'ERROR' && (
          <div className="form-feedback-alert error" role="alert">
            <AlertCircle size={18} />
            <span>
              Could not complete automated delivery. Please email directly at{' '}
              <a href="mailto:pjeni3095@gmail.com" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>
                pjeni3095@gmail.com
              </a>.
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
