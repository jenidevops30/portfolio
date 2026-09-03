// Central Data Store (Frontend Only)

export const skills = [
  { name: "AWS", category: "Cloud Platform", icon_url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
  { name: "GCP", category: "Cloud Platform", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Azure", category: "Cloud Platform", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Docker", category: "Containerization", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", category: "Orchestration", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Terraform", category: "IaC", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "Jenkins", category: "CI/CD", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { name: "GitLab CI", category: "Pipelines", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "GitHub Actions", category: "CI/CD Automation", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg", invert: true },
  { name: "Linux", category: "Admin & Scripting", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", invert: true },
  { name: "Nginx", category: "Load Balancing", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Prometheus", category: "Monitoring", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
  { name: "Grafana", category: "Dashboards", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
  { name: "Ansible", category: "Automation", icon_url: "https://cdn.jsdelivr.dev/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
  { name: "Bash", category: "Scripting", icon_url: "https://cdn.jsdelivr.dev/gh/devicons/devicon/icons/bash/bash-original.svg", invert: true },
  { name: "ArgoCD", category: "GitOps", icon_url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/argocd/argocd-original.svg" },
];

// CI/CD pipeline stages shown in the Architecture section
export const pipeline = [
  { label: "Commit", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { label: "GitLab CI", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { label: "Docker Build", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { label: "Test & Scan", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { label: "Deploy", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { label: "AWS Prod", icon_url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
];

// High-availability infrastructure tiers shown in the Architecture section
export const infraTiers = [
  [{ label: "Route 53 DNS" }],
  [{ label: "Application Load Balancer" }],
  [{ label: "EC2 / EC2 Instance A" }, { label: "EC2 / EC2 Instance B" }],
  [{ label: "RDS (Multi-AZ)" }, { label: "S3 Backups" }],
];

export const projects = [
  {
    title: "jenidevops.in — Portfolio Site (CI/CD Case Study)",
    badge: "React · GitHub Actions · AWS",
    description: "This portfolio! Redesigned for enterprise SaaS aesthetics (Datadog/Vercel style). Showcases end-to-end DevOps: React/Vite app, automated GitHub Actions build, S3 deployment, and CloudFront CDN. Features live CI/CD status badge and automated cache invalidation.",
    tags: ["React", "Vite", "GitHub Actions", "S3", "CloudFront"],
    links: {
      repo: "https://github.com/jenidevops30/portfolio",
      live: "https://jenidevops.in",
      workflow: "https://github.com/jenidevops30/portfolio/actions/workflows/deploy.yml"
    },
    cicd: {
      enabled: true,
      badgeUrl: "https://github.com/jenidevops30/portfolio/actions/workflows/deploy.yml/badge.svg"
    }
  },
  {
    title: "Quickhunt — DigitalOcean to AWS Migration",
    badge: "AWS · Terraform",
    description: "Led the migration from DigitalOcean to a two-tier AWS architecture — CloudFront/S3 for the frontend, EC2/RDS for the backend — achieving 99.95% availability.",
    tags: ["Terraform", "CloudFront", "EC2", "RDS"],
  },
  {
    title: "Wishlist — High-Availability AWS Deployment",
    badge: "AWS · ALB · RDS",
    description: "Architected and executed the deployment of wishlist.webcontrive.com (React.js/Laravel) to AWS using Terraform, with ALB, Auto Scaling Groups, and AWS DMS for database migration.",
    tags: ["Terraform", "ALB", "ASG", "AWS DMS"],
  },
  {
    title: "Cloud Cost Optimization (FinOps)",
    badge: "FinOps · AWS",
    description: "Applied right-sizing, Graviton migration, and Spot Instance strategy across production workloads, cutting infrastructure spend by 30–40% without impacting reliability.",
    tags: ["FinOps", "Spot Instances", "Cost Explorer"],
  },
  {
    title: "Edu-Platform Azure Infrastructure",
    badge: "Azure · GitHub Actions",
    description: "Built a secure CI/CD pipeline for a global education platform using GitHub-to-Azure OIDC for passwordless auth, achieving 100% automated delivery to production with zero manual steps.",
    tags: ["Azure Web Apps", "OIDC", "GitHub Actions"],
  },
  {
    title: "Face Swap Pro — In-House AI Processing",
    badge: "AI · GPU Infrastructure",
    description: "Architected an on-premises, GPU-accelerated processing pipeline (NVIDIA CUDA + FFmpeg) with load balancing and monitoring for thousands of daily photo/video jobs.",
    tags: ["Python", "FastAPI", "GPU", "Linux"],
  },
  {
    title: "Logixbuilt Company Website",
    badge: "Next.js · GitLab CI/CD",
    description: "Built multi-environment GitLab CI/CD pipelines (dev, staging, prod) for the company website with automated tracking, secure auth, and monitoring — 40% faster deployment cycles.",
    tags: ["Next.js", "GitLab CI/CD", "AWS", "Node.js"],
  },
  {
    title: "OMI.day — Web Platform Management",
    badge: "Nginx · Security",
    description: "Own the ongoing infrastructure for the omi.day platform: server configuration, SSL/TLS, and performance tuning, with regular security hardening and maintenance.",
    tags: ["Nginx", "SSL/TLS", "Hardening"],
  },
  {
    title: "GitLab Self-Hosted Server",
    badge: "GitLab CE · Bash",
    description: "Designed and deployed an in-house GitLab server with custom bash-scripted backups, retention policies, and disaster recovery, sustaining 99.9% uptime.",
    tags: ["GitLab CE", "Bash", "Disaster Recovery"],
  },
  {
    title: "Enterprise Backup Solution",
    badge: "Automation · Reliability",
    description: "Built an automated backup system for critical business data (GitLab, MySQL, JFrog) with monitoring, alerting, and DR procedures at a 99.99% success rate.",
    tags: ["Bash Scripting", "Alerting", "DB Backups"],
  },
  {
    title: "AWS WordPress Deployment",
    badge: "AWS EC2 · WordPress",
    description: "Deployed a production WordPress platform on AWS EC2 with hardened security, SSL/TLS, and Apache tuning for 24/7 availability.",
    tags: ["AWS EC2", "WordPress", "MySQL"],
  },

  // NEW TIER 1 PROJECTS
  {
    title: "Shopify Production Infrastructure on AWS",
    badge: "AWS · Tier 1 · Professional",
    description: "Production AWS infrastructure for Laravel/PHP e-commerce applications managing EC2 fleet with Auto Scaling, Application Load Balancer traffic routing, RDS MariaDB clusters, VPC networking, and Cloudflare integration. Achieved 99.95% uptime over 6-month production period with 3 incident-induced outages auto-resolved via ASG health check recovery.",
    tags: ["AWS", "EC2", "ALB", "ASG", "Launch Templates", "RDS", "VPC", "Route 53", "Cloudflare", "Laravel", "PHP", "Apache", "MariaDB"],
    links: {
      repo: "https://github.com/jenidevops30/infrastructure-portfolio",
      live: "https://jenidevops.in"
    },
    cicd: {
      enabled: true,
      badgeUrl: "https://img.shields.io/badge/Uptime%2099.95%25--brightgreen"
    }
  },
  {
    title: "AWS Cost Optimization & FinOps",
    badge: "AWS · FinOps · Tier 1",
    description: "Comprehensive cost optimization initiative reducing monthly infrastructure from $813.43 to $327.07 (~59.8% reduction) through EC2 right-sizing, scheduled Auto Scaling Group scaling (off-peak instance reduction), RDS parameter tuning, EBS snapshot lifecycle policies, and NAT gateway consolidation. Maintained zero degradation in application performance or availability throughout the optimization period.",
    tags: ["AWS", "FinOps", "Cost Optimization", "EC2", "RDS", "ASG", "CloudWatch", "FinOps"],
    links: {
      repo: "https://github.com/jenidevops30/infrastructure-portfolio",
      live: "https://jenidevops.in"
    },
    cicd: {
      enabled: true,
      badgeUrl: "https://img.shields.io/badge/Cost%20Reduction%2059.8%25--brightgreen"
    }
  },
  {
    title: "AWS Security & VAPT Remediation",
    badge: "AWS · Security · Tier 1",
    description: "Comprehensive VAPT assessment and remediation of production AWS infrastructure identifying 12 security findings (3 critical, 5 high, 4 medium) across network, application, and configuration layers. Remediated critical vulnerabilities including public SSH access, missing ALB security headers, and Shopify Admin endpoint exposure. Achieved AWS Security Hub score improvement from 'basic' to 'intermediate' posture and zero successful security incidents in 6 months following remediation.",
    tags: ["AWS", "Security", "VAPT", "WAF", "IAM", "Cloudflare", "Compliance"],
    links: {
      repo: "https://github.com/jenidevops30/infrastructure-portfolio",
      live: "https://jenidevops.in"
    },
    cicd: {
      enabled: true,
      badgeUrl: "https://img.shields.io/badge/Findings%20Remediated%2012--brightgreen"
    }
  },

  // NEW TIER 2 PROJECTS
  {
    title: "Production CI/CD Pipeline with Jenkins",
    badge: "Jenkins · Tier 2 · Professional",
    description: "Designed and implemented automated CI/CD pipeline for PHP/Laravel application (Git → Jenkins → Build/Test → SonarQube → Deploy → Health Check). Increased deployment frequency from every 2-3 weeks to multiple per week, reduced deployment time from 45 minutes to 10 minutes, and decreased deployment failure rate from 15% to 3% (80% improvement). Integrated SonarQube quality gates to prevent defect leakage to production.",
    tags: ["Jenkins", "Groovy", "CI/CD", "SonarQube", "PHP", "Docker", "Automation"],
    links: {
      repo: "https://github.com/jenidevops30/infrastructure-portfolio",
      live: "https://jenidevops.in"
    },
    cicd: {
      enabled: true,
      badgeUrl: "https://img.shields.io/badge/Deployment%20Frequency%2010x--brightgreen"
    }
  },
  {
    title: "AWS GPU Infrastructure for Media Processing",
    badge: "AWS · GPU · Tier 2",
    description: "GPU-accelerated media processing infrastructure using EC2 g4dn.xlarge instances (NVIDIA T4 GPU with NVENC hardware acceleration) running Python transcoding scripts. Reduced processing time for 10-minute videos from 45 minutes to 4 minutes (91% reduction), cut cost per video from $1.50 to $0.45 (70% reduction), and achieved 95% Spot instance interruption success rate through checkpointing implementation. Hybrid On-Demand + Spot pricing model balanced reliability and cost.",
    tags: ["AWS", "GPU", "NVIDIA", "CUDA", "FFmpeg", "Python", "Media Processing", "Spot Instances"],
    links: {
      repo: "https://github.com/jenidevops30/infrastructure-portfolio",
      live: "https://jenidevops.in"
    },
    cicd: {
      enabled: true,
      badgeUrl: "https://img.shields.io/badge/Processing%20Time%2091%25%20Reduction--brightgreen"
    }
  },
  {
    title: "Dockerized Application & CI/CD — tenty.xyz",
    badge: "Docker · Tier 2 · Independent",
    description: "Independent Docker containerization project demonstrating multi-stage builds, docker-compose orchestration, and container best practices for PHP/Laravel application. Reduced Docker image size from 500+MB to ~120MB (75% reduction), cut deployment time from 10 minutes to 2 minutes (80% reduction), and achieved near-100% environment parity between local development and production. Fixed production restart loop, local environment drift, and build cache staleness incidents through systematic debugging and Dockerfile optimization.",
    tags: ["Docker", "Containerization", "PHP", "Laravel", "Dockerfile", "docker-compose", "Multi-stage Build"],
    links: {
      repo: "https://github.com/jenidevops30/infrastructure-portfolio",
      live: "https://jenidevops.in"
    },
    cicd: {
      enabled: true,
      badgeUrl: "https://img.shields.io/badge/Image%20Size%2075%25%20Reduction--brightgreen"
    }
  },

  // NEW TIER 3 PROJECTS
  {
    title: "AWS Infrastructure Automation with Terraform",
    badge: "Terraform · Tier 3 · Independent",
    description: "Infrastructure-as-Code project automating AWS provisioning across dev/staging/prod environments using Terraform modules, workspaces, and remote backend (S3 + DynamoDB state locking). Eliminated configuration drift between environments, reduced infrastructure provisioning time from 2-3 hours to 15 minutes (87% reduction), decreased environment promotion time from 1 day to 30 minutes (83% reduction), and reduced configuration duplication by ~70% through module reuse. Added automated drift detection via `terraform plan -refresh-only` and pre-commit hooks with `terraform validate`.",
    tags: ["Terraform", "IaC", "AWS", "Modules", "Workspaces", "S3", "DynamoDB", "Drift Detection"],
    links: {
      repo: "https://github.com/jenidevops30/infrastructure-portfolio",
      live: "https://jenidevops.in"
    },
    cicd: {
      enabled: true,
      badgeUrl: "https://img.shields.io/badge/Provisioning%2015%20min%20vs%203hr--brightgreen"
    }
  },
  {
    title: "Production Monitoring & Incident Response",
    badge: "Reliability · Tier 3 · Methodology",
    description: "Systematic incident response methodology (Detection → Investigation → Root Cause → Resolution → Validation → Prevention) applied across 12+ production incidents. Reduced mean time to detection (MTTD) from 30 minutes to 5 minutes (83% reduction) through improved CloudWatch alarming and log monitoring. Reduced mean time to resolution (MTTR) from 25 minutes to 8 minutes (68% reduction) through systematic root cause analysis. Achieved 70% reduction in incident recurrence over 6-month period through runbook updates, alarm refinement, and automated testing. Documented 12+ incident reports with timelines, root causes, resolutions, and prevention measures in team knowledge base.",
    tags: ["Monitoring", "Incident Response", "Reliability", "CloudWatch", "SNS", "Root Cause Analysis", "MTTR", "MTTD"],
    links: {
      repo: "https://github.com/jenidevops30/infrastructure-portfolio",
      live: "https://jenidevops.in"
    },
    cicd: {
      enabled: true,
      badgeUrl: "https://img.shields.io/badge/MTTR%2025m%208m%2068%25--brightgreen"
    }
  },
];

export const experience = [
  {
    role: "DevOps Engineer",
    company: "Webcontrive",
    logo_url: "https://media.licdn.com/dms/image/v2/C4D0BAQEObR1Ebumg1w/company-logo_200_200/company-logo_200_200/0/1656572032813/webcontriveindia_logo?e=2147483647&v=beta&t=BItBRzG2Rd_wXsqaEzW6W1WlAQ9VPacZNdWEM7ejsUM",
    date_range: "NOVEMBER 2025 – PRESENT",
    description: [
      "Led the migration of production infrastructure from DigitalOcean to AWS, reducing architectural overhead by 25% and improving overall system reliability.",
      "Migrated the Quickhunt application to a two-tier architecture — CloudFront/S3 (frontend) and EC2/RDS (backend) — achieving 99.95% availability.",
      "Optimized application storage using Amazon S3, resulting in 35% faster asset retrieval for global users.",
      "Migrated wishlist.webcontrive.com (React.js/Laravel) to AWS with ALB, ASG, and RDS, enabling automated scaling for peak traffic events.",
      "Configured Cloudflare WAF and bot protection, mitigating over 10k monthly malicious requests on production endpoints.",
      "Implemented proactive monitoring with CloudWatch, Lambda, and SNS integrated with Slack, reducing MTTR by 40%.",
      "Managed AWS FinOps and resource optimization, cutting infrastructure costs by 30–40% through right-sizing and spot instances.",
    ],
  },
  {
    role: "AWS Engineer",
    company: "OptimumBrew Technology LLP",
    logo_url: "https://media.licdn.com/dms/image/v2/C560BAQG4qupHkN_isg/company-logo_200_200/company-logo_200_200/0/1631335137135?e=2147483647&v=beta&t=ZR4FnuFNzjbs-RLPU_5CkwaVbSjvMSn_PGahzAv-Tsk",
    date_range: "APRIL 2025 – OCTOBER 2025",
    description: [
      "Managed AWS infrastructure supporting development environments, sustaining 99.9% uptime for mission-critical builds.",
      "Optimized Jenkins-based CI workflows for Android APK generation, improving build speeds by 30% via caching and workspace tuning.",
      "Implemented automated SonarQube quality gates, reducing production bugs by 20% through continuous static analysis.",
      "Resolved Bitbucket CI/CD pipeline bottlenecks, improving deployment frequency for the engineering team.",
      "Wrote Linux RBAC automation scripts, securing server access for 30+ internal users.",
      "Architected a GPU-accelerated processing workflow (NVIDIA CUDA + FFmpeg) on AWS G4dn instances, increasing rendering efficiency by 50%.",
    ],
  },
  {
    role: "Sr. Server and Cloud Engineer",
    company: "Logix Built Solutions Pvt. Ltd.",
    logo_url: "d3gv0jmljv77gc.cloudfront.net/frontend/assets/lbicon.png",
    date_range: "FEBRUARY 2022 – FEBRUARY 2025",
    description: [
      "Architected multi-cloud infrastructure on AWS/GCP, improving scalability by 60% and cutting deployment lead time by 40%.",
      "Deployed and managed ECS clusters for containerized workloads, reducing resource wastage by 35% through optimized task definitions.",
      "Engineered Sophos firewall security frameworks with advanced VPN configuration, sustaining zero unauthorized access incidents over 3 years.",
      "Optimized VMware vSphere ESXi environments for 80% faster VM provisioning and 40% better compute utilization.",
      "Standardized Docker orchestration across dev teams, eliminating environment-parity issues.",
      "Implemented Terraform-based IaC, ensuring 100% environment parity between staging and production.",
    ],
  },
  {
    role: "Network Engineer",
    company: "OptimumBrew Technology LLP",
    date_range: "JANUARY 2020 – JANUARY 2022",
    description: [
      "Managed FortiGate firewall and server infrastructure for 60+ users, achieving 99.9% uptime.",
      "Built an automated JFrog Artifactory backup solution with incremental backups, retention policies, and email reporting.",
      "Designed a self-hosted GitLab server with automated backup and disaster recovery (15-minute RTO).",
      "Deployed and managed a self-hosted Zulip chat server for internal team communication (50+ members).",
      "Architected a NextCloud platform with automated backups, managing 500GB+ of business-critical data.",
    ],
  },
  {
    role: "IT Infrastructure Management Faculty",
    company: "Prakshal IT Academy",
    date_range: "SEPTEMBER 2017 – JANUARY 2020",
    description: [
      "Delivered hands-on training on AWS cloud services, virtualization, and deployment strategies to 40+ students (95% satisfaction rate).",
      "Introduced students to cloud architecture concepts — scalability, high availability, and cost optimization.",
    ],
  },
  {
    role: "Network Engineer",
    company: "D N K Technologies Pvt Ltd",
    date_range: "JANUARY 2017 – AUGUST 2017",
    description: [
      "Provided network support and troubleshooting, rapidly resolving connectivity and infrastructure issues.",
      "Assisted in network setup and configuration for successful deployment projects.",
    ],
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
