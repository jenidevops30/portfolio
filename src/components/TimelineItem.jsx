const TimelineItem = ({ role, company, period, date_range, keyActions = [] }) => {
  const isCurrent = period === 'Current Role' || date_range?.includes('PRESENT');

  return (
    <div className={`timeline-entry ${isCurrent ? 'current' : ''}`}>
      <div className="timeline-node" aria-hidden="true"></div>
      
      <div className="timeline-card">
        <div className="timeline-top">
          <div>
            <h3 className="timeline-role">{role}</h3>
            <div className="timeline-company">{company}</div>
          </div>
          <span className="timeline-date">{date_range}</span>
        </div>

        {keyActions && keyActions.length > 0 && (
          <ul className="timeline-actions-list">
            {keyActions.map((action, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: action }} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
