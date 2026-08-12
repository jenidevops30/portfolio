
const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <div className="section-label">About Me</div>
            <h2 className="section-title">Architecting scalable, secure, and cost-efficient cloud environments</h2>
            <p className="about-text">I'm a DevOps Engineer with <strong>6+ years of experience</strong> specializing in high-availability cloud infrastructure and automated CI/CD ecosystems that bridge the gap between development and operations. My approach is rooted in Infrastructure as Code (IaC), robust observability, and continuous security integration.</p>
            <p className="about-text">With a track record of successful production migrations and significant cost optimizations (30–60% savings), I am dedicated to driving operational excellence through automation and reliability engineering.</p>
            
            <div className="specialization-grid">
              <div className="spec-item">
                <div className="spec-icon">🤖</div>
                <div className="spec-info">
                  <h3>AI Infrastructure</h3>
                  <p>AIOps &amp; GPU Orchestration</p>
                </div>
              </div>
              <div className="spec-item">
                <div className="spec-icon">💰</div>
                <div className="spec-info">
                  <h3>FinOps Elite</h3>
                  <p>Cost Management &amp; Savings</p>
                </div>
              </div>
              <div className="spec-item">
                <div className="spec-icon">⚡</div>
                <div className="spec-info">
                  <h3>Multi-Region DR</h3>
                  <p>ap-south-1 &amp; ap-south-2</p>
                </div>
              </div>
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
