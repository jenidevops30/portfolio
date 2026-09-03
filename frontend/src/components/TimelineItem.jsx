
const TimelineItem = ({ date, role, company, description, logo_url }) => {
  return (
    <div className="tl-item">
      <div className="tl-dot">
        {logo_url ? <img src={logo_url} alt="" /> : <span className="tl-dot-fallback"></span>}
      </div>
      {date && <div className="tl-date">{date}</div>}
      <div className="tl-role">{role}</div>
      {company && <div className="tl-company">{company}</div>}
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
