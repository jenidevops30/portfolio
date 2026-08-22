import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import ProjectCard from './components/ProjectCard';
import CaseStudyModal from './components/CaseStudyModal';
import TimelineItem from './components/TimelineItem';
import AwardsArticles from './components/AwardsArticles';
import BlogModal from './components/BlogModal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import ScrollProgress from './components/ScrollProgress';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { Terminal as TerminalIcon, ChevronDown, ChevronUp } from 'lucide-react';
import './App.css';

function App() {
  const { projects, experience, blogs } = PORTFOLIO_DATA;

  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState('hero');
  
  // Modals state
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);

  // Smooth navigation handler
  const handleNavigate = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Scroll spy to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['skills', 'projects', 'experience', 'articles', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <ScrollProgress />
      
      {/* Sticky Top Navigation Bar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      <main id="main-content">
        {/* Section 2.2: Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* Section 2.3: Interactive Bento Grid (Tech Stack & Expertise) */}
        <BentoGrid />

        {/* Section 2.4: Featured Projects Grid */}
        <section id="projects" aria-labelledby="projects-heading">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Featured Work</div>
              <h2 id="projects-heading" className="section-title">Production Infrastructure Projects</h2>
              <p className="section-subtitle">
                Enterprise cloud migrations, automated multi-region IaC deployments, and FinOps cost optimizations delivering 99.95% verified availability.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  category={project.category}
                  title={project.title}
                  metric={project.metric}
                  description={project.description}
                  tags={project.tags}
                  onSelect={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 2.5: Chronological Experience Timeline */}
        <section id="experience" aria-labelledby="experience-heading">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Career Journey</div>
              <h2 id="experience-heading" className="section-title">Professional Experience &amp; Milestones</h2>
              <p className="section-subtitle">
                6+ years of progressive engineering leadership across cloud architecture, CI/CD performance engineering, and system reliability.
              </p>
            </div>

            <div className="timeline-container">
              {experience.map((item, index) => (
                <TimelineItem
                  key={index}
                  role={item.role}
                  company={item.company}
                  period={item.period}
                  date_range={item.date_range}
                  keyActions={item.keyActions}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 2.6: Awards & Knowledge Sharing (Grid) */}
        <AwardsArticles
          onSelectArticle={(article) => setSelectedArticle(article)}
          onViewAllArticles={() => setSelectedArticle(blogs[0])}
        />

        {/* Interactive CLI Terminal Drawer */}
        <section style={{ padding: 'var(--space-48) 0', background: 'rgba(9, 9, 11, 0.6)' }}>
          <div className="container">
            <div className="terminal-toggle-strip">
              <button
                className="btn btn-ghost"
                onClick={() => setShowTerminal(!showTerminal)}
                aria-expanded={showTerminal}
                style={{ borderRadius: 'var(--radius-full)', padding: '0 24px' }}
              >
                <TerminalIcon size={16} color="var(--secondary-accent)" />
                <span>{showTerminal ? 'Hide Interactive Cloud CLI' : 'Launch Interactive Cloud CLI'}</span>
                {showTerminal ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {showTerminal && (
              <div style={{ marginTop: 'var(--space-24)' }}>
                <Terminal />
              </div>
            )}
          </div>
        </section>

        {/* Section 2.7: High-Converting Contact Section */}
        <Contact />
      </main>

      {/* Section 2.8: Clean Web Footer */}
      <Footer onNavigateToArticles={() => handleNavigate('articles')} />

      {/* Case Study Modal Overlay */}
      <CaseStudyModal
        isOpen={Boolean(selectedProject)}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Blog Article Reader Modal Overlay */}
      <BlogModal
        isOpen={Boolean(selectedArticle)}
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}

export default App;
