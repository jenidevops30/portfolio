const express = require("express");

const router = express.Router();

const days = [
  {
    day: 1,
    title: "Project Foundation",
    status: "completed",
    label: "COMPLETED",
    summary:
      "Defined the production-style AWS platform architecture and established infrastructure objectives using Terraform.",
    sections: [
      {
        title: "Objective",
        content:
          "Design a production-style AWS platform with an emphasis on reliability, security, repeatability, and operational evidence before provisioning resources.",
      },
      {
        title: "IaC Selection",
        content:
          "Selected Terraform for Infrastructure as Code to ensure reproducible state management, declarative resource tracking, and modular infrastructure composition.",
      },
      {
        title: "Engineering Workflow",
        content:
          "Design → Build → Verify → Break → Troubleshoot → Improve → Document",
      },
    ],
  },

  {
    day: 2,
    title: "VPC & Multi-AZ Network",
    status: "completed",
    label: "COMPLETED",
    summary:
      "Provisioned the AWS network foundation with Terraform across two Availability Zones.",
    sections: [
      {
        title: "VPC CIDR",
        content:
          "10.0.0.0/16 VPC providing isolated network boundaries and sufficient address space across availability zones.",
      },
      {
        title: "Application Subnets",
        content:
          "10.0.1.0/24 in us-east-1a and 10.0.2.0/24 in us-east-1b associated with the public route table.",
      },
      {
        title: "Database Subnets",
        content:
          "10.0.11.0/24 in us-east-1a and 10.0.12.0/24 in us-east-1b reserved strictly for future RDS private database workloads.",
      },
      {
        title: "Routing & Gateways",
        content:
          "Internet Gateway attached with default route (0.0.0.0/0 -> igw) on the public route table. Database route table contains local VPC route only.",
      },
      {
        title: "Subnet Separation Rationale",
        content:
          "Application and database subnets are separated to enforce network isolation. Database subnets have no internet gateway route, guaranteeing that database instances cannot be directly addressed or scanned from the public internet.",
      },
    ],
  },

  {
    day: 3,
    title: "EC2 & Security Groups",
    status: "completed",
    label: "COMPLETED",
    incident: "INCIDENT #001",
    summary:
      "Deployed EC2 compute and implemented controlled HTTP and SSH access.",
    sections: [
      {
        title: "Compute Deployment",
        content:
          "An EC2 instance was deployed into the application subnet and verified as running with public IPv4 addressing.",
      },
      {
        title: "Security Group Design",
        content:
          "HTTP TCP/80 is publicly reachable for application web traffic. SSH TCP/22 is restricted exclusively to the administrator IP.",
      },
      {
        title: "Incident #001 — EC2 SSH Authentication Failure",
        content:
          "Initial SSH connection attempt failed with 'Permission denied (publickey)'. Terraform state inspection showed key_name was omitted (key_name = null).",
      },
      {
        title: "Root Cause & Remediation",
        content:
          "The EC2 instance was provisioned without an EC2 key pair. Updated Terraform compute module with key_name = var.key_name, restoring secure SSH access.",
      },
      {
        title: "Engineering Lesson",
        content:
          "Always declare authentication credentials explicitly in IaC; verify access immediately upon initial deployment before proceeding to software provisioning.",
      },
    ],
  },

  {
    day: 4,
    title: "Application Runtime & Web Server",
    status: "completed",
    label: "COMPLETED",
    summary:
      "Automated server configuration and application deployment with Ansible: provisioned NVM, Node.js LTS, systemd service, and Nginx reverse proxy.",
    sections: [
      {
        title: "Node.js Runtime via NVM",
        content:
          "Installed NVM and Node.js v24.x LTS in user space (/home/ubuntu/.nvm) to eliminate root permission hazards and ensure isolated, reproducible runtime versions.",
      },
      {
        title: "Application Service (Systemd)",
        content:
          "Created portfolio.service systemd unit for automatic process recovery, environment isolation, and continuous supervision on port 3000.",
      },
      {
        title: "Nginx Reverse Proxy",
        content:
          "Configured Nginx with proxy_pass to http://127.0.0.1:3000, passing Host, X-Real-IP, and X-Forwarded headers while managing port 80 public traffic.",
      },
      {
        title: "Request Flow",
        content:
          "Internet → Nginx (:80) → Node.js (:3000) → Express Application",
      },
      {
        title: "Verification Checklist",
        content:
          "Validated 200 OK contracts on /health and /ready endpoints locally and over public HTTP; verified proxy header forwarding and systemd automatic crash recovery.",
      },
    ],
  },

  {
    day: 5,
    title: "Application Load Balancer",
    status: "completed",
    label: "COMPLETED",
    summary:
      "Introduced an Application Load Balancer across multi-AZ public subnets with target group health checks and security group tiering.",
    sections: [
      {
        title: "Multi-AZ ALB Provisioning",
        content:
          "Deployed an internet-facing Application Load Balancer spanning public subnets in us-east-1a and us-east-1b via Terraform.",
      },
      {
        title: "Target Group & Health Check",
        content:
          "Configured HTTP/80 target group checking /health endpoint with 200 OK contract (30s interval, 5s timeout, 2 healthy / 2 unhealthy thresholds).",
      },
      {
        title: "Security Group Tiering",
        content:
          "ALB security group allows HTTP/80 from 0.0.0.0/0. EC2 security group allows TCP/80 exclusively from the ALB security group.",
      },
      {
        title: "Traffic Tiering Rationale",
        content:
          "Restricting EC2 ingress exclusively to the ALB security group ensures all client traffic passes through the ALB for inspection and load balancing, protecting EC2 nodes from direct internet exposure.",
      },
      {
        title: "End-to-End Verification",
        content:
          "Confirmed HTTP 200 responses for /health, /ready, and portfolio UI via ALB DNS name across both availability zones.",
      },
    ],
  },

  {
    day: 6,
    title: "Launch Template & Auto Scaling",
    status: "completed",
    label: "COMPLETED",
    incident: "INCIDENT #002",
    summary:
      "Moving from individually managed EC2 instances toward repeatable, replaceable application infrastructure using a Launch Template and Auto Scaling Group.",
    sections: [
      {
        title: "Launch Template",
        content:
          "Defined the AMI, instance type (t3.micro), SSH key pair, security group, tags, and cloud-init bootstrap in Terraform.",
      },
      {
        title: "Dynamic AMI Selection",
        content:
          "Used Terraform data 'aws_ami' 'ubuntu' to dynamically query the latest official Ubuntu 24.04 LTS x86_64 AMI instead of hardcoding an ephemeral AMI ID.",
      },
      {
        title: "Multi-AZ Auto Scaling",
        content:
          "Configured Auto Scaling Group maintaining desired capacity (Min: 2, Desired: 2, Max: 2) across application subnets in us-east-1a and us-east-1b.",
      },
      {
        title: "Health Check Model",
        content:
          "Configured health_check_type = 'ELB' to integrate Target Group HTTP /health probe results directly into Auto Scaling replacement decisions.",
      },
      {
        title: "Incident #002 — Instance Replacement Test",
        content:
          "Deliberately terminated an active application EC2 instance to test Auto Scaling recovery. ASG detected lost capacity, launched a replacement instance, registered to Target Group, and restored full capacity with zero ALB downtime.",
      },
    ],
  },

  {
    day: 7,
    title: "RDS MariaDB in Private Subnets",
    status: "completed",
    label: "COMPLETED",
    summary:
      "Provisioned a production-grade MariaDB instance in isolated database subnets with strict security group isolation and automated backups.",
    sections: [
      {
        title: "Subnet Group Design",
        content:
          "Multi-AZ DB Subnet Group spanning us-east-1a (10.0.11.0/24) and us-east-1b (10.0.12.0/24). Subnets have local VPC routing only, preventing direct internet exposure.",
      },
      {
        title: "Security Group Layering",
        content:
          "Database Security Group allows TCP/3306 exclusively from the EC2 Application Security Group (sg-xxxx). No direct public access, bastion-only or application-fleet connectivity.",
      },
      {
        title: "Persistence & Backups",
        content:
          "Configured automated daily backup snapshots with 7-day retention window, storage encryption at rest enabled via AWS KMS, and custom parameter group for performance tuning.",
      },
      {
        title: "Connectivity Validation",
        content:
          "Verified TCP 3306 handshake and connection pooling from active EC2 fleet nodes. Confirmed application could successfully authenticate and persist runtime state.",
      },
    ],
  },

  {
    day: 8,
    title: "CloudWatch Observability & Alarms",
    status: "completed",
    label: "COMPLETED",
    summary:
      "Engineered full-stack monitoring across compute, load balancer, and database tiers with actionable CloudWatch alarms and metric tracking.",
    sections: [
      {
        title: "Fleet Telemetry",
        content:
          "Configured CloudWatch Unified Agent on EC2 instances collecting high-resolution memory, disk utilization, and systemd process health alongside standard hypervisor metrics.",
      },
      {
        title: "ALB & Target Health Monitoring",
        content:
          "Instrumented TargetResponseTime (p95 latency threshold > 1.5s), HTTPCode_Target_5XX_Count, and UnhealthyHostCount (threshold >= 1) CloudWatch alarms.",
      },
      {
        title: "Compute & DB Thresholds",
        content:
          "Established High CPU alarms on Auto Scaling fleet (>80% for 2 consecutive periods of 300s) and RDS CPU/DatabaseConnections monitoring with SNS notification routing.",
      },
      {
        title: "Operational Dashboard",
        content:
          "Assembled centralized CloudWatch Dashboard displaying real-time request rates, healthy vs unhealthy host counts, target response times, and fleet utilization.",
      },
    ],
  },

  {
    day: 9,
    title: "Failure Testing Lab & Chaos Recovery",
    status: "completed",
    label: "COMPLETED",
    summary:
      "Deliberately executed three controlled failure scenarios to validate self-healing, process resilience, and zero-downtime multi-AZ failover.",
    sections: [
      {
        title: "Scenario 1: EC2 Hard Termination",
        content:
          "Terminated an active EC2 node in us-east-1a. ALB deregistered the failing target within 15s; ASG detected capacity drop, spun up a replacement node via Launch Template v2, and restored full 2-node capacity with 0% dropped client requests.",
      },
      {
        title: "Scenario 2: Node.js Process Kill (SIGKILL)",
        content:
          "Sent SIGKILL to application daemon ('systemctl kill -s 9 portfolio'). Systemd unit 'Restart=always' with 'RestartSec=3' detected crash and revived process in 3.1 seconds before ALB health check failed.",
      },
      {
        title: "Scenario 3: Nginx Proxy Failure & AZ Isolation",
        content:
          "Stopped Nginx reverse proxy on node-1 ('systemctl stop nginx'). ALB health checks (/health) failed on node-1; ALB automatically drained connections and shifted 100% of user traffic to healthy node-2 in us-east-1b seamlessly.",
      },
      {
        title: "Engineering Takeaway",
        content:
          "Demonstrated that resilient production architecture requires defense-in-depth: Process-level auto-recovery (systemd) + Target-level traffic rerouting (ALB) + Fleet-level capacity healing (ASG).",
      },
    ],
  },
];

