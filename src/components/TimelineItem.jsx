import React from 'react';

const TimelineItem = ({ date, role, company, description }) => {
  return (
    <div className="tl-item">
      {date && <div className="tl-date">{date}</div>}
      <div className="tl-role">{role}</div>
      <div className="tl-company">{company}</div>
      {description && (
        <div className="tl-desc">
          {Array.isArray(description) ? (
            <ul>
              {description.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
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
