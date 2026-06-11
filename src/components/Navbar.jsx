import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ currentView, setCurrentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target) => {
    setIsOpen(false);
    if (target === 'blog') {
      setCurrentView('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'hero') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const element = document.getElementById(target);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: 'smooth',
            });
          }
        }, 100);
      } else {
        const element = document.getElementById(target);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  return (
    <nav className={`${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="nav-inner">
        <div className="logo-container" onClick={() => handleNavClick('hero')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', height: '100%', overflow: 'visible' }}>
          <img src="/logo.svg" alt="Jeni Patel" style={{ height: '90px', width: 'auto', margin: '-20px 0', display: 'block' }} />
        </div>
        
        <ul className={`nav-links ${isOpen ? 'mobile-active' : ''}`}>
          <li><a href="#about" className={currentView === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a></li>
          <li><a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}>Skills</a></li>
          <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Projects</a></li>
          <li><a href="#blogs" className={currentView === 'blog' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }}>Blog</a></li>
          <li><a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}>Experience</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></li>
          <li className="mobile-only-hire">
            <a href="mailto:pjeni3095@gmail.com" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.88rem', display: 'inline-block', textAlign: 'center', width: '100%' }}>
              Hire Me
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <a href="mailto:pjeni3095@gmail.com" className="btn-primary hire-desktop" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
            Hire Me
          </a>
          
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
