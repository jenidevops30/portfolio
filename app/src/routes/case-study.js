const express = require("express");

const router = express.Router();

const days = [
  {
    day: 1,
    title: "Project Foundation",
    status: "completed",
    label: "COMPLETED",
    summary: "Defined the production-style AWS platform architecture and infrastructure objectives.",
    sections: [
      {
        title: "Objective",
        content:
          "Design the AWS platform before provisioning infrastructure, with an emphasis on reliability, security, repeatability, and operational evidence.",
      },
      {
        title: "Engineering approach",
        content:
          "Design → Provision → Verify → Break → Troubleshoot → Fix → Improve → Measure → Document",
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
        title: "VPC",
        content: "10.0.0.0/16",
      },
      {
        title: "Application subnets",
        content:
          "10.0.1.0/24 in us-east-1a and 10.0.2.0/24 in us-east-1b.",
      },
      {
        title: "Database subnets",
        content:
          "10.0.11.0/24 in us-east-1a and 10.0.12.0/24 in us-east-1b.",
      },
      {
        title: "Routing",
        content:
          "Application traffic uses the public route table with an Internet Gateway default route. Database subnets use a route table containing only the local VPC route.",
      },
    ],
  },

  {
    day: 3,
    title: "EC2 & Security Groups",
    status: "completed",
    label: "COMPLETED",
    summary:
      "Deployed EC2 compute and implemented controlled HTTP and SSH access.",
    sections: [
      {
        title: "EC2",
        content:
          "An EC2 instance was deployed into the application subnet and verified as running.",
      },
      {
        title: "Security Group",
        content:
          "HTTP TCP/80 is publicly reachable. SSH TCP/22 is restricted to the administrator IP.",
      },
      {
        title: "Incident #001",
        content:
          "Initial SSH access failed with Permission denied (publickey). Terraform inspection showed key_name = null.",
      },
      {
        title: "Root cause",
        content:
          "The EC2 instance was provisioned without an EC2 key pair.",
      },
      {
        title: "Remediation",
        content:
          "Terraform was updated to explicitly configure key_name = var.key_name, restoring secure SSH access.",
      },
    ],
  },

  {
    day: 4,
    title: "Ansible Automation & Node.js Deployment",
    status: "completed",
    label: "COMPLETED",
    summary:
      "Automated server configuration and application deployment with Ansible: provisioned NVM, Node.js v24.x LTS, systemd service, and Nginx reverse proxy.",
    sections: [
      {
        title: "Ansible Automation",
        content:
          "Codified configuration in deployment/ansible/playbook.yml: automated packages, user-space NVM, app dependencies, systemd management, and Nginx reverse proxy.",
      },
      {
        title: "Runtime Environment",
        content:
          "Installed NVM and Node.js v24.x LTS in user space (/home/ubuntu/.nvm), ensuring reproducible runtime isolation.",
      },
      {
        title: "Application Service",
        content:
          "Created portfolio.service systemd unit for automatic process recovery, environment isolation, and lifecycle supervision on port 3000.",
      },
      {
        title: "Nginx Reverse Proxy",
        content:
          "Configured Nginx with proxy_pass to http://127.0.0.1:3000, passing Host, X-Real-IP, and X-Forwarded headers.",
      },
      {
        title: "Incident #002",
        content:
          "Default Nginx configuration returned 404 on /health. Remediated by replacing default web root with reverse proxy upstream.",
      },
      {
        title: "Verification",
        content:
          "Validated 200 OK contracts on /health and /ready endpoints locally and over public HTTP (54.236.188.6).",
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
        title: "Security Group Tiering",
        content:
          "Created ALB security group allowing HTTP/80 from 0.0.0.0/0. Updated EC2 security group with an ingress rule allowing traffic exclusively from the ALB security group on TCP/80.",
      },
      {
        title: "Target Group & Health Check Contract",
        content:
          "Configured HTTP/80 target group checking /health endpoint with 200 OK contract (30s interval, 5s timeout, 2 healthy / 2 unhealthy thresholds). Registered active EC2 instance.",
      },
      {
        title: "Target Health Status",
        content:
          "Verified instance i-08b963ba04b701a81 reached healthy state in target group af96725dc44a51fd via AWS ELBv2 API.",
      },
      {
        title: "End-to-End Traffic Verification",
        content:
          "Confirmed HTTP 200 responses for /health, /ready, and portfolio UI via ALB DNS name (devops-portfolio-lab-alb-960839588.us-east-1.elb.amazonaws.com).",
      },
    ],
  },

  {
    day: 6,
    title: "Launch Template & Auto Scaling",
    status: "in-progress",
    label: "IN PROGRESS",
    summary:
      "Moving from individually managed EC2 instances toward repeatable, replaceable application infrastructure using a Launch Template and Auto Scaling Group.",

    sections: [
      {
        title: "Objective",
        content:
          "Create a repeatable EC2 configuration and maintain application capacity across two Availability Zones."
      },

      {
        title: "Launch Template",
        content:
          "Define the AMI, instance type, SSH key pair, security group, tags, and bootstrap configuration in Terraform."
      },

      {
        title: "AMI Selection",
        content:
          "Use Terraform to dynamically select the latest matching Ubuntu 24.04 LTS AMI instead of hardcoding an AMI ID."
      },

      {
        title: "Multi-AZ Compute",
        content:
          "Run application capacity across the existing application subnets in us-east-1a and us-east-1b."
      },

      {
        title: "Auto Scaling",
        content:
          "Maintain the desired application capacity and replace unhealthy or terminated instances."
      },

      {
        title: "Health",
        content:
          "Use ALB target health as part of the instance health model."
      }
    ]
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
        title: "Planned architecture",
        content:
          "Application EC2 → private RDS MariaDB.",
      },
      {
        title: "Security model",
        content:
          "Only the application security group should be allowed to reach the database on TCP/3306.",
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
        title: "Planned monitoring",
        content:
          "EC2 health, CPU, network activity, ALB target health, request metrics, and RDS health.",
      },
    ],
  },

  {
    day: 9,
    title: "Failure Testing",
    status: "planned",
    label: "PLANNED",
    summary:
      "Deliberately introduce controlled failures and document detection, diagnosis, recovery, and prevention.",
    sections: [
      {
        title: "Planned failures",
        content:
          "EC2 failure, application failure, web-server failure, and database connectivity failure.",
      },
      {
        title: "Troubleshooting methodology",
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