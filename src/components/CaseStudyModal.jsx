import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

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

  if (!isOpen || !project) return null;

  const { title, category, metric, case_study, tags, github_url } = project;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="case-study-title">
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Case Study"
        >
          <X size={20} />
        </button>
        
        <div style={{ marginBottom: 'var(--space-24)' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            {category && <span className="project-category-tag">{category}</span>}
            {metric && <span className="project-metric-badge">{metric}</span>}
          </div>
          <h2 id="case-study-title" className="section-title" style={{ fontSize: '26px' }}>{title}</h2>
          
          {tags && tags.length > 0 && (
            <div className="project-tags-row" style={{ marginTop: '12px' }}>
              {tags.map((tag, index) => (
                <span key={index} className="project-tech-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div>
          {case_study?.problem && (
            <div className="modal-section-block">
              <h4>Problem &amp; Architectural Drivers</h4>
              <p>{case_study.problem}</p>
            </div>
          )}

          {case_study?.architecture && (
            <div className="modal-section-block">
              <h4>Proposed Architecture &amp; Implementation</h4>
              <p>{case_study.architecture}</p>
            </div>
          )}

          {case_study?.challenges && (
            <div className="modal-section-block">
              <h4>Engineering Challenges &amp; Resolution</h4>
              <p>{case_study.challenges}</p>
            </div>
          )}

          {case_study?.results && (
            <div className="modal-section-block">
              <h4>Quantified Results &amp; Business Impact</h4>
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.1)', 
                borderLeft: '3px solid var(--status-success)', 
                padding: '12px 16px', 
                borderRadius: '0 8px 8px 0', 
                color: '#A7F3D0',
                marginTop: '8px',
                fontSize: '15px'
              }}>
                {case_study.results}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 'var(--space-32)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          {github_url && (
            <a href={github_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <ExternalLink size={16} />
              <span>View Code</span>
            </a>
          )}
          <button className="btn btn-primary" onClick={onClose}>
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
