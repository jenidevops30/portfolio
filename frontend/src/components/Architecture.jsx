import React from 'react';
import { pipeline, infraTiers } from '../data/portfolioData';

const Architecture = () => {
  return (
    <section id="architecture">
      <div className="container">
        <div className="section-label">How I Work</div>
        <h2 className="section-title">DevOps Infrastructure &amp; CI/CD</h2>
        <p className="section-intro">
          The same pattern powers every production system I run: code moves through an automated pipeline
          into a highly-available, multi-tier AWS architecture with no manual steps.
        </p>

        <div className="arch-card">
          <div className="arch-subtitle">CI/CD Pipeline Flow</div>
          <div className="pipeline-row">
            {pipeline.map((node, i) => (
              <React.Fragment key={node.label}>
                <div className="pipeline-node">
                  <img src={node.icon_url} alt="" className={node.invert ? 'invert' : ''} />
                  <span>{node.label}</span>
                </div>
                {i < pipeline.length - 1 && <div className="pipeline-connector"></div>}
              </React.Fragment>
            ))}
          </div>

          <div className="arch-subtitle" style={{ marginTop: '2.5rem' }}>High-Availability Architecture</div>
          <div className="infra-diagram">
            {infraTiers.map((tier, i) => (
              <React.Fragment key={i}>
                <div className="infra-tier">
                  {tier.map((node) => (
                    <div className="infra-node" key={node.label}>{node.label}</div>
                  ))}
                </div>
                {i < infraTiers.length - 1 && <div className="infra-connector"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
