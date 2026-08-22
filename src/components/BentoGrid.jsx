import { Cloud, Layers, Box, GitBranch, Activity, Terminal, CheckCircle2, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const BentoGrid = () => {
  const { bentoSkills } = PORTFOLIO_DATA;
  const { cell1, cell2, cell3, cell4, cell5, cell6 } = bentoSkills;

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Expertise &amp; Tech Stack</div>
          <h2 id="skills-heading" className="section-title">Architectural Mastery &amp; Tooling</h2>
          <p className="section-subtitle">
            Structured bento grid illustrating deep technical proficiencies across cloud architecture, automated CI/CD pipelines, container orchestration, and reliability engineering.
          </p>
        </div>

        <div className="bento-grid">
          {/* Cell 1 (2x2 Featured): AWS Cloud Ecosystem */}
          <div className="bento-cell bento-cell-2x2">
            <div>
              <div className="bento-header">
                <div className="bento-icon-box">
                  <Cloud size={24} />
                </div>
                <span className="bento-badge">{cell1.badge}</span>
              </div>

              <h3 className="bento-title">{cell1.title}</h3>
              <p className="bento-desc">{cell1.description}</p>

              {/* AWS Cloud Architecture & Solutions Banner */}
              <div className="bento-highlight-banner">
                <Award size={18} color="var(--primary-accent)" />
                <span>{cell1.highlight}</span>
              </div>
            </div>

            <div className="bento-pills-list">
              {cell1.services.map((service, idx) => (
                <div key={idx} className="bento-pill">
                  <CheckCircle2 size={13} color="var(--secondary-accent)" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cell 2 (1x1): Multi-Cloud Platforms */}
          <div className="bento-cell">
            <div>
              <div className="bento-header">
                <div className="bento-icon-box teal">
                  <Layers size={24} />
                </div>
                <span className="bento-badge">{cell2.badge}</span>
              </div>

              <h3 className="bento-title">{cell2.title}</h3>
              <p className="bento-desc">{cell2.description}</p>
            </div>

            <div className="bento-pills-list">
              {cell2.providers.map((prov, idx) => (
                <div key={idx} className="bento-pill">
                  <img src={prov.icon} alt={prov.name} style={{ width: '16px', height: '16px' }} />
                  <span>{prov.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cell 3 (1x2 Vertical): Infrastructure as Code & Containers */}
          <div className="bento-cell bento-cell-1x2">
            <div>
              <div className="bento-header">
                <div className="bento-icon-box">
                  <Box size={24} />
                </div>
                <span className="bento-badge">{cell3.badge}</span>
              </div>

              <h3 className="bento-title">{cell3.title}</h3>
              <p className="bento-desc">{cell3.description}</p>
            </div>

            <div className="bento-pills-list">
              {cell3.items.map((item, idx) => (
                <div key={idx} className="bento-pill" style={{ width: '100%' }}>
                  <CheckCircle2 size={13} color="var(--primary-accent)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cell 4 (1x1): Continuous Integration & Delivery (CI/CD) */}
          <div className="bento-cell">
            <div>
              <div className="bento-header">
                <div className="bento-icon-box teal">
                  <GitBranch size={24} />
                </div>
                <span className="bento-badge">{cell4.badge}</span>
              </div>

              <h3 className="bento-title">{cell4.title}</h3>
              <p className="bento-desc">{cell4.description}</p>
            </div>

            <div className="bento-pills-list">
              {cell4.items.map((item, idx) => (
                <div key={idx} className="bento-pill">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cell 5 (1x1): Monitoring & Observability */}
          <div className="bento-cell">
            <div>
              <div className="bento-header">
                <div className="bento-icon-box">
                  <Activity size={24} />
                </div>
                <span className="bento-badge">{cell5.badge}</span>
              </div>

              <h3 className="bento-title">{cell5.title}</h3>
              <p className="bento-desc">{cell5.description}</p>
            </div>

            <div className="bento-pills-list">
              {cell5.items.map((item, idx) => (
                <div key={idx} className="bento-pill">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cell 6 (1x1): Operating Systems & Scripting */}
          <div className="bento-cell">
            <div>
              <div className="bento-header">
                <div className="bento-icon-box teal">
                  <Terminal size={24} />
                </div>
                <span className="bento-badge">{cell6.badge}</span>
              </div>

              <h3 className="bento-title">{cell6.title}</h3>
              <p className="bento-desc">{cell6.description}</p>
            </div>

            <div className="bento-pills-list">
              {cell6.items.map((item, idx) => (
                <div key={idx} className="bento-pill">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
