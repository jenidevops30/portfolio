import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <div className="section-label">About Me</div>
            <h2 className="section-title">Architecting scalable, secure, and cost-efficient cloud environments</h2>
            <p className="about-text">I specialize in building high-availability cloud infrastructure and automated CI/CD ecosystems that bridge the gap between development and operations. My approach focuses on Infrastructure as Code (IaC), robust observability, and continuous security integration.</p>
            <p className="about-text">With a track record of successful production migrations and significant cost optimizations, I am dedicated to driving operational excellence through automation and reliability engineering.</p>
            <div className="highlight-chips">
              <span className="chip">IaC Specialist</span>
              <span className="chip">Cloud Migration</span>
              <span className="chip">Cost Optimization</span>
              <span className="chip">DevSecOps</span>
            </div>
          </div>
          <div className="about-img">
            <img src="/jeni-headshot.webp" alt="Jeni Patel" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
