// Central Data Store (Frontend Only)

export const projects = [
  {
    title: "AWS Production Infrastructure Operations",
    category: "Professional experience",
    badge: "AWS · EC2 · ALB · Auto Scaling · RDS",
    description: "Operate AWS infrastructure supporting production Shopify applications. Work includes EC2 fleet and launch-template management, Application Load Balancers, Auto Scaling Groups, RDS, VPC networking, CloudWatch monitoring, and application-server operations with Apache and PHP-FPM.",
    tags: ["AWS", "EC2", "ALB", "Auto Scaling", "Launch Templates", "RDS", "VPC", "CloudWatch", "Apache", "PHP-FPM"],
  },
  {
    title: "EC2 Graviton Migration",
    category: "Professional experience",
    badge: "AWS · Graviton · Auto Scaling",
    description: "Migrated production EC2 capacity from x86-based c5.xlarge instances to ARM-based c6g.xlarge instances through the Auto Scaling workflow. The work involved instance-family compatibility, launch configuration updates, rollout coordination, and post-migration validation.",
    tags: ["AWS", "EC2", "Graviton", "ARM64", "Auto Scaling", "Launch Templates"],
  },
  {
    title: "Android Application CI Pipeline",
    category: "Professional experience",
    badge: "Jenkins · Android · SonarQube · Artifactory",
    description: "Worked on a Jenkins pipeline for a Java-based Android application. The workflow covered source checkout, build and test execution, APK/AAB artifact generation, SonarQube code analysis, publishing artifacts to a locally hosted JFrog Artifactory instance, and email notifications.",
    tags: ["Jenkins", "Java", "Android", "Gradle", "SonarQube", "JFrog Artifactory"],
  },
  {
    title: "Next.js Website CI/CD",
    category: "Professional experience",
    badge: "GitLab CI/CD · Next.js",
    description: "Implemented and maintained GitLab CI/CD automation for a Next.js company website. The pipeline supported repeatable source-to-build delivery and helped standardize the deployment workflow.",
    tags: ["GitLab CI/CD", "Next.js", "Node.js", "Linux", "Automation"],
  },
  {
    title: "AWS Cost Optimization Intelligence",
    category: "Independent project",
    badge: "Python · Streamlit · AWS FinOps",
    description: "An independent FinOps project exploring AWS cost visibility and optimization analysis. The planned capabilities include cost breakdowns, EC2 and RDS inventory insights, storage analysis, and utilization-informed recommendations. Treat this as a project in progress rather than a production service.",
    tags: ["Python", "Streamlit", "AWS", "Cost Explorer", "FinOps", "EC2", "RDS"],
  },
  {
    title: "Kubernetes Cluster Lab",
    category: "Learning lab",
    badge: "Kubernetes · kubeadm · Calico",
    description: "A hands-on Kubernetes learning environment built with kubeadm and Calico networking across Ubuntu virtual machines. Used to practise cluster setup, node operations, networking, workload deployment, and troubleshooting.",
    tags: ["Kubernetes", "kubeadm", "Calico", "Ubuntu", "containerd", "VMware"],
  },
  {
    title: "Portfolio Website & Delivery Workflow",
    category: "Independent project",
    badge: "React · Vite · GitHub Actions · AWS",
    description: "The portfolio website repository, built with React and Vite. The project includes a GitHub Actions deployment workflow targeting AWS hosting. The implementation and deployment workflow are being refined as part of this redesign.",
    tags: ["React", "Vite", "GitHub Actions", "AWS", "S3", "CloudFront"],
    links: {
      repo: "https://github.com/jenidevops30/portfolio",
      live: "https://jenidevops.in",
    },
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
