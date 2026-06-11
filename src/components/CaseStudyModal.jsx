import React, { useEffect } from 'react';

const CaseStudyModal = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { title, case_study, tags, github_url } = project;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <div className="section-label">DevOps Case Study</div>
          <h2 className="modal-title">{title}</h2>
          <div className="project-tags">
            {tags.map((tag, index) => (
              <span key={index} className="project-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="modal-body">
          <section className="modal-section">
            <h3><span className="accent">Problem</span></h3>
            <p>{case_study.problem}</p>
          </section>

          <section className="modal-section">
            <h3><span className="accent">Architecture</span></h3>
            <p>{case_study.architecture}</p>
            {case_study.architecture_image && (
              <div className="architecture-diagram">
                <img src={case_study.architecture_image} alt="Architecture Diagram" onError={(e) => { e.target.style.display = 'none'; }} />
                <p className="diagram-caption">System Architecture Visual</p>
              </div>
            )}
          </section>

          {case_study.workflow_image && (
            <section className="modal-section">
              <h3><span className="accent">CI/CD Workflow</span></h3>
              <div className="architecture-diagram">
                <img src={case_study.workflow_image} alt="CI/CD Workflow" onError={(e) => { e.target.style.display = 'none'; }} />
                <p className="diagram-caption">Automated Deployment Pipeline</p>
              </div>
            </section>
          )}

          <div className="modal-grid">
            <section className="modal-section">
              <h3><span className="accent">Challenges</span></h3>
              <p>{case_study.challenges}</p>
            </section>

            <section className="modal-section">
              <h3><span className="accent">Results</span></h3>
              <p className="results-text">{case_study.results}</p>
            </section>
          </div>
        </div>

        <div className="modal-footer">
          {github_url && (
            <a href={github_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              View on GitHub
            </a>
          )}
          <button className="btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
