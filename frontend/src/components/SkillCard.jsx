
const SkillCard = ({ name, category, icon_url, invert }) => {
  return (
    <div className="skill-card">
      <div className="skill-icon">
        <img src={icon_url} alt={name} className={invert ? 'invert' : ''} />
      </div>
      <div className="skill-name">{name}</div>
      <div className="skill-lvl">{category}</div>
    </div>
  );
};

export default SkillCard;
