import React from 'react';

const Contact = () => {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-label">Contact</div>
        <h2 className="section-title">Let's Work Together</h2>
        <div className="contact-card">
          <div className="contact-title">Have a project in mind?</div>
          <p className="contact-sub">I'm always open to discussing DevOps challenges, cloud architecture, or new
            opportunities. Let's connect!</p>
          <a href="mailto:jeni@jenidevops.in" className="btn-primary"
            style={{ display: 'inline-block' }}>pjeni3095@gmail.com</a>
          <div className="contact-links">
            <a href="https://wa.me/918849742011" className="contact-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.67-1.618-.915-2.214-.242-.592-.482-.511-.662-.511-.17 0-.365-.003-.56-.003-.196 0-.515.074-.784.372-.27.299-1.03 1.008-1.03 2.458 0 1.45 1.054 2.848 1.202 3.048.148.199 2.073 3.165 5.022 4.441.701.303 1.248.484 1.674.62.705.223 1.345.191 1.851.115.565-.084 1.758-.718 2.007-1.411.248-.693.248-1.288.173-1.411-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a href="https://github.com/jenidevops30" className="contact-link">🐙 GitHub</a>
            <a href="https://www.linkedin.com/in/jeni-patel-devops-engg/" className="contact-link">💼 LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
