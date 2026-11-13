// Central portfolio content. Keep public projects separate from anonymized professional case studies.

export const projects = [
  {
    title: "AWS Billing Dashboard",
    category: "Public project",
    badge: "Python · Streamlit · AWS Cost Explorer",
    description: "A Streamlit application for exploring AWS billing data, monthly cost trends, and service-level spend. Includes a sample-data demo path and a separate AWS-connected workflow.",
    tags: ["Python", "Streamlit", "AWS", "Cost Explorer", "Pandas"],
    links: { repo: "https://github.com/jenidevops30/aws-billing-dashboard" },
  },
  {
    title: "DevOps Chatbot",
    category: "Public project",
    badge: "React · Node.js · Gemini AI · Docker",
    description: "An AI-assisted DevOps chatbot project covering infrastructure and delivery topics, with a React interface, Node.js API, Docker-based development and a documented CI/CD workflow.",
    tags: ["React", "Node.js", "Gemini AI", "Docker", "GitHub Actions"],
    links: { repo: "https://github.com/jenidevops30/devops-chatbot" },
  },
  {
    title: "Linux Automation Toolkit",
    category: "Public project",
    badge: "Bash · Linux · Ansible · systemd",
    description: "A provider-neutral toolkit for Linux server health checks and daily reporting, with CPU, memory, disk, service and network checks plus an Ansible configuration layer.",
    tags: ["Bash", "Linux", "Ansible", "systemd", "Automation"],
    links: { repo: "https://github.com/jenidevops30/linux-automation-toolkit" },
  },
  {
    title: "AWS DevOps Incident Helper",
    category: "Public project",
    badge: "AWS Lambda · API Gateway · Amazon Bedrock",
    description: "A serverless application that analyzes infrastructure incident descriptions and CloudWatch log excerpts, and helps prepare diagnostic commands, runbooks and incident reports.",
    tags: ["AWS Lambda", "API Gateway", "Amazon Bedrock", "Python", "CloudWatch"],
    links: { repo: "https://github.com/jenidevops30/aws-devops-incident-helper", live: "https://main.d2v4zdm3pgizqg.amplifyapp.com" },
  },
  {
    title: "AWS Production Platform",
    category: "Public project",
    badge: "Terraform · Ansible · EC2 · ALB",
    description: "An infrastructure-as-code project demonstrating a multi-AZ AWS application platform with network isolation, load balancing, Auto Scaling and Ansible-based host configuration. This is a portfolio/lab implementation, not a claim that this exact stack is a current employer production environment.",
    tags: ["AWS", "Terraform", "Ansible", "EC2", "ALB", "Auto Scaling"],
    links: { repo: "https://github.com/jenidevops30/aws-production-platform" },
  },
  {
    title: "InfraBuddy",
    category: "Public project",
    badge: "Python · AWS SDK · AI-assisted operations",
    description: "An evolving AI-assisted AWS operations project that collects infrastructure context and supports troubleshooting workflows across common AWS resources. Capabilities and integrations should be read alongside the repository documentation.",
    tags: ["Python", "Boto3", "AWS", "Amazon Bedrock", "ChatOps"],
    links: { repo: "https://github.com/jenidevops30/infrabuddy" },
  },
  {
    title: "AWS Cost Optimization Intelligence",
    category: "Public project · In progress",
    badge: "Python · FinOps · Billing analysis",
    description: "A local-first FinOps toolkit for reviewing AWS billing CSVs, comparing service-level spend and documenting optimization opportunities. The repository contains reported case-study figures that are intentionally not reproduced here until their evidence is reconciled and approved.",
    tags: ["Python", "AWS", "FinOps", "CSV", "Cost Analysis"],
    links: { repo: "https://github.com/jenidevops30/aws-cost-optimization" },
  },
  {
    title: "Portfolio Website & Delivery Workflow",
    category: "Public project",
    badge: "React · Vite · GitHub Actions",
    description: "This portfolio website, built with React and Vite, with a GitHub Actions delivery workflow. The redesign is being refined through a staged review process.",
    tags: ["React", "Vite", "GitHub Actions", "AWS"],
    links: { repo: "https://github.com/jenidevops30/portfolio", live: "https://jenidevops.in" },
  },
  {
    title: "AWS Production Infrastructure Operations",
    category: "Professional case study",
    badge: "AWS · EC2 · ALB · Auto Scaling · RDS",
    description: "An anonymized account of production infrastructure operations for a Shopify-integrated application. Covers EC2 fleet and launch-template management, Application Load Balancers, Auto Scaling Groups, RDS, VPC networking, CloudWatch monitoring and Linux application-server operations. Company identifiers and proprietary configuration are intentionally excluded.",
    tags: ["AWS", "EC2", "ALB", "Auto Scaling", "Launch Templates", "RDS", "VPC", "CloudWatch", "Apache", "PHP-FPM"],
  },
  {
    title: "EC2 Graviton Migration",
    category: "Professional case study",
    badge: "AWS · Graviton · Auto Scaling",
    description: "An anonymized production migration from x86-based c5.xlarge capacity to ARM-based c6g.xlarge instances using the Auto Scaling workflow. Focuses on compatibility checks, launch configuration updates, rollout coordination and post-migration validation. No employer metrics are published.",
    tags: ["AWS", "EC2", "Graviton", "ARM64", "Auto Scaling", "Launch Templates"],
  },
  {
    title: "Android Application CI Pipeline",
    category: "Professional case study",
    badge: "Jenkins · Android · SonarQube · Artifactory",
    description: "An anonymized CI pipeline for a Java-based Android application, covering source checkout, build and test execution, APK/AAB generation, SonarQube analysis, artifact publishing to a locally hosted JFrog Artifactory instance and email notifications.",
    tags: ["Jenkins", "Java", "Android", "Gradle", "SonarQube", "JFrog Artifactory"],
  },
  {
    title: "Next.js Website CI/CD",
    category: "Professional case study",
    badge: "GitLab CI/CD · Next.js",
    description: "An anonymized delivery workflow for a company website using GitLab CI/CD. Describes repeatable source-to-build automation and deployment standardization without exposing internal repository details or deployment credentials.",
    tags: ["GitLab CI/CD", "Next.js", "Node.js", "Linux", "Automation"],
  },
  {
    title: "Kubernetes Cluster Lab",
    category: "Learning lab",
    badge: "Kubernetes · kubeadm · Calico",
    description: "A hands-on Kubernetes learning environment built with kubeadm and Calico networking across Ubuntu virtual machines. Used to practise cluster setup, node operations, networking, workload deployment and troubleshooting.",
    tags: ["Kubernetes", "kubeadm", "Calico", "Ubuntu", "containerd", "VMware"],
  },
];

export const awards = [
  { title: "Server / Cloud Support Dynamo", organization: "Logix Built Solutions Ltd.", date: "OCT 2024" },
  { title: "Technical Support Dynamo", organization: "Logix Built Solutions Ltd.", date: "OCT 2023" },
  { title: "Best Server Support Engineer", organization: "Logix Built Solutions Ltd.", date: "OCT 2022" },
];

export const certifications = [
  { title: "Red Hat Certified System Administrator (RHCSA)", issuer: "Red Hat" },
  { title: "DevOps Course", issuer: "Intellipaat Software Solutions Pvt Ltd." },
  { title: "Cloud Computing Expert Course", issuer: "Prakshal IT Academy" },
];

export const contact = {
  email: "pateljeni007.jp@gmail.com",
  phone: "+91 8849742011",
  whatsapp: "https://wa.me/918849742011",
  location: "Surat, Gujarat, India",
  github: "https://github.com/jenidevops30",
  githubUsername: "jenidevops30",
  linkedin: "https://www.linkedin.com/in/jeni-patel-devops-engg/",
  resume: "/resume.pdf",
};
