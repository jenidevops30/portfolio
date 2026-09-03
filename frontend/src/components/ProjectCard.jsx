
const ProjectCard = ({ title, badge, description, tags, links, cicd }) => {
  return (
    <div className="project-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div className="project-badge">{badge}</div>
        {cicd?.badgeUrl && (
          <img
            src={cicd.badgeUrl}
            alt="Build Status"
            style={{ height: '20px' }}
          />
        )}
      </div>
      <div className="project-title">{title}</div>
      <div className="project-desc">{description}</div>

      <div className="project-tags">
        {tags.map((tag, index) => (
          <span key={index} className="project-tag">{tag}</span>
        ))}
      </div>

      {links && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {links.repo && (
            <a href={links.repo} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
              → GitHub
            </a>
          )}
          {links.live && (
            <a href={links.live} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
              → Live Site
            </a>
          )}
          {links.workflow && (
            <a href={links.workflow} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
              → CI/CD
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
