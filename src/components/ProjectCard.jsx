import React from 'react';

const ProjectCard = ({ title, badge, description, tags }) => {
  return (
    <div className="project-card">
      <div className="project-badge">{badge}</div>
      <div className="project-title">{title}</div>
      <div className="project-desc">{description}</div>
      <div className="project-tags">
        {tags.map((tag, index) => (
          <span key={index} className="project-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
