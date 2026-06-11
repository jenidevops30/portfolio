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
        architecture: "Two-tier HA architecture with ALB, Auto Scaling Groups, and Multi-AZ RDS. Assets served via CloudFront + S3.",
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
      title: "Migrating from DigitalOcean to AWS: A Zero-Downtime Guide",
      excerpt: "Lessons learned while moving production workloads to a more scalable AWS ecosystem using ALB and Auto Scaling.",
      date: "MAY 10, 2026",
      read_time: "8 min read",
      tags: ["AWS", "Migration", "DevOps"],
      image: "/assets/blogs/migration.png",
      content: [
        "Migrating production services from a single-VPS setup (like DigitalOcean Droplets) to an enterprise cloud provider (AWS) requires thorough planning to avoid site outages and data loss.",
        "The migration journey began by setting up the network topology in AWS using a custom VPC across multiple Availability Zones, separating public subnets for load balancers from private subnets for application nodes and database clusters.",
        "We deployed an Application Load Balancer (ALB) and Auto Scaling Groups (ASG) to handle traffic spikes. This allows our backend services to scale out dynamically when CPU thresholds are exceeded, and shrink back during off-peak hours.",
        "To achieve a zero-downtime database migration, we utilized the AWS Database Migration Service (DMS). We configured continuous replication between the legacy on-prem database and our new Multi-AZ Amazon RDS instance.",
        "Once database replication was synchronized, we shifted public DNS records via Amazon Route 53 using weighted routing policies. We gradually transferred traffic from DigitalOcean to AWS, verifying logs and performance until the cutover was complete."
      ]
    },
    {
      title: "Mastering AWS CloudWatch: From Logs to Actionable Alerts",
      excerpt: "How to set up a pro-active monitoring system that catches issues before your users do.",
      date: "APR 22, 2026",
      read_time: "6 min read",
      tags: ["CloudWatch", "Monitoring", "SRE"],
      image: "/assets/blogs/monitoring.png",
      content: [
        "Observability is a cornerstone of site reliability engineering. System administrators should never rely on user reports to discover that their production application is down or experiencing high error rates.",
        "AWS CloudWatch offers a comprehensive ecosystem to gather log files, infrastructure metrics, and custom alarms. We start by installing the unified CloudWatch Agent on our server instances to push application logs and memory metrics to the cloud.",
        "Next, we define CloudWatch Metric Filters. These filters scan incoming log streams for patterns like '500 Internal Server Error' or database timeout exceptions, converting matching strings into numeric data points.",
        "We then set up Alarms based on these metrics. For example, if error logs exceed 5 in a 1-minute period, or average CPU utilization remains above 80% for 5 consecutive minutes, the alarm triggers.",
        "The alarms publish notifications to an Amazon Simple Notification Service (SNS) topic. A lightweight AWS Lambda function then formats these alerts into rich JSON objects and delivers them instantly to our team Slack channel and PagerDuty schedule."
      ]
    },
    {
      title: "Infrastructure as Code: Terraform Best Practices for Teams",
      excerpt: "How we achieved 100% environment parity using Terraform and GitHub Actions.",
      date: "MAR 15, 2026",
      read_time: "10 min read",
      tags: ["Terraform", "IaC", "Automation"],
      image: "/assets/blogs/terraform.png",
      content: [
        "Provisioning cloud resources manually via the web console is a recipes for disaster. It leads to configuration drift, untracked changes, and inconsistent environments between development and production stages.",
        "Terraform allows teams to model, provision, and version infrastructure safely. However, working in a collaborative team requires strict best practices to avoid overriding state files.",
        "First, always store the Terraform state file in a remote backend, such as Amazon S3, and configure state locking with Amazon DynamoDB. This prevents two developers from running 'terraform apply' simultaneously.",
        "Second, adopt a modular layout. Separate generic, reusable resource blueprints (like VPC, RDS, and ECS modules) from root environment directories. This makes updating network blocks or database parameters clean and isolated.",
        "Finally, integrate Terraform into your CI/CD pipeline using tools like Atlantis or GitHub Actions. Running security scanning tools like 'tfsec' and 'tflint' before merging code prevents security misconfigurations from reaching production."
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
    { title: "Red Hat Certified System Administrator (RHCSA)", issuer: "Red Hat" },
    { title: "DevOps Professional", issuer: "Intellipaat" },
    { title: "Cloud Computing Expert Course", issuer: "Prakshal IT Academy" }
  ]
};


