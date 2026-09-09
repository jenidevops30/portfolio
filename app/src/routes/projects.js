const express = require("express");

const router = express.Router();

const projects = [
  {
    id: "aws-production-platform",
    title: "AWS Production Platform",
    status: "Completed / Verified",
    description:
      "Production-style AWS infrastructure demonstrating secure networking, load balancing, high availability, monitoring and failure recovery.",
    technologies: [
      "AWS",
      "Terraform",
      "ALB",
      "Auto Scaling",
      "RDS",
      "CloudWatch"
    ]
  },
  {
    id: "aws-cost-optimization",
    title: "AWS Cost Optimization",
    status: "Case Study",
    description:
      "AWS cost analysis and infrastructure optimization backed by billing evidence and before-and-after cost analysis.",
    technologies: [
      "AWS",
      "FinOps",
      "Cost Explorer",
      "EC2",
      "RDS"
    ]
  },
  {
    id: "cicd-pipeline",
    title: "Production CI/CD Pipeline",
    status: "Planned",
    description:
      "CI/CD platform demonstrating automated testing, security checks, deployment and deployment verification.",
    technologies: [
      "Jenkins",
      "Git",
      "Docker",
      "CI/CD"
    ]
  },
  {
    id: "aws-gpu-infrastructure",
    title: "AWS GPU Infrastructure",
    status: "Case Study",
    description:
      "AWS GPU infrastructure supporting media-processing workloads with Linux, NVIDIA drivers, CUDA and automated deployment workflows.",
    technologies: [
      "AWS",
      "GPU",
      "Linux",
      "Jenkins"
    ]
  }
];

router.get("/", (req, res) => {
  res.json({
    count: projects.length,
    projects
  });
});

router.get("/:id", (req, res) => {
  const project = projects.find(
    (item) => item.id === req.params.id
  );

  if (!project) {
    return res.status(404).json({
      status: "error",
      message: "Project not found"
    });
  }

  res.json(project);
});

module.exports = router;