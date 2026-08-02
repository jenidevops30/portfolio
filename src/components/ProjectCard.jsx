import { useState } from 'react';
import CaseStudyModal from './CaseStudyModal';

const ProjectCard = (project) => {
  const { title, badge, description, tags, github_url, case_study } = project;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="project-card">
        <div className="project-badge">{badge}</div>
        <div className="project-title">{title}</div>
        <div className="project-desc">{description}</div>
        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-tag">{tag}</span>
          ))}
        </div>
        <div className="project-actions">
          {case_study && (
            <button className="btn-case-study" onClick={() => setIsModalOpen(true)}>
              View Case Study
            </button>
          )}
          {github_url && (
            <a href={github_url} target="_blank" rel="noopener noreferrer" className="github-link">
              GitHub
            </a>
          )}
        </div>
      </div>
      {case_study && (
        <CaseStudyModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          project={project} 
        />
      )}
    </>
  );
};

export default ProjectCard;
