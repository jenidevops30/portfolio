import { useState, useEffect } from 'react';

const Hero = ({ onNavigate }) => {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  const [line4, setLine4] = useState('');
  const [activeLine, setActiveLine] = useState(1); // 1, 2, 3, 4, or null

  useEffect(() => {
    let isMounted = true;
    const l1Text = 'AWS Cloud & DevOps Engineer';
    const l2Text = 'Architecting Scalable, Secure Cloud Solutions';
    const l3Text = '6+ Years AWS | Kubernetes | Terraform Expert';
    const l4Text = 'Currently at Webcontrive';
    const speed = 45; // ms per character — slightly faster for longer lines

    const type = async () => {
      // Type Line 1
      for (let i = 0; i <= l1Text.length; i++) {
        if (!isMounted) return;
        setLine1(l1Text.substring(0, i));
        await new Promise((r) => setTimeout(r, speed));
      }
      if (!isMounted) return;
      setActiveLine(2);

      // Type Line 2
      for (let i = 0; i <= l2Text.length; i++) {
        if (!isMounted) return;
        setLine2(l2Text.substring(0, i));
        await new Promise((r) => setTimeout(r, speed));
      }
      if (!isMounted) return;
      setActiveLine(3);

      // Type Line 3
      for (let i = 0; i <= l3Text.length; i++) {
        if (!isMounted) return;
        setLine3(l3Text.substring(0, i));
        await new Promise((r) => setTimeout(r, speed));
      }
      if (!isMounted) return;
      setActiveLine(4);

      // Type Line 4
      for (let i = 0; i <= l4Text.length; i++) {
        if (!isMounted) return;
        setLine4(l4Text.substring(0, i));
        await new Promise((r) => setTimeout(r, speed));
      }
      if (!isMounted) return;
      setActiveLine(null); // Finished
    };

    // Quick delay before starting typing
    setTimeout(() => {
      if (isMounted) type();
    }, 500);

    return () => {
      isMounted = false;
    };
  }, []);

  const techIcons = [
    { name: 'AWS', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', id: 'aws-logo' },
    { name: 'Terraform', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
    { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Linux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' }
  ];

  return (
    <section id="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="glass-terminal-panel">
            <div className="hero-tag badge-pulse-animation" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(62, 201, 168, 0.1)', border: '1px solid rgba(62, 201, 168, 0.25)', borderRadius: '100px', padding: '6px 16px', fontSize: '0.82rem', color: 'var(--accent)', marginBottom: '1.5rem' }}>
              <span className="live-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
              AWS DevOps Engineer · 6+ Years Experience
            </div>
            
            <h1 className="hero-title" style={{ minHeight: '220px', display: 'flex', flexDirection: 'column', gap: '0.35rem', lineHeight: '1.25' }}>
              <span style={{ fontSize: '0.72em', color: 'var(--accent)' }} className={activeLine === 1 ? 'terminal-cursor' : ''}>{line1}</span>
              <span style={{ fontSize: '0.85em' }} className={activeLine === 2 ? 'terminal-cursor' : ''}>{line2}</span>
              <span style={{ fontSize: '0.68em', color: 'var(--text-dim)' }} className={activeLine === 3 ? 'terminal-cursor' : ''}>{line3}</span>
              <span style={{ fontSize: '0.58em', color: 'var(--muted)', fontWeight: 500 }} className={activeLine === 4 ? 'terminal-cursor' : ''}>{line4}</span>
            </h1>
            
            <p className="hero-sub" style={{ maxWidth: '100%', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
              AWS-focused DevOps Engineer with <strong>6+ years of experience</strong> building highly available cloud infrastructure, Kubernetes platforms, and zero-downtime CI/CD pipelines. Currently pursuing <strong>AWS SAA-C03</strong>.
            </p>
            
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => onNavigate('projects')}>View Infrastructure</button>
              <button className="btn-outline" onClick={() => onNavigate('contact')}>Initialize Contact</button>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>📄</span> Download Resume
              </a>
            </div>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">6+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div>
              <div className="stat-num">100+</div>
              <div className="stat-label">Deployments Handled</div>
            </div>
            <div>
              <div className="stat-num">99.95%</div>
              <div className="stat-label">Uptime Achieved</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="tech-cloud">
            {techIcons.map((icon, index) => (
              <div key={index} className={`tech-icon-item item-${index}`} id={icon.id || ''}>
                <img src={icon.url} alt={icon.name} />
                <div className="icon-glow"></div>
              </div>
            ))}
            <div className="cloud-center-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
