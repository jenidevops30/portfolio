import { Mail, Phone, MapPin, Download } from 'lucide-react';
import { contact } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const Contact = () => (
  <section id="contact">
    <div className="container">
      <div className="section-label">Contact</div>
      <h2 className="section-title">Let's Work Together</h2>
      <div className="contact-card">
        <div className="contact-title">Have a project in mind?</div>
        <p className="contact-sub">
          I’m happy to connect about DevOps, AWS infrastructure, automation, and engineering opportunities.
        </p>
        <div className="contact-primary-btns">
          <a href={`mailto:${contact.email}`} className="btn-outline">
            <Mail size={16} /> Email me
          </a>
          <a href={contact.resume} download className="btn-outline">
            <Download size={16} /> Download Resume
          </a>
        </div>
        <div className="contact-links">
          <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="contact-link">
            <Phone size={16} /> {contact.phone}
          </a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="contact-link">
            <span aria-hidden="true">◉</span> WhatsApp
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

export default Contact;
