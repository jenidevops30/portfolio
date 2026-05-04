import React from 'react';

const SkillCard = ({ name, category, icon_url }) => {
  return (
    <div className="skill-card">
      <div className="skill-icon">
        <img src={icon_url} alt={name} />
      </div>
      <div className="skill-name">{name}</div>
      <div className="skill-lvl">{category}</div>
    </div>
  );
};

export default SkillCard;
