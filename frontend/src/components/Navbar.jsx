import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { contact } from '../data/portfolioData';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && open) setOpen(false);
  };

  return (
    <nav aria-label="Main navigation" onKeyDown={handleKeyDown}>
      <div className="nav-inner">
        <button className="logo-container" onClick={() => scrollTo('hero')} aria-label="Back to top">
          <img src="/logo.svg" alt="" />
        </button>

        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={(event) => { event.preventDefault(); scrollTo(link.id); }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href={contact.resume} download className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
            Resume
          </a>
          <button
            className="nav-toggle-btn"
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={`nav-mobile-panel ${open ? 'open' : ''}`} hidden={!open}>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(event) => { event.preventDefault(); scrollTo(link.id); }}
          >
            {link.label}
          </a>
        ))}
        <a href={contact.resume} download style={{ padding: '0.75rem 0.25rem' }}>
          Download Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
