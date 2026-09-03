# Terraform Infrastructure for jenidevops.in

This directory contains **Infrastructure as Code** for the entire jenidevops.in portfolio site, including S3 storage, CloudFront CDN, and IAM roles for CI/CD.

## 🏗️ What This Builds

```
S3 Bucket (portfolio storage)
    ↓
CloudFront Distribution (global CDN)
    ↓
GitHub Actions OIDC Role (secure deployment)
    ↓
Access Logs & Monitoring
```

## 📋 Files

| File | Purpose |
|------|---------|
| `main.tf` | Provider config, backend state, default tags |
| `variables.tf` | Input variables (region, domain, bucket name, etc.) |
| `s3.tf` | S3 bucket with security, versioning, encryption |
| `cloudfront.tf` | CloudFront distribution with cache behaviors |
| `iam.tf` | IAM role for GitHub Actions (OIDC-based auth) |
| `logs.tf` | Optional access logging to S3 |
| `outputs.tf` | Export values (CloudFront ID, S3 bucket, etc.) |

## 🚀 Quick Start

### Prerequisites

```bash
# Install Terraform 1.0+
terraform --version

# Configure AWS credentials
aws configure

# Or use environment variables
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_REGION="us-east-1"
```

### Deploy

```bash
# 1. Initialize Terraform (downloads providers, sets up state)
cd terraform
terraform init

# 2. Plan changes (shows what will be created)
terraform plan

# 3. Apply changes (creates infrastructure)
terraform apply
# Type "yes" to confirm

# 4. View outputs
terraform output
# Shows CloudFront ID, S3 bucket name, etc.
```

## 📊 Architecture

### S3 Bucket Configuration
- ✅ **Versioning enabled** (easy rollback to previous versions)
- ✅ **Encryption by default** (AES-256 server-side encryption)
- ✅ **Public access blocked** (CloudFront is the only access point)
- ✅ **Lifecycle policy** (auto-delete old versions after 30 days = cost savings)
- ✅ **Access logging** (optional, tracks who accesses what)

### CloudFront Distribution
- ✅ **Global CDN** (content served from edge locations near users)
- ✅ **HTTPS enforced** (redirect HTTP → HTTPS)
- ✅ **Optimized cache behavior**:
  - `index.html` → No cache (always fresh)
  - `/assets/*` → 1 year cache (Vite hashes filenames)
  - Other files → 1 hour cache
- ✅ **Gzip compression enabled** (smaller downloads)
- ✅ **IPv6 support** (modern client compatibility)

### IAM Security
- ✅ **OIDC-based authentication** (no long-lived AWS keys needed)
- ✅ **GitHub Actions assumes role** (temporary credentials per deployment)
- ✅ **Least-privilege permissions**:
  - S3: Only jeni-portfolio bucket
  - CloudFront: Only this distribution
  - No overly broad permissions
- ✅ **Constrained to main branch** (can't deploy from other branches)

## 🔐 GitHub Actions Integration

### Option 1: OIDC (Recommended - no stored credentials)

No need to store AWS credentials in GitHub Secrets!

```bash
# Get the role ARN from Terraform output
terraform output github_actions_role_arn
# Output: arn:aws:iam::123456789012:role/github-actions-portfolio-deployer

# Add to GitHub Secrets:
# GH_ACTIONS_ROLE_ARN = (paste the ARN)
```

Update `.github/workflows/deploy.yml`:
```yaml
- name: Configure AWS Credentials (OIDC)
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ secrets.GH_ACTIONS_ROLE_ARN }}
    aws-region: us-east-1
```

### Option 2: Access Keys (Legacy)

Uncomment in `iam.tf` to create long-lived access keys:
```hcl
resource "aws_iam_user" "github_actions" { ... }
resource "aws_iam_access_key" "github_actions" { ... }
```

Then add to GitHub Secrets:
```
AWS_ACCESS_KEY_ID = (from terraform output)
AWS_SECRET_ACCESS_KEY = (from terraform output)
```

## 📈 Cost Estimates

| Component | Estimated Cost |
|-----------|-----------------|
| S3 Storage (10 GB) | ~$0.20/month |
| CloudFront (1 TB/month) | ~$85/month |
| Logs Storage (optional) | ~$0.50/month |
| **Total** | **~$85/month** |

*Note: Costs vary by region and usage. Use AWS Cost Calculator for accurate estimates.*

## 🔄 Terraform State Management

State is stored in S3 (not local machine):
- ✅ **Safe** (no accidental commits of .tfstate)
- ✅ **Shared** (team members access same state)
- ✅ **Locked** (DynamoDB prevents concurrent modifications)

First-time setup requires manual state bucket:
```bash
# This script creates the state bucket (one-time only)
./scripts/setup-terraform-state.sh
```

## 📝 Common Tasks

### Update CloudFront Cache Behavior

Edit `cloudfront.tf`:
```hcl
default_ttl = 3600  # Change cache time
```

Apply changes:
```bash
terraform plan   # Review changes
terraform apply  # Deploy
```

### Add New CDN Cache Rule

Example: Cache PDF files for 1 month

```hcl
ordered_cache_behavior {
  path_pattern     = "/*.pdf"
  allowed_methods  = ["GET", "HEAD"]
  cached_methods   = ["GET", "HEAD"]
  target_origin_id = "S3-${var.bucket_name}"
  
  # ... cache config ...
  
  default_ttl = 2592000  # 30 days
}
```

### Destroy Infrastructure

**⚠️ WARNING: This deletes S3 bucket and CloudFront!**

```bash
terraform destroy
# Type "yes" to confirm
```

## 🎯 What This Demonstrates

| Practice | Evidence |
|----------|----------|
| **Infrastructure as Code** | Entire infra in Terraform (no Console clicks) |
| **Security Best Practices** | OIDC auth, least-privilege IAM, encryption |
| **Cost Optimization** | Versioning lifecycle, log retention policies |
| **CDN/Caching Strategy** | Smart cache behaviors per content type |
| **CI/CD Integration** | GitHub Actions deployment automation |
| **Reproducibility** | Spin up/down infrastructure with single command |

## 📚 Resources

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS S3 Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)
- [CloudFront Caching](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-optimization.html)
- [GitHub OIDC in AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

---

**Maintained by**: Jeni Patel  
**Last updated**: September 2026  
**Status**: Production Ready ✅
