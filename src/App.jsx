import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Terminal from './components/Terminal';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import TimelineItem from './components/TimelineItem';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { PORTFOLIO_DATA } from './data/portfolioData';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const { skills, projects, experience, awards, certifications, currently_learning, blogs, production_challenges } = PORTFOLIO_DATA;
  const [blogsList, setBlogsList] = useState(blogs);

  return (
    <div className="App">
      <ScrollProgress />
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      {currentView === 'home' ? (
        <>
          <Hero onNavigate={(target) => {
            if (target === 'projects' || target === 'contact') {
              const element = document.getElementById(target);
              if (element) {
                window.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: 'smooth'
                });
              }
            } else {
              setCurrentView(target);
            }
          }} />
          <About />
          <Terminal />
          
          <section id="skills">
            <div className="container">
              <div className="skills-layout">
                <div className="skills-main">
                  <div className="section-label">Tech Stack</div>
                  <h2 className="section-title">Skills & Expertise</h2>
                  <div className="skills-grid">
                    {skills.map((skill, index) => (
                      <SkillCard key={index} {...skill} />
                    ))}
                  </div>
                </div>
                
                <div className="learning-side">
                  <div className="section-label">Evolution</div>
                  <h2 className="section-title">Currently Learning</h2>
                  <div className="learning-list">
                    {currently_learning.map((item, index) => (
                      <div key={index} className="learning-item glass">
                        <span className="learning-icon">{item.icon}</span>
                        <span className="learning-name">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" style={{ background: 'var(--surface)' }}>
            <div className="container">
              <div className="section-label">Work</div>
              <h2 className="section-title">Featured Projects</h2>
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </div>
          </section>

          <section id="challenges">
            <div className="container">
              <div className="section-label">Operational Excellence</div>
              <h2 className="section-title">Production Challenges Solved</h2>
              <div className="challenges-grid">
                {production_challenges.map((challenge, index) => (
                  <div key={index} className="challenge-card glass">
                    <div className="challenge-icon">🛠️</div>
                    <div className="challenge-info">
                      <h3>{challenge.title}</h3>
                      <p>{challenge.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="experience">
            <div className="container">
              <div className="section-label">Experience</div>
              <h2 className="section-title">Professional Journey</h2>
              <div className="timeline">
                {experience.map((exp, index) => (
                  <TimelineItem 
                    key={index} 
                    date={exp.date_range} 
                    role={exp.role} 
                    company={exp.company} 
                    description={exp.description} 
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="awards" style={{ background: 'var(--surface)' }}>
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                <div>
                  <div className="section-label">Recognition</div>
                  <h2 className="section-title">Awards</h2>
                  <div className="timeline">
                    {awards.map((award, index) => (
                      <TimelineItem 
                        key={index} 
                        date={award.date} 
                        role={award.title} 
                        company={award.organization} 
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="section-label">Expertise</div>
                  <h2 className="section-title">Certifications</h2>
                  <div className="timeline">
                    {certifications.map((cert, index) => (
                      <TimelineItem 
                        key={index} 
                        role={cert.title} 
                        company={cert.issuer}
                        date={cert.status || ''}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Contact />
        </>
      ) : (
        <Blog posts={blogsList} onAddBlog={(newBlog) => setBlogsList([newBlog, ...blogsList])} />
      )}

      <Footer />
    </div>
  );
}

export default App;
