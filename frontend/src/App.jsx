import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Architecture from './components/Architecture';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import TimelineItem from './components/TimelineItem';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { projects, awards, certifications } from './data/portfolioData';
import { skillGroups } from './data/skillGroups';
import { experience } from './data/experienceData';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />

      {/* EXPERIENCE */}
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
                logo_url={exp.logo_url}
              />
            ))}
          </div>
        </div>
      </section>

      <Architecture />

      {/* SKILLS */}
      <section id="skills">
        <div className="container">
          <div className="section-label">Tech Stack</div>
          <h2 className="section-title">Skills &amp; Expertise</h2>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <div className="skill-group-heading">
                  <h3>{group.title}</h3>
                  <span>{group.context}</span>
                </div>
                <div className="skill-pills">
                  {group.skills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
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

      {/* AWARDS & CERTIFICATIONS */}
      <section id="awards">
        <div className="container">
          <div className="recognition-grid">
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
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}

export default App;
