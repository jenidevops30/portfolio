import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = ({ onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header>
      <nav className={`site-navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
        <div className="nav-container">
          {/* Left-Aligned Display Logo */}
          <div 
            className="nav-brand" 
            onClick={() => handleNavClick('hero')}
            role="button"
            tabIndex={0}
            aria-label="Jeni Patel Home"
          >
            <div className="brand-logo-badge">JP</div>
            <span className="brand-text">
              Jeni Patel <span className="brand-tag">| Cloud &amp; DevOps</span>
            </span>
          </div>

          {/* Centered Desktop Links */}
          <ul className="nav-links">
            <li>
              <a 
                href="#skills" 
                className={activeSection === 'skills' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}
              >
                Expertise
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                className={activeSection === 'experience' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#articles" 
                className={activeSection === 'articles' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick('articles'); }}
              >
                Articles
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Right-Aligned CTA and Mobile Hamburger */}
          <div className="nav-actions">
            <a 
              href="mailto:pjeni3095@gmail.com" 
              className="btn btn-primary btn-hire-nav"
              aria-label="Hire Jeni via email"
            >
              <span>Hire Jeni</span>
              <ArrowUpRight size={16} />
            </a>

            <button 
              className="nav-toggle-btn" 
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
          <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}>
            Expertise
          </a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>
            Projects
          </a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}>
            Experience
          </a>
          <a href="#articles" onClick={(e) => { e.preventDefault(); handleNavClick('articles'); }}>
            Articles
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>
            Contact
          </a>
          <a 
            href="mailto:pjeni3095@gmail.com" 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            Hire Jeni
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
