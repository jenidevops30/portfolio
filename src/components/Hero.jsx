import { ArrowRight, BookOpen, Download, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const Hero = ({ onNavigate }) => {
  const { hero } = PORTFOLIO_DATA;

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="hero-content-col">
            <div className="hero-badge-container">
              <div className="hero-status-pill">
                <span className="pulse-dot"></span>
                <span>Available for Cloud Architecture &amp; DevOps Contracts</span>
              </div>
            </div>

            <h1 className="hero-h1">
              Building Scalable, Resilient <br />
              <span className="hero-gradient-text">Cloud Infrastructure</span>
            </h1>

            <p className="hero-value-prop">
              {hero.valueProposition}
            </p>

            <div className="hero-proof-metrics">
              {hero.proofMetrics}
            </div>

            {/* Action Group */}
            <div className="hero-action-group">
              <button 
                className="btn btn-primary"
                onClick={() => onNavigate('projects')}
                id="hero-cta-view-projects"
              >
                <span>View Projects</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-secondary"
                onClick={() => onNavigate('articles')}
                id="hero-cta-read-articles"
              >
                <BookOpen size={18} />
                <span>Read Articles</span>
              </button>

              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-ghost"
                id="hero-cta-download-resume"
              >
                <Download size={18} />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D-Styled Glowing Cloud Architecture Visualization */}
          <div className="hero-visual-col">
            <div className="hero-visual-card">
              <div className="cloud-viz-container">
                {/* Center Avatar Hub */}
                <div className="cloud-core-avatar">
                  <img 
                    src="/jeni-headshot.webp" 
                    alt="Jeni Patel - AWS Cloud & DevOps Engineer" 
                    loading="eager"
                  />
                </div>

                {/* Floating Orbiting Infrastructure Nodes */}
                <div className="cloud-orbit-node node-aws" title="AWS Cloud Infrastructure">
                  <img 
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" 
                    alt="AWS" 
                  />
                </div>

                <div className="cloud-orbit-node node-tf" title="Terraform Infrastructure as Code">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" 
                    alt="Terraform" 
                  />
                </div>

                <div className="cloud-orbit-node node-k8s" title="Kubernetes Orchestration">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" 
                    alt="Kubernetes" 
                  />
                </div>

                <div className="cloud-orbit-node node-docker" title="Docker Containerization">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
                    alt="Docker" 
                  />
                </div>

                <div className="cloud-orbit-node node-cicd" title="CI/CD Pipelines (GitHub Actions & Jenkins)">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" 
                    alt="GitHub Actions" 
                  />
                </div>

                <div className="cloud-orbit-node node-mon" title="Observability (Prometheus & Grafana)">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" 
                    alt="Grafana" 
                  />
                </div>
              </div>

              {/* Infrastructure Status Banner */}
              <div className="cloud-status-bar">
                <div className="cloud-status-indicator">
                  <CheckCircle2 size={16} />
                  <span>AWS Multi-AZ Active</span>
                </div>
                <div>99.95% Target SLA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Strip: Interactive Metrics Block */}
        <div className="metrics-block-grid">
          {hero.stats.map((stat, idx) => (
            <div key={idx} className="metric-card">
              <div className="metric-value">{stat.num}</div>
              <div className="metric-title">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling Marquee of Tools / Skills */}
      <div className="marquee-strip-container" style={{ marginTop: 'var(--space-48)' }}>
        <div className="marquee-track">
          {[...hero.marqueeTools, ...hero.marqueeTools].map((tool, idx) => (
            <div key={idx} className="marquee-item">
              <img src={tool.icon} alt={tool.name} loading="lazy" />
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
