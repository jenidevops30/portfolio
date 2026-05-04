import React from 'react';

const Hero = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 60,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero">
      <div className="container">
        <div className="hero-tag"><span></span> Open to new opportunities</div>
        <h1 className="hero-title">Hi, I'm <span className="accent">Jeni Patel</span></h1>
        <h1 className="hero-title"
          style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 600, color: 'var(--muted)', WebkitTextFillColor: 'unset', background: 'none' }}>
          Cloud & DevOps Architect</h1>
        <p className="hero-sub">Cloud & DevOps Architect with 6+ years of experience transforming complex infrastructure into high-availability, automated CI/CD ecosystems that drive operational excellence.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo('projects')}>View My Work</button>
          <button className="btn-outline" onClick={() => scrollTo('contact')}>Get In Touch</button>
        </div>
        <div className="hero-stats">
          <div>
            <div className="stat-num">9+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div>
            <div className="stat-num">100+</div>
            <div className="stat-label">Deployments Handled</div>
          </div>
          <div>
            <div className="stat-num">99.99%</div>
            <div className="stat-label">Availability Target</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
