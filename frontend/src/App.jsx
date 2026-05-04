import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import TimelineItem from './components/TimelineItem';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// Central Data Store (Frontend Only)
const PORTFOLIO_DATA = {
  skills: [
    { name: "AWS", category: "Cloud Platform", icon_url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "GCP", category: "Cloud Platform", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "Azure", category: "Cloud Platform", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "Docker", category: "Containerization", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", category: "Orchestration", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Terraform", category: "IaC", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    { name: "Jenkins", category: "CI/CD", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
    { name: "GitLab CI", category: "Pipelines", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
    { name: "GitHub Actions", category: "CI/CD Automation", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
    { name: "Linux", category: "Admin & Scripting", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Prometheus", category: "Monitoring", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
    { name: "Grafana", category: "Dashboards", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
    { name: "Ansible", category: "Automation", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
    { name: "Python", category: "Scripting", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "ArgoCD", category: "GitOps", icon_url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/argocd/argocd-original.svg" },
    { name: "DevSecOps", category: "Security", icon_url: "https://raw.githubusercontent.com/fortawesome/Font-Awesome/6.x/svgs/solid/shield-halved.svg" }
  ],
  projects: [
    { title: "Quickhunt Migration", badge: "AWS · Terraform", description: "Led the migration from DigitalOcean to AWS using a two-tier architecture (CloudFront/S3/EC2/RDS), achieving 99.95% availability.", tags: ["Terraform", "CloudFront", "RDS", "ASG"] },
    { title: "Face Swap Pro", badge: "AI · Infrastructure", description: "Architected on-premises high-performance AI infrastructure on a dedicated GPU server for thousands of daily photo/video workloads.", tags: ["GPU Server", "Load Balancing", "Monitoring"] },
    { title: "Cost Optimization (FinOps)", badge: "FinOps · AWS", description: "Reduced infrastructure costs by 30-40% through right-sizing, spot instances, and strategic resource management on AWS.", tags: ["FinOps", "Spot Instances", "Cost Explorer"] },
    { title: "Wishlist AWS Deployment", badge: "AWS · ALB · RDS", description: "Architected and executed a seamless deployment of wishlist.webcontrive.com using Infrastructure as Code (Terraform) with ALB, ASG, and AWS DMS.", tags: ["Terraform", "ALB", "ASG", "DMS"] },
    { title: "Edu-Platform Infrastructure", badge: "Azure · GitHub Actions", description: "Architected a secure CI/CD pipeline for a global education platform using GitHub-to-Azure OIDC for passwordless authentication.", tags: ["Azure", "GitHub Actions", "OIDC", "Node.js"] }
  ],
  experience: [
    {
      role: "DevOps Engineer",
      company: "Webcontrive",
      date_range: "NOVEMBER 2025 – PRESENT",
      description: [
        "Led the migration of production infrastructure from DigitalOcean to AWS, reducing architectural overhead by 25% and improving overall system reliability.",
        "Migrated the 'Quickhunt' application using a two-tier architecture with CloudFront/S3 (Frontend) and EC2/RDS (Backend), achieving 99.95% availability.",
        "Optimized application storage using Amazon S3, resulting in 35% faster asset retrieval for global users.",
        "Successfully migrated wishlist.webcontrive.com (React.js / Laravel) to AWS with ALB, ASG, and RDS, enabling automated scaling for peak traffic events.",
        "Configured Cloudflare WAF and security rules/bot protection, mitigating over 10k monthly malicious requests and securing production endpoints.",
        "Implemented pro-active monitoring using AWS CloudWatch, Lambda, and SNS integrated with Slack, reducing Mean Time to Repair (MTTR) by 40%.",
        "Managed AWS FinOps and resource optimization, slashing infrastructure costs by 30-40% through right-sizing and spot instances."
      ]
    },
    {
      role: "AWS Engineer",
      company: "OptimumBrew Technology LLP",
      date_range: "APRIL 2025 – OCTOBER 2025",
      description: [
        "Managed AWS infrastructure supporting development environments, ensuring uptime of 99.9% for mission-critical builds.",
        "Optimized Jenkins-based CI workflows for Android APK generation, improving build speeds by 30% via cached layers and workspace tuning.",
        "Implemented automated SonarQube quality gates, reducing production bugs by 20% through continuous vulnerability scanning and static analysis.",
        "Troubleshot and resolved Bitbucket CI/CD pipeline bottlenecks, improving deployment frequency for the engineering team.",
        "Created Linux RBAC automation scripts, securing server access for 30+ internal users.",
        "Architected a GPU-accelerated processing workflow using NVIDIA CUDA and FFmpeg on AWS G4dn instances, increasing rendering efficiency by 50%."
      ]
    },
    {
      role: "Sr. Server and Cloud Engineer",
      company: "LOGIX BUILT SOLUTIONS PVT.LTD.",
      date_range: "FEBRUARY 2022 – FEBRUARY 2025",
      description: [
        "Architected multi-cloud infrastructure on AWS/GCP, improving scalability by 60% and reducing deployment lead time by 40%.",
        "Deployed and managed ECS clusters for containerized workloads, slashing resource wastage by 35% through optimized task definitions and dynamic scaling.",
        "Engineered Sophos firewall security frameworks with advanced VPN configurations, achieving zero unauthorized access incidents over a 3-year period.",
        "Optimized VMware vSphere ESXi environments, resulting in 80% faster VM provisioning and 40% improved compute utilization.",
        "Standardized Docker orchestration across dev teams, eliminating 'it works on my machine' issues and enhancing local development productivity.",
        "Implemented Terraform-based IaC for infrastructure provisioning, ensuring 100% environment parity between staging and production."
      ]
    },
    {
      role: "Network Engineer",
      company: "OptimumBrew Technology LLP",
      date_range: "JANUARY 2020 – JANUARY 2022",
      description: [
        "Managed FortiGate Firewall and server infrastructure for 60+ users, implementing advanced security policies and achieving 99.9% uptime.",
        "Engineered automated JFrog Artifactory backup solution using bash scripting, featuring incremental daily backups, retention policies, and automated email reporting.",
        "Designed and implemented self-hosted GitLab server with automated backup solutions and disaster recovery procedures (15-minute RTO).",
        "Deployed and managed self-hosted Zulip chat server for internal team communication (50+ members).",
        "Architected NextCloud platform with automated backup routines, managing 500GB+ of business-critical data.",
        "Deployed and configured Redmine project management system on cloud servers, implementing custom workflows."
      ]
    },
    {
      role: "IT Infrastructure Management Faculty",
      company: "Prakshal IT Academy",
      date_range: "SEPTEMBER 2017 – JANUARY 2020",
      description: [
        "Conducted training sessions on hardware, networking, and cloud computing technologies for over 40 students (95% satisfaction rate).",
        "Delivered comprehensive hands-on training on AWS cloud services, virtualization technologies, and deployment strategies.",
        "Introduced students to cloud architecture concepts, including scalability, high availability, and cost optimization principles."
      ]
    },
    {
      role: "Network Engineer",
      company: "D N K TECHNOLOGIES PVT LTD",
      date_range: "JANUARY 2017 – AUGUST 2017",
      description: [
        "Provided network support and troubleshooting, rapidly resolving connectivity and infrastructure issues.",
        "Assisted in network setup and configuration, contributing to successful deployment project completions."
      ]
    }
  ],
  awards: [
    { title: "Server / Cloud Support Dynamo", organization: "Logix Built Solutions Ltd.", date: "OCT 2024" },
    { title: "Technical Support Dynamo", organization: "Logix Built Solutions Ltd.", date: "OCT 2023" },
    { title: "Best Server Support Engineer", organization: "Logix Built Solutions Ltd.", date: "OCT 2022" }
  ],
  certifications: [
    { title: "Red Hat Certified System Administrator (RHCSA)", issuer: "Red Hat" },
    { title: "DevOps Course", issuer: "Intellipaat Software Solutions Pvt Ltd." },
    { title: "Cloud Computing Expert Course", issuer: "Prakshal IT Academy" }
  ]
};

function App() {
  const { skills, projects, experience, awards, certifications } = PORTFOLIO_DATA;

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />

      {/* SKILLS */}
      <section id="skills">
        <div className="container">
          <div className="section-label">Tech Stack</div>
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS & CERTIFICATIONS */}
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
