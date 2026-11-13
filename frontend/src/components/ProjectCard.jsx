const ProjectCard = ({ title, category, badge, description, tags = [], links }) => {
  const availableLinks = links
    ? Object.entries(links).filter(([, url]) => typeof url === "string" && url.trim())
    : [];

  return (
    <article className="project-card">
      <div className="project-card-meta">
        {category && <span className="project-category">{category}</span>}
        {badge && <span className="project-badge">{badge}</span>}
      </div>

      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{description}</p>

      {tags.length > 0 && (
        <div className="project-tags" aria-label={`Technologies used in ${title}`}>
          {tags.map((tag) => <span key={tag} className="project-tag">{tag}</span>)}
        </div>
      )}

      {availableLinks.length > 0 && (
        <div className="project-links">
          {availableLinks.map(([kind, url]) => (
            <a
              key={kind}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {kind === "repo" ? "View repository" : kind === "live" ? "Live website" : "View workflow"} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
