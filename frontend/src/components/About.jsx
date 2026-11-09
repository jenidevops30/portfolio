import { contact } from '../data/portfolioData';

const About = () => (
  <section id="about" className="about-section">
    <div className="container">
      <div className="section-label">A little about me</div>
      <div className="about-intro-grid">
        <h2 className="section-title">A career built on infrastructure, operations and continuous learning.</h2>
        <div>
          <p className="about-text">
            I'm a DevOps Engineer and AWS Cloud Specialist with nearly 10 years of IT experience.
            My career began in networking and infrastructure support, grew through Linux and server
            administration, and developed into cloud engineering and DevOps automation.
          </p>
          <p className="about-text">
            I've worked across AWS environments, virtualized infrastructure, container platforms and
            CI/CD workflows. My hands-on work includes Jenkins pipelines for Android builds, GitLab CI
            for a Next.js website, GitHub Actions for application deployments, Terraform-based
            infrastructure and Kubernetes workloads on Amazon EKS.
          </p>
          <p className="about-text">
            I enjoy understanding how systems fit together, troubleshooting operational problems and
            making application delivery more consistent. I'm continuing to deepen my skills in
            Kubernetes, reliability engineering and system design.
          </p>
          <div className="highlight-chips">
            <span className="chip">AWS &amp; Cloud Operations</span>
            <span className="chip">Linux &amp; Networking</span>
            <span className="chip">CI/CD Automation</span>
            <span className="chip">Infrastructure as Code</span>
          </div>
          <a href={contact.resume} download className="btn-outline about-resume">Download Resume</a>
        </div>
      </div>
      <div className="about-principles">
        <article><span>01</span><h3>Understand the system</h3><p>Start with the application, infrastructure and network dependencies.</p></article>
        <article><span>02</span><h3>Automate the repeatable</h3><p>Build dependable pipelines and infrastructure workflows.</p></article>
        <article><span>03</span><h3>Operate responsibly</h3><p>Prioritize observability, security and maintainable operations.</p></article>
      </div>
    </div>
  </section>
);

export default About;
