import { contact } from '../data/portfolioData';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <div className="section-label">About Me</div>
            <h2 className="section-title">Architecting scalable, secure, and cost-efficient cloud environments</h2>
            <p className="about-text">
              I specialize in building high-availability cloud infrastructure and automated CI/CD ecosystems
              that bridge the gap between development and operations. My approach focuses on Infrastructure
              as Code, robust observability, and continuous security integration.
            </p>
            <p className="about-text">
              With a track record of production migrations and measurable cost optimizations, I'm dedicated
              to driving operational excellence through automation and reliability engineering.
            </p>
            <div className="highlight-chips">
              <span className="chip">IaC Specialist</span>
              <span className="chip">Cloud Migration</span>
              <span className="chip">Cost Optimization</span>
              <span className="chip">DevSecOps</span>
            </div>
          </div>
          <div className="about-img">
            <img src="/jeni-headshot.webp" alt="Jeni Patel" />
          </div>
        </div>
        <div className="highlight-chips" style={{ marginTop: '2.5rem' }}>
          <a href={contact.resume} download className="btn-outline">Download Resume</a>
        </div>
      </div>
    </section>
  );
};

export default About;
