export const PORTFOLIO_DATA = {
  hero: {
    name: "Jeni Patel",
    title: "AWS Cloud & DevOps Engineer",
    valueProposition: "AWS Cloud & DevOps Engineer specializing in designing scalable, secure, highly available, and cost-efficient cloud infrastructures",
    proofMetrics: "100+ deployments | up to 99.95% uptime | up to 59% infrastructure cost optimization achieved",
    stats: [
      { num: "6+", label: "Years Experience" },
      { num: "100+", label: "Deployments Handled" },
      { num: "59%", label: "Max Cost Savings" },
      { num: "99.95%", label: "Availability Achieved" }
    ],
    marqueeTools: [
      { name: "AWS", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
      { name: "ArgoCD", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/argocd/argocd-original.svg" },
      { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
      { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
      { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
    ]
  },

  bentoSkills: {
    cell1: {
      id: "aws-ecosystem",
      title: "AWS Cloud Ecosystem",
      badge: "SAA-C03 Candidate",
      highlight: "AWS Solutions Architect – Associate (SAA-C03) Candidate",
      description: "Production architectural mastery across compute, auto-scaling, storage, high-availability databases, and CDN acceleration.",
      services: [
        "Application Load Balancer (ALB)",
        "Auto Scaling Groups (ASG)",
        "Launch Templates",
        "Multi-AZ Amazon RDS",
        "Graviton / ARM64 Migration",
        "AWS Database Migration Service (DMS)",
        "Amazon CloudFront CDN",
        "Amazon CloudWatch & Alarms"
      ]
    },
    cell2: {
      id: "multi-cloud",
      title: "Multi-Cloud Platforms",
      badge: "GCP & Azure",
      description: "Multi-region governance, virtual network design, and hybrid cloud workload orchestration.",
      providers: [
        { name: "Google Cloud Platform (GCP)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        { name: "Microsoft Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" }
      ]
    },
    cell3: {
      id: "iac-containers",
      title: "Infrastructure as Code & Containers",
      badge: "IaC & Kubernetes",
      description: "Declarative infrastructure automation, immutable container delivery, and cluster lifecycle orchestration.",
      items: [
        "Terraform IaC (Modular & Parity)",
        "Docker Standardization",
        "Kubernetes Cluster Management",
        "Amazon ECS (Fargate/EC2)",
        "Enterprise VMware vSphere ESXi"
      ]
    },
    cell4: {
      id: "cicd",
      title: "CI/CD & Delivery Engines",
      badge: "Zero-Downtime",
      description: "Automated pipelines, static analysis quality gates, and declarative GitOps synchronization.",
      items: [
        "Jenkins CI Pipelines",
        "GitHub Actions & OIDC",
        "GitLab CI",
        "ArgoCD GitOps",
        "Ansible Playbooks",
        "SonarQube Quality Gates"
      ]
    },
    cell5: {
      id: "observability",
      title: "Monitoring & Observability",
      badge: "SRE & Metrics",
      description: "Proactive log telemetry, threshold alerting, and visual performance dashboards.",
      items: [
        "Prometheus Metric Collectors",
        "Grafana Real-Time Dashboards",
        "AWS CloudWatch Metric Filters & Alarms"
      ]
    },
    cell6: {
      id: "os-scripting",
      title: "Operating Systems & Scripting",
      badge: "Systems & Security",
      description: "Production Linux hardening, automated operational tooling, and robust network routing.",
      items: [
        "Advanced Linux Administration",
        "Python & Bash Scripting",
        "Network Engineering & VPCs",
        "Firewall Administration (Sophos, FortiGate)"
      ]
    }
  },

  projects: [
    {
      id: "quickhunt-migration",
      category: "AWS Migration",
      title: "Quickhunt Migration",
      metric: "99.95% High Availability",
      description: "Migrated Quickhunt workload from DigitalOcean to AWS, achieving 99.95% high availability.",
      tags: ["AWS", "Migration", "High Availability", "Terraform", "ALB", "RDS"],
      case_study: {
        problem: "Legacy application suffered from frequent downtime, manual horizontal scaling limits, and single-point-of-failure vulnerabilities on single VPS hosting.",
        architecture: "Engineered a resilient two-tier High Availability architecture utilizing Application Load Balancers, Multi-AZ Auto Scaling Groups, Amazon RDS MySQL, and CloudFront caching.",
        architecture_image: "/assets/projects/quickhunt-arch.png",
        workflow_image: "/assets/projects/quickhunt-cicd.png",
        challenges: "Ensuring zero data loss during live database cutover from on-premise VPS to AWS RDS and configuring automated SSL termination via AWS ACM.",
        results: "Achieved 99.95% verified uptime, automated 100% of infrastructure provisioning via Terraform modules, and enabled automatic recovery across availability zones."
      }
    },
    {
      id: "gpu-face-swap-pro",
      category: "AI & High Performance",
      title: "GPU Infrastructure - Face Swap Pro",
      metric: "60% Cost Reduction & Ultra-Low Latency",
      description: "Architected scalable, highly available GPU server infrastructure for Face Swap Pro.",
      tags: ["GPU Compute", "Infrastructure Design", "Scalability", "Linux", "CUDA"],
      case_study: {
        problem: "Astronomical public cloud GPU instance costs made high-throughput AI photo and video generation economically unsustainable at scale.",
        architecture: "Designed a dedicated on-premises high-performance GPU server cluster integrated with low-latency NVMe scratch arrays and intelligent queue management.",
        challenges: "Managing thermal throttling thresholds under sustained compute load, fine-tuning NVIDIA CUDA driver allocations, and ensuring zero-downtime service restarts.",
        results: "Slashed monthly GPU processing expenditures by 60% while sustaining sub-second AI inference rendering for thousands of daily active users."
      }
    },
    {
      id: "wishlist-storefront",
      category: "E-Commerce Infrastructure",
      title: "Wishlist Storefront Deployment",
      metric: "3x Peak Traffic Handling",
      description: "Deployed wishlist.webcontrive.com using automated Terraform, ALB, ASG, and AWS Database Migration Service (DMS).",
      tags: ["Terraform", "AWS DMS", "ALB/ASG", "RDS Multi-AZ", "CloudWatch"],
      case_study: {
        problem: "High-volume Shopify application required an enterprise-grade production environment capable of auto-scaling during flash sales without manual engineering intervention.",
        architecture: "Implemented a fully modular Terraform deployment featuring public Application Load Balancers, private EC2 Auto Scaling tiers, Multi-AZ RDS, and AWS DMS live replication.",
        challenges: "Replicating production transactional data in real time with continuous Change Data Capture (CDC) and executing a seamless DNS cutover.",
        results: "Delivered automated horizontal scaling supporting 3x traffic surges, zero user disruption during migrations, and full GitOps infrastructure parity."
      }
    },
    {
      id: "secure-azure-cicd",
      category: "SecOps & Cloud Delivery",
      title: "Secure Azure CI/CD Platform",
      metric: "100% Elimination of Hardcoded Secrets",
      description: "Engineered a highly secure CI/CD platform using GitHub Actions with OpenID Connect (OIDC) authentication.",
      tags: ["Azure", "OIDC", "GitHub Actions", "Security", "SonarQube"],
      case_study: {
        problem: "Long-lived static service principal credentials stored in repository secrets posed severe security risks, credential rotation overhead, and compliance audit flags.",
        architecture: "Architected a passwordless authentication workflow using OpenID Connect (OIDC) between GitHub Actions and Microsoft Azure federated identities, coupled with automated SonarQube quality gates.",
        workflow_image: "/assets/projects/secops-workflow.png",
        challenges: "Refactoring legacy deployment pipelines to ingest dynamic federated JWT tokens and scoping Azure RBAC roles strictly according to least-privilege principles.",
        results: "100% elimination of long-lived credentials, 40% reduction in production vulnerability risks, and automated compliance auditing for all pull requests."
      }
    },
    {
      id: "graviton-optimization",
      category: "FinOps & Architecture",
      title: "AWS Graviton Migration & Cost Optimization",
      metric: "$800 to $327/mo (59% Cost Savings)",
      description: "Migrated Webcontrive workloads to AWS Graviton/ARM64 architectures and managed ALB, ASG, Launch Templates, and Multi-AZ RDS. Successfully reduced monthly AWS bills from $800 to $327 (59% cost savings).",
      tags: ["Graviton/ARM64", "AWS Optimization", "RDS", "EC2", "FinOps"],
      case_study: {
        problem: "Over-provisioned x86 EC2 instances and unoptimized RDS database allocations resulted in inflated monthly AWS operational costs.",
        architecture: "Re-engineered compute clusters from x86 c5.xlarge to ARM64 c6g.xlarge (AWS Graviton2/3), consolidated Auto Scaling minimums from 3 instances to 2, and optimized RDS storage tiers.",
        challenges: "Recompiling PHP/Laravel extensions, native C dependencies, and Apache modules for ARM64 architecture compatibility while maintaining strict SLA uptime.",
        results: "Successfully reduced monthly AWS expenditure from $800 to $327 (59% direct cost reduction) while improving average response times by 18%."
      }
    }
  ],

  experience: [
    {
      role: "AWS Cloud & DevOps Engineer",
      company: "Webcontrive",
      period: "Current Role",
      date_range: "NOVEMBER 2025 – PRESENT",
      keyActions: [
        "Managed high-availability AWS infrastructure utilizing <strong>Application Load Balancers (ALB), Auto Scaling Groups (ASG), Launch Templates, and Multi-AZ Amazon RDS</strong>.",
        "Engineered zero-touch automated EC2 bootstrap scripts in Launch Templates to dynamically deploy the <strong>Laravel production application from Git</strong> and synchronize admin assets.",
        "Spearheaded migration of production workloads to <strong>AWS Graviton (c6g.xlarge / ARM64)</strong>, right-sizing cluster capacity and driving a <strong>59% cost reduction (from $800 to $327/mo)</strong>.",
        "Diagnosed and resolved critical production <strong>HTTP 429 rate-limiting issues</strong> by reconfiguring Apache2 reverse proxy headers to accurately preserve client IPs through Cloudflare.",
        "Remediated <strong>VAPT security vulnerabilities</strong> by enforcing HTTP security headers and implementing browser-based access controls for internal endpoints.",
        "Conducted proactive Linux systems administration, performance tuning, and 24/7 incident response."
      ]
    },
    {
      role: "AWS Engineer",
      company: "OptimumBrew Technology LLP",
      period: "Prior Role",
      date_range: "APRIL 2025 – OCTOBER 2025",
      keyActions: [
        "Architected and maintained mission-critical AWS environments guaranteeing 99.9% application availability.",
        "Optimized Jenkins-based CI/CD build pipelines for Android APK generation, <strong>accelerating build speeds by 30%</strong>.",
        "Implemented automated <strong>SonarQube quality gates</strong>, decreasing production code defects by 20%."
      ]
    },
    {
      role: "Senior Server & Cloud Engineer",
      company: "LOGIX BUILT SOLUTIONS PVT. LTD.",
      period: "Prior Role",
      date_range: "FEBRUARY 2022 – FEBRUARY 2025",
      keyActions: [
        "Architected multi-cloud environments on <strong>AWS & GCP</strong>, enhancing infrastructure scalability by 60% and reducing lead times by 40%.",
        "Deployed and maintained <strong>Amazon ECS clusters</strong> for containerized microservices, reducing compute waste by 35%.",
        "Engineered enterprise <strong>Sophos & FortiGate firewall security frameworks</strong> with site-to-site VPN tunnels.",
        "Optimized <strong>VMware vSphere ESXi</strong> virtualized environments, achieving 80% faster VM provisioning cycles.",
        "Standardized Docker containerization across development teams and implemented <strong>Terraform-based IaC</strong> for 100% environment parity."
      ]
    },
    {
      role: "Earlier Technical Foundation",
      company: "OptimumBrew Technology, Prakshal IT Academy & DNK Technologies",
      period: "Foundation Milestones",
      date_range: "JANUARY 2017 – JANUARY 2022",
      keyActions: [
        "Administered enterprise <strong>FortiGate and Sophos firewalls</strong>, VLAN routing, and corporate network security policies.",
        "Engineered automated backup and disaster recovery solutions for <strong>JFrog Artifactory, NextCloud (500GB+), and self-hosted GitLab</strong>.",
        "Deployed and maintained internal collaboration suites including <strong>Zulip Chat and Redmine Project Management</strong>.",
        "Delivered hands-on technical faculty training on <strong>hardware, networking, virtualization, and AWS cloud fundamentals</strong> for 40+ engineering students."
      ]
    }
  ],

  awards: [
    {
      title: "Server / Cloud Support Dynamo",
      organization: "LOGIX BUILT SOLUTIONS PVT. LTD.",
      date: "OCT 2024",
      description: "Awarded for exceptional uptime reliability and multi-cloud architectural troubleshooting across enterprise workloads."
    },
    {
      title: "Technical Support Dynamo",
      organization: "LOGIX BUILT SOLUTIONS PVT. LTD.",
      date: "OCT 2023",
      description: "Recognized for proactive incident management, zero-downtime server migrations, and client escalation resolution."
    },
    {
      title: "Best Server Support Engineer",
      organization: "LOGIX BUILT SOLUTIONS PVT. LTD.",
      date: "OCT 2022",
      description: "Honored for excellence in Linux system administration, VMware virtualization optimization, and firewall engineering."
    }
  ],

  knowledgeTopics: [
    { name: "AWS Migrations", tag: "AWS Migrations", count: "Zero-Downtime DMS" },
    { name: "GitHub Actions", tag: "GitHub Actions", count: "OIDC & Automated CI/CD" },
    { name: "CloudFront Caching", tag: "CloudFront Caching", count: "Global Edge Acceleration" },
    { name: "Terraform IaC", tag: "Terraform IaC", count: "Modular Multi-Account" },
    { name: "AWS CloudWatch", tag: "AWS CloudWatch", count: "Metric Filters & Alarms" },
    { name: "DevOps Practices", tag: "DevOps Practices", count: "FinOps & GitOps" }
  ],

  blogs: [
    {
      slug: "automating-portfolio-deployment-with-github-actions-and-aws",
      title: "Automating Portfolio Deployment with GitHub Actions and AWS",
      excerpt: "A deep dive into building a production-grade CI/CD pipeline for static sites using S3, CloudFront, and secure IAM protocols.",
      date: "MAY 14, 2026",
      read_time: "7 min read",
      tags: ["GitHub Actions", "AWS", "S3", "CloudFront"],
      image: "/assets/blogs/github-aws.png",
      content: [
        "### Introduction",
        "In today's fast-paced development environment, manually deploying website updates is both time-consuming and error-prone. Continuous Integration and Continuous Deployment (CI/CD) practices enable developers to automate deployments, ensuring faster releases, consistency, and reliability.",
        "In this blog, we'll explore how to automate the deployment of a personal portfolio website using **GitHub Actions** and **Amazon Web Services (AWS)**. By the end, every code push to your GitHub repository will automatically update your live portfolio site.",
        "---",
        "### Why Automate Portfolio Deployment?",
        "Automating deployments offers several benefits:",
        "- **Faster Updates**: Deploy changes instantly after pushing code.",
        "- **Reduced Human Error**: Eliminate manual deployment mistakes.",
        "- **Improved Productivity**: Focus on development rather than deployment tasks.",
        "- **Professional Workflow**: Demonstrates DevOps and cloud engineering skills to recruiters and clients.",
        "---",
        "### Architecture Overview",
        "The deployment workflow follows this process:",
        "1. Developer pushes code to GitHub.",
        "2. GitHub Actions triggers a workflow.",
        "3. The workflow builds and validates the project.",
        "4. AWS receives the updated files.",
        "5. The portfolio website is automatically updated.",
        "---",
        "### Tools Used",
        "- **GitHub Repository**",
        "- **GitHub Actions**",
        "- **AWS S3** (Static Website Hosting)",
        "- **AWS CloudFront** (Global CDN & HTTPS)",
        "- **AWS IAM** (Least-Privilege Access Management)",
        "---",
        "### Step 1: Create an S3 Bucket",
        "1. Log in to the AWS Console and navigate to S3.",
        "2. Create a new bucket with a globally unique name.",
        "3. Enable static website hosting in bucket properties.",
        "4. Configure bucket policy for secure public read access or origin access control (OAC).",
        "---",
        "### Step 2: Create an IAM User and Secrets",
        "Create an IAM user with scoped permissions strictly limited to your target S3 bucket and CloudFront distribution. Save the Access Key ID and Secret Access Key securely in GitHub Secrets.",
        "---",
        "### Step 3: Configure GitHub Actions Workflow",
        "Inside `.github/workflows/deploy.yml`, define the automated pipeline:",
        "```yaml\nname: Deploy Portfolio to AWS\n\non:\n  push:\n    branches:\n      - main\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n    - name: Checkout Repository\n      uses: actions/checkout@v4\n\n    - name: Configure AWS Credentials\n      uses: aws-actions/configure-aws-credentials@v4\n      with:\n        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n        aws-region: ${{ secrets.AWS_REGION }}\n\n    - name: Sync to S3\n      run: |\n        aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete\n\n    - name: Invalidate CloudFront Cache\n      run: |\n        aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DIST_ID }} --paths \"/*\"\n```",
        "---",
        "### Conclusion",
        "With a fully automated CI/CD pipeline, every git commit triggers instant, validated updates to production with zero manual overhead."
      ]
    },
    {
      slug: "migrating-from-digitalocean-to-aws-zero-downtime-guide",
      title: "Migrating from DigitalOcean to AWS: A Zero-Downtime Guide",
      excerpt: "Lessons learned while moving production workloads to a more scalable AWS ecosystem using ALB, Auto Scaling, and AWS DMS.",
      date: "MAY 10, 2026",
      read_time: "8 min read",
      tags: ["AWS Migrations", "Terraform IaC", "DevOps Practices"],
      image: "/assets/blogs/migration.png",
      content: [
        "### Introduction",
        "Migrating production workloads from single-VPS hosting to an enterprise cloud provider requires meticulous planning to prevent downtime, data drift, or performance regressions.",
        "---",
        "### 1. Multi-AZ VPC Architecture",
        "We partitioned the network into isolated public and private subnets across availability zones:",
        "- **Public Subnets**: Application Load Balancers (ALB) and NAT Gateways.",
        "- **Private Subnets**: EC2 Auto Scaling Groups and Multi-AZ Amazon RDS clusters with no direct public route.",
        "---",
        "### 2. Live Database Synchronization with AWS DMS",
        "We provisioned AWS Database Migration Service (DMS) with continuous Change Data Capture (CDC) from DigitalOcean MySQL into Amazon RDS, allowing data replication to achieve 0-second lag before cutover.",
        "---",
        "### 3. Route 53 Weighted Cutover",
        "DNS was seamlessly cut over using Amazon Route 53 weighted routing, transitioning 100% of production traffic to AWS with zero customer disruption.",
        "---",
        "### Key Takeaways",
        "- **100% Infrastructure as Code**: Terraform automated every VPC, ALB, and RDS resource.",
        "- **Verified Reliability**: 99.95% availability achieved post-migration."
      ]
    },
    {
      slug: "mastering-aws-cloudwatch-logs-to-actionable-alerts",
      title: "Mastering AWS CloudWatch: From Logs to Actionable Alerts",
      excerpt: "How to set up a proactive monitoring system using CloudWatch Metric Filters, Alarms, Lambda, and SNS.",
      date: "APR 22, 2026",
      read_time: "6 min read",
      tags: ["AWS CloudWatch", "DevOps Practices"],
      image: "/assets/blogs/monitoring.png",
      content: [
        "### Why Proactive Observability Matters",
        "Site Reliability Engineers should detect anomalies within seconds. Relying on customer tickets to uncover service degradation is unacceptable.",
        "---",
        "### Telemetry Pipeline",
        "1. **CloudWatch Agent**: Ships system metrics and application logs from all EC2 instances.",
        "2. **Metric Filters**: Extracts error patterns such as HTTP 5xx responses or database connection timeouts.",
        "3. **Alarms & SNS**: Triggers immediate alerts to Slack and PagerDuty via Python AWS Lambda functions.",
        "---",
        "### Results Achieved",
        "- **MTTR Reduced by 40%**: Engineering is alerted instantly upon error rate surges.",
        "- **Zero Noise**: Tuned evaluation periods eliminate false positive alerts."
      ]
    },
    {
      slug: "infrastructure-as-code-terraform-best-practices-for-teams",
      title: "Infrastructure as Code: Terraform Best Practices for Teams",
      excerpt: "How we achieved 100% environment parity and team collaboration safety using Terraform modules and GitHub Actions.",
      date: "MAR 15, 2026",
      read_time: "10 min read",
      tags: ["Terraform IaC", "DevOps Practices"],
      image: "/assets/blogs/terraform.png",
      content: [
        "### Remote State Management",
        "Never store terraform.tfstate in source control. Always utilize Amazon S3 with DynamoDB distributed state locking.",
        "---",
        "### Modular Directory Layout",
        "Decouple reusable resource modules (VPC, ALB, RDS, ECS) from environment workspaces (`dev`, `staging`, `prod`) to guarantee consistency.",
        "---",
        "### Automated Linting & Security Audits",
        "Integrate `tflint` and `tfsec` security scanning into GitHub Actions pull request gates to enforce least privilege before running `terraform apply`."
      ]
    }
  ]
};