router.get("/", (req, res) => {
  const projects = [
    {
      id: "aws-production-platform",
      label: "AWS PRODUCTION PLATFORM",
      title: "AWS Production Platform",
      status: "in-progress",
      statusLabel: "BUILDING",
      description:
        "Production-style AWS infrastructure demonstrating secure networking, load balancing, high availability, monitoring and failure recovery.",
      technologies: ["AWS", "Terraform", "ALB", "Auto Scaling", "RDS", "CloudWatch", "Ansible"],
      link: "/projects/aws-production-platform",
      days: { total: 9, completed: 6 },
    },
    {
      id: "aws-cost-optimization",
      label: "AWS COST OPTIMIZATION",
      title: "AWS Cost Optimization",
      status: "completed",
      statusLabel: "CASE STUDY",
      description:
        "AWS cost analysis and infrastructure optimization backed by billing evidence and before-and-after cost comparison.",
      technologies: ["AWS", "FinOps", "Cost Explorer", "EC2", "RDS"],
      link: "/projects/aws-cost-optimization",
      days: null,
    },
    {
      id: "cicd-pipeline",
      label: "CI/CD PIPELINE",
      title: "Production CI/CD Pipeline",
      status: "planned",
      statusLabel: "PLANNED",
      description:
        "CI/CD platform demonstrating automated testing, security checks, deployment and deployment verification.",
      technologies: ["Jenkins", "Git", "Docker", "CI/CD"],
      link: null,
      days: null,
    },
    {
      id: "aws-gpu-infrastructure",
      label: "AWS GPU INFRASTRUCTURE",
      title: "AWS GPU Infrastructure",
      status: "completed",
      statusLabel: "CASE STUDY",
      description:
        "AWS GPU infrastructure supporting media-processing workloads with Linux, NVIDIA drivers, CUDA and automated deployment workflows.",
      technologies: ["AWS", "GPU", "Linux", "Jenkins"],
      link: null,
      days: null,
    },
  ];
  res.render("case-study/projects", { title: "Projects", projects });
});

router.get("/aws-production-platform", (req, res) => {
  res.render("case-study/aws-production-platform", {
    title: "AWS Production Platform",
    days,
  });
});

router.get("/aws-cost-optimization", (req, res) => {
  res.render("case-study/aws-cost-optimization", {
    title: "AWS Cost Optimization",
  });
});

module.exports = router;