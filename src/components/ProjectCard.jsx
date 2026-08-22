import { ArrowRight } from 'lucide-react';

const ProjectCard = ({ 
  category, 
  title, 
  metric, 
  description, 
  tags = [], 
  onSelect 
}) => {
  return (
    <article className="project-card-blueprint">
      <div>
        <div className="project-card-top">
          {category && <span className="project-category-tag">{category}</span>}
          {metric && <span className="project-metric-badge">{metric}</span>}
        </div>

        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>
      </div>

      <div>
        {tags.length > 0 && (
          <div className="project-tags-row">
            {tags.map((tag, idx) => (
              <span key={idx} className="project-tech-tag">{tag}</span>
            ))}
          </div>
        )}

        <button 
          type="button"
          className="project-action-link"
          onClick={onSelect}
          aria-label={`Read case study for ${title}`}
        >
          <span>Read Case Study</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
