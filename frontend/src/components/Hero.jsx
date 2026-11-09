import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { contact } from '../data/portfolioData';

const Hero = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="editorial-hero">
      <div className="editorial-hero-inner">
        <div className="editorial-copy">
          <p className="editorial-eyebrow"><span className="eyebrow-line" /> DEVOPS ENGINEER &amp; AWS CLOUD SPECIALIST</p>
          <h1 className="editorial-name">Jeni<br /><span>Patel.</span></h1>
          <p className="editorial-lead">Building reliable cloud infrastructure.<br />Automating deployments. Supporting production systems.</p>
          <p className="editorial-summary">
            Nearly a decade of IT experience across networking, Linux administration,
            infrastructure operations, AWS cloud engineering and DevOps automation.
          </p>
          <div className="editorial-actions">
            <button className="btn-primary" onClick={() => scrollTo('experience')}>Explore my experience <ArrowUpRight size={17} /></button>
            <button className="btn-outline" onClick={() => scrollTo('projects')}>View projects <ArrowDownRight size={17} /></button>
          </div>
          <div className="editorial-socials" aria-label="Social profiles">
            <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon size={19} /></a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={19} /></a>
          </div>
          <div className="editorial-proof">
            <div><strong>9+</strong><span>Years in IT</span></div>
            <div><strong>AWS</strong><span>Cloud engineering</span></div>
            <div><strong>CI/CD</strong><span>Build &amp; deployment</span></div>
          </div>
        </div>
        <div className="editorial-portrait-wrap">
          <div className="portrait-frame">
            <img src="/jeni-headshot.webp" alt="Portrait of Jeni Patel" fetchPriority="high" />
          </div>
          <div className="portrait-caption"><span>INFRASTRUCTURE · AUTOMATION · OPERATIONS</span><span>BASED IN INDIA</span></div>
          <div className="portrait-index" aria-hidden="true">01 / 06</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
