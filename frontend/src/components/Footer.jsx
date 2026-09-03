import { Mail } from 'lucide-react';
import { contact } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <p>&copy; {new Date().getFullYear()} Jeni Patel · Cloud &amp; DevOps Architect</p>
        <div className="footer-socials">
          <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon size={18} /></a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
          <a href={`mailto:${contact.email}`} aria-label="Email"><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
