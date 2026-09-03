import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { contact } from '../data/portfolioData';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
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
        <button className="logo-container" onClick={() => scrollTo('hero')} aria-label="Back to top">
          <img src="/logo.svg" alt="Jeni Patel" />
        </button>

        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}>
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
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`nav-mobile-panel ${open ? 'open' : ''}`}>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
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
