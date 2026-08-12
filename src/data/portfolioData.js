export const PORTFOLIO_DATA = {
  skills: [
    { name: "AWS", category: "Solutions Architect & DevOps", icon_url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "GCP", category: "Cloud Platform", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "Azure", category: "Cloud Platform", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "Docker", category: "Containerization", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", category: "Orchestration", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Terraform", category: "IaC Specialist", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    { name: "Jenkins", category: "CI/CD", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
    { name: "GitLab CI", category: "Pipelines", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
    { name: "GitHub Actions", category: "CI/CD Automation", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
    { name: "Linux", category: "Admin & Scripting", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Prometheus", category: "Monitoring", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
    { name: "Grafana", category: "Dashboards", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
    { name: "Ansible", category: "Automation", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
    { name: "Python", category: "AI & Scripting", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "ArgoCD", category: "GitOps", icon_url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/argocd/argocd-original.svg" }
  ],
  currently_learning: [
    { name: "Kubernetes Operators", icon: "☸️" },
    { name: "Crossplane (Control Planes)", icon: "🏗️" },
    { name: "eBPF Observability", icon: "🔍" },
    { name: "AI-Driven SRE", icon: "🤖" }
  ],
  projects: [
    {
      title: "Quickhunt AWS Migration",
      badge: "AWS · Terraform",
      description: "Led the migration from DigitalOcean to AWS using a two-tier architecture (CloudFront/S3/EC2/RDS), achieving 99.95% availability.",
      tags: ["Terraform", "CloudFront", "RDS", "ASG"],
      case_study: {
        problem: "Legacy application suffered from frequent downtime and manual scaling during traffic spikes on DigitalOcean.",
        architecture: "Two-tier HA architecture with ALB, Auto Scaling Groups, and RDS. Assets served via CloudFront + S3.",
        architecture_image: "/assets/projects/quickhunt-arch.png",
        workflow_image: "/assets/projects/quickhunt-cicd.png",
        challenges: "Zero-downtime database migration from on-prem to RDS and implementing SSL via ACM with proper routing.",
        results: "Achieved 99.95% availability and automated infrastructure provisioning using Terraform."
      }
    },
    {
      title: "Face Swap Pro",
      badge: "AI · Infrastructure",
      description: "Architected on-premises high-performance AI infrastructure on a dedicated GPU server for thousands of daily photo/video workloads.",
      tags: ["GPU Server", "Load Balancing", "Monitoring"],
      case_study: {
        problem: "Cloud GPU costs were becoming unsustainable for high-volume AI processing tasks.",
        architecture: "Custom on-premises GPU cluster with high-throughput storage and automated workload distribution.",
        challenges: "Managing thermal thresholds and optimizing CUDA driver configurations for maximum parallel processing.",
        results: "Reduced infrastructure costs by 60% while maintaining real-time processing speeds."
      }
    },
    {
      title: "Cost Optimization (FinOps)",
      badge: "FinOps · AWS",
      description: "Reduced infrastructure costs by 30-40% through right-sizing, spot instances, and strategic resource management on AWS.",
      tags: ["FinOps", "Spot Instances", "Cost Explorer"],
      case_study: {
        problem: "Rapidly scaling cloud footprint led to unmonitored spending and resource wastage across 15+ accounts.",
        architecture: "Multi-account governance strategy using AWS Organizations, SCPs, and automated cost-anomaly detection.",
        challenges: "Educating development teams on cost-conscious resource lifecycle management without slowing down velocity.",
        results: "Consistently achieved 30-40% year-over-year cost savings and established a FinOps culture."
      }
    },
    {
      title: "Wishlist AWS Deployment",
      badge: "AWS · ALB · RDS",
      description: "Architected and executed a seamless deployment of wishlist.webcontrive.com using Infrastructure as Code (Terraform) with ALB, ASG, and AWS DMS.",
      tags: ["Terraform", "ALB", "ASG", "DMS"],
      case_study: {
        problem: "The application required a high-availability production environment with automated scaling capabilities.",
        architecture: "Full IaC deployment using Terraform, implementing ALB, ASG for the app tier, and RDS for the database.",
        challenges: "Coordinating a seamless migration of production data using AWS DMS with minimal application downtime.",
        results: "Achieved a fully automated, scalable infrastructure that handles 3x peak traffic without manual intervention."
      }
    },
    {
      title: "Edu-Platform Infrastructure",
      badge: "Azure · GitHub Actions",
      description: "Architected a secure CI/CD pipeline for a global education platform using GitHub-to-Azure OIDC for passwordless authentication.",
      tags: ["Azure", "GitHub Actions", "OIDC", "Node.js"],
      case_study: {
        problem: "Traditional secret-based CI/CD authentication posed significant security risks and management overhead.",
        architecture: "Modern OIDC-based authentication between GitHub Actions and Azure, with integrated SonarQube and container scanning.",
        workflow_image: "/assets/projects/secops-workflow.png",
        challenges: "Refactoring existing deployment scripts to support short-lived OIDC tokens and managed identity.",
        results: "100% elimination of hardcoded secrets and 40% reduction in production vulnerability risk."
      }
    }
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
        "- **AWS CloudFront** (Optional CDN)",
        "- **AWS IAM** (Access Management)",
        "---",
        "### Prerequisites",
        "Before starting, ensure you have:",
        "- An AWS account",
        "- A GitHub account",
        "- A portfolio website (HTML / CSS / JavaScript, React, Vue, etc.)",
        "- AWS CLI configured locally (optional)",
        "---",
        "### Step 1: Create an S3 Bucket",
        "1. Log in to AWS Console.",
        "2. Navigate to S3.",
        "3. Create a new bucket.",
        "4. Enable static website hosting.",
        "5. Upload your initial website files.",
        "6. Configure bucket permissions for public access.",
        "\nExample bucket name: `my-portfolio-website`\n\nAfter configuration, AWS provides a website endpoint:\n`http://my-portfolio-website.s3-website-region.amazonaws.com`",
        "---",
        "### Step 2: Create an IAM User",
        "For secure deployments:",
        "1. Go to IAM.",
        "2. Create a new user.",
        "3. Attach a policy allowing access to the S3 bucket.",
        "Example permissions configuration:",
        "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": [\n        \"s3:PutObject\",\n        \"s3:DeleteObject\",\n        \"s3:ListBucket\"\n      ],\n      \"Resource\": [\n        \"arn:aws:s3:::my-portfolio-website\",\n        \"arn:aws:s3:::my-portfolio-website/*\"\n      ]\n    }\n  ]\n}\n```",
        "Save the **Access Key ID** and **Secret Access Key**. These credentials will be used by GitHub Actions.",
        "---",
        "### Step 3: Configure GitHub Secrets",
        "Navigate to: `Repository → Settings → Secrets and Variables → Actions` and create the following secrets:",
        "- **AWS_ACCESS_KEY_ID**: IAM Access Key",
        "- **AWS_SECRET_ACCESS_KEY**: IAM Secret Key",
        "- **AWS_REGION**: AWS Region (e.g., `ap-south-1`)",
        "- **S3_BUCKET**: S3 Bucket Name (e.g., `my-portfolio-website`)",
        "---",
        "### Step 4: Create GitHub Actions Workflow",
        "Inside your repository, create a file at `.github/workflows/deploy.yml` and add the following configuration:",
        "```yaml\nname: Deploy Portfolio to AWS\n\non:\n  push:\n    branches:\n      - main\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n\n    steps:\n    - name: Checkout Repository\n      uses: actions/checkout@v4\n\n    - name: Configure AWS Credentials\n      uses: aws-actions/configure-aws-credentials@v4\n      with:\n        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n        aws-region: ${{ secrets.AWS_REGION }}\n\n    - name: Deploy to S3\n      run: |\n        aws s3 sync . s3://${{ secrets.S3_BUCKET }} --delete --exclude \".git/*\" --exclude \".github/*\"\n```",
        "---",
        "### Step 5: Push Changes to GitHub",
        "Commit and push your changes to launch the pipeline:",
        "```bash\ngit add .\ngit commit -m \"Setup automated deployment\"\ngit push origin main\n```",
        "You can monitor the deployment progress under the **Actions** tab of your repository.",
        "---",
        "### Step 6: Verify Deployment",
        "Once the workflow completes successfully:",
        "1. Open your S3 website URL.",
        "2. Refresh the page.",
        "3. Verify the latest changes are live.",
        "Every future push to the `main` branch will automatically deploy your website updates.",
        "---",
        "### Optional: Add CloudFront for Better Performance",
        "To improve speed and security, you can front S3 with CloudFront CDN. This gives you benefits like a global CDN, HTTPS support, faster load times, and DDoS protection.",
        "To trigger cache invalidation after deployment, add this step to your GitHub Actions workflow:",
        "```yaml\n- name: Invalidate CloudFront Cache\n  run: |\n    aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths \"/*\"\n```",
        "---",
        "### Best Practices",
        "- **Use Least Privilege Access**: Grant only required S3 permissions to the IAM user.",
        "- **Store Secrets Securely**: Never commit AWS credentials to source control.",
        "- **Use Branch Protection**: Require pull requests before merging into the main deployment branch.",
        "- **Monitor Deployments**: Enable notifications for failed GitHub Actions workflows.",
        "---",
        "### Common Troubleshooting Issues",
        "- **Access Denied Error**: Check IAM permissions, bucket policy, and AWS credentials.",
        "- **Workflow Fails**: Verify AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and S3_BUCKET are correctly configured in GitHub Secrets.",
        "- **Website Not Updating**: If using CloudFront, run: `aws cloudfront create-invalidation --paths \"/*\"` to clear cached content.",
        "---",
        "### Conclusion",
        "Automating portfolio deployment with GitHub Actions and AWS is an excellent way to showcase modern DevOps practices while simplifying website management. With a fully automated CI/CD pipeline, every code push instantly updates your live portfolio, reducing deployment effort and increasing reliability.",
        "Whether you're a developer, cloud engineer, or DevOps enthusiast, implementing automated deployments demonstrates practical experience with cloud infrastructure, automation, and continuous delivery—skills highly valued in today's technology landscape."
      ]
    },
    {
      slug: "migrating-from-digitalocean-to-aws-zero-downtime-guide",
      title: "Migrating from DigitalOcean to AWS: A Zero-Downtime Guide",
      excerpt: "Lessons learned while moving production workloads to a more scalable AWS ecosystem using ALB, Auto Scaling, and AWS DMS.",
      date: "MAY 10, 2026",
      read_time: "8 min read",
      tags: ["AWS", "Migration", "Terraform", "DevOps"],
      image: "/assets/blogs/migration.png",
      content: [
        "### Introduction",
        "Migrating production workloads from single-VPS hosting (like DigitalOcean Droplets) to an enterprise cloud provider (AWS) requires careful planning to avoid downtime, data loss, or performance degradation.",
        "In this guide, we break down the step-by-step architecture strategy used to migrate production applications to AWS with zero customer-facing downtime.",
        "---",
        "### 1. Network Topology & Multi-AZ VPC Design",
        "The first step was establishing a multi-AZ VPC architecture across public and private subnets:",
        "- **Public Subnets**: Host Application Load Balancers (ALB) and NAT Gateways across `ap-south-1a` and `ap-south-1b`.",
        "- **Private Subnets**: Host EC2 app instances in Auto Scaling Groups and Multi-AZ Amazon RDS clusters, completely isolated from public access.",
        "---",
        "### 2. Auto Scaling & Load Balancing Setup",
        "By deploying an Application Load Balancer (ALB) with health check paths `/healthz`, traffic is automatically routed to healthy EC2 instances across availability zones. Auto Scaling policy dynamically scales instances up when average CPU load exceeds 70% for 3 minutes.",
        "---",
        "### 3. Database Replication with AWS DMS",
        "To achieve zero downtime during database cutover, we utilized AWS Database Migration Service (DMS):",
        "1. Provisioned a DMS replication instance inside private subnets.",
        "2. Configured continuous Change Data Capture (CDC) from DigitalOcean MySQL to Multi-AZ Amazon RDS.",
        "3. Allowed replication to run until replication lag reached 0 seconds.",
        "---",
        "### 4. Route 53 Weighted DNS Cutover",
        "Once database replication was synchronized, DNS records were updated via Amazon Route 53 using weighted routing (90/10 split initially, ramping to 100% AWS over 30 minutes).",
        "---",
        "### Key Takeaways",
        "- **Infrastructure as Code**: Terraform automated 100% of the target AWS infrastructure.",
        "- **Zero Downtime**: DMS continuous replication enabled smooth cutover without maintenance windows.",
        "- **Resilience**: 99.95% availability achieved post-migration."
      ]
    },
    {
      slug: "mastering-aws-cloudwatch-logs-to-actionable-alerts",
      title: "Mastering AWS CloudWatch: From Logs to Actionable Alerts",
      excerpt: "How to set up a pro-active monitoring system using CloudWatch Metric Filters, Alarms, Lambda, and SNS.",
      date: "APR 22, 2026",
      read_time: "6 min read",
      tags: ["AWS", "CloudWatch", "Monitoring", "SRE"],
      image: "/assets/blogs/monitoring.png",
      content: [
        "### Why Proactive Observability Matters",
        "Site Reliability Engineers (SREs) should never rely on end-user complaints to discover production failures. Proactive observability ensures incident detection within seconds rather than hours.",
        "---",
        "### Architectural Overview",
        "1. **CloudWatch Agent**: Ships system metrics (CPU, Memory, Disk IO) and application log files.",
        "2. **Metric Filters**: Extracts error counts (e.g. `HTTP 500` or `Connection timeout`).",
        "3. **CloudWatch Alarms**: Triggers when metric thresholds are breached.",
        "4. **SNS & AWS Lambda**: Formats JSON alert payloads and posts directly to Slack and PagerDuty.",
        "---",
        "### Creating a Metric Filter for HTTP 500 Errors",
        "Using AWS CLI or Terraform, define a metric filter pattern on `/var/log/nginx/access.log`:",
        "```json\n[ip, id, user, timestamp, request, status_code = 5*, bytes, referrer, agent]\n```",
        "---",
        "### Automating Slack Notifications via AWS Lambda",
        "When a CloudWatch Alarm state changes to `ALARM`, it triggers an SNS topic subscribed to a Python Lambda function:",
        "```python\nimport json, urllib.request, os\n\ndef lambda_handler(event, context):\n    message = json.loads(event['Records'][0]['Sns']['Message'])\n    alarm_name = message['AlarmName']\n    new_state = message['NewStateValue']\n    \n    payload = {\n        'text': f'🚨 *ALERT:* `{alarm_name}` transitioned to `{new_state}`'\n    }\n    req = urllib.request.Request(os.environ['SLACK_WEBHOOK'], data=json.dumps(payload).encode('utf-8'))\n    urllib.request.urlopen(req)\n```",
        "---",
        "### Results Achieved",
        "- **MTTR Reduced by 40%**: Engineering team notified instantly upon error spikes.",
        "- **Zero False Positives**: Alarms tuned with `evaluation_periods = 2` and `period = 60`."
      ]
    },
    {
      slug: "infrastructure-as-code-terraform-best-practices-for-teams",
      title: "Infrastructure as Code: Terraform Best Practices for Teams",
      excerpt: "How we achieved 100% environment parity and team collaboration safety using Terraform modules and GitHub Actions.",
      date: "MAR 15, 2026",
      read_time: "10 min read",
      tags: ["Terraform", "IaC", "Automation", "AWS"],
      image: "/assets/blogs/terraform.png",
      content: [
        "### The Problem with Console Provisioning",
        "Provisioning infrastructure manually through the AWS console leads to configuration drift, hidden dependencies, and environment mismatches between Dev, Staging, and Production.",
        "---",
        "### Rule 1: Remote Backend with S3 & State Locking",
        "Never commit state files to git. Store state in Amazon S3 with DynamoDB state locking:",
        "```hcl\nterraform {\n  backend \"s3\" {\n    bucket         = \"jenidevops-tf-state\"\n    key            = \"prod/terraform.tfstate\"\n    region         = \"ap-south-1\"\n    dynamodb_table = \"terraform-locks\"\n    encrypt        = true\n  }\n}\n```",
        "---",
        "### Rule 2: Modular Architecture Pattern",
        "Organize code into reusable modules (`vpc`, `rds`, `alb`, `asg`) separated from environment definitions (`environments/dev`, `environments/prod`).",
        "---",
        "### Rule 3: Automated Formatting & Security Auditing",
        "Integrate `terraform fmt -check`, `tflint`, and `tfsec` security scanning into GitHub Actions pull request checks before running `terraform apply`.",
        "---",
        "### Summary",
        "Following these best practices guarantees environment parity, eliminates manual misconfigurations, and protects cloud infrastructure state."
      ]
    },
    {
      slug: "gitops-on-aws-eks-with-argocd-helm-production-setup-guide",
      title: "GitOps on AWS EKS with ArgoCD & Helm: Production Setup Guide",
      excerpt: "A complete step-by-step guide to setting up automated declarative Kubernetes deployment pipelines using ArgoCD and Helm on AWS EKS.",
      date: "FEB 28, 2026",
      read_time: "9 min read",
      tags: ["Kubernetes", "GitOps", "ArgoCD", "AWS", "Helm"],
      image: "/assets/blogs/github-aws.png",
      content: [
        "### Introduction to GitOps",
        "GitOps is an operational framework where Git serves as the single source of truth for declarative infrastructure and application states. ArgoCD continuously monitors Git repositories and synchronizes Kubernetes clusters automatically.",
        "---",
        "### Architecture Blueprint",
        "- **AWS EKS**: Managed Kubernetes cluster provisioned via Terraform.",
        "- **ArgoCD**: Installed in `argocd` namespace with SSO integration.",
        "- **Helm Charts**: Declarative app manifests stored in Git.",
        "---",
        "### Installing ArgoCD on EKS",
        "```bash\nkubectl create namespace argocd\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\n```",
        "---",
        "### Defining an ArgoCD Application Manifest",
        "```yaml\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: production-web-app\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: 'https://github.com/jenidevops30/k8s-manifests.git'\n    targetRevision: HEAD\n    path: charts/web-app\n  destination:\n    server: 'https://kubernetes.default.svc'\n    namespace: production\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n```",
        "---",
        "### Key Benefits",
        "- **Zero Manual kubectl Commands**: Deployments trigger automatically on git commit.",
        "- **Automated Self-Healing**: Configuration drift is immediately rolled back by ArgoCD.",
        "- **Instant Rollbacks**: Reverting a commit in Git instantly rolls back cluster state."
      ]
    }
  ],
  experience: [
    {
      role: "DevOps Engineer",
      company: "Webcontrive",
      date_range: "NOVEMBER 2025 – PRESENT",
      description: [
        "Led the migration of production infrastructure from DigitalOcean to AWS, reducing architectural overhead by 25%.",
        "Architected high-availability solutions across AWS Mumbai and Hyderabad regions for geo-resilient production workloads.",
        "Successfully migrated wishlist.webcontrive.com to AWS with ALB, ASG, and RDS.",
        "Implemented pro-active monitoring using AWS CloudWatch, Lambda, and SNS, reducing MTTR by 40%."
      ]
    },
    {
      role: "AWS Engineer",
      company: "OptimumBrew Technology LLP",
      date_range: "APRIL 2025 – OCTOBER 2025",
      description: [
        "Managed mission-critical AWS infrastructure supporting 99.9% uptime.",
        "Optimized Jenkins-based CI workflows for Android APK generation, improving build speeds by 30%.",
        "Implemented automated SonarQube quality gates, reducing production bugs by 20%."
      ]
    },
    {
      role: "Sr. Server and Cloud Engineer",
      company: "LOGIX BUILT SOLUTIONS PVT.LTD.",
      date_range: "FEBRUARY 2022 – FEBRUARY 2025",
      description: [
        "Architected multi-cloud infrastructure on AWS/GCP, improving scalability by 60% and reducing lead times by 40%.",
        "Deployed and managed ECS clusters for containerized workloads, slashing resource wastage by 35%.",
        "Engineered Sophos firewall security frameworks with advanced VPN configurations.",
        "Optimized VMware vSphere ESXi environments, resulting in 80% faster VM provisioning.",
        "Standardized Docker orchestration across teams, enhancing local development productivity.",
        "Implemented Terraform-based IaC for infrastructure provisioning, ensuring 100% environment parity."
      ]
    },
    {
      role: "Network Engineer",
      company: "OptimumBrew Technology LLP",
      date_range: "JANUARY 2020 – JANUARY 2022",
      description: [
        "Managed FortiGate Firewall and server infrastructure for 60+ users, implementing advanced security policies.",
        "Engineered automated JFrog Artifactory backup solution using bash scripting.",
        "Designed and implemented self-hosted GitLab server with automated backup solutions.",
        "Deployed and managed self-hosted Zulip chat server for internal team communication.",
        "Architected NextCloud platform with automated backup routines, managing 500GB+ data.",
        "Deployed and configured Redmine project management system on cloud servers."
      ]
    },
    {
      role: "IT Infrastructure Management Faculty",
      company: "Prakshal IT Academy",
      date_range: "SEPTEMBER 2017 – JANUARY 2020",
      description: [
        "Conducted training sessions on hardware, networking, and cloud computing for 40+ students.",
        "Delivered hands-on training on AWS cloud services, virtualization, and deployment strategies.",
        "Introduced students to cloud architecture concepts including scalability and high availability."
      ]
    },
    {
      role: "Network Engineer",
      company: "D N K TECHNOLOGIES PVT LTD",
      date_range: "JANUARY 2017 – AUGUST 2017",
      description: [
        "Provided network support and troubleshooting, resolving connectivity issues.",
        "Assisted in network setup and configuration, contributing to successful project completions."
      ]
    }
  ],
  production_challenges: [
    { title: "Auto Scaling for Traffic Spikes", solution: "Implemented ASG with predictive scaling and ALB health checks." },
    { title: "Database Migration to RDS", solution: "Performed zero-downtime migration using AWS DMS and proper replication." },
    { title: "Infrastructure Security", solution: "Implemented IAM Least Privilege, VPC Peering, and Cloudflare WAF." }
  ],
  awards: [
    { title: "Server / Cloud Support Dynamo", organization: "Logix Built Solutions Ltd.", date: "OCT 2024" },
    { title: "Technical Support Dynamo", organization: "Logix Built Solutions Ltd.", date: "OCT 2023" },
    { title: "Best Server Support Engineer", organization: "Logix Built Solutions Ltd.", date: "OCT 2022" }
  ],
  certifications: [
    { title: "Red Hat Certified System Administrator (RHCSA)", issuer: "Red Hat", status: "Certified" },
    { title: "DevOps Professional", issuer: "Intellipaat", status: "Certified" },
    { title: "Cloud Computing Course", issuer: "Prakshal IT Academy", status: "Certified" }
  ]
};


