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
    status: "in-progress",
    label: "IN PROGRESS",
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
        title: "Incident",
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
          "Terraform is being updated to explicitly configure the AWS EC2 key pair.",
      },
    ],
  },

  {
    day: 4,
    title: "Application & Web Server",
    status: "planned",
    label: "PLANNED",
    summary:
      "Deploy the portfolio application behind a production-style web server configuration.",
    sections: [
      {
        title: "Planned work",
        content:
          "Configure the application runtime, Nginx, health endpoints, and application-level validation.",
      },
    ],
  },

  {
    day: 5,
    title: "Application Load Balancer",
    status: "planned",
    label: "PLANNED",
    summary:
      "Introduce an Application Load Balancer between the Internet and application instances.",
    sections: [
      {
        title: "Planned architecture",
        content:
          "Internet → ALB → Application EC2 instances.",
      },
      {
        title: "Security model",
        content:
          "ALB security group → EC2 security group.",
      },
    ],
  },

  {
    day: 6,
    title: "Auto Scaling",
    status: "planned",
    label: "PLANNED",
    summary:
      "Make application compute replaceable and capable of recovering from instance failure.",
    sections: [
      {
        title: "Planned components",
        content:
          "Launch Template, Auto Scaling Group, multiple Availability Zones, and ALB target health.",
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