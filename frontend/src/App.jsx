import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Blog from './components/Blog';
import Architecture from './components/Architecture';
import ProjectCard from './components/ProjectCard';
import TimelineItem from './components/TimelineItem';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import { projects, awards, certifications } from './data/portfolioData';
import { skillGroups } from './data/skillGroups';
import { experience } from './data/experienceData';
import './App.css';

const publicProjects = projects.filter((project) => project.category.startsWith('Public project'));
const professionalCaseStudies = projects.filter((project) => project.category === 'Professional case study');
const learningLabs = projects.filter((project) => project.category === 'Learning lab');

const ProjectGroup = ({ eyebrow, title, description, items }) => (
  <div className="project-group">
    <div className="section-label">{eyebrow}</div>
    <h3 className="section-title">{title}</h3>
    <p className="section-intro">{description}</p>
    <div className="projects-grid">
      {items.map((project) => <ProjectCard key={project.title} {...project} />)}
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollReveal />
      <main id="main-content">
        <Hero />
        <About />

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="container">
            <div className="section-label">Experience</div>
            <h2 className="section-title">Professional Journey</h2>
            <div className="timeline">
              {experience.map((exp) => (
                <TimelineItem
                  key={`${exp.company}-${exp.role}-${exp.date_range}`}
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

        {/* PROJECTS AND CASE STUDIES */}
        <section id="projects" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <div className="section-label">Engineering Portfolio</div>
            <h2 className="section-title">Projects &amp; Case Studies</h2>
            <p className="section-intro">
              Explore public repositories, anonymized professional work and hands-on learning labs.
              Professional case studies omit employer identifiers, proprietary configuration and confidential metrics.
            </p>
            <ProjectGroup
              eyebrow="Open source & independent work"
              title="Public Projects"
              description="Repositories you can inspect, clone and explore."
              items={publicProjects}
            />
            <ProjectGroup
              eyebrow="Production experience"
              title="Professional Case Studies"
              description="Anonymized examples of infrastructure operations and delivery work completed in professional environments."
              items={professionalCaseStudies}
            />
            <ProjectGroup
              eyebrow="Hands-on practice"
              title="Learning Labs"
              description="Practical environments used to build and validate technical skills."
              items={learningLabs}
            />
          </div>
        </section>

        <Blog />

        {/* AWARDS & CERTIFICATIONS */}
        <section id="awards">
          <div className="container">
            <div className="recognition-grid">
              <div>
                <div className="section-label">Recognition</div>
                <h2 className="section-title">Awards</h2>
                <div className="timeline">
                  {awards.map((award) => (
                    <TimelineItem
                      key={`${award.organization}-${award.title}`}
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
                  {certifications.map((cert) => (
                    <TimelineItem
                      key={cert.title}
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
