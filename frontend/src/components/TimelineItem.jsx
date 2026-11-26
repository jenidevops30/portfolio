
const TimelineItem = ({ date, role, company, description, logo_url, credentialId, credentialMeta, credentialUrl }) => {
  return (
    <div className="tl-item">
      <div className="tl-dot">
        {logo_url ? <img src={logo_url} alt="" /> : <span className="tl-dot-fallback"></span>}
      </div>
      {date && <div className="tl-date">{date}</div>}
      <div className="tl-role">{role}</div>
      {company && <div className="tl-company">{company}</div>}
      {credentialMeta && <div className="tl-desc">{credentialMeta}</div>}
      {credentialId && <div className="tl-desc">Credential ID: {credentialId}</div>}
      {credentialUrl && (
        <div className="tl-desc">
          <a href={credentialUrl} target="_blank" rel="noreferrer">Verify credential ↗</a>
        </div>
      )}
      {description && (
        <div className="tl-desc">
          {Array.isArray(description) ? (
            <ul>
              {description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimelineItem;
