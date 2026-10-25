---
title: "Eliminating Long-Lived AWS Access Keys with GitHub Actions OIDC Federation"
slug: "aws-github-actions-oidc-zero-keys"
date: "2026-10-15"
author: "Jeni Patel"
authorRole: "DevOps & Cloud Security Engineer"
tags: ["AWS", "DevSecOps", "GitHub Actions", "IAM", "CI/CD", "Security"]
excerpt: "Hardcoded AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY secrets in CI/CD pipelines represent one of the most common vectors for cloud account compromise. Here is how to implement keyless authentication via OpenID Connect (OIDC) and AWS STS."
featured: false
readingTime: "4 min read"
---

# Eliminating Long-Lived AWS Access Keys with GitHub Actions OIDC Federation

In modern cloud security, **static credentials are an anti-pattern**. Storing long-lived `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` pairs in GitHub Secrets carries significant operational and security risks:
1. **Zero Automatic Expiry:** Static keys remain valid indefinitely until manually rotated.
2. **Exfiltration Risk:** Leaked CI/CD logs, misconfigured debug runners, or repository breaches can expose credentials directly to adversaries.
3. **Audit Complexity:** Tracing individual pipeline executions to shared static keys creates blind spots in AWS CloudTrail.

By configuring **OpenID Connect (OIDC)** between GitHub Actions and AWS IAM, workflows exchange short-lived JSON Web Tokens (JWT) for temporary AWS credentials via AWS STS (`AssumeRoleWithWebIdentity`). No static secret ever touches GitHub.

---

## Architecture: How OIDC Federation Works

```
┌────────────────┐           ┌────────────────┐           ┌────────────────┐
│ GitHub Actions │ ──(1)───> │ GitHub OIDC    │ ──(2)───> │ AWS STS        │
│ Runner         │           │ Token Provider │           │ AssumeRole     │
└────────────────┘           └────────────────┘           └────────────────┘
        │                                                         │
        │ ◄─────────────────────(3) Temporary STS Token───────────┘
        ▼
┌────────────────┐
│ AWS Cloud      │
│ (ECR, S3, ECS) │
└────────────────┘
```

1. The GitHub Actions runner requests a short-lived OIDC JWT from GitHub's internal token service.
2. The action presents this token to AWS Security Token Service (STS) using `sts:AssumeRoleWithWebIdentity`.
3. AWS STS validates the token signature against GitHub's public OIDC thumbprint and confirms the repository subject match before returning temporary credentials (valid for 15-60 minutes).

---

## 1. Configure the IAM OIDC Provider in Terraform

Define GitHub as an Identity Provider in your AWS account using Terraform:

```hcl
# Create OpenID Connect Provider for GitHub
resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}
```

---

## 2. Author a Scoped IAM Trust Policy

Security best practice requires scoping the trust policy to the exact GitHub organization, repository, and branch:

```hcl
data "aws_iam_policy_document" "github_actions_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # Strict scoping: only allow the main branch of your repository
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:jenidevops30/portfolio:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role" "github_actions" {
  name               = "github-actions-portfolio-deployer"
  assume_role_policy = data.aws_iam_policy_document.github_actions_assume_role.json
}
```

---

## 3. GitHub Actions Workflow Configuration

In your `.github/workflows/deploy.yml`, grant the workflow `id-token: write` permission and authenticate seamlessly:

```yaml
name: Deploy Portfolio to AWS

on:
  push:
    branches: [main]

permissions:
  id-token: write   # Required for requesting the OIDC JWT token
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-portfolio-deployer
          aws-region: us-east-1
          audience: sts.amazonaws.com

      - name: Verify Keyless Identity
        run: |
          aws sts get-caller-identity
```

---

## Key Benefits

- **Zero Secret Management:** No rotating API keys every 90 days.
- **Granular CloudTrail Auditing:** Every API call logs the exact repository name, Git ref, and GitHub runner identity.
- **Immediate Revocation:** IAM policies control access globally in AWS without touching CI/CD pipeline configuration.
