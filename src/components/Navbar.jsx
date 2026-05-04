import React from 'react';

const Navbar = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 60,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav>
      <div className="nav-inner">
        <div className="logo-container" onClick={() => scrollTo('hero')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', height: '100%', overflow: 'visible' }}>
          <img src="/logo.svg" alt="Jeni Patel" style={{ height: '90px', width: 'auto', margin: '-20px 0', display: 'block' }} />
        </div>
        <ul className="nav-links">
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
          <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a></li>
          <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>Projects</a></li>
          <li><a href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }}>Experience</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
        </ul>
        <a href="mailto:pjeni3095@gmail.com" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
          Hire Me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
