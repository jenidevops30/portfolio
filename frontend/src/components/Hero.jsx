import { Server, ShieldCheck, GitBranch, Gauge } from 'lucide-react';

const STATUS_ROWS = [
  { icon: Server, label: 'Production ASG', status: 'Healthy' },
  { icon: ShieldCheck, label: 'Security Groups', status: 'Enforced' },
  { icon: GitBranch, label: 'CI/CD Pipeline', status: 'Passing' },
  { icon: Gauge, label: 'p95 Latency', status: '190ms' },
];

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
      <div className="container hero-layout">
        <div>
          <div className="hero-tag"><span className="dot"></span> Open to new opportunities</div>
          <h1 className="hero-title">Hi, I'm <span className="accent">Jeni Patel</span></h1>
          <p className="hero-role">Cloud &amp; DevOps Architect</p>
          <p className="hero-sub">
            I design and operate high-availability AWS infrastructure and automated CI/CD pipelines —
            turning fragile deployments into systems that scale, recover, and cost less to run.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>View My Work</button>
            <button className="btn-outline" onClick={() => scrollTo('contact')}>Get In Touch</button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div>
              <div className="stat-num">99.9%</div>
              <div className="stat-label">Uptime Sustained</div>
            </div>
            <div>
              <div className="stat-num">40%</div>
              <div className="stat-label">Avg. Cost Reduction</div>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-header">
            <span className="hero-visual-dot red"></span>
            <span className="hero-visual-dot yellow"></span>
            <span className="hero-visual-dot green"></span>
            <span className="hero-visual-title">prod-status · us-east-1</span>
          </div>
          <div className="hero-visual-body">
            {STATUS_ROWS.map((row) => (
              <div className="hvs-row" key={row.label}>
                <span className="hvs-service">
                  <row.icon size={16} />
                  {row.label}
                </span>
                <span className="hvs-status">
                  <span className="dot"></span>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
          <div className="hero-visual-footer">
            <span>Last deploy: 4 min ago</span>
            <span><strong>All systems operational</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
