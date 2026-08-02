import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-label">Contact</div>
        <h2 className="section-title">Let's Work Together</h2>
        
        <div className="contact-card">
          <ContactForm />
          
          <div className="contact-links">
            <a href="mailto:pjeni3095@gmail.com" className="contact-link">📧 Email</a>
            <a href="https://wa.me/918849742011" className="contact-link">💬 WhatsApp</a>
            <a href="https://github.com/jenidevops30" className="contact-link">🐙 GitHub</a>
            <a href="https://www.linkedin.com/in/jeni-patel-devops-engg/" className="contact-link">💼 LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
