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
    incident: "INCIDENT #001",
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
        title: "Incident #001 Symptom",
        content:
          "Initial SSH access failed with Permission denied (publickey). Public IP and TCP/22 security group were verified active.",
      },
      {
        title: "Incident #001 Root Cause",
        content:
          "Terraform inspection revealed key_name = null on aws_instance.app. The EC2 instance was provisioned without an SSH key pair.",
      },
      {
        title: "Incident #001 Remediation",
        content:
          "Terraform was updated to explicitly associate key_name = var.key_name, restoring secure administrative SSH access.",
      },
    ],
  },

  {
    day: 4,
    title: "Ansible Automation & Node.js Deployment",
    status: "completed",
    label: "COMPLETED",
    incident: "INCIDENT #002",
    summary:
      "Automated server configuration and application deployment with Ansible: provisioned NVM, Node.js v24.x LTS, systemd service, and Nginx reverse proxy.",
    sections: [
      {
        title: "Ansible Automation",
        content:
          "Codified configuration in deployment/ansible/playbook.yml: automated packages, user-space NVM, app dependencies, systemd management, and Nginx reverse proxy.",
      },
      {
        title: "Runtime & Process Supervision",
        content:
          "Installed Node.js v24.x LTS in user space (/home/ubuntu/.nvm) and registered portfolio.service systemd unit for continuous supervision on port 3000.",
      },
      {
        title: "Incident #002 Symptom",
        content:
          "Public HTTP probes to http://54.236.188.6/health returned HTTP 404 Not Found from Nginx despite the Node.js process running healthy on localhost:3000.",
      },
      {
        title: "Incident #002 Root Cause",
        content:
          "Default Nginx distribution configuration served static files from /var/www/html with try_files $uri $uri/ =404, lacking reverse proxy proxy_pass to port 3000.",
      },
      {
        title: "Incident #002 Remediation",
        content:
          "Configured Nginx location / with proxy_pass http://127.0.0.1:3000 and proxy headers, validated syntax with nginx -t, and verified 200 OK on /health and /ready.",
      },
      {
        title: "Verification",
        content:
          "Validated 200 OK contracts on /health and /ready endpoints locally and over public HTTP across EC2 nodes.",
      },
    ],
  },

  {
    day: 5,
    title: "Application Load Balancer",
    status: "completed",
    label: "COMPLETED",
    incident: "INCIDENT #003",
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
        title: "Target Group Health Check",
        content:
          "Configured HTTP/80 target group checking /health endpoint with 200 OK contract (30s interval, 5s timeout, 2 healthy / 2 unhealthy thresholds).",
      },
      {
        title: "Incident #003 Symptom",
        content:
          "Public curl to ALB DNS returned HTTP/1.1 502 Bad Gateway from awselb/2.0. Target Group showed target status unhealthy on port 80.",
      },
      {
        title: "Incident #003 Root Cause",
        content:
          "The EC2 compute security group lacked an ingress rule authorizing traffic from the ALB security group (sg-01458968cdedf7043), causing health check probes to be dropped.",
      },
      {
        title: "Incident #003 Remediation",
        content:
          "Added aws_security_group_rule in Terraform authorizing TCP/80 exclusively from the ALB security group. Targets transitioned to healthy and ALB returned 200 OK.",
      },
    ],
  },

  {
    day: 6,
    title: "Launch Template & Auto Scaling",
    status: "in-progress",
    label: "IN PROGRESS",
    incident: "INCIDENT #004 (PLANNED TEST)",
    summary:
      "Moving from individually managed EC2 instances toward repeatable, replaceable application infrastructure using a Launch Template and Auto Scaling Group.",

    sections: [
      {
        title: "Objective",
        content:
          "Create a repeatable EC2 configuration and maintain application capacity across two Availability Zones."
      },

      {
        title: "Launch Template & Dynamic AMI",
        content:
          "Defined Launch Template using dynamic Ubuntu 24.04 LTS data source lookup, user-space Node.js bootstrap, systemd unit, and reverse proxy."
      },

      {
        title: "Multi-AZ Auto Scaling",
        content:
          "Maintained target capacity (Min: 2, Desired: 2, Max: 2) across public subnets in us-east-1a and us-east-1b with ELB health checks."
      },

      {
        title: "Incident #004 Test Plan",
        content:
          "Controlled instance termination test to verify that the Auto Scaling Group detects capacity loss and automatically provisions and registers a replacement instance."
      },

      {
        title: "Incident #004 Expected Recovery",
        content:
          "ASG detects capacity deficit via ELB health check, provisions a replacement instance via Launch Template v2, runs user-data initialization, and registers to Target Group."
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