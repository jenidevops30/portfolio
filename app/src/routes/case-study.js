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
    title: "RDS MariaDB",
    status: "planned",
    label: "PLANNED",
    summary:
      "Introduce a managed private database tier for persistent application data.",
    sections: [
      {
        title: "Planned Architecture",
        content:
          "Application EC2 → private RDS MariaDB located strictly within isolated database subnets.",
      },
      {
        title: "Security Model",
        content:
          "Only the application security group will be allowed to reach the database on TCP/3306.",
      },
    ],
  },

  {
    day: 8,
    title: "CloudWatch & Observability",
    status: "planned",
    label: "PLANNED",
    summary:
      "Add operational visibility into compute, load balancing, and database health.",
    sections: [
      {
        title: "Planned Monitoring",
        content:
          "EC2 health, CPU, network activity, ALB target health, request latency metrics, and RDS health.",
      },
    ],
  },

  {
    day: 9,
    title: "Failure Testing Lab",
    status: "planned",
    label: "PLANNED",
    summary:
      "Deliberately introduce controlled failures and document detection, diagnosis, recovery, and prevention.",
    sections: [
      {
        title: "Planned Failures",
        content:
          "EC2 failure, application process failure, web-server failure, and database connectivity failure.",
      },
      {
        title: "Troubleshooting Methodology",
        content:
          "Observe → Define symptom → Identify layer → Hypothesis → Test → Root Cause → Fix → Validate → Prevent",
      },
    ],
  },
];

router.get("/aws-production-platform", (req, res) => {
  res.render("case-study/aws-production-platform", {
    title: "AWS Production Platform",
    days,
  });
});

module.exports = router;